Okay, this is an excellent refinement of the app's purpose. The core idea is to empower users by providing comprehensive data from multiple trusted sources, allowing *them* to form their own insights. The AI's role shifts from a "concluder" to a "synthesizer" of the displayed information, strictly within the bounds of the chosen financial sites.

Here's the edited Implementation Plan:

```markdown
# Stock Researcher Tool - Multi-Source Implementation Plan

This document outlines the step-by-step instructions for implementing the base functionality of the Stock Researcher Tool. The tool's primary purpose is to display comprehensive stock information from multiple trusted financial data providers, enabling users to draw their own conclusions. Each step includes a test to validate its correct implementation.

**Assumed Financial Data Sources (Examples - to be finalized):**
For this plan, we will assume the use of the following four sources (or similar, based on API availability, terms, and data coverage):
1.  **Source A:** yfinance (Python library for Yahoo Finance data)
2.  **Source B:** Alpha Vantage API
3.  **Source C:** IEX Cloud API
4.  **Source D:** Finnhub API

## Phase 0: Project Setup & Data Source Configuration

**Objective:** Establish foundational backend and frontend projects, and configure access to the multiple financial data APIs.

---

**Step 0.1: Define and Configure Data Source APIs (Backend)**
*   **Instruction:**
    *   Finalize the list of 4 chosen financial data APIs (e.g., yfinance, Alpha Vantage, IEX Cloud, Finnhub).
    *   For each API requiring an authentication key/token, add its placeholder to the `.env` file in the backend project (e.g., `ALPHA_VANTAGE_API_KEY`, `IEX_CLOUD_API_KEY`, `FINNHUB_API_KEY`).
    *   Install necessary Python client libraries for these APIs in the backend virtual environment (e.g., `pip install yfinance alpha_vantage iexfinance finnhub-python`).
*   **Test:** Create a temporary Python test script in the backend project. This script should attempt to make a basic API call (e.g., fetch current price for "AAPL") to *each* of the 4 configured sources using their respective keys/libraries. Print the results to the console. Verify successful connection and data retrieval (even if minimal) from all four sources. Remove the test script afterward.

---

## Phase 1: Basic Project Structure (No Change from Original Plan)

**Objective:** Establish the foundational backend and frontend projects and ensure basic communication.

---

**Step 1.1: Initialize Backend Flask Project**
*   **Instruction:** Create a new Python project directory. Inside it, set up a virtual environment. Install Flask (`pip install Flask`). Create a main application file (e.g., `app.py`).
*   **Test:** Activate the virtual environment and run `flask --version`. Verify that Flask is installed and the version is displayed.

**Step 1.2: Create Basic "Hello World" API Endpoint**
*   **Instruction:** In `app.py`, define a simple Flask route (e.g., `/api/health`) that returns a JSON response like `{"status": "healthy", "message": "Backend is running"}`.
*   **Test:** Run the Flask development server. Open a web browser or use a tool like `curl` to navigate to `http://127.0.0.1:5000/api/health`. Verify that the JSON response is displayed correctly.

**Step 1.3: Configure Environment Variables for API Keys (Expanded)**
*   **Instruction:** Ensure the `.env` file (from Step 0.1) is in the root of the backend project and includes placeholders for all 4 financial data source API keys and the `GEMINI_API_KEY`. Ensure `.env` is in `.gitignore`. Install `python-dotenv` (`pip install python-dotenv`). Load these variables in `app.py` at startup.
*   **Test:** Add a temporary print statement in `app.py` to output the loaded API keys (e.g., `print(os.getenv("ALPHA_VANTAGE_API_KEY"))`). Run the Flask app and verify that the placeholder values are printed. Remove the print statement.

**Step 1.4: Initialize Frontend React Project**
*   **Instruction:** Using Node.js and npm/yarn, create a new React application (e.g., `npx create-react-app frontend`). Navigate into the `frontend` directory.
*   **Test:** Run `npm start` (or `yarn start`) in the `frontend` directory. Verify that the default React application loads in the browser at `http://localhost:3000`.

**Step 1.5: Create Basic Frontend Layout Structure**
*   **Instruction:** In the React project's `src` directory (e.g., in `App.js`), modify the main component to include placeholder elements for a header, a main content area, and a footer.
*   **Test:** View the application in the browser. Verify that the basic header, an empty main content area, and footer placeholders are visible.

