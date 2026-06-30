import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { ResultsList } from '../components/ResultsList';
import type { SearchResult } from '../types';

interface ResultsProps {
  initialQuery: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  searchTime: number;
  onSearch: (query: string) => void;
  onReset: () => void;
}

export const Results = ({
  initialQuery,
  results,
  isLoading,
  error,
  searchTime,
  onSearch,
  onReset,
}: ResultsProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
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
          <input
            type="text"
            className="w-[350px] h-[25px] border border-[#7E9CB1] px-1.5 py-0.5 font-sans text-sm m-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
