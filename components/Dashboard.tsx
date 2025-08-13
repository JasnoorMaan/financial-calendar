"use client";

import React, { useEffect, useState } from "react";
import type {
  CalcedData,
  DailyMetrics,
  WeeklyMetrics,
  MonthlyMetrics,
  TradingStats,
  AnalystEstimates,
  CompanyRating,
  PriceTarget,
} from "@/app/types/types";
import { Calculator } from "@/app/utils/Calculations";
import { useUnifiedFinancialData } from "@/app/hooks/useAPI";
import { DailyMetricsChart } from "./DailyMetricsChart";
import { WeeklyMetricsChart } from "./WeeklyMetricsChart";
import { MonthlyMetricsChart } from "./MonthlyMetricsChart";
import { Charts } from "./Charts";

interface DashboardProps {
  financialData: CalcedData[];
  symbol: string;
}

// Extract trading overview component
const TradingOverview: React.FC<{ stats: TradingStats; symbol: string }> = ({
  stats,
  symbol,
}) => {
  const getReturnColor = (value: number): string => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatDate = (date: string): string => {
    const formatted = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    } as const;
    const formatter = new Intl.DateTimeFormat("en-GB", options);
    return formatter.format(formatted);
  };

  return (
    <div className="space-y-4">
      {/* Trading Days */}
      <div className="bg-[#2C2C2C] text-white text-center rounded-xl p-6 border border-gray-200">
        <div className="text-white text-4xl lg:text-9xl font-bold mb-2">
          {stats.totalTradingDays}
        </div>
        <p className="text-lg font-bold text-white">Trading Days</p>
        <p className="text-sm text-gray-200 mt-1">
          {formatDate(stats.dateRange.start)} to{" "}
          {formatDate(stats.dateRange.end)}
        </p>
        <div className="text-lg font-bold text-white mt-2">{symbol}</div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-4 text-center border border-gray-400">
          <div
            className={`text-3xl font-bold ${getReturnColor(
              stats.totalReturn
            )}`}
          >
            {stats.totalReturn > 0 ? "+" : ""}
            {stats.totalReturn.toFixed(2)}%
          </div>
          <p className="text-sm text-gray-500 mt-1">Total Return</p>
        </div>

        <div className="rounded-xl p-4 text-center border border-gray-400">
          <div className="text-3xl font-bold">{stats.winRate.toFixed(1)}%</div>
          <p className="text-sm text-gray-500 mt-1">Win Rate</p>
        </div>

        <div className="bg-[#C7FFA5] rounded-xl p-4 text-center border border-gray-400">
          <div className="text-3xl font-bold">
            {stats.volatility.toFixed(2)}%
          </div>
          <p className="text-sm text-gray-800 mt-1">Daily Volatility</p>
        </div>

        <div className="bg-[#6425FE] text-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-3xl font-bold">
            {stats.sharpeRatio.toFixed(2)}
          </div>
          <p className="text-sm text-gray-100 mt-1">Sharpe Ratio</p>
        </div>
      </div>
    </div>
  );
};

// Extract financial rating component
const FinancialRating: React.FC<{ ratingData: CompanyRating }> = ({
  ratingData,
}) => {
  return (
    <div className="rounded-xl p-6 border border-gray-400">
      <div className="text-4xl text-center md:text-9xl font-bold">
        {ratingData.rating}
      </div>
      <div className="text-center mb-4">
        <div className="text-lg font-bold text-gray-800">Overall Rating</div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>ROE Score:</span>
          <span className="font-medium">
            {ratingData.returnOnEquityScore}/5
          </span>
        </div>
        <div className="flex justify-between">
          <span>ROA Score:</span>
          <span className="font-medium">
            {ratingData.returnOnAssetsScore}/5
          </span>
        </div>
        <div className="flex justify-between">
          <span>P/E Score:</span>
          <span className="font-medium">
            {ratingData.priceToEarningsScore}/5
          </span>
        </div>
        <div className="flex justify-between">
          <span>Debt/Equity:</span>
          <span className="font-medium">{ratingData.debtToEquityScore}/5</span>
        </div>
      </div>
    </div>
  );
};

