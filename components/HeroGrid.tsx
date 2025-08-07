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
import { useMotionValue, motion, animate } from "motion/react";

function CounterAnim() {
  const count = useMotionValue(0);
  const rounded = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, 69, {
      duration: 3,
      ease: "easeOut",
    });
    const unsubscribe = count.on("change", (latest) => {
      rounded.set(Math.round(latest));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded]);

  return <motion.span>{rounded}</motion.span>;
}
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
    <motion.section
      className="grid grid-cols-2 md:grid-cols-12 gap-2"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.section
        className="col-span-3 bg-[#2c2c2c] text-white flex flex-col flex-wrap items-center justify-center border-2 border-black rounded-xl p-4"
        initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        <motion.h1
          className="text-6xl pb-3 font-bold md:text-9xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CounterAnim />
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl pb-1 font-semibold"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Trading Days
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-xs md:text-lg text-gray-400 pb-3 font-semibold">
            28 May 2025 to 4 Aug 2025
          </p>
        </motion.div>
        <motion.h2
          className="text-xl md:text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          NVDA
        </motion.h2>
      </motion.section>

      {/* Side metrics cards */}
      <motion.section
        className="col-span-2 flex flex-col flex-wrap gap-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          {
            value: "0.51",
            label: "Sharpe Ratio",
            bg: "bg-[#6425FE]",
            text: "text-white",
            delay: 0.4,
          },
          {
            value: "4.069%",
            label: "Daily Volatility",
            bg: "bg-white",
            text: "text-black",
            delay: 0.5,
          },
          {
            value: "58.1%",
            label: "Win Rate",
            bg: "bg-white",
            text: "text-black",
            delay: 0.6,
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`${metric.bg} ${metric.text} rounded-xl p-4 text-center border border-neutral-200`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: metric.delay,
              type: "spring",
              damping: 15,
              stiffness: 120,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="text-3xl font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: metric.delay + 0.2 }}
            >
              {metric.value}
            </motion.div>
            <motion.p
              className={`text-md font-semibold ${
                metric.bg === "bg-white" ? "text-gray-500" : "text-gray-200"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: metric.delay + 0.3 }}
            >
              {metric.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.section>

      {/* Chart section */}
      <motion.section
        className="bg-white col-span-7 border-2 border-neutral-200 rounded-xl p-2"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          type: "spring",
          damping: 25,
          stiffness: 100,
        }}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          ref={candlestickRef}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </motion.section>
    </motion.section>
  );
};
export default HeroGrid;
