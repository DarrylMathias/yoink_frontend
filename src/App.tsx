import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { useSearch } from './hooks/useSearch';
import './App.css';

function App() {
  const { isLoading, results, searchTime, error, hasSearched, fetchResults, resetSearch } = useSearch();
  const [activeQuery, setActiveQuery] = useState('');

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');

      if (path === '/query' && q) {
        setActiveQuery(q);
        fetchResults(q);
      } else if (path === '/') {
        setActiveQuery('');
        resetSearch();
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    // Trigger on initial mount
    handleUrlChange();

    return () => window.removeEventListener('popstate', handleUrlChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (query: string) => {
    setActiveQuery(query);
    const newUrl = `/query?q=${encodeURIComponent(query)}`;
    window.history.pushState({}, '', newUrl);
    fetchResults(query);
  };

  const handleReset = () => {
    setActiveQuery('');
    window.history.pushState({}, '', '/');
    resetSearch();
  };

  if (hasSearched) {
    return (
      <Results
        initialQuery={activeQuery}
        results={results}
        isLoading={isLoading}
        error={error}
        searchTime={searchTime}
        onSearch={handleSearch}
        onReset={handleReset}
      />
    );
  }

  return <Home onSearch={handleSearch} />;
}

export default App;
