import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { useSearch } from './hooks/useSearch';
import { LinkPreview } from './components/ui/link-preview';
import './App.css';

function App() {
  const { isLoading, results, searchTime, error, hasSearched, fetchResults, resetSearch } = useSearch();
  const [activeQuery, setActiveQuery] = useState('');
  const [activeK, setActiveK] = useState(10);

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const k = parseInt(params.get('k') || '10', 10);

      if (path === '/query' && q) {
        setActiveQuery(q);
        setActiveK(k);
        fetchResults(q, k);
      } else if (path === '/') {
        setActiveQuery('');
        setActiveK(10);
        resetSearch();
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    // Trigger on initial mount
    handleUrlChange();

    return () => window.removeEventListener('popstate', handleUrlChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (query: string, k: number) => {
    setActiveQuery(query);
    setActiveK(k);
    const newUrl = `/query?q=${encodeURIComponent(query)}&k=${k}`;
    window.history.pushState({}, '', newUrl);
    fetchResults(query, k);
  };

  const handleReset = () => {
    setActiveQuery('');
    setActiveK(10);
    window.history.pushState({}, '', '/');
    resetSearch();
  };

  return (
    <>
      <div className="absolute top-3 right-4 flex items-center gap-4 font-sans text-[13px]">
        <LinkPreview 
          url="https://github.com/DarrylMathias/yoink" 
          className="text-black hover:underline opacity-80 hover:opacity-100"
        >
          GitHub
        </LinkPreview>
        <LinkPreview 
          url="https://www.darrylmathias.tech/" 
          className="text-black hover:underline opacity-80 hover:opacity-100"
        >
          Creator
        </LinkPreview>
      </div>

      {hasSearched ? (
        <Results
          initialQuery={activeQuery}
          initialK={activeK}
          results={results}
          isLoading={isLoading}
          error={error}
          searchTime={searchTime}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      ) : (
        <Home onSearch={handleSearch} />
      )}
    </>
  );
}

export default App;
