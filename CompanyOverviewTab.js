import React, { useEffect, useState } from 'react';

function CompanyOverviewTab({ ticker }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticker) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetch(`/api/stock/${ticker}/overview`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch overview data.');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ticker]);

  if (loading) return <p>Loading overview data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!data) return <p>No overview data available.</p>;

  return (
    <div className="company-overview">
      <h3>Company Overview</h3>
      {Object.entries(data).map(([source, sourceData]) => (
        <div key={source} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h4>Data from {source}</h4>
          {sourceData && !sourceData.error && !sourceData.message ? (
            Object.entries(sourceData).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value !== null && value !== undefined ? value.toString() : 'N/A'}</p>
            ))
          ) : sourceData && sourceData.error ? (
             <p style={{ color: 'red' }}>Error fetching data from {source}: {sourceData.error}</p>
          ) : sourceData && sourceData.message ? (
             <p style={{ color: 'orange' }}>{source}: {sourceData.message}</p>
          ) : (
             <p>No data from {source}.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CompanyOverviewTab; 