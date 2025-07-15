import React, { useEffect, useState } from 'react';
import './App.css';
import StockSearch from './StockSearch';
import StockDetails from './StockDetails';

function App() {
  const [backendStatus, setBackendStatus] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null); // To store the selected stock ticker

  useEffect(() => {
    // Fetch backend health status on component mount
    fetch('/api/health')
      .then(res => {
        if (!res.ok) throw new Error('Backend health check failed');
        return res.json();
      })
      .then(data => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend unavailable'));
  }, []); // Empty dependency array means this effect runs only once on mount

  const handleSearch = (query) => {
    setLoading(true);
    setSearchError('');
    setSearchResults(null);
    setSelectedStock(null); // Clear selected stock on new search

    // Fetch search results from the backend
    fetch(`/api/search/${encodeURIComponent(query)}`)
      .then(res => {
        if (!res.ok) throw new Error('Search failed');
        return res.json();
      })
      .then(data => {
        setSearchResults(data.results || []);
        if (data.results && data.results.length === 0) {
          setSearchError('No stocks found');
        }
      })
      .catch(() => setSearchError('Error searching for stocks'))
      .finally(() => setLoading(false));
  };

  const handleStockSelect = (ticker) => {
    setSelectedStock(ticker); // Set the selected stock ticker
    setSearchResults(null); // Clear search results after selection
    setSearchError(''); // Clear any previous search errors
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Researcher</h1>
      </header>
      <main className="App-main">
        <p>{backendStatus ? `Backend Status: ${backendStatus}` : 'Loading backend status...'}</p>

        {!selectedStock ? (
          // Show search and results if no stock is selected
          <>
            <StockSearch onSearch={handleSearch} />
            {loading && <p>Searching...</p>}
            {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
            {searchResults && searchResults.length > 0 && (
              <div className="search-results">
                <h3>Search Results</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {searchResults.map((stock, idx) => (
                    <li key={idx} style={{ margin: '0.5rem 0', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#f9f9f9' }} onClick={() => handleStockSelect(stock.symbol)}>
                      <strong>{stock.symbol}</strong>: {stock.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          // Show stock details if a stock is selected
          <StockDetails ticker={selectedStock} />
        )}
      </main>
      <footer className="App-footer">
        <p>&copy; 2025 Stock Researcher</p>
      </footer>
    </div>
  );
}

export default App;