**Step 1.6: Set Up Frontend to Backend Communication**
*   **Instruction:** In a React component (e.g., `App.js`), use `fetch` or `axios` to make a GET request to the backend's `/api/health` endpoint when the component mounts. Display the `message` from the response. Configure proxy in `frontend/package.json`.
*   **Test:** Ensure the Flask backend server is running. Start the React frontend. Verify that the message "Backend is running" is displayed. Check the browser's developer console for errors.

---

## Phase 2: Stock Search Functionality (Adapted for Multi-Source Decision)

**Objective:** Implement stock search. For the base, one primary source will be used for symbol lookup, though this can be expanded later.

---

**Step 2.1: Create Search Input Component in Frontend** (No Change)
*   **Instruction:** Create `StockSearch.js` component with an input field and search button. Include in `App.js`.
*   **Test:** Verify search input and button are displayed.

**Step 2.2: Implement Frontend Logic to Capture User Input** (No Change)
*   **Instruction:** Use React state in `StockSearch.js` to store search input value.
*   **Test:** Use React Developer Tools to verify state updates correctly.

**Step 2.3: Create Backend API Endpoint for Stock Search** (No Change)
*   **Instruction:** In `app.py`, define `/api/search/`. Initially, return the received query.
*   **Test:** Call `/api/search/AAPL`. Verify response `{"query_received": "AAPL"}`.

