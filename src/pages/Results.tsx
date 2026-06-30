import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { ResultsList } from '../components/ResultsList';
import type { SearchResult, ExecutionTimes } from '../types';

interface ResultsProps {
  initialQuery: string;
  initialK: number;
  results: SearchResult[];
  tokens?: Record<string, number>[];
  executionTimes?: ExecutionTimes | null;
  isLoading: boolean;
  error: string | null;
  searchTime: number;
  onSearch: (query: string, k: number) => void;
  onReset: () => void;
}

export const Results = ({
  initialQuery,
  initialK,
  results,
  tokens,
  executionTimes,
  isLoading,
  error,
  searchTime,
  onSearch,
  onReset,
}: ResultsProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [kValue, setKValue] = useState(initialK);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, kValue);
  };

  return (
    <div className="p-3.5 px-2.5 font-sans">
      <div className="flex items-center gap-4 border-b border-[#e5e5e5] pb-4 mb-1.5">
        <div
          className="font-serif text-[32px] font-bold tracking-[-1px] cursor-pointer"
          onClick={onReset}
        >
          <Logo isResultsPage={true} />
        </div>
        <form className="flex items-center gap-2.5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-1">
            <input
              type="text"
              className="w-[350px] h-[30px] border border-[#7E9CB1] px-1.5 py-0.5 font-sans text-sm m-0 outline-none focus:border-[#3366cc]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="h-[30px] border border-[#7E9CB1] px-1 text-sm bg-white text-[#555] cursor-pointer outline-none focus:border-[#3366cc]"
              value={kValue}
              onChange={(e) => setKValue(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-2 py-0.5 cursor-pointer text-black active:border-inset"
          >
            Yoink Search
          </button>
        </form>
      </div>

      <div className="bg-[#e5ecf9] border-t border-[#3366cc] py-1 px-2 text-[13px] flex justify-between mb-4">
        <div>
          Searched the depths of the web for <b>{initialQuery}</b>.
        </div>
        <div>
          Results 1 - {results.length}.
        </div>
      </div>

      <div className="text-[13px] text-[#70757a] mb-4 pl-2.5 flex items-center gap-3">
        <span>Search completed in {searchTime.toFixed(3)} seconds.</span>
        <button
          type="button"
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          className="text-[#0000cc] hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center outline-none"
        >
          {showDiagnostics ? 'Hide Diagnostics ▲' : 'View Diagnostics ▼'}
        </button>
      </div>

      {showDiagnostics && (
        <div className="mb-8 pl-2.5 max-w-[800px]">
          <div className="bg-[#f8f9fa] border border-[#dadce0] p-4 font-mono text-[12px] text-[#333] shadow-inner">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Query Analysis */}
              <div className="flex-1">
                <h3 className="font-bold mb-3 uppercase text-[#555] tracking-wider text-[11px] border-b border-[#ddd] pb-1">
                  Token Extraction & Lexicon Hits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tokens?.map((tokenObj, idx) => {
                    const word = Object.keys(tokenObj)[0];
                    const count = tokenObj[word];
                    return (
                      <span key={idx} className="bg-[#e5e5e5] text-black px-2 py-1 border border-[#999999] rounded-sm flex items-center gap-2">
                        <strong className="text-[13px]">{word}</strong>
                        <span className="text-[#555] text-[10px] bg-white px-1 rounded border border-[#ccc]">
                          {count.toLocaleString()} docs
                        </span>
                      </span>
                    );
                  })}
                  {(!tokens || tokens.length === 0) && (
                    <span className="text-[#777] italic text-[12px]">No token data available</span>
                  )}
                </div>
              </div>

              {/* Execution Trace */}
              <div className="flex-1">
                <h3 className="font-bold mb-3 uppercase text-[#555] tracking-wider text-[11px] border-b border-[#ddd] pb-1">
                  Execution Times Waterfall
                </h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center border-b border-[#eee] pb-1">
                    <span>Tokenization of query</span>
                    <span className="text-[#008000]">{executionTimes?.tokenize?.toFixed(3) ?? '0.000'} ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#eee] pb-1">
                    <span>Fetch corpus stats from DB</span>
                    <span className="text-[#008000]">{executionTimes?.fetch_corpus_stats?.toFixed(3) ?? '0.000'} ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#eee] pb-1">
                    <span>Binary Lexicon Seek</span>
                    <span className="text-[#008000]">{executionTimes?.lexicon_seek_time?.toFixed(3) ?? '0.000'} ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#eee] pb-1">
                    <span>Build postings list from postings file</span>
                    <span className="text-[#008000]">{executionTimes?.posting_seek_time?.toFixed(3) ?? '0.000'} ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#eee] pb-1">
                    <span>BM25 Computation</span>
                    <span className="text-[#008000]">{executionTimes?.bm25_computation?.toFixed(3) ?? '0.000'} ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#eee] pb-1">
                    <span>Merge Sort (k={kValue})</span>
                    <span className="text-[#008000]">{executionTimes?.sort?.toFixed(3) ?? '0.000'} ms</span>
                  </div>
                  <div className="flex justify-between items-center font-bold pt-1">
                    <span>Total Latency</span>
                    <span className="text-[#D62121]">
                      {executionTimes ? (
                        Object.values(executionTimes).reduce((a, b) => a + b, 0).toFixed(3)
                      ) : (
                        '0.000'
                      )} ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ResultsList
        isLoading={isLoading}
        error={error}
        results={results}
        query={initialQuery}
      />
    </div>
  );
};
