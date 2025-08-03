//Recieved from FMP
export interface RawData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}
//Calculated from RawData in financials.ts
export interface CalcedData extends RawData {
  volumeLevel: 'low' | 'medium' | 'high';
  volumePercentile: number;
  priceDirection: 'up' | 'down' | 'flat';
  volatility: number;
  volumeHeatmapColor: string; 
  volumeIntensity: number; 
}

export interface DateSelection {
  startDate: string | null;
  endDate: string | null;
  selectedDates: string[];
}

export interface APIstate<T = any> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface CalendarProps {
  onDateSelect: (day: number, month: number, year: number) => void;
  dateSelection: DateSelection;
  financialData: CalcedData[];
  showVisualizations: boolean;
}

// Enhanced Types for Dashboard
export interface AnalystEstimates {
  symbol: string;
  date: string;
  revenueLow: number;
  revenueHigh: number;
  revenueAvg: number;
  ebitdaLow: number;
  ebitdaHigh: number;
  ebitdaAvg: number;
  netIncomeLow: number;
  netIncomeHigh: number;
  netIncomeAvg: number;
  epsAvg: number;
  epsHigh: number;
  epsLow: number;
  numAnalystsRevenue: number;
  numAnalystsEps: number;
}

export interface CompanyRating {
  symbol: string;
  date?: string;
  rating: string;
  overallScore: number;
  discountedCashFlowScore: number;
  returnOnEquityScore: number;
  returnOnAssetsScore: number;
  debtToEquityScore: number;
  priceToEarningsScore: number;
  priceToBookScore: number;
}

export interface PriceTarget {
  symbol: string;
  targetHigh: number;
  targetLow: number;
  targetConsensus: number;
  targetMedian: number;
  analystRatingsStrongBuy: number;
  analystRatingsBuy: number;
  analystRatingsHold: number;
  analystRatingsSell: number;
  analystRatingsStrongSell: number;
}

export interface DailyMetrics {
  date: string;
  return: number;
  volatility: number;
  volume: number;
  rsi?: number;
  movingAvg?: number;
}

export interface WeeklyMetrics {
  weekStart: string;
  weekEnd: string;
  weeklyReturn: number;
  avgVolatility: number;
  totalVolume: number;
  highestPrice: number;
  lowestPrice: number;
  tradingDays: number;
}

export interface MonthlyMetrics {
  month: string;
  year: number;
  monthlyReturn: number;
  avgVolatility: number;
  totalVolume: number;
  highestPrice: number;
  lowestPrice: number;
  tradingDays: number;
  winRate: number;
}

export interface TradingStats {
  totalTradingDays: number;
  dateRange: { start: string; end: string };
  avgDailyVolume: number;
  totalVolume: number;
  priceRange: { min: number; max: number };
  totalReturn: number;
  avgDailyReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  bestDay: { date: string; return: number };
  worstDay: { date: string; return: number };
}