// 6 metric component
const AdditionalMetrics: React.FC<{ stats: TradingStats }> = ({ stats }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };
  const getReturnColor = (value: number): string => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="text-center rounded-xl p-6 border border-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <div className="space-y-1">
          <div className="flex flex-col">
            <span className="text-gray-600">Avg Daily Volume</span>
            <span className="font-semibold">
              {formatNumber(stats.avgDailyVolume)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Price Range</span>
            <span className="font-semibold">
              ${stats.priceRange.min.toFixed(2)} - $
              {stats.priceRange.max.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Max Drawdown</span>
            <span className="font-semibold text-red-600">
              -{stats.maxDrawdown.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex flex-col">
            <span className="text-gray-600">Best Day</span>
            <span
              className={`font-semibold ${getReturnColor(
                stats.bestDay.return
              )}`}
            >
              +{stats.bestDay.return.toFixed(2)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Worst Day</span>
            <span
              className={`font-semibold ${getReturnColor(
                stats.worstDay.return
              )}`}
            >
              {stats.worstDay.return.toFixed(2)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Avg Daily Return</span>
            <span
              className={`font-semibold ${getReturnColor(
                stats.avgDailyReturn
              )}`}
            >
              {stats.avgDailyReturn > 0 ? "+" : ""}
              {stats.avgDailyReturn.toFixed(3)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({
  financialData,
  symbol,
}) => {
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics[]>([]);
  const [weeklyMetrics, setWeeklyMetrics] = useState<WeeklyMetrics[]>([]);
  const [monthlyMetrics, setMonthlyMetrics] = useState<MonthlyMetrics[]>([]);
  const [tradingStats, setTradingStats] = useState<TradingStats | null>(null);

  const { analystEstimates, companyRating, priceTargets } =
    useUnifiedFinancialData();

  useEffect(() => {
    if (financialData.length > 0) {
      const daily = Calculator.calculateDailyMetrics(financialData);
      const weekly = Calculator.calculateWeeklyMetrics(financialData);
      const monthly = Calculator.calculateMonthlyMetrics(financialData);
      const stats = Calculator.calculateTradingStats(financialData);

      setDailyMetrics(daily);
      setWeeklyMetrics(weekly);
      setMonthlyMetrics(monthly);
      setTradingStats(stats);
    }
  }, [financialData]);
  //Wont hit this but just in case
  if (!financialData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p>No data available. Please select a date range and fetch data.</p>
        </div>
      </div>
    );
  }
  //Wont hit this but just in case
  if (!tradingStats) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Calculating trading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/*Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trading Overview */}
          <TradingOverview stats={tradingStats} symbol={symbol} />
          {/* Financial Rating */}
          {companyRating && <FinancialRating ratingData={companyRating} />}
          {/* Additional Metrics */}
          {tradingStats && <AdditionalMetrics stats={tradingStats} />}
        </div>

        {/* Right Side - 60% (3 columns out of 5) */}
        <div className="lg:col-span-3">
          <div className="rounded-xl p-6 border border-gray-400 h-full overflow-hidden">
            <div className="w-full overflow-x-auto">
              <Charts financialData={financialData} symbol={symbol} />
            </div>
          </div>
        </div>
      </div>

      {/* Three-Column Layout for Daily/Weekly/Monthly Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DailyMetricsChart dailyMetrics={dailyMetrics} symbol={symbol} />
        <WeeklyMetricsChart weeklyMetrics={weeklyMetrics} symbol={symbol} />
        <MonthlyMetricsChart monthlyMetrics={monthlyMetrics} symbol={symbol} />
      </div>

      {/* API Data Section */}
      {(analystEstimates.length > 0 || priceTargets) && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Analyst Estimates */}
          {analystEstimates.length > 0 && (
            <div className="md:col-span-3 rounded-xl p-6 border border-gray-400">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Analyst Estimates
              </h3>
              <div className="space-y-3">
                {analystEstimates.slice(0, 3).map((estimate, index) => (
                  <div key={index} className="border-l-4 border-gray-400 pl-4">
                    <div className="text-sm text-gray-500">
                      {new Date(estimate.date).getFullYear()}
                    </div>
                    <div className="font-medium">
                      EPS: $
                      {estimate.epsAvg === 0
                        ? "No Data"
                        : estimate.epsAvg.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Revenue: $
                      {estimate.revenueAvg === 0
                        ? "No Data"
                        : (estimate.revenueAvg / 1000000000).toFixed(1)}
                      B
                    </div>
                    <div className="text-xs text-gray-500">
                      {estimate.numAnalystsEps} analysts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Targets */}
          {priceTargets && (
            <div className="rounded-xl md:col-span-5 p-6 border border-gray-400">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Price Targets
              </h3>
              <div className="space-y-3">
                <div className="text-center p-3 bg-gray-100 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    ${priceTargets.targetHigh}
                  </div>
                  <div className="text-sm text-gray-600">High Target</div>
                </div>
                <div className="text-center p-3 bg-gray-100 rounded-lg">
                  <div className="text-xl font-bold">
                    ${priceTargets.targetConsensus}
                  </div>
                  <div className="text-sm text-gray-600">Consensus</div>
                </div>
                <div className="text-center p-3 bg-gray-100 rounded-lg">
                  <div className="text-xl font-bold text-red-600">
                    ${priceTargets.targetLow}
                  </div>
                  <div className="text-sm text-gray-600">Low Target</div>
                </div>
              </div>
            </div>
          )}
          <section className="bg-[url('/bg.webp')] md:col-span-4 bg-cover bg-center rounded-xl p-8 bg-no-repeat flex flex-col justify-between items-center relative min-h-[300px]">
            <div className="flex flex-col items-center justify-center flex-1 w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 leading-tight">
                Refer and Earn $1000 in credits
              </h1>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white text-center w-full mt-auto">
              BloomborgTerminal
            </h2>
          </section>
        </div>
      )}
    </div>
  );
};
