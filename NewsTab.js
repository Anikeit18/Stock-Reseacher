import React, { useEffect, useState } from 'react';

function NewsTab({ ticker }) {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticker) return; // Don't fetch if no ticker is provided

    setLoading(true);
    setError(null);
    setNewsData(null);

    fetch(`/api/stock/${ticker}/news`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch news data.');
        }
        return res.json();
      })
      .then(data => {
        setNewsData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [ticker]); // Re-run effect when ticker prop changes

  if (loading) return <p>Loading news...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!newsData || newsData.length === 0) return <p>No news available.</p>;

  return (
    <div className="news-tab">
      <h3>Recent News</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {newsData.map((article, idx) => (
          <li key={idx} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4><a href={article.url} target="_blank" rel="noopener noreferrer">{article.headline}</a></h4>
            <p><strong>Source:</strong> {article.source}</p>
            <p><strong>Date:</strong> {article.datetime}</p>
            {article.summary && <p><strong>Summary:</strong> {article.summary}</p>}
            {article.image && <img src={article.image} alt={article.headline} style={{ maxWidth: '100%', height: 'auto' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsTab; 