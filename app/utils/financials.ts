import { RawData, CalcedData } from "@/app/types/types";

export const FinancialUtils = {
  // Calculate percentile for volume ranking
  calculatePercentile: (values: number[], target: number): number => {
    const sorted = [...values].sort((a, b) => a - b);
    const index = sorted.findIndex(v => v >= target);
    return (index / sorted.length) * 100;
  },

  // Get volume level classification
  getVolumeLevel: (percentile: number): 'low' | 'medium' | 'high' => {
    if (percentile <= 33) return 'low';
    if (percentile <= 66) return 'medium';
    return 'high';
  },

  // Get heatmap color based on volume percentile
  getVolumeHeatmapColor: (percentile: number): string => {
    if (percentile <= 20) return 'bg-green-100';
    if (percentile <= 40) return 'bg-green-200';
    if (percentile <= 60) return 'bg-yellow-200';
    if (percentile <= 80) return 'bg-orange-300';
    return 'bg-red-400';
  },

  // Get price direction from change percentage
  getPriceDirection: (changePercent: number): 'up' | 'down' | 'flat' => {
    if (Math.abs(changePercent) < 0.1) return 'flat';
    return changePercent > 0 ? 'up' : 'down';
  },

  // Calculate daily volatility
  calculateVolatility: (data: RawData): number => {
    return ((data.high - data.low) / data.open) * 100;
  },

  // Enhance raw data with calculations
  enhanceFinancialData: (rawData: RawData[]): CalcedData[] => {
    if (!rawData.length) return [];

    const volumes = rawData.map(d => d.volume);
    const maxVolume = Math.max(...volumes);
    const minVolume = Math.min(...volumes);

    return rawData.map(item => {
      const volumePercentile = FinancialUtils.calculatePercentile(volumes, item.volume);
      const volumeLevel = FinancialUtils.getVolumeLevel(volumePercentile);
      const volumeHeatmapColor = FinancialUtils.getVolumeHeatmapColor(volumePercentile);
      const priceDirection = FinancialUtils.getPriceDirection(item.changePercent);
      const volatility = FinancialUtils.calculateVolatility(item);
      const volumeIntensity = (item.volume - minVolume) / (maxVolume - minVolume);

      return {
        ...item,
        volumeLevel,
        volumePercentile,
        priceDirection,
        volatility,
        volumeHeatmapColor,
        volumeIntensity
      };
    });
  }
};