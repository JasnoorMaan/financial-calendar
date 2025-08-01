import {
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  createChart,
  ColorType,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import { CalcedData } from "@/app/types/types";

interface ChartsProps {
  financialData: CalcedData[];
  symbol: string;
}

export const Charts = ({ financialData, symbol }: ChartsProps) => {
  const candlestickRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const volatilityRef = useRef<HTMLDivElement>(null);

  const transformData = () => {
    if (!financialData || !financialData.length) {
      return { candlestickData: [], volumeData: [], volatilityData: [] };
    }

    const sortedData = [...financialData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const candlestickData = sortedData.map((item) => ({
      time: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    const volumeData = sortedData.map((item) => {
      let color = "#e3f2fd";
      if (item.volumeLevel === "high") color = "#1565c0";
      else if (item.volumeLevel === "medium") color = "#42a5f5";
      else color = "#90caf9";

      return {
        time: item.date,
        value: item.volume,
        color: color,
      };
    });
    const volatilityData = sortedData.map((item) => ({
      time: item.date,
      value: item.volatility,
    }));

    return { candlestickData, volumeData, volatilityData };
  };

  useEffect(() => {
    if (!financialData || !financialData.length) return;

    const { candlestickData, volumeData, volatilityData } = transformData();

    // Candlestick Chart
    const candlestickChart = createChart(candlestickRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: candlestickRef.current!.clientWidth! as number,
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
    candlestickSeries.setData(candlestickData);
    candlestickChart.timeScale().fitContent();

    // Volume Chart
    const volumeChart = createChart(volumeRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: volumeRef.current!.clientWidth! as number,
      height: 200,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
    });
    const volumeSeries = volumeChart.addSeries(HistogramSeries, {
      color: "#2962FF",
      priceFormat: {
        type: "volume",
      },
    });
    volumeSeries.setData(volumeData);
    volumeChart.timeScale().fitContent();

    // Volatility Chart
    const volatilityChart = createChart(volatilityRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: volatilityRef.current?.clientWidth! as number,
      height: 200,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
    });
    const volatilitySeries = volatilityChart.addSeries(LineSeries, {
      color: "#ff6b35",
      lineWidth: 2,
    });
    volatilitySeries.setData(volatilityData);
    volatilityChart.timeScale().fitContent();
    const handleResize = () => {
      if (candlestickRef.current) {
        candlestickChart.applyOptions({
          width: candlestickRef.current.clientWidth,
        });
      }
      if (volumeRef.current) {
        volumeChart.applyOptions({
          width: volumeRef.current.clientWidth,
        });
      }
      if (volatilityRef.current) {
        volatilityChart.applyOptions({
          width: volatilityRef.current.clientWidth,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      candlestickChart.remove();
      volumeChart.remove();
      volatilityChart.remove();
    };
  }, [financialData]);

  if (!financialData || !financialData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available. Please select a date range and press show data
        button.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <div className="w-full my-6">
        <h4 className="text-md font-semibold mb-2 text-gray-700">
          {symbol} Price Chart (OHLC)
        </h4>
        <div ref={candlestickRef} className="" />
      </div>

      <div className="w-full my-6">
        <h4 className="text-md font-semibold mb-2 text-gray-700">
          Volume Histogram{" "}
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Color: Light Blue = Low, Medium Blue = Medium, Dark Blue = High
            Volume)
          </span>
        </h4>
        <div ref={volumeRef} className="" />
      </div>

      <div className="w-full my-6">
        <h4 className="text-md font-semibold mb-2 text-gray-700">
          Daily Volatility
          <span className="text-sm font-normal text-gray-500 ml-2">
            ((High - Low) / Open) * 100
          </span>
        </h4>
        <div ref={volatilityRef} className="" />
      </div>
    </div>
  );
};
export default Charts;
