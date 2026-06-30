import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { ResultsList } from '../components/ResultsList';
import type { SearchResult } from '../types';

interface ResultsProps {
  initialQuery: string;
  initialK: number;
  results: SearchResult[];
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
  isLoading,
  error,
  searchTime,
  onSearch,
  onReset,
}: ResultsProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [kValue, setKValue] = useState(initialK);

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
          Results 1 - {results.length}. Search took {searchTime.toFixed(2)}{' '}
          seconds.
        </div>
      </div>

      <ResultsList
        isLoading={isLoading}
        error={error}
        results={results}
        query={initialQuery}
      />
    </div>
  );
};
