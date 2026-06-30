import React, { useState } from 'react';
import { apiClient } from '../api/client';
import { Logo } from '../components/Logo';
import { StatsBadge } from '../components/StatsBadge';
import { useCrawledStats } from '../hooks/useCrawledStats';

interface HomeProps {
  onSearch: (query: string, k: number) => void;
}

export const Home = ({ onSearch }: HomeProps) => {
  const [query, setQuery] = useState('');
  const [kValue, setKValue] = useState(10);
  const [isLuckyLoading, setIsLuckyLoading] = useState(false);
  const crawledPages = useCrawledStats();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, kValue);
  };

  const handleLucky = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLuckyLoading(true);
    try {
      const response = await apiClient.get('/query', {
        params: { q: query, k: 1 }
      });
      
      const data = response.data;
      let topResult = null;
      
      if (Array.isArray(data) && data.length > 0) {
        topResult = data[0];
      } else if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
        topResult = data.results[0];
      } else if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        topResult = data.data[0];
      }

      if (topResult && topResult.url) {
        window.location.href = topResult.url;
      } else {
        // Fallback to normal search if no results found
        onSearch(query, kValue);
      }
    } catch (error) {
      console.error("Failed to fetch lucky result:", error);
      onSearch(query, kValue);
    } finally {
      setIsLuckyLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-[15%] flex flex-col items-center">
        <div className="font-serif text-[80px] font-bold tracking-[-2px] mb-2.5">
          <Logo />
        </div>
        <div className="font-sans text-[13px] text-[#555] mb-5">
          yoink - the search engine that yoinks data from the depths of the web
        </div>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              className="w-[400px] h-[30px] border border-[#7E9CB1] px-2 font-sans text-sm outline-none focus:border-[#3366cc]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <select
              className="h-[30px] border border-[#7E9CB1] px-1 text-sm bg-white text-[#555] cursor-pointer outline-none focus:border-[#3366cc]"
              value={kValue}
              onChange={(e) => setKValue(Number(e.target.value))}
            >
              <option value={10}>Top 10</option>
              <option value={20}>Top 20</option>
              <option value={50}>Top 50</option>
              <option value={100}>Top 100</option>
            </select>
          </div>
          <div className="flex gap-1.5">
            <button
              type="submit"
              className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-2 py-0.5 cursor-pointer text-black active:border-inset"
            >
              Yoink Search
            </button>
            <button
              type="button"
              onClick={handleLucky}
              disabled={isLuckyLoading}
              className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-2 py-0.5 cursor-pointer text-black active:border-inset disabled:opacity-50"
            >
              {isLuckyLoading ? 'Yoinking...' : "I'm Feeling Yoinky!"}
            </button>
          </div>
        </form>

        {crawledPages !== null && <StatsBadge crawledPages={crawledPages} />}
      </div>
    </div>
  );
};
