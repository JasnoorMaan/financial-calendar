import { useState, useCallback, useEffect } from 'react';
import type { CalcedData, AnalystEstimates, CompanyRating, PriceTarget, RawData } from '@/app/types/types';
import { FinStorage } from '@/app/utils/Storage';
import { FinancialUtils } from '@/app/utils/financials';

interface FetchParams {
  symbol: string;
  startDate: string;
  endDate: string;
}

interface UnifiedDataState {
  // Data
  historicalData: CalcedData[];
  analystEstimates: AnalystEstimates[];
  companyRating: CompanyRating | null;
  priceTargets: PriceTarget | null;
  
  // State
  loading: boolean;
  error: string | null;
  
  // Metadata
  hasStoredData: boolean;
  dataAge: number | null;
  apiCallsCount: number;
  completedCalls: number;
}

const DEFAULT_STATE: UnifiedDataState = {
  historicalData: [],
  analystEstimates: [],
  companyRating: null,
  priceTargets: null,
  loading: false,
  error: null,
  hasStoredData: false,
  dataAge: null,
  apiCallsCount: 0,
  completedCalls: 0,
};

export const useUnifiedFinancialData = () => {
  const [state, setState] = useState<UnifiedDataState>(DEFAULT_STATE);

  // Load stored data on mount
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = useCallback(() => {
    const storedData = FinStorage.getData();
    const stats = FinStorage.getStats();
    
    if (storedData) {
      setState(prev => ({
        ...prev,
        historicalData: storedData.historicalData,
        analystEstimates: storedData.analystEstimates,
        companyRating: storedData.companyRating,
        priceTargets: storedData.priceTargets,
        hasStoredData: true,
        dataAge: stats.dataAge,
        apiCallsCount: stats.apiCallsCount,
        completedCalls: stats.completedCalls,
      }));
    } else {
      setState(prev => ({
        ...prev,
        hasStoredData: false,
        dataAge: null,
        apiCallsCount: 0,
        completedCalls: 0,
      }));
    }
  }, []);

  /**
   * Fetch all financial data in parallel
   */
  const fetchAllData = useCallback(async ({ symbol, startDate, endDate }: FetchParams) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    // Initialize storage structure
    let dataStorage = FinStorage.initializeData(symbol, startDate, endDate);
    FinStorage.setData(dataStorage);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'krpO612s7B8fqC7YxzLi0dSsTQhZU3K8';
      
      // Create all API call promises
      const apiCalls = [
        fetchHistoricalData(symbol, startDate, endDate),
        fetchAnalystEstimates(symbol, API_KEY),
        fetchCompanyRating(symbol, API_KEY),
        fetchPriceTargets(symbol, API_KEY),
      ];

      console.log(`🚀 Starting batch fetch for ${symbol} (${startDate} to ${endDate})`);
      
      // Execute all API calls in parallel
      const [historicalData, analystEstimates, companyRating, priceTargets] = await Promise.allSettled(apiCalls);

      // Process results and update storage
      dataStorage = FinStorage.getData() || dataStorage;
      let successCount = 0;
      let hasErrors = false;
      const errors: string[] = [];

      // Process historical data
      if (historicalData.status === 'fulfilled') {
        dataStorage.historicalData = historicalData.value as CalcedData[];
        dataStorage.fetchStatus.historicalData = 'success';
        successCount++;
      } else {
        dataStorage.fetchStatus.historicalData = 'error';
        dataStorage.errors.historicalData = historicalData.reason?.message || 'Failed to fetch historical data';
        errors.push(`Historical data: ${dataStorage.errors.historicalData}`);
        hasErrors = true;
      }

      // Process analyst estimates
      if (analystEstimates.status === 'fulfilled') {
        dataStorage.analystEstimates = analystEstimates.value as AnalystEstimates[];
        dataStorage.fetchStatus.analystEstimates = 'success';
        successCount++;
      } else {
        dataStorage.fetchStatus.analystEstimates = 'error';
        dataStorage.errors.analystEstimates = analystEstimates.reason?.message || 'Failed to fetch analyst estimates';
        errors.push(`Analyst estimates: ${dataStorage.errors.analystEstimates}`);
      }

      // Process company rating
      if (companyRating.status === 'fulfilled') {
        dataStorage.companyRating = companyRating.value as CompanyRating | null;
        dataStorage.fetchStatus.companyRating = 'success';
        successCount++;
      } else {
        dataStorage.fetchStatus.companyRating = 'error';
        dataStorage.errors.companyRating = companyRating.reason?.message || 'Failed to fetch company rating';
        errors.push(`Company rating: ${dataStorage.errors.companyRating}`);
      }

      // Process price targets
      if (priceTargets.status === 'fulfilled') {
        dataStorage.priceTargets = priceTargets.value as PriceTarget | null;
        dataStorage.fetchStatus.priceTargets = 'success';
        successCount++;
      } else {
        dataStorage.fetchStatus.priceTargets = 'error';
        dataStorage.errors.priceTargets = priceTargets.reason?.message || 'Failed to fetch price targets';
        errors.push(`Price targets: ${dataStorage.errors.priceTargets}`);
      }

      // Update API call count
      dataStorage.apiCallsCount = 4;
      dataStorage.lastFetched = Date.now();

      // Save updated data
      FinStorage.setData(dataStorage);

      // Update component state
      setState(prev => ({
        ...prev,
        historicalData: dataStorage.historicalData,
        analystEstimates: dataStorage.analystEstimates,
        companyRating: dataStorage.companyRating,
        priceTargets: dataStorage.priceTargets,
        loading: false,
        error: hasErrors ? (
          historicalData.status === 'rejected' 
            ? `Critical error: ${dataStorage.errors.historicalData}` 
            : `Some data unavailable: ${errors.join(', ')}`
        ) : null,
        hasStoredData: true,
        dataAge: 0,
        apiCallsCount: 4,
        completedCalls: successCount,
      }));

      console.log(`✅ Batch fetch complete: ${successCount}/4 successful`);
      
      // Throw error only if historical data failed (critical)
      if (historicalData.status === 'rejected') {
        throw new Error(dataStorage.errors.historicalData);
      }

      return {
        historicalData: dataStorage.historicalData,
        analystEstimates: dataStorage.analystEstimates,
        companyRating: dataStorage.companyRating,
        priceTargets: dataStorage.priceTargets,
        successCount,
        totalCalls: 4
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch financial data';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));

      throw error;
    }
  }, []);

  /**
   * Clear all data
   */
  const clearData = useCallback(() => {
    FinStorage.clearData();
    setState(DEFAULT_STATE);
  }, []);

  /**
   * Refresh data from storage
   */
  const refreshFromStorage = useCallback(() => {
    loadStoredData();
  }, [loadStoredData]);

  return {
    ...state,
    fetchAllData,
    clearData,
    refreshFromStorage,
    hasCompleteData: (symbol: string, startDate: string, endDate: string) => 
      FinStorage.hasCompleteData(symbol, startDate, endDate),
    getStorageStats: () => FinStorage.getStats(),
  };
};

