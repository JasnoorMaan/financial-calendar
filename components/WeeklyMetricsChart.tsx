"use client";

import React from "react";
import type { WeeklyMetrics } from "@/app/types/types";

interface WeeklyMetricsChartProps {
  weeklyMetrics: WeeklyMetrics[];
  symbol: string;
}

export const WeeklyMetricsChart: React.FC<WeeklyMetricsChartProps> = ({
  weeklyMetrics,
  symbol,
}) => {
  if (!weeklyMetrics.length) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
        <div className="text-gray-500">No weekly metrics available</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getReturnColor = (value: number): string => {
    if (value > 0) return "text-green-600 bg-green-50";
    if (value < 0) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  return (
    <div className="rounded-xl p-6 border border-gray-400 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-800">Weekly Performance</h3>
        <span className="text-sm text-gray-500">
          {weeklyMetrics.length} weeks
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {weeklyMetrics.map((week, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {formatDate(week.weekStart)} - {formatDate(week.weekEnd)}
                </span>
                <span className="text-xs text-gray-500">
                  ({week.tradingDays} days)
                </span>
              </div>
              <div
                className={`px-2 py-1 rounded text-sm font-medium ${getReturnColor(
                  week.weeklyReturn
                )}`}
              >
                {week.weeklyReturn > 0 ? "+" : ""}
                {week.weeklyReturn.toFixed(2)}%
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Volume:</span>
                <div className="font-medium">
                  {formatNumber(week.totalVolume)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Volatility:</span>
                <div className="font-medium">
                  {week.avgVolatility.toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-gray-500">High:</span>
                <div className="font-medium">
                  ${week.highestPrice.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Low:</span>
                <div className="font-medium">
                  ${week.lowestPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
