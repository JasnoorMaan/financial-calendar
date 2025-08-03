"use client";

import React from "react";
import type { MonthlyMetrics } from "@/app/types/types";

interface MonthlyMetricsChartProps {
  monthlyMetrics: MonthlyMetrics[];
  symbol: string;
}

export const MonthlyMetricsChart: React.FC<MonthlyMetricsChartProps> = ({
  monthlyMetrics,
  symbol,
}) => {
  if (!monthlyMetrics.length) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
        <div className="text-gray-500">No monthly metrics available</div>
      </div>
    );
  }

  const getReturnColor = (value: number): string => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  return (
    <div className="rounded-xl p-6 border border-gray-400 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-800">Monthly Analysis</h3>
        <span className="text-sm text-gray-500">
          {monthlyMetrics.length} months
        </span>
      </div>

      <div className="grid gap-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {monthlyMetrics.map((month, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {month.month} {month.year}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {month.tradingDays} trading days
                  </p>
                </div>
              </div>
              <div
                className={`text-right ${getReturnColor(month.monthlyReturn)}`}
              >
                <div className="text-xl font-bold">
                  {month.monthlyReturn > 0 ? "+" : ""}
                  {month.monthlyReturn.toFixed(2)}%
                </div>
                <div className="text-sm">Monthly Return</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="font-semibold">{month.winRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-600">Win Rate</div>
              </div>

              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="font-semibold">
                  {month.avgVolatility.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Avg Volatility</div>
              </div>

              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="font-semibold">
                  ${month.highestPrice.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Month High</div>
              </div>

              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="font-semibold">
                  ${month.lowestPrice.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">Month Low</div>
              </div>

              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="font-semibold">
                  {formatNumber(month.totalVolume)}
                </div>
                <div className="text-xs text-gray-600">Total Volume</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