// API fetchers
async function fetchHistoricalData(symbol: string, startDate: string, endDate: string): Promise<CalcedData[]> {
  const params = new URLSearchParams({ symbol, from: startDate, to: endDate });
  const response = await fetch(`/api/financial-metrics?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const rawData: RawData[] = await response.json();
  
  if (!rawData?.length) {
    throw new Error('No historical data found for the selected date range');
  }

  return FinancialUtils.enhanceFinancialData(rawData);
}

async function fetchAnalystEstimates(symbol: string, apiKey: string): Promise<AnalystEstimates[]> {
  const response = await fetch(
    `https://financialmodelingprep.com/stable/analyst-estimates?symbol=${symbol}&period=annual&page=0&limit=10&apikey=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Analyst estimates require premium subscription');
    }
    throw new Error(`Failed to fetch analyst estimates: ${response.status}`);
  }
  
  const result = await response.json();
  return result || [];
}

async function fetchCompanyRating(symbol: string, apiKey: string): Promise<CompanyRating | null> {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Company ratings require premium subscription');
    }
    throw new Error(`Failed to fetch company rating: ${response.status}`);
  }
  
  const result = await response.json();
  const rawRating = result[0];
  
  if (!rawRating) {
    return null;
  }
  
  // Map API response fields to our interface
  const rating: CompanyRating = {
    symbol: rawRating.symbol,
    date: rawRating.date,
    rating: rawRating.rating,
    overallScore: rawRating.ratingScore || 0,
    discountedCashFlowScore: rawRating.ratingDetailsDCFScore || 0,
    returnOnEquityScore: rawRating.ratingDetailsROEScore || 0,
    returnOnAssetsScore: rawRating.ratingDetailsROAScore || 0,
    debtToEquityScore: rawRating.ratingDetailsDEScore || 0,
    priceToEarningsScore: rawRating.ratingDetailsPEScore || 0,
    priceToBookScore: rawRating.ratingDetailsPBScore || 0,
  };
  
  return rating;
}

async function fetchPriceTargets(symbol: string, apiKey: string): Promise<PriceTarget | null> {
  const response = await fetch(
    `https://financialmodelingprep.com/stable/price-target-consensus?symbol=${symbol}&apikey=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Price targets require premium subscription');
    }
    throw new Error(`Failed to fetch price targets: ${response.status}`);
  }
  
  const result = await response.json();
  return result[0] || null;
} 