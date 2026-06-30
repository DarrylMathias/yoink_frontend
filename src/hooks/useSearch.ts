import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { SearchResult } from '../types';

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchTime, setSearchTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMutation = useMutation({
    mutationFn: async ({ searchQuery, k }: { searchQuery: string; k: number }) => {
      const start = performance.now();
      const response = await apiClient.get('/query', {
        params: { q: searchQuery, k }
      });
      const end = performance.now();
      return { data: response.data, time: (end - start) / 1000 };
    },
    onSuccess: ({ data, time }) => {
      setSearchTime(time);
      setErrorMsg(null);
      
      let parsedResults: SearchResult[] = [];
      if (Array.isArray(data)) {
        parsedResults = data;
      } else if (data && data.results && Array.isArray(data.results)) {
        parsedResults = data.results;
      } else if (data && data.data && Array.isArray(data.data)) {
        parsedResults = data.data;
      }
      
      setResults(parsedResults);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      console.error(err);
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else if (err.message) {
        setErrorMsg(err.message || 'An error occurred while fetching results.');
      } else {
        setErrorMsg('An unknown error occurred.');
      }
      setResults([]);
    }
  });

  const fetchResults = (searchQuery: string, k: number = 10) => {
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    searchMutation.mutate({ searchQuery, k });
  };

  const resetSearch = () => {
    setHasSearched(false);
    setResults([]);
    setErrorMsg(null);
    searchMutation.reset();
  };

  return {
    isLoading: searchMutation.isPending,
    results,
    searchTime,
    error: errorMsg,
    hasSearched,
    fetchResults,
    resetSearch
  };
};
