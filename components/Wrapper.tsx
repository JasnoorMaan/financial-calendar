"use client";

import React, { useState } from "react";
import { useSnack } from "@/app/SnackProvider";
import { ContinuousCalendar } from "@/components/ContinuousCalendar";
import { usePersistentDate } from "@/app/hooks/useDate";
import { usePersistentState } from "@/app/hooks/usePersistentState";
import { useUnifiedFinancialData } from "@/app/hooks/useAPI";
import { Dashboard } from "@/components/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Legend from "@/components/Legend";

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

  // Persistent symbol state
  const [symbol, setSymbol] = usePersistentState(
    "financial-calendar-symbol",
    "AAPL"
  );

  // Persistent date selection
  const { dateSelection, selectDate, clearSelection, isValidSelection } =
    usePersistentDate();

  // Unified financial data
  const {
    historicalData: financialData,
    analystEstimates,
    companyRating,
    priceTargets,
    loading,
    error,
    hasStoredData,
    dataAge,
    apiCallsCount,
    completedCalls,
    fetchAllData,
    clearData,
    hasCompleteData,
    getStorageStats,
  } = useUnifiedFinancialData();

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

    // Check if we already have this data
    const canUseStoredData = hasCompleteData(
      symbol,
      dateSelection.startDate || "",
      dateSelection.endDate || ""
    );

    if (canUseStoredData && hasStoredData) {
      const stats = getStorageStats();
      createSnack(
        `Using stored data for ${symbol} (${stats.completedCalls}/4 APIs, ${dataAge} min old)`,
        "success"
      );
      return;
    }

    try {
      const result = await fetchAllData({
        symbol,
        startDate: dateSelection.startDate!,
        endDate: dateSelection.endDate!,
      });

      const successMessage = `Loaded ${result.historicalData.length} trading days for ${symbol} (${result.successCount}/4 APIs successful)`;
      createSnack(successMessage, "success");

      if (result.successCount < 4) {
        createSnack(
          `Note: Some additional data sources were unavailable`,
          "error"
        );
      }
    } catch (error) {
      createSnack(
        error instanceof Error
          ? error.message
          : "Failed to fetch financial data",
        "error"
      );
    }
  };

  const handleClear = () => {
    clearSelection();
    clearData();
    createSnack("All data cleared", "success");
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

  const formatDate = (date: string | null): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date || "").toLocaleDateString("en-GB", options);
  };
  return (
    <>
      <div className="flex h-auto w-full flex-col gap-4 px-4 pt-4">
        {/* Header Controls */}
        <div className="flex flex-col gap-4 p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            {/* Input Stock */}
            <h1 className="text-lg md:text-2xl font-extrabold">
              BloomborgTerminal©
            </h1>
            <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
              <label className="text-sm text-gray-600">
                Symbol:
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  className="ml-2 px-3 py-1 border font-semibold text-black border-gray-300 rounded text-sm font-mono uppercase w-20"
                  placeholder="AAPL"
                  maxLength={5}
                />
              </label>

              {/* Dates */}
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">
                  Start:{" "}
                  <span className="font-semibold text-black">
                    {formatDate(dateSelection.startDate) || "Not selected"}
                  </span>
                </span>
                <span className="text-gray-600">
                  End:{" "}
                  <span className="font-semibold text-black">
                    {formatDate(dateSelection.endDate) || "Not selected"}
                  </span>
                </span>
              </div>
            </div>

            {/* Fetch and Clear Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleFetchData}
                disabled={!isValidSelection || loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-600 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>Confirm </>
                )}
              </button>

              {(dateSelection.startDate || financialData.length > 0) && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-black transition-all duration-300 text-white rounded-lg hover:bg-gray-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Upper Stats */}
          {stats && (
            <div className="flex justify-center items-center gap-6 pt-2 border-t border-gray-200 text-sm">
              <span className="text-gray-600">
                Trading Days:{" "}
                <span className="font-medium text-black">
                  {financialData.length}
                </span>
              </span>
              <span className="text-gray-600">
                Avg Volume:{" "}
                <span className="font-medium text-black">
                  {(stats.avgVolume / 1000000).toFixed(2)}M
                </span>
              </span>
              <span className="text-gray-600">
                High Volume Days:{" "}
                <span className="font-medium text-black">
                  {stats.highVolumeDays}
                </span>
              </span>
              <span className="text-gray-600">
                Price Range:{" "}
                <span className="font-medium text-black">
                  ${stats.priceRange.min.toFixed(2)} - $
                  {stats.priceRange.max.toFixed(2)}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <Tabs defaultValue="calendar" className="w-full mb-8">
          <div className="flex justify-center mb-4">
            <TabsList className="grid grid-cols-2">
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
              <Dashboard financialData={financialData} symbol={symbol} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
