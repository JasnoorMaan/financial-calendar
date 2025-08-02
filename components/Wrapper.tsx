"use client";

import React, { useState } from "react";
import { useSnack } from "@/app/SnackProvider";
import { ContinuousCalendar } from "@/components/ContinuousCalendar";
import { useDate } from "@/app/hooks/useDate";
import { useFinancialData } from "@/app/hooks/useAPI";
import { Charts } from "@/components/Charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Legend from "@/components/Legend";
import {
  PriceUp,
  PriceDown,
  PriceFlat,
  VolatilityHigh,
  VolatilityLow,
} from "@/components/icons/TileIcons";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Wrapper() {
  const { createSnack } = useSnack();
  const [symbol, setSymbol] = useState("AAPL");
  const { dateSelection, selectDate, clearSelection, isValidSelection } =
    useDate();
  const {
    data: financialData,
    loading,
    error,
    fetchFinancialData,
    clearData,
  } = useFinancialData();

  const handleDateSelect = (day: number, month: number, year: number) => {
    const selectedDate = selectDate(day, month, year);
    const monthName = MONTH_NAMES[month];

    if (!dateSelection.startDate) {
      createSnack(`Start date: ${monthName} ${day}, ${year}`, "success");
    } else if (!dateSelection.endDate) {
      createSnack(
        `Date range selected: ${dateSelection.startDate} to ${selectedDate}`,
        "success"
      );
    } else {
      createSnack(`New start date: ${monthName} ${day}, ${year}`, "success");
    }
  };

  const handleFetchData = async () => {
    if (!isValidSelection) {
      createSnack("Please select two different dates", "error");
      return;
    }

    try {
      const data = await fetchFinancialData({
        symbol,
        startDate: dateSelection.startDate!,
        endDate: dateSelection.endDate!,
      });

      createSnack(
        `Loaded ${data.length} trading days for ${symbol}`,
        "success"
      );
    } catch (error) {
      createSnack("Failed to fetch financial data", "error");
    }
  };

  const handleClear = () => {
    clearSelection();
    clearData();
    createSnack("Selection and data cleared", "success");
  };

  const getVolumeStats = () => {
    if (!financialData.length) return null;

    const avgVolume =
      financialData.reduce((sum, d) => sum + d.volume, 0) /
      financialData.length;
    const highVolumeDays = financialData.filter(
      (d) => d.volumeLevel === "high"
    ).length;
    const priceRange = {
      min: Math.min(...financialData.map((d) => d.low)),
      max: Math.max(...financialData.map((d) => d.high)),
    };

    return { avgVolume, highVolumeDays, priceRange };
  };

  const stats = getVolumeStats();
  console.log(stats);
  console.log(financialData);
  return (
    <>
      <div className="flex h-auto w-full flex-col gap-4 px-4 pt-4">
        {/* Header Controls */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            {/* Input Stock */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-bold text-gray-700">
                Symbol:
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  className="ml-2 px-3 py-1 border border-gray-300 rounded text-sm font-mono uppercase w-20"
                  placeholder="AAPL"
                  maxLength={5}
                />
              </label>

              {/* Dates */}
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">
                  Start:{" "}
                  <span className="font-semibold text-blue-600">
                    {dateSelection.startDate || "Not selected"}
                  </span>
                </span>
                <span className="text-gray-600">
                  End:{" "}
                  <span className="font-semibold text-blue-600">
                    {dateSelection.endDate || "Not selected"}
                  </span>
                </span>
              </div>
            </div>

            {/* Fetch and Clear Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleFetchData}
                disabled={!isValidSelection || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>📈 Show Data</>
                )}
              </button>

              {(dateSelection.startDate || financialData.length > 0) && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  🗑️ Clear
                </button>
              )}
            </div>
          </div>

          {/* Upper Stats */}
          {stats && (
            <div className="flex items-center gap-6 pt-2 border-t border-gray-200 text-sm">
              <span className="text-gray-600">
                Trading Days:{" "}
                <span className="font-semibold text-green-600">
                  {financialData.length}
                </span>
              </span>
              <span className="text-gray-600">
                Avg Volume:{" "}
                <span className="font-semibold text-purple-600">
                  {(stats.avgVolume / 1000000).toFixed(2)}M
                </span>
              </span>
              <span className="text-gray-600">
                High Volume Days:{" "}
                <span className="font-semibold text-red-600">
                  {stats.highVolumeDays}
                </span>
              </span>
              <span className="text-gray-600">
                Price Range:{" "}
                <span className="font-semibold text-blue-600">
                  ${stats.priceRange.min.toFixed(2)} - $
                  {stats.priceRange.max.toFixed(2)}
                </span>
              </span>
            </div>
          )}
        </div>
        {/* Tab Selector */}
        <Tabs defaultValue="calendar" className="w-full">
          <div className="flex justify-center mb-4">
            <TabsList className="flex justify-center mb-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              {financialData.length > 0 ? (
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              ) : (
                <TabsTrigger value="dashboard" disabled>
                  Dashboard
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          <TabsContent value="calendar" className="w-full space-y-4">
            <Legend />
            {/* Calendar */}
            <div className="w-full overflow-hidden">
              <ContinuousCalendar
                onClick={handleDateSelect}
                startDate={dateSelection.startDate}
                endDate={dateSelection.endDate}
                financialData={financialData}
                showVisualizations={financialData.length > 0}
              />
            </div>
            {/* Errors */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">❌ {error}</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="dashboard">
            {financialData.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <Charts financialData={financialData} symbol={symbol} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
