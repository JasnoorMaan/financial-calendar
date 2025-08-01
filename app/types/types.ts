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