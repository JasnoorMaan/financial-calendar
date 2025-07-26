"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSnack } from "@/app/SnackProvider";
import { ContinuousCalendar } from "@/components/ContinuousCalendar";

const monthNames = [
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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [loading, setLoading] = useState<boolean>(false);
  const startDateRef = useRef<string | null>(null);
  const endDateRef = useRef<string | null>(null);

  useEffect(() => {
    startDateRef.current = startDate;
    endDateRef.current = endDate;
    // console.log("STATE CHANGED - startDate:", startDate, "endDate:", endDate);
  }, [startDate, endDate]);

  const onClickHandler = useCallback(
    (day: number, month: number, year: number) => {
      const formattedMonth = (month + 1).toString().padStart(2, "0");
      const formattedDay = day.toString().padStart(2, "0");
      const temp = `${year}-${formattedMonth}-${formattedDay}`;

      // console.log("=== CLICK DEBUG ===");
      // console.log("Current startDateRef:", startDateRef.current);
      // console.log("Current endDateRef:", endDateRef.current);
      // console.log("Clicked date:", temp);

      const currentStart = startDateRef.current;
      const currentEnd = endDateRef.current;

      if (!currentStart && !currentEnd) {
        // console.log(">>> Setting START date");
        setStartDate(temp);
        setEndDate(null);
        createSnack(
          `Start date selected: ${monthNames[month]} ${day}, ${year}`,
          "success"
        );
        return;
      }

      if (currentStart && !currentEnd) {
        // console.log(">>> Setting END date");
        if (temp === currentStart) {
          createSnack(
            "Please select a different date for the end date",
            "error"
          );
          return;
        }

        if (temp < currentStart) {
          setStartDate(temp);
          setEndDate(currentStart);
          createSnack(
            `Date range selected: ${monthNames[month]} ${day}, ${year} to ${currentStart}`,
            "success"
          );
        } else {
          setEndDate(temp);
          createSnack(
            `Date range selected: ${currentStart} to ${monthNames[month]} ${day}, ${year}`,
            "success"
          );
        }
        return;
      }

      if (currentStart && currentEnd) {
        // console.log(">>> RESETTING - setting new START date");
        setStartDate(temp);
        setEndDate(null);
        createSnack(
          `Start date selected: ${monthNames[month]} ${day}, ${year}`,
          "success"
        );
        return;
      }
    },
    []
  );

  const fetchData = async () => {
    if (!startDate || !endDate) {
      createSnack("Please select 2 distinct dates", "error");
      return;
    }
    if (startDate === endDate) {
      createSnack("Please select 2 distinct dates", "error");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        symbol: symbol || "AAPL",
        from: startDate,
        to: endDate,
      });
      const url = `/api/financial-metrics?${params.toString()}`;
      console.log("Fetching data...", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      if (data && data.length > 0) {
        createSnack(
          `Successfully fetched ${data.length} records for ${symbol} from ${startDate} to ${endDate}`,
          "success"
        );
      } else {
        createSnack("No data found for the selected date range", "error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      createSnack("Failed to fetch data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex h-screen max-h-screen w-full flex-col gap-4 px-4 pt-4 items-center justify-center">
        <div className="flex items-center gap-8 mb-2 text-sm">
          <div>
            <label htmlFor="symbol" className="text-sm font-medium px-2">
              Symbol:
            </label>
            <input
              type="text"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="px-4 py-2 border rounded-md text-sm"
              placeholder="AAPL"
            />
          </div>
          <div className="flex items-center gap-8 mb-2 pt-2 text-sm">
            <div>
              Start Date:{" "}
              <span className="font-medium">{startDate || "Not selected"}</span>
            </div>
            <div>
              End Date:{" "}
              <span className="font-medium">{endDate || "Not selected"}</span>
            </div>
          </div>
        </div>
        <div className="h-full overflow-auto mt-2">
          <ContinuousCalendar onClick={onClickHandler} />
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          type="button"
          className="whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-6 lg:py-4 lg: mb-2"
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>
    </>
  );
}
