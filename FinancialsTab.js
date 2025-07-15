import React, { useEffect, useState } from 'react';

function FinancialsTab({ ticker }) {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticker) return;

    setLoading(true);
    setError(null);

    // TODO: Fetch financial data from backend endpoint /api/stock/<ticker>/financials
    // Replace with actual fetch call when backend is ready
    console.log(`Fetching financial data for ${ticker}...`);

    // Placeholder for now
    setTimeout(() => {
      setFinancialData({ message: "Financial data fetching is not yet implemented." });
      setLoading(false);
    }, 1000);

  }, [ticker]);

  if (loading) return <p>Loading financial metrics...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!financialData) return <p>No financial metrics data available.</p>;

  return (
    <div className="financials-metrics">
      <h3>Financial Metrics and Ratios</h3>
      {/* TODO: Render financial data here */}
      <p>{financialData.message}</p>
    </div>
  );
}

export default FinancialsTab; 