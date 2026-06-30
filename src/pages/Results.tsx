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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-[#e5e5e5] pb-4 mb-1.5 sm:pr-[140px]">
        <div
          className="font-serif text-[32px] font-bold tracking-[-1px] cursor-pointer shrink-0 whitespace-nowrap"
          onClick={onReset}
        >
          <Logo isResultsPage={true} />
        </div>
        <form className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 w-full sm:w-auto" onSubmit={handleSubmit}>
          <div className="flex items-center gap-1 w-full sm:w-auto max-w-[100vw] sm:max-w-none pr-4 sm:pr-0">
            <input
              type="text"
              className="flex-1 sm:w-[350px] h-[30px] min-w-0 border border-[#7E9CB1] px-1.5 py-0.5 font-sans text-sm m-0 outline-none focus:border-[#3366cc]"
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
            className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-2 py-0.5 cursor-pointer text-black active:border-inset whitespace-nowrap shrink-0"
          >
            Yoink Search
          </button>
        </form>
      </div>

      <div className="bg-[#e5ecf9] border-t border-[#3366cc] py-1 px-2 text-[13px] flex justify-between mb-4">
        <div>
          Searched the depths of the web for <b>{initialQuery}</b>.
        </div>
      </div>

      <div className="text-[13px] text-[#70757a] mb-4 pl-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
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
          <div className="bg-transparent border border-black p-4 font-sans text-[13px] text-black">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Query Analysis */}
              <div className="flex-1">
                <div className="font-bold mb-2">
                  Token Extraction & Lexicon Hits
                </div>
                <table className="w-full border-collapse border border-black">
                  <thead>
                    <tr>
                      <th className="border border-black p-1 text-left font-normal bg-[#e5e5e5]">Token</th>
                      <th className="border border-black p-1 text-left font-normal bg-[#e5e5e5]">Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens?.map((tokenObj, idx) => {
                      const word = Object.keys(tokenObj)[0];
                      const count = tokenObj[word];
                      return (
                        <tr key={idx}>
                          <td className="border border-black p-1 font-bold">{word}</td>
                          <td className="border border-black p-1">{count.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    {(!tokens || tokens.length === 0) && (
                      <tr>
                        <td colSpan={2} className="border border-black p-1 italic text-[#777]">No token data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Execution Trace */}
              <div className="flex-1">
                <div className="font-bold mb-2">
                  Execution Times Waterfall
                </div>
                <table className="w-full border-collapse border border-black">
                  <tbody>
                    <tr>
                      <td className="border border-black p-1">Tokenization of query</td>
                      <td className="border border-black p-1 text-[#008000]">{executionTimes?.tokenize?.toFixed(3) ?? '0.000'} ms</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1">Fetch corpus stats from DB</td>
                      <td className="border border-black p-1 text-[#008000]">{executionTimes?.fetch_corpus_stats?.toFixed(3) ?? '0.000'} ms</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1">Binary Lexicon Seek</td>
                      <td className="border border-black p-1 text-[#008000]">{executionTimes?.lexicon_seek_time?.toFixed(3) ?? '0.000'} ms</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1">Build postings list from postings file</td>
                      <td className="border border-black p-1 text-[#008000]">{executionTimes?.posting_seek_time?.toFixed(3) ?? '0.000'} ms</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1">BM25 Computation</td>
                      <td className="border border-black p-1 text-[#008000]">{executionTimes?.bm25_computation?.toFixed(3) ?? '0.000'} ms</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1">Merge Sort (k={kValue})</td>
                      <td className="border border-black p-1 text-[#008000]">{executionTimes?.sort?.toFixed(3) ?? '0.000'} ms</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 font-bold">Total Latency</td>
                      <td className="border border-black p-1 font-bold text-[#D62121]">
                        {executionTimes ? (
                          Object.values(executionTimes).reduce((a, b) => a + b, 0).toFixed(3)
                        ) : (
                          '0.000'
                        )} ms
                      </td>
                    </tr>
                  </tbody>
                </table>
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
