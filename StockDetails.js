import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styles for react-tabs
import CompanyOverviewTab from './CompanyOverviewTab';
import GrowthMetricsTab from './GrowthMetricsTab';
import NewsTab from './NewsTab'; // Import the new NewsTab component
import FinancialsTab from './FinancialsTab'; // Import the new FinancialsTab component
// Import other tab components as they are created

function StockDetails({ ticker }) {
  const [tabIndex, setTabIndex] = useState(0);

  if (!ticker) {
    return <p>Select a stock to see details.</p>;
  }

  return (
    <div className="stock-details-container">
      <h2>{ticker} Details</h2>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Growth Metrics</Tab>
          <Tab>News</Tab>
          <Tab>Financials</Tab>
          {/* Add other tab buttons as needed */}
        </TabList>

        <TabPanel>
          <CompanyOverviewTab ticker={ticker} />
        </TabPanel>
        <TabPanel>
          <GrowthMetricsTab ticker={ticker} tabIndex={tabIndex} />
        </TabPanel>
        <TabPanel>
          <NewsTab ticker={ticker} />
        </TabPanel>
        <TabPanel>
          <FinancialsTab ticker={ticker} />
        </TabPanel>
        {/* Add more TabPanels here matching the order of TabList */}
      </Tabs>
    </div>
  );
}

export default StockDetails; 