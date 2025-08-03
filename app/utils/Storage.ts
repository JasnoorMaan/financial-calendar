import type { CalcedData, AnalystEstimates, CompanyRating, PriceTarget } from '@/app/types/types';

// Unified storage interface for all financial data
interface FinDataStorage {
  // Query parameters
  symbol: string;
  startDate: string;
  endDate: string;
  lastFetched: number;
  
  // API Response data
  historicalData: CalcedData[];
  analystEstimates: AnalystEstimates[];
  companyRating: CompanyRating | null;
  priceTargets: PriceTarget | null;
  
  // Metadata
  apiCallsCount: number;
  fetchStatus: {
    historicalData: 'success' | 'error' | 'pending' | null;
    analystEstimates: 'success' | 'error' | 'pending' | null;
    companyRating: 'success' | 'error' | 'pending' | null;
    priceTargets: 'success' | 'error' | 'pending' | null;
  };
  errors: {
    historicalData?: string;
    analystEstimates?: string;
    companyRating?: string;
    priceTargets?: string;
  };
}

export class FinStorage {
  private static readonly STORAGE_KEY = 'financial-calendar-unified-data';
  private static readonly VERSION = '1.0.0';

  /**
   * Get stored financial data
   */
  static getData(): FinDataStorage | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      
      // Version check for future compatibility
      if (parsed.version !== this.VERSION) {
        console.warn('Storage version mismatch, clearing data');
        this.clearData();
        return null;
      }
      
      return parsed.data;
    } catch (error) {
      console.error('Error reading stored data:', error);
      return null;
    }
  }

  /**
   * Store complete financial data
   */
  static setData(data: FinDataStorage): void {
    try {
      const storageData = {
        version: this.VERSION,
        data,
        savedAt: Date.now()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData));
      console.log('💾 Financial data saved to localStorage');
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      // Handle quota exceeded or other storage errors
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, clearing old data');
        this.clearData();
      }
    }
  }

  /**
   * Update specific data field
   */
  static updateData(updates: Partial<FinDataStorage>): void {
    const current = this.getData();
    if (current) {
      this.setData({ ...current, ...updates });
    }
  }

  /**
   * Check if we have complete data for given parameters
   */
  static hasCompleteData(symbol: string, startDate: string, endDate: string): boolean {
    const data = this.getData();
    if (!data) return false;
    
    // Check if parameters match and all data sources have succeeded
    return (
      data.symbol === symbol &&
      data.startDate === startDate &&
      data.endDate === endDate &&
      data.fetchStatus.historicalData === 'success' &&
      data.historicalData.length > 0
    );
  }

  /**
   * Check if we have any data regardless of success status
   */
  static hasAnyData(): boolean {
    const data = this.getData();
    return data !== null;
  }

  /**
   * Get data freshness in minutes
   */
  static getDataAge(): number | null {
    const data = this.getData();
    if (!data) return null;
    
    return Math.floor((Date.now() - data.lastFetched) / (1000 * 60));
  }

  /**
   * Clear all stored data
   */
  static clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('🗑️ Cleared all financial data from localStorage');
  }

  /**
   * Initialize empty data structure
   */
  static initializeData(symbol: string, startDate: string, endDate: string): FinDataStorage {
    return {
      symbol,
      startDate,
      endDate,
      lastFetched: Date.now(),
      historicalData: [],
      analystEstimates: [],
      companyRating: null,
      priceTargets: null,
      apiCallsCount: 0,
      fetchStatus: {
        historicalData: null,
        analystEstimates: null,
        companyRating: null,
        priceTargets: null,
      },
      errors: {}
    };
  }

  /**
   * Get statistics about stored data
   */
  static getStats() {
    const data = this.getData();
    if (!data) {
      return {
        hasData: false,
        dataAge: null,
        apiCallsCount: 0,
        completedCalls: 0,
        totalSize: 0
      };
    }

    const completedCalls = Object.values(data.fetchStatus).filter(status => status === 'success').length;
    const totalSize = JSON.stringify(data).length;

    return {
      hasData: true,
      dataAge: this.getDataAge(),
      apiCallsCount: data.apiCallsCount,
      completedCalls,
      totalCalls: 4, // Historical, estimates, rating, targets
      totalSize,
      symbol: data.symbol,
      dateRange: `${data.startDate} to ${data.endDate}`
    };
  }
} 