"use client";

import React from "react";
import type { TradingStats } from "@/app/types/types";

interface HeadCardProps {
  stats: TradingStats | null;
  symbol: string;
}

export const HeadCard: React.FC<HeadCardProps> = ({ stats, symbol }) => {
  //Wont hit this condition but just in case
  if (!stats || stats.totalTradingDays === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>No trading data available</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number, decimals: number = 2): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(decimals);
  };

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
    <>
      <section className="flex flex-col flex-wrap items-center justify-center gap-4">
        <section className="bg-black text-white flex flex-col flex-wrap items-center justify-center border-2 border-blue-200 rounded-lg p-4">
          <h1 className="text-6xl pb-3 font-bold md:text-9xl">
            {stats.totalTradingDays}
          </h1>
          <h2 className="text-2xl md:text-3xl pb-1 font-semibold">
            Trading Days
          </h2>
          <div>
            <p className="text-md text-gray-600 pb-3 font-semibold">
              {formatDate(stats.dateRange.start)} to{" "}
              {formatDate(stats.dateRange.end)}
            </p>
          </div>
          <h2 className="text-xl md:text-2xl font-bold">{symbol}</h2>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-blue-200 rounded-lg p-4">
          <section className="flex gap-1 flex-col items-center justify-center border-2 border-blue-200 rounded-lg p-4">
            <h2
              className={`text-2xl font-bold ${getReturnColor(
                stats.totalReturn
              )}`}
            >
              {stats.totalReturn > 0 ? "+" : ""}
              {stats.totalReturn.toFixed(2)}%
            </h2>
            <p className="text-md text-gray-500 font-semibold">Total Return</p>
          </section>
          <section className="flex gap-1 flex-col items-center justify-center border-2 border-blue-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</h2>
            <p className="text-md text-gray-500 font-semibold">Win Rate</p>
          </section>
          <section className="flex gap-1 flex-col items-center justify-center border-2 border-blue-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold">
              {stats.volatility.toFixed(2)}%
            </h2>
            <p className="text-md text-gray-500 font-semibold">
              Daily Volatility
            </p>
          </section>
          <section className="flex gap-1 flex-col items-center justify-center border-2 border-blue-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold">
              {stats.sharpeRatio.toFixed(2)}
            </h2>
            <p className="text-md text-gray-500 font-semibold">Sharpe Ratio</p>
          </section>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-blue-200 rounded-lg p-4">
          <div className="space-y-6 px-2">
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">
                Avg Daily Vol:
              </span>
              <span className="font-semibold">
                {formatNumber(stats.avgDailyVolume)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Price Range:</span>
              <span className="font-medium">
                ${Math.floor(stats.priceRange.min)} - $
                {Math.floor(stats.priceRange.max)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Best Day:</span>
              <span
                className={`font-medium ${getReturnColor(
                  stats.bestDay.return
                )}`}
              >
                +{stats.bestDay.return.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Worst Day:</span>
              <span
                className={`font-medium ${getReturnColor(
                  stats.worstDay.return
                )}`}
              >
                {stats.worstDay.return.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Max Drawdown:</span>
              <span className="font-semibold text-red-600">
                -{stats.maxDrawdown.toFixed(2)}%
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Avg Daily Return:</span>
              <span
                className={`font-medium ${getReturnColor(
                  stats.avgDailyReturn
                )}`}
              >
                {stats.avgDailyReturn > 0 ? "+" : ""}
                {stats.avgDailyReturn.toFixed(3)}%
              </span>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