**Step 2.4: Integrate Primary Financial API for Stock Search (Backend)**
*   **Instruction:** Modify `/api/search/`. Choose *one* of the 4 configured financial APIs that provides robust symbol/name lookup (e.g., Alpha Vantage's symbol search). Use its API key to make the request. Return a list of matching stocks from this primary source.
*   **Test:** Ensure the chosen API key is correctly set. Restart Flask. Call `/api/search/Apple`. Verify a list of stocks related to "Apple" from the chosen API is returned.

**Step 2.5: Implement Basic Error Handling for Chosen Search API Call (Backend)** (No Change, applies to chosen API)
*   **Instruction:** Add `try-except` for the chosen API call. Return error messages/status codes.
*   **Test:** Use an invalid API key for the chosen search API. Call backend. Verify error message and status code.

**Step 2.6: Call Backend Search Endpoint from Frontend** (No Change)
*   **Instruction:** In `StockSearch.js`, on search, call `/api/search/`.
*   **Test:** Enter "MSFT", click search. Check browser network tab for request/response.

**Step 2.7: Display Search Results in Frontend** (No Change)
*   **Instruction:** Store and render search results (company name, ticker) from the backend in `StockSearch.js`.
*   **Test:** Search "Meta". Verify matching stocks are displayed.

**Step 2.8: Handle "Stock Not Found" Scenario in Frontend** (No Change)
*   **Instruction:** If backend returns empty or "not found", display "No stocks found".
*   **Test:** Search "XYZXYZ123". Verify "No stocks found" message.

---

## Phase 3: Stock Details Display - Company Overview Tab (Multi-Source)

**Objective:** Display company information from all 4 configured financial data sources.

---

**Step 3.1: Create Backend API Endpoint for Multi-Source Company Overview**
*   **Instruction:** In `app.py`, define `/api/stock//overview`. This endpoint will accept a stock ticker.
*   **Instruction (Data Fetching):** For the given ticker, make separate API calls to *each of the 4 configured financial data sources* to fetch their company profile/overview information.
*   **Test:** Call `/api/stock/AAPL/overview`. In the backend (using print statements for now), verify that attempts are made to fetch data from all 4 sources and that at least some data (or error messages if a source fails) is retrieved from each.

**Step 3.2: Consolidate and Structure Multi-Source Overview Data (Backend)**
*   **Instruction:** Modify `/api/stock//overview`. For each source, extract key fields (e.g., Company Name, Ticker, Exchange, Industry, Sector, Description). Return a JSON object structured to clearly delineate data from each source, e.g., `{"sourceA_overview": {...}, "sourceB_overview": {...}, ...}`. Handle cases where a source might not have data or an API call fails for one source without failing the entire endpoint.
*   **Test:** Call `/api/stock/AAPL/overview`. Verify the JSON response contains structured overview data from each of the 4 sources (or indicates if a source had no data/failed).

**Step 3.3: Create "Company Overview" Tab and Main Stock Display Area (Frontend)** (No Change from original intention)
*   **Instruction:** Create `StockDetails.js` to manage tabs. Create `CompanyOverviewTab.js`. Render `StockDetails.js` on stock selection.
*   **Test:** Click a stock. Verify `StockDetails` loads, "Company Overview" tab active with placeholder.

**Step 3.4: Fetch and Display Multi-Source Company Overview Data (Frontend)**
*   **Instruction:** In `CompanyOverviewTab.js` (or `StockDetails.js`), call `/api/stock//overview`. Display the fetched data, clearly attributing information to its respective source (e.g., "Data from Alpha Vantage: Name - Apple Inc., Industry - Technology...").
*   **Test:** Select "AAPL". Verify Company Overview tab displays information from each of the 4 sources, with clear attribution.

**Step 3.5: Ensure Clear Presentation of Multi-Source Data (Frontend)**
*   **Instruction:** Apply styling to ensure data from different sources is distinct, legible, and well-organized. Perhaps use subheadings for each source.
*   **Test:** View Company Overview. Confirm information from different sources is clearly separated and readable.

---

## Phase 4: Stock Details Display - Growth Metrics Tab (Multi-Source Data, Single Chart Focus)

**Objective:** Display a historical stock price chart, primarily from one source, but acknowledge others. Data from all sources will be used by the AI.

---

**Step 4.1: Create Backend API Endpoint for Multi-Source Historical Price Data**
*   **Instruction:** In `app.py`, define `/api/stock//price-history`. Fetch historical daily stock price data (e.g., last 1 year) from *each of the 4 configured financial data sources*.
*   **Test:** Call `/api/stock/AAPL/price-history`. Backend print statements should confirm attempts to fetch price data from all 4 sources.

**Step 4.2: Structure Multi-Source Price Data (Backend)**
*   **Instruction:** Modify `/api/stock//price-history`. Return a JSON object containing price history arrays from each source, e.g., `{"sourceA_prices": [...], "sourceB_prices": [...], ...}`.
*   **Test:** Call `/api/stock/AAPL/price-history`. Verify JSON response includes price data arrays from each source.

**Step 4.3: Create "Growth Metrics" Tab Component & Integrate Chart.js (Frontend)** (No Change from original instruction for Chart.js setup)
*   **Instruction:** Create `GrowthMetricsTab.js`. Install and import `chart.js` and `react-chartjs-2`.
*   **Test:** Create a simple static bar chart in `GrowthMetricsTab.js` to verify Chart.js setup.

**Step 4.4: Fetch Multi-Source Historical Price Data in Growth Metrics Tab (Frontend)**
*   **Instruction:** In `GrowthMetricsTab.js`, call `/api/stock//price-history`.
*   **Test:** Select stock, go to "Growth Metrics" tab. Check network tab for request and multi-source price data.

**Step 4.5: Display Historical Stock Price Chart (Frontend - Primary Source for Chart)**
*   **Instruction:** From the multi-source price data, select *one primary source* (e.g., yfinance or Alpha Vantage) to render the main line chart using Chart.js (X-axis: dates, Y-axis: closing prices). Add a label indicating the source of the displayed chart (e.g., "Price chart from yfinance").
*   **Test:** Select "AAPL". Verify a line chart of Apple's price history (from the chosen primary source) is rendered, with correct source attribution.

---

## Phase 5: Stock Details Display - News Tab (Multi-Source Focus)

**Objective:** Display recent news articles, prioritizing news from the 4 chosen financial sites or directly via their APIs if available.

---

**Step 5.1: Create Backend API Endpoint for Stock News (Multi-Source Strategy)**
*   **Instruction:** In `app.py`, define `/api/stock//news`.
    *   **Strategy 1 (Preferred):** Check if the 4 chosen financial data APIs (Alpha Vantage, IEX Cloud, Finnhub, etc.) offer direct news endpoints for the stock. Fetch news from these.
    *   **Strategy 2 (Fallback/Supplement):** If direct news from chosen financial APIs is insufficient or unavailable, use a general news API (e.g., NewsAPI.org, MarketAux - requires its own API key in `.env`).
*   **Test:** Call `/api/stock/TSLA/news`. Backend logs should show attempts to get news via the chosen strategy.

**Step 5.2: Aggregate and Structure News Data (Backend)**
*   **Instruction:**
    *   If using Strategy 1, aggregate news items from the financial APIs, ensuring fields like Headline, Source (clearly indicating which of the 4 sites it came from), Publication Date, and a Brief Summary/URL.
    *   If using Strategy 2, fetch news and attempt to filter/prioritize articles whose domain matches one of the 4 chosen financial sites. If not possible, show general financial news but clearly label the original source.
    *   Return a list of news articles.
*   **Test:** Call `/api/stock/TSLA/news`. Verify a list of news articles is returned, with sources clearly identified. If Strategy 2 is used, check if any filtering/prioritization for the 4 target sites is evident (if applicable data exists).

**Step 5.3: Create "News" Tab Component (Frontend)** (No Change)
*   **Instruction:** Create `NewsTab.js`. Integrate into `StockDetails.js`.
*   **Test:** Select stock. Click "News" tab. Verify activation and placeholder.

**Step 5.4: Fetch and Display News Articles (Frontend)**
*   **Instruction:** In `NewsTab.js`, call `/api/stock//news`. Render the list, displaying headline, original source (e.g., "From Alpha Vantage News" or "From Reuters via NewsAPI"), date, and summary.
*   **Test:** Select "MSFT", go to "News" tab. Verify news list with clear source attribution.

---

## Phase 6: Stock Details Display - Financial Statements & Ratios Tab (Multi-Source Summary)

**Objective:** Display a summary of key financial data and ratios from all 4 configured sources.

---

**Step 6.1: Create Backend API Endpoint for Multi-Source Financial Summary**
*   **Instruction:** In `app.py`, define `/api/stock//financial-summary`. Fetch key line items (e.g., Total Revenue, Net Income - latest period) and crucial ratios (e.g., P/E) from *each of the 4 configured financial data sources*.
*   **Test:** Call `/api/stock/GOOGL/financial-summary`. Backend logs confirm fetching from all 4 sources.

**Step 6.2: Extract and Format Multi-Source Financial Summary Data (Backend)**
*   **Instruction:** Process data from each source. Return a JSON object structured by source, e.g., `{"sourceA_financials": {"revenue": ..., "peRatio": ...}, "sourceB_financials": ...}`.
*   **Test:** Call `/api/stock/GOOGL/financial-summary`. Confirm structured JSON with financial data attributed to each source.

**Step 6.3: Create "Financials & Ratios" Tab Component (Frontend)** (No Change)
*   **Instruction:** Create `FinancialsTab.js`. Integrate into `StockDetails.js`.
*   **Test:** Select stock. Click "Financials & Ratios" tab. Verify activation and placeholder.

**Step 6.4: Fetch and Display Multi-Source Financial Summary (Frontend)**
*   **Instruction:** In `FinancialsTab.js`, call `/api/stock//financial-summary`. Display data clearly, grouped by source (e.g., "Source A: Revenue: $X, P/E: Z", "Source B: Revenue: $Y, P/E: W").
*   **Test:** Select "AMZN". Go to "Financials & Ratios". Verify key financials/ratios displayed per source.

**Step 6.5: Implement Basic Tooltips for Financial Terms (Frontend)** (No Change)
*   **Instruction:** For terms like "P/E Ratio", implement simple tooltips explaining them (US-010).
*   **Test:** Hover over "P/E Ratio". Verify tooltip appears.

---

## Phase 7: AI-Generated Summary (Synthesizing Multi-Source Data, Domain-Restricted)

**Objective:** Generate an AI summary that synthesizes information *displayed from the 4 chosen financial sites*. The AI does not conclude but provides a consolidated overview of presented facts. Its web search capabilities (if used) must be restricted to these sites.

---

**Step 7.1: Create Backend API Endpoint for AI Summary** (No Change in endpoint definition)
*   **Instruction:** In `app.py`, define `/api/stock//ai-summary`.
*   **Test:** Call `/api/stock/AAPL/ai-summary` with a dummy response initially. Verify endpoint works.

**Step 7.2: Gather Multi-Source Data for AI Prompt (Backend)**
*   **Instruction:** Within `/ai-summary`, invoke the backend logic used by the Overview, Growth Metrics (all sources' price data), News, and Financials tabs to gather the structured data from *all 4 financial sources* for the given ticker. This is the primary context for the LLM.
*   **Test:** Add print statements to output the comprehensive multi-source data package assembled for the prompt. Call endpoint and verify.

**Step 7.3: Construct Prompt for Gemini API (Emphasizing Synthesis and Source Constraint)**
*   **Instruction:** Create a prompt template. Example:
    "You are an assistant that synthesizes financial data. Based *only* on the following information provided from Source A ([Name of Source A]), Source B ([Name of Source B]), Source C ([Name of Source C]), and Source D ([Name of Source D]), generate a concise summary for [Company Name] ([Ticker]).
    Data from Source A: [Data from Source A for overview, price trend, news, financials]
    Data from Source B: [Data from Source B for overview, price trend, news, financials]
    ...and so on for Source C and D.
    Your summary should highlight key factual data points presented from these sources. Do not offer investment advice, opinions, or conclusions beyond what is explicitly stated in the provided data. If data points conflict between sources, you may note this neutrally. The purpose is to provide a consolidated factual overview of the presented data. If you need to clarify terms or find related news *only use information retrievable from the websites of Source A, Source B, Source C, or Source D.*"
    Populate this prompt.
*   **Test:** Print the fully constructed prompt. Verify it's detailed, attributes data to sources, and includes the restrictive instructions.

**Step 7.4: Implement Domain-Restricted Web Search for LLM Context (Backend - If Necessary)**
*   **Instruction:**
    *   Determine if Gemini 2.5 Pro Preview (05-06) API supports direct domain restriction for its web search tool.
    *   **If YES:** Configure the API call to Gemini to use its web search tool, restricting it to the domains of the 4 chosen financial sites.
    *   **If NO (or for more control):** Before calling Gemini, if the prompt implies a need for external context (e.g., "latest news impact from these sites"), the backend must:
        1.  Programmatically perform web searches using a search API (like Google Custom Search API, or a library that wraps search engines and allows domain filtering) *strictly limited* to the domains of the 4 chosen financial sites (e.g., `site:finance.yahoo.com OR site:alphavantage.co OR ... `).
        2.  Collect snippets from these restricted searches.
        3.  Include these snippets as additional context within the prompt to Gemini.
*   **Test:**
    *   If Gemini supports direct restriction, test by crafting a prompt that would normally trigger a broad search and verify (if possible through logs or output) it only considered the allowed domains.
    *   If backend performs search: Simulate a query. Verify backend logs show search queries with correct `site:` restrictions. Check that only results from allowed domains are passed to LLM.

**Step 7.5: Integrate Gemini API for Summary Generation (Backend)**
*   **Instruction:** Use `GEMINI_API_KEY` and Google AI SDK to send the comprehensive, multi-source prompt (and any domain-restricted web search results from Step 7.4) to Gemini 2.5 Pro Preview (05-06). Return the generated text.
*   **Test:** Ensure `GEMINI_API_KEY` is valid. Call `/api/stock/NVDA/ai-summary`. Verify a text summary is returned that reflects the synthesis task and ideally mentions data points from different sources.

**Step 7.6: Implement Basic Error Handling for Gemini API Call (Backend)** (No Change)
*   **Instruction:** Add `try-except` for Gemini API call.
*   **Test:** Use invalid Gemini key. Verify error message.

**Step 7.7: Create AI Summary Display Section (Frontend)** (No Change)
*   **Instruction:** Add section in `StockDetails.js` (or `AISummary.js`) for AI summary and a "Generate AI Summary" button.
*   **Test:** Verify button and placeholder area are visible.

**Step 7.8: Fetch AI Summary from Backend & Display with Disclaimer (Frontend)**
*   **Instruction:** On button click, call `/api/stock//ai-summary`. Display loading state. Display summary text. **Crucially, add a disclaimer**: "This AI-generated summary synthesizes information from [Site A Name], [Site B Name], [Site C Name], and [Site D Name]. It is for informational purposes only. Users should refer to the detailed data and draw their own conclusions."
*   **Test:** For "MSFT", click "Generate AI Summary". Verify loading, then AI summary, and the mandatory disclaimer is clearly visible.

---
**End of Revised Implementation Plan**
---
```

