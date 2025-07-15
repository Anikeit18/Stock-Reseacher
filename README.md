# Stock Researcher

A multi-source stock analysis platform that aggregates company data, financials, growth metrics, and news, with AI-assisted summarization. Designed for beginner to intermediate investors.

## Features

* **Stock Search**: Search by name or ticker and fetch data from multiple financial APIs (e.g., yfinance, Alpha Vantage, Finnhub).
* **Company Overview**: Aggregated company profile from trusted data sources.
* **Growth Metrics**: Interactive price charts with historical data and technical indicators.
* **News Tab**: Latest stock-related news articles with source attribution.
* **Financials Tab**: Key financial statements and ratios with both summary and detailed views.
* **AI Summary**: Synthesizes information from all tabs using Gemini API to provide a non-opinionated, factual summary.

## Tech Stack

* **Frontend**: React, Chart.js
* **Backend**: Python (Flask)
* **APIs**: yfinance, Alpha Vantage, Finnhub, MarketAux
* **AI Integration**: Gemini 2.5 Pro (Google)
* **Deployment**: Heroku or Vercel (optional Docker/Kubernetes for scaling)

## Project Status

* Backend and frontend integration complete
* Company Overview, Growth Metrics, News, and Financials tabs functional
* Multi-source data fetching operational
* AI summary module scaffolded, prompt structure defined

## Getting Started

1. Clone the repository
2. Set up backend: Python environment, Flask, API keys in `.env`
3. Set up frontend: React app with proxy to Flask backend
4. Run both servers and start exploring stocks

## Future Work

* Full financial statements display (multi-period)
* Downloadable CSV reports
* Real-time alerts and sentiment analysis

