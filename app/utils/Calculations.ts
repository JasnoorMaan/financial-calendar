import { CalcedData } from '@/app/types/types';
import type { DailyMetrics, WeeklyMetrics, MonthlyMetrics, TradingStats } from '@/app/types/types';

export class Calculator {
  static calculateDailyMetrics(data: CalcedData[]): DailyMetrics[] {
    if (!data.length) return [];
    
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sortedData.map((item, index) => {
      const prevItem = index > 0 ? sortedData[index - 1] : null;
      const dailyReturn = prevItem ? ((item.close - prevItem.close) / prevItem.close) * 100 : 0;
      
      // Simple moving average (20-day)
      const movingAvg = index >= 19 ? 
        sortedData.slice(index - 19, index + 1).reduce((sum, d) => sum + d.close, 0) / 20 : 
        undefined;
      
      return {
        date: item.date,
        return: dailyReturn,
        volatility: item.volatility,
        volume: item.volume,
        rsi: this.calculateRSI(sortedData, index),
        movingAvg,
      };
    });
  }

  static calculateWeeklyMetrics(data: CalcedData[]): WeeklyMetrics[] {
    if (!data.length) return [];
    
    const weeks: WeeklyMetrics[] = [];
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let currentWeek: CalcedData[] = [];
    let weekStart = new Date(sortedData[0]?.date);
    
    sortedData.forEach((item, index) => {
      const itemDate = new Date(item.date);
      const daysSinceStart = Math.floor((itemDate.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceStart < 7) {
        currentWeek.push(item);
      } else {
        if (currentWeek.length > 0) {
          weeks.push(this.processWeek(currentWeek));
        }
        currentWeek = [item];
        weekStart = new Date(item.date);
      }
      
      if (index === sortedData.length - 1 && currentWeek.length > 0) {
        weeks.push(this.processWeek(currentWeek));
      }
    });
    
    return weeks;
  }

  static calculateMonthlyMetrics(data: CalcedData[]): MonthlyMetrics[] {
    if (!data.length) return [];
    
    const monthlyGroups = new Map<string, CalcedData[]>();
    
    data.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!monthlyGroups.has(monthKey)) {
        monthlyGroups.set(monthKey, []);
      }
      monthlyGroups.get(monthKey)!.push(item);
    });
    
    const monthlyMetrics: MonthlyMetrics[] = [];
    
    monthlyGroups.forEach((monthData, monthKey) => {
      const [year, month] = monthKey.split('-').map(Number);
      const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
      
      const sortedMonthData = monthData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const startPrice = sortedMonthData[0].close;
      const endPrice = sortedMonthData[sortedMonthData.length - 1].close;
      const monthlyReturn = ((endPrice - startPrice) / startPrice) * 100;
      
      const winningDays = sortedMonthData.filter(item => item.changePercent > 0).length;
      const winRate = (winningDays / sortedMonthData.length) * 100;
      
      monthlyMetrics.push({
        month: monthName,
        year,
        monthlyReturn,
        avgVolatility: sortedMonthData.reduce((sum, item) => sum + item.volatility, 0) / sortedMonthData.length,
        totalVolume: sortedMonthData.reduce((sum, item) => sum + item.volume, 0),
        highestPrice: Math.max(...sortedMonthData.map(item => item.high)),
        lowestPrice: Math.min(...sortedMonthData.map(item => item.low)),
        tradingDays: sortedMonthData.length,
        winRate,
      });
    });
    
    return monthlyMetrics.sort((a, b) => a.year - b.year);
  }

  static calculateTradingStats(data: CalcedData[]): TradingStats {
    if (!data.length) {
      return {
        totalTradingDays: 0,
        dateRange: { start: '', end: '' },
        avgDailyVolume: 0,
        totalVolume: 0,
        priceRange: { min: 0, max: 0 },
        totalReturn: 0,
        avgDailyReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        winRate: 0,
        bestDay: { date: '', return: 0 },
        worstDay: { date: '', return: 0 },
      };
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const dailyMetrics = this.calculateDailyMetrics(sortedData);
    
    const totalReturn = ((sortedData[sortedData.length - 1].close - sortedData[0].close) / sortedData[0].close) * 100;
    const avgDailyReturn = dailyMetrics.reduce((sum, day) => sum + day.return, 0) / dailyMetrics.length;
    const volatility = Math.sqrt(dailyMetrics.reduce((sum, day) => sum + Math.pow(day.return - avgDailyReturn, 2), 0) / dailyMetrics.length);
    
    const sharpeRatio = avgDailyReturn / (volatility || 1) * Math.sqrt(252); // Annualized
    
    // Calculate max drawdown
    const runningReturns = dailyMetrics.reduce((acc, day, index) => {
      const prevReturn = index > 0 ? acc[index - 1] : 0;
      acc.push(prevReturn + day.return);
      return acc;
    }, [] as number[]);
    
    let maxDrawdown = 0;
    let peak = runningReturns[0] || 0;
    
    runningReturns.forEach(currentReturn => {
      if (currentReturn > peak) {
        peak = currentReturn;
      }
      const drawdown = peak - currentReturn;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });
    
    const winningDays = dailyMetrics.filter(day => day.return > 0).length;
    const winRate = (winningDays / dailyMetrics.length) * 100;
    
    const bestDay = dailyMetrics.reduce((best, current) => current.return > best.return ? current : best);
    const worstDay = dailyMetrics.reduce((worst, current) => current.return < worst.return ? current : worst);
    
    return {
      totalTradingDays: data.length,
      dateRange: {
        start: sortedData[0].date,
        end: sortedData[sortedData.length - 1].date,
      },
      avgDailyVolume: data.reduce((sum, item) => sum + item.volume, 0) / data.length,
      totalVolume: data.reduce((sum, item) => sum + item.volume, 0),
      priceRange: {
        min: Math.min(...data.map(item => item.low)),
        max: Math.max(...data.map(item => item.high)),
      },
      totalReturn,
      avgDailyReturn,
      volatility,
      sharpeRatio,
      maxDrawdown,
      winRate,
      bestDay,
      worstDay,
    };
  }

  private static processWeek(weekData: CalcedData[]): WeeklyMetrics {
    const sortedWeek = weekData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const startPrice = sortedWeek[0].close;
    const endPrice = sortedWeek[sortedWeek.length - 1].close;
    const weeklyReturn = ((endPrice - startPrice) / startPrice) * 100;
    
    return {
      weekStart: sortedWeek[0].date,
      weekEnd: sortedWeek[sortedWeek.length - 1].date,
      weeklyReturn,
      avgVolatility: sortedWeek.reduce((sum, item) => sum + item.volatility, 0) / sortedWeek.length,
      totalVolume: sortedWeek.reduce((sum, item) => sum + item.volume, 0),
      highestPrice: Math.max(...sortedWeek.map(item => item.high)),
      lowestPrice: Math.min(...sortedWeek.map(item => item.low)),
      tradingDays: sortedWeek.length,
    };
  }

  private static calculateRSI(data: CalcedData[], currentIndex: number, period: number = 14): number | undefined {
    if (currentIndex < period) return undefined;
    
    const gains: number[] = [];
    const losses: number[] = [];
    
    for (let i = currentIndex - period + 1; i <= currentIndex; i++) {
      const change = data[i].close - data[i - 1].close;
      if (change > 0) {
        gains.push(change);
        losses.push(0);
      } else {
        gains.push(0);
        losses.push(Math.abs(change));
      }
    }
    
    const avgGain = gains.reduce((sum, gain) => sum + gain, 0) / period;
    const avgLoss = losses.reduce((sum, loss) => sum + loss, 0) / period;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
} 