import { useState } from 'react';
import type { SearchResult } from '../types';

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchResults = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    const start = performance.now();

    try {
      const res = await fetch(
        `https://yoink.darrylmathias.tech/api/query?q=${encodeURIComponent(
          searchQuery
        )}&k=10`
      );

      if (!res.ok) {
        throw new Error(`Server returned ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      let parsedResults: SearchResult[] = [];
      if (Array.isArray(data)) {
        parsedResults = data;
      } else if (data && data.results && Array.isArray(data.results)) {
        parsedResults = data.results;
      } else if (data && data.data && Array.isArray(data.data)) {
        parsedResults = data.data;
      }

      setResults(parsedResults);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || 'An error occurred while fetching results.');
      } else {
        setError('An unknown error occurred.');
      }
      setResults([]);
    } finally {
      const end = performance.now();
      setSearchTime((end - start) / 1000);
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setHasSearched(false);
    setResults([]);
    setError(null);
  };

  return { isLoading, results, searchTime, error, hasSearched, fetchResults, resetSearch };
};
