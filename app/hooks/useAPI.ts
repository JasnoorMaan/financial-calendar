import { useState, useCallback } from 'react';
import { RawData, CalcedData, APIstate } from '@/app/types/types';
import { FinancialUtils } from '@/app/utils/financials';

interface FetchParams {
  symbol: string;
  startDate: string;
  endDate: string;
}

export const useFinancialData = () => {
  const [apiState, setApiState] = useState<APIstate<CalcedData[]>>({
    data: [],
    loading: false,
    error: null
  });

  const fetchFinancialData = useCallback(async ({ symbol, startDate, endDate }: FetchParams) => {
    setApiState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const params = new URLSearchParams({ symbol, from: startDate, to: endDate });
      const response = await fetch(`/api/financial-metrics?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawData: RawData[] = await response.json();
      
      if (!rawData?.length) {
        throw new Error('No data found for the selected date range');
      }

      const enhancedData = FinancialUtils.enhanceFinancialData(rawData);

      setApiState({
        data: enhancedData,
        loading: false,
        error: null
      });

      return enhancedData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      
      setApiState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));

      throw error;
    }
  }, []);

  const clearData = useCallback(() => {
    setApiState({
      data: [],
      loading: false,
      error: null
    });
  }, []);

  return {
    ...apiState,
    fetchFinancialData,
    clearData
  };
};