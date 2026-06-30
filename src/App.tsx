import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { SubmitUrl } from './pages/SubmitUrl';
import { useSearch } from './hooks/useSearch';
import { LinkPreview } from './components/ui/link-preview';
import './App.css';

function App() {
  const { isLoading, results, tokens, executionTimes, searchTime, error, hasSearched, fetchResults, resetSearch } = useSearch();
  const [activeQuery, setActiveQuery] = useState('');
  const [activeK, setActiveK] = useState(10);
  const [isSubmitPage, setIsSubmitPage] = useState(false);

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const k = parseInt(params.get('k') || '10', 10);

      if (path === '/submit') {
        setIsSubmitPage(true);
      } else if (path === '/query' && q) {
        setIsSubmitPage(false);
        setActiveQuery(q);
        setActiveK(k);
        fetchResults(q, k);
      } else if (path === '/' || path === '') {
        setIsSubmitPage(false);
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
    setIsSubmitPage(false);
    setActiveQuery(query);
    setActiveK(k);
    const newUrl = `/query?q=${encodeURIComponent(query)}&k=${k}`;
    window.history.pushState({}, '', newUrl);
    fetchResults(query, k);
  };

  const handleReset = () => {
    setIsSubmitPage(false);
    setActiveQuery('');
    setActiveK(10);
    window.history.pushState({}, '', '/');
    resetSearch();
  };

  const navigateToSubmit = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsSubmitPage(true);
    window.history.pushState({}, '', '/submit');
  };

  return (
    <div className="overflow-x-hidden min-h-screen">
      <div className="absolute top-3 right-4 flex items-center gap-4 font-sans text-[13px] z-50">
        <a 
          href="/submit" 
          onClick={navigateToSubmit}
          className="text-[#0000cc] hover:underline font-bold"
        >
          Submit URL
        </a>
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

      {isSubmitPage ? (
        <SubmitUrl onBack={handleReset} />
      ) : hasSearched ? (
        <Results
          initialQuery={activeQuery}
          initialK={activeK}
          results={results}
          tokens={tokens}
          executionTimes={executionTimes}
          isLoading={isLoading}
          error={error}
          searchTime={searchTime}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      ) : (
        <Home onSearch={handleSearch} />
      )}
    </div>
  );
}

export default App;
