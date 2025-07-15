import React, { useState } from 'react';

function StockSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter stock symbol or name"
        style={{ padding: '0.5rem', fontSize: '1rem', width: '250px' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '1rem', fontSize: '1rem' }}>
        Search
      </button>
    </form>
  );
}

export default StockSearch; 