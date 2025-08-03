"use client";

import React, { useEffect, useRef } from "react";
import { createChart, ColorType, LineSeries } from "lightweight-charts";
import type { DailyMetrics } from "@/app/types/types";

interface DailyMetricsChartProps {
  dailyMetrics: DailyMetrics[];
  symbol: string;
}

export const DailyMetricsChart: React.FC<DailyMetricsChartProps> = ({
  dailyMetrics,
  symbol,
}) => {
  const returnsChartRef = useRef<HTMLDivElement>(null);
  const volumeChartRef = useRef<HTMLDivElement>(null);
  const rsiChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dailyMetrics.length) return;

    // Returns Chart
    const returnsChart = createChart(returnsChartRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: returnsChartRef.current!.clientWidth,
      height: 200,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
    });

    const returnsSeries = returnsChart.addSeries(LineSeries, {
      color: "#2563eb",
      lineWidth: 2,
    });

    const returnsData = dailyMetrics.map((item) => ({
      time: item.date,
      value: item.return,
    }));

    returnsSeries.setData(returnsData);
    returnsChart.timeScale().fitContent();

    // Volume Chart
    const volumeChart = createChart(volumeChartRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: volumeChartRef.current!.clientWidth,
      height: 200,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
    });

    const volumeSeries = volumeChart.addSeries(LineSeries, {
      color: "#dc2626",
      lineWidth: 2,
    });

    const volumeData = dailyMetrics.map((item) => ({
      time: item.date,
      value: item.volume / 1000000,
    }));

    volumeSeries.setData(volumeData);
    volumeChart.timeScale().fitContent();

    // RSI Chart
    const rsiChart = createChart(rsiChartRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: rsiChartRef.current!.clientWidth,
      height: 200,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
    });

    const rsiSeries = rsiChart.addSeries(LineSeries, {
      color: "#7c3aed",
      lineWidth: 2,
    });

    const rsiData = dailyMetrics
      .filter((item) => item.rsi !== undefined)
      .map((item) => ({
        time: item.date,
        value: item.rsi!,
      }));

    rsiSeries.setData(rsiData);
    rsiChart.timeScale().fitContent();

    const handleResize = () => {
      if (returnsChartRef.current) {
        returnsChart.applyOptions({
          width: returnsChartRef.current.clientWidth,
        });
      }
      if (volumeChartRef.current) {
        volumeChart.applyOptions({ width: volumeChartRef.current.clientWidth });
      }
      if (rsiChartRef.current) {
        rsiChart.applyOptions({ width: rsiChartRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      returnsChart.remove();
      volumeChart.remove();
      rsiChart.remove();
    };
  }, [dailyMetrics]);

  if (!dailyMetrics.length) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 h-[600px] flex items-center justify-center">
        <div className="text-gray-500">No daily metrics available</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border border-gray-400 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-800">Daily Metrics</h3>
        <span className="text-sm text-gray-500">
          {dailyMetrics.length} days
        </span>
      </div>

      <div className="overflow-y-auto overflow-x-hidden flex-1 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Daily Returns (%)
          </h4>
          <div ref={returnsChartRef} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Volume (Millions)
          </h4>
          <div ref={volumeChartRef} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            RSI (14-day)
          </h4>
          <div ref={rsiChartRef} />
        </div>
      </div>
    </div>
  );
};
