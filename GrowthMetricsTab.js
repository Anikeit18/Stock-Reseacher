import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function GrowthMetricsTab({ ticker, tabIndex }) {
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Only fetch data when the tab becomes active
  useEffect(() => {
    if (!ticker || tabIndex !== 1) return; // Fetch only if ticker is available AND tabIndex is 1 (Growth Metrics)

    setLoading(true);
    setError(null);
    setHistoricalData(null);
    setChartData(null); // Clear previous chart data
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetch historical price data from the backend
    const fetchData = async () => {
      // No need to set loading/error here, already set at the start of the effect
      
      try {
        const response = await fetch(`/api/stock/${ticker}/price-history`, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data real:", data);
        setHistoricalData(data);

        // Process yfinance data for the chart (primary source)
        if (data && data.yfinance && Array.isArray(data.yfinance)) {
          const yfinanceData = data.yfinance.map(item => ({
            date: item.Date,
            price: item.Close
          }));

          // Sort data by date if necessary (yfinance usually provides it sorted)
          // yfinanceData.sort((a, b) => new Date(a.date) - new Date(b.date));

          setChartData({
            labels: yfinanceData.map(item => item.date),
            datasets: [
              {
                label: `${ticker} Closing Price (yfinance)`,
                data: yfinanceData.map(item => item.price),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                pointRadius: 0
              },
            ],
          });
        }
        
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [ticker, tabIndex]); // Re-run effect when ticker OR tabIndex changes

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${ticker} Stock Price History`,
      },
      tooltip: {
         mode: 'index',
         intersect: false,
      }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Date'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Price'
            }
        }
    }
  };

  // Conditionally render content only when the tab is active
  if (tabIndex !== 1) {
    return <p>Switch to Growth Metrics tab to view data.</p>;
  }

  if (loading) return <p>Loading growth metrics...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!historicalData) return <p>No growth metrics data available.</p>;

  return (
    <div className="growth-metrics">
      <h3>Growth Metrics (Historical Price Data)</h3>

      {chartData ? (
        <div style={{ width: '100%', height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
            <p style={{textAlign: 'center', fontSize: '0.9em', color: '#555'}}>Price chart data from yfinance.</p>
        </div>
      ) : (
          <p>Processing data for chart...</p>
      )}

      <div style={{ marginTop: '2rem' }}>
           <h4>Data Fetch Status by Source:</h4>
           {Object.entries(historicalData).map(([source, data]) => (
              <div key={source} style={{ marginBottom: '0.5rem'}}>
                  <strong>{source}:</strong>
                  {data && !data.error && !data.message ? (
                      <span style={{ color: 'green' }}> {Array.isArray(data) ? `${data.length} data points available.` : 'Data fetched.'}</span>
                  ) : data && data.error ? (
                      <span style={{ color: 'red' }}> Error: {data.error}</span>
                  ) : data && data.message ? (
                       <span style={{ color: 'orange' }}> Message: {data.message}</span>
                  ): (
                      <span style={{ color: 'gray' }}> No data or status available.</span>
                  )}
              </div>
          ))}
      </div>

    </div>
  );
}

export default GrowthMetricsTab;
