import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { StatsBadge } from '../components/StatsBadge';
import { useCrawledStats } from '../hooks/useCrawledStats';

interface HomeProps {
  onSearch: (query: string) => void;
}

export const Home = ({ onSearch }: HomeProps) => {
  const [query, setQuery] = useState('');
  const crawledPages = useCrawledStats();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleLucky = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    alert(`I'm feeling lucky: ${query}`);
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
          <input
            type="text"
            className="w-[400px] h-[25px] border border-[#7E9CB1] px-1.5 py-0.5 font-sans text-sm mb-3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="flex gap-1.5">
            <button
              type="submit"
              className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-2 py-0.5 cursor-pointer text-black active:border-inset"
            >
              Yoink Search
            </button>
            <button
              type="button"
              className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-2 py-0.5 cursor-pointer text-black active:border-inset"
              onClick={handleLucky}
            >
              I'm Feeling Lucky
            </button>
          </div>
        </form>

        {crawledPages !== null && <StatsBadge crawledPages={crawledPages} />}
      </div>

      <div className="absolute bottom-2.5 w-full text-center text-xs">
        © 2026 Yoink
      </div>
    </div>
  );
};
