import { useState } from 'react';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { useSearch } from './hooks/useSearch';
import './App.css';

function App() {
  const { isLoading, results, searchTime, error, hasSearched, fetchResults, resetSearch } = useSearch();
  const [activeQuery, setActiveQuery] = useState('');

  const handleSearch = (query: string) => {
    setActiveQuery(query);
    fetchResults(query);
  };

  const handleReset = () => {
    setActiveQuery('');
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
