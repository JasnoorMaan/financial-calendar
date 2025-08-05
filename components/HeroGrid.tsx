"use client";

import { useEffect, useRef } from "react";
import { candlestickData } from "@/components/Data";
import {
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  createChart,
  ColorType,
} from "lightweight-charts";

const HeroGrid = () => {
  const candlestickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!candlestickRef.current) return;
    // OHLC data
    const transformedCandlestickData = candlestickData.map((item) => ({
      time: new Date(item.time).toISOString().split("T")[0], // Convert timestamp to YYYY-MM-DD format
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    // Candlestick Chart
    const candlestickChart = createChart(candlestickRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: Math.max(candlestickRef.current.clientWidth || 400, 400),
      height: 300,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
    });
    const candlestickSeries = candlestickChart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderDownColor: "#ef5350",
      borderUpColor: "#26a69a",
      baseLineWidth: 2,
    });
    candlestickSeries.setData(transformedCandlestickData);
    candlestickChart.timeScale().fitContent();

    const handleResize = () => {
      if (candlestickRef.current) {
        candlestickChart.applyOptions({
          width: Math.max(candlestickRef.current.clientWidth || 400, 400),
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      candlestickChart.remove();
    };
  }, []);
  return (
    <section className="grid grid-cols-2 md:grid-cols-12 gap-2">
      <section className="col-span-3 bg-black text-white flex flex-col flex-wrap items-center justify-center border-2 border-neutral-200 rounded-xl p-4">
        <h1 className="text-6xl pb-3 font-bold md:text-9xl">69</h1>
        <h2 className="text-2xl md:text-3xl pb-1 font-semibold">
          Trading Days
        </h2>
        <div>
          <p className="text-md text-gray-600 pb-3 font-semibold">
            28 May 2025 to 4 Aug 2025
          </p>
        </div>
        <h2 className="text-xl md:text-2xl font-bold">NVDA</h2>
      </section>

      <section className="col-span-2 flex flex-col flex-wrap gap-6">
        <div className="bg-[#6425FE] text-white rounded-xl p-4 text-center border border-neutral-200">
          <div className="text-3xl font-bold">0.51</div>
          <p className="text-sm text-gray-100 mt-1">Sharpe Ratio</p>
        </div>
        <section className="bg-white flex gap-1 flex-col items-center justify-center border-2 border-neutral-200 rounded-lg p-4">
          <h2 className="text-2xl font-bold">4.069%</h2>
          <p className="text-md text-gray-500 font-semibold">
            Daily Volatility
          </p>
        </section>
        <section className="bg-white flex gap-1 flex-col items-center justify-center border-2 border-neutral-200 rounded-lg p-4">
          <h2 className="text-2xl font-bold">58.1%</h2>
          <p className="text-md text-gray-500 font-semibold">Win Rate</p>
        </section>
      </section>

      <section className="bg-white col-span-7 border-2 border-neutral-200 rounded-xl p-4">
        <div ref={candlestickRef} className="w-full" />
      </section>
    </section>
  );
};
export default HeroGrid;
