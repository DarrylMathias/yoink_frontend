import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // In Phase 2, this will navigate to a results page or fetch results
    console.log("Searching for:", query);
    alert(`Searching for: ${query} (Phase 2 will implement results)`);
  };

  const handleLucky = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("I'm feeling lucky:", query);
    alert(`I'm feeling lucky: ${query}`);
  };

  return (
    <div>
      <div className="search-container">
        <div className="logo-text">
          <span className="logo-y">Y</span>
          <span className="logo-o">o</span>
          <span className="logo-i">i</span>
          <span className="logo-n">n</span>
          <span className="logo-k">k</span>
          <span className="logo-ex">!</span>
        </div>
        <div className="subtitle">yoink - the search engine that yoinks data from the depths of the web</div>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="button-container">
            <button type="submit" className="search-button">
              Yoink Search
            </button>
            <button type="button" className="search-button" onClick={handleLucky}>
              I'm Feeling Lucky
            </button>
          </div>
        </form>
      </div>

      <div className="footer">
        © 2026 Yoink
      </div>
    </div>
  );
}

export default App;
