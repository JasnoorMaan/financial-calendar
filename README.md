# Bloomborg Terminal

> A financial analytics platform built with Next.js, TypeScript, and Framer Motion, featuring real-time market data, advanced trading metrics, and stunning interactive visualizations.

## Key Features

- **Real-Time Market Data**: Live financial data via Financial Modeling Prep API
- **Advanced Technical Analysis**: RSI, Moving Averages, Volatility, and custom metrics
- **Interactive Charts**: Professional-grade candlestick, volume, and technical indicator charts
- **Stunning Animations**: Industry-standard animations using Framer Motion
- **Responsive Design**: Seamless experience across all devices
- **High Performance**: Optimized with Next.js 14 and efficient data caching
- **Type Safety**: Full TypeScript implementation for robust development

## Financial Metrics & Analytics

### Trading Statistics

- **Win Rate**: Percentage of profitable trading days
- **Sharpe Ratio**: Risk-adjusted return measurement
- **Volatility Analysis**: Daily, weekly, and monthly price movements
- **Volume Analysis**: Trading volume patterns and trends
- **Drawdown Analysis**: Maximum peak-to-trough decline

### Technical Indicators

- **RSI (Relative Strength Index)**: Momentum oscillator (0-100 range)
- **Moving Averages**: 20-day simple moving averages
- **Price Volatility**: Intraday and historical volatility calculations
- **Volume Heatmaps**: Visual representation of trading activity

### Time-Based Analysis

- **Daily Metrics**: Day-by-day performance tracking
- **Weekly Performance**: 7-day rolling analysis
- **Monthly Trends**: Month-over-month comparisons
- **Custom Date Ranges**: Flexible analysis periods

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Financial Modeling Prep API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/bloomborg-terminal.git
cd bloomborg-terminal
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment setup**

```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_KEY=your_financial_modeling_prep_api_key" > .env.local
```

4. **Run development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Getting Started

1. **Enter Stock Symbol**: Type any valid ticker (AAPL, GOOGL, TSLA, etc.)
2. **Select Date Range**: Use the intuitive calendar interface
3. **Fetch Data**: Click "Fetch Data" to retrieve market information
4. **Explore Analytics**: Navigate through comprehensive dashboards

### Dashboard Features

- **Trading Overview**: Key performance metrics at a glance
- **Interactive Charts**: Zoom, pan, and analyze with professional tools
- **Metric Breakdowns**: Detailed daily, weekly, and monthly analysis
- **Company Ratings**: Analyst estimates and price targets
- **Volume Analysis**: Trading activity visualization

### Chart Types

- **Candlestick Charts**: OHLC price action visualization
- **Volume Charts**: Trading volume over time
- **Technical Indicators**: RSI, moving averages, and volatility
- **Heatmaps**: Volume intensity visualization

## Project Architecture

```
bloomborg-terminal/
├── 📁 app/
│   ├── 📁 api/                    # API routes and endpoints
│   │   └── 📁 financial-metrics/  # Financial data API
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── useAPI.ts             # Unified data fetching
│   │   ├── useDate.ts            # Date management
│   │   └── usePersistentState.ts # State persistence
│   ├── 📁 types/                  # TypeScript definitions
│   │   └── types.ts              # Core type definitions
│   ├── 📁 utils/                  # Utility functions
│   │   ├── Calculations.ts       # Financial calculations
│   │   ├── financials.ts         # Data processing
│   │   └── Storage.ts            # Local storage management
│   ├── 📁 home/                   # Landing page
│   └── 📁 terminal/               # Analytics dashboard
├── 📁 components/                 # React components
│   ├── 📁 ui/                     # Reusable UI components
│   ├── 📁 icons/                  # Icon components
│   ├── Dashboard.tsx             # Main dashboard
│   ├── Charts.tsx                # Chart components
│   ├── Hero.tsx                  # Landing hero section
│   └── [other components]        # Feature components
├── 📁 lib/                        # Shared libraries
└── 📁 public/                     # Static assets
```

## API Integration

### Data Sources

- **Financial Modeling Prep**: Primary data provider for market information
- **Real-time Updates**: Live market data integration
- **Caching Strategy**: Intelligent data caching for performance
- **Error Handling**: Robust error management and fallbacks

### API Endpoints

- `/api/financial-metrics`: Historical price data
- **External APIs**: Analyst estimates, company ratings, price targets
- **Rate Limiting**: Efficient API usage management

## Performance Optimizations

- **Next.js App Router**: Modern routing with enhanced performance
- **Static Generation**: Pre-built pages for faster loading
- **Code Splitting**: Automatic bundle optimization
- **Caching Strategy**: Intelligent data and asset caching

## Future Enhancements

- Real-time WebSocket data streams
- Mobile app development
- AI-powered market predictions
- Advanced portfolio management
- Multiple data source integration
- Email alerts and notifications

## Documentation

### Financial Metrics Explained

#### 1. Win Rate

**Definition**: The percentage of trading days with positive returns out of total trading days.
**Formula**: `Win Rate = (Number of Profitable Days / Total Trading Days) × 100`

#### 2. Sharpe Ratio

**Definition**: A risk-adjusted return measure that tells you how much extra return you get for the volatility (risk) you endure.
**Formula**: `Sharpe Ratio = (Average Daily Return / Daily Volatility) × √252`

**Interpretation**:

- `> 1.0`: Good risk-adjusted returns
- `> 2.0`: Very good
- `> 3.0`: Excellent
- `< 0`: Losing money relative to risk

#### 3. Daily Volatility

**Definition**: Measures how much the stock price fluctuates from day to day.

**A) Intraday Volatility (per day)**:

```typescript
const volatility = ((data.high - data.low) / data.open) * 100;
```

**B) Daily Return Volatility (across days)**:

```typescript
const volatility = Math.sqrt(
  dailyMetrics.reduce(
    (sum, day) => sum + Math.pow(day.return - avgDailyReturn, 2),
    0
  ) / dailyMetrics.length
);
```

#### 4. RSI (Relative Strength Index)

**Definition**: A momentum oscillator that measures the speed and change of price movements, ranging from 0 to 100.

**Formula**:

```
RS = Average Gain / Average Loss (over 14 days typically)
RSI = 100 - (100 / (1 + RS))
```

**Interpretation**:

- `RSI > 70`: Potentially overbought (sell signal)
- `RSI < 30`: Potentially oversold (buy signal)
- `RSI ≈ 50`: Neutral momentum

---

<div align="center">
  <sub>Built with ❤️ using Next.js, TypeScript, and Framer Motion and Lightweight Charts</sub>
</div>
