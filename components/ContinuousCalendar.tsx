"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  PriceUp,
  PriceDown,
  PriceFlat,
  VolatilityHigh,
  VolatilityLow,
} from "@/components/icons/TileIcons";
import { CalcedData } from "@/app/types/types";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

interface ContinuousCalendarProps {
  onClick?: (day: number, month: number, year: number) => void;
  startDate?: string | null;
  endDate?: string | null;
  financialData?: CalcedData[];
  showVisualizations?: boolean;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({
  onClick,
  startDate,
  endDate,
  financialData = [],
  showVisualizations = false,
}) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());

  // Helper functions for financial data
  const getFinancialDataForDate = (
    dateString: string
  ): CalcedData | undefined => {
    return financialData.find((data) => data.date === dateString);
  };

  const formatDateString = (
    year: number,
    month: number,
    day: number
  ): string => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  // Scrolling function for full page layout
  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    setTimeout(() => {
      const targetElement = dayRefs.current.find((ref) => {
        if (!ref) return false;
        const refMonth = parseInt(ref.getAttribute("data-month") || "-1");
        const refDay = parseInt(ref.getAttribute("data-day") || "-1");
        const refYear = parseInt(ref.getAttribute("data-year") || "-1");
        return (
          refMonth === monthIndex && refDay === dayIndex && refYear === year
        );
      });

      if (targetElement) {
        const elementRect = targetElement.getBoundingClientRect();
        const offset =
          window.scrollY + elementRect.top - window.innerHeight / 3;

        window.scrollTo({
          top: Math.max(0, offset),
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    setTimeout(() => {
      scrollToDay(monthIndex, 15);
    }, 100);
  };

  const handleTodayClick = () => {
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    setYear(todayYear);
    setSelectedMonth(todayMonth);

    setTimeout(() => {
      scrollToDay(todayMonth, todayDay);
    }, 300);
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    if (!onClick) return;

    if (month < 0) {
      onClick(day, 11, year - 1);
    } else if (month === 12) {
      onClick(day, 0, year + 1);
    } else {
      onClick(day, month, year);
    }
  };

  const generateCalendar = useMemo(() => {
    const daysInYear = (): {
      month: number;
      day: number;
      actualYear: number;
      actualMonth: number;
    }[] => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      // Add previous month days if needed
      if (startDayOfWeek < 6) {
        const prevYearLastMonth = new Date(year - 1, 11, 31).getDate();
        for (let i = 0; i < startDayOfWeek; i++) {
          const day = prevYearLastMonth - startDayOfWeek + i + 1;
          daysInYear.push({
            month: -1,
            day: day,
            actualYear: year - 1,
            actualMonth: 11,
          });
        }
      }

      // Add current year days
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({
            month,
            day,
            actualYear: year,
            actualMonth: month,
          });
        }
      }

      // Add next month days to complete the last week
      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({
            month: 12,
            day,
            actualYear: year + 1,
            actualMonth: 0,
          });
        }
      }

      return daysInYear;
    };

    const calendarDays = daysInYear();
    const calendarWeeks = [];

    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    return calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ month, day, actualYear, actualMonth }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isNewMonth =
            index === 0 || calendarDays[index - 1].month !== month;
          const isToday =
            today.getMonth() === actualMonth &&
            today.getDate() === day &&
            today.getFullYear() === actualYear;

          // Date string for comparison
          const dateString = formatDateString(actualYear, actualMonth, day);
          const financialInfo = getFinancialDataForDate(dateString);

          // Determine if this date is start or end date
          const isStartDate = startDate === dateString;
          const isEndDate = endDate === dateString;

          // Background and border styling
          let backgroundClass = "bg-white";
          let borderClass = "border-gray-200";

          // Apply financial data coloring FIRST
          if (showVisualizations && financialInfo) {
            if (financialInfo.volumeHeatmapColor) {
              backgroundClass = financialInfo.volumeHeatmapColor;
            } else {
              // Fallback coloring based on volume level
              if (financialInfo.volumeLevel === "high") {
                const intensity = financialInfo.volumeIntensity || 0;
                if (intensity > 0.8) backgroundClass = "bg-red-500";
                else if (intensity > 0.6) backgroundClass = "bg-red-400";
                else if (intensity > 0.4) backgroundClass = "bg-red-300";
                else backgroundClass = "bg-red-200";
              } else if (financialInfo.volumeLevel === "medium") {
                const intensity = financialInfo.volumeIntensity || 0;
                if (intensity > 0.6) backgroundClass = "bg-yellow-400";
                else if (intensity > 0.3) backgroundClass = "bg-yellow-300";
                else backgroundClass = "bg-yellow-200";
              } else if (financialInfo.volumeLevel === "low") {
                const intensity = financialInfo.volumeIntensity || 0;
                if (intensity > 0.6) backgroundClass = "bg-green-400";
                else if (intensity > 0.3) backgroundClass = "bg-green-300";
                else backgroundClass = "bg-green-200";
              }
            }
          }

          // Override with selection styling
          if (isStartDate) {
            backgroundClass = "bg-blue-400";
            borderClass = "border-blue-600 border-4";
          } else if (isEndDate) {
            backgroundClass = "bg-blue-400";
            borderClass = "border-blue-600 border-4";
          }

          return (
            <div
              key={`${actualYear}-${actualMonth}-${day}`}
              ref={(el) => {
                dayRefs.current[index] = el;
              }}
              data-month={actualMonth}
              data-day={day}
              data-year={actualYear}
              onClick={() => handleDayClick(day, month, year)}
              className={`relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-30 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40 ${backgroundClass} ${borderClass}`}
            >
              <span
                className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                  isToday ? "bg-blue-500 font-semibold text-white" : ""
                } ${
                  month < 0 || month === 12
                    ? "text-slate-400"
                    : "text-slate-800"
                }`}
              >
                {day}
              </span>

              {/* Month label */}
              {isNewMonth && month >= 0 && month < 12 && (
                <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
                  {MONTH_NAMES[month]}
                </span>
              )}

              {/* Financial data indicators */}
              {showVisualizations && financialInfo && (
                <div className="absolute top-1 right-1 flex flex-col gap-1">
                  {/* Price direction indicators */}
                  {financialInfo.priceDirection === "up" && <PriceUp />}
                  {financialInfo.priceDirection === "down" && <PriceDown />}
                  {financialInfo.priceDirection === "flat" && <PriceFlat />}

                  {/* Volatility level indicators */}
                  {financialInfo.volatility > 8 && <VolatilityHigh />}
                  {financialInfo.volatility > 3 &&
                    financialInfo.volatility <= 8 && (
                      <div className="w-4 h-4 bg-orange-400 rounded-full drop-shadow-lg"></div>
                    )}
                  {financialInfo.volatility <= 3 && <VolatilityLow />}
                </div>
              )}

              {/* Start/End date banners */}
              {isStartDate && (
                <div className="flex justify-center items-center absolute inset-x-0 top-1 z-20 pointer-events-none">
                  <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg border-2 border-white">
                    START
                  </div>
                </div>
              )}
              {isEndDate && (
                <div className="flex justify-center items-center absolute inset-x-0 top-1 z-20 pointer-events-none">
                  <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg border-2 border-white">
                    END
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ));
  }, [year, financialData, showVisualizations, startDate, endDate]);

  // Fixed intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(
              entry.target.getAttribute("data-month") || "-1",
              10
            );
            const elementYear = parseInt(
              entry.target.getAttribute("data-year") || "-1",
              10
            );

            if (month >= 0 && month < 12 && elementYear === year) {
              setSelectedMonth(month);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref) {
        const day = parseInt(ref.getAttribute("data-day") || "-1");
        const month = parseInt(ref.getAttribute("data-month") || "-1");
        if (day === 15 && month >= 0 && month < 12) {
          observer.observe(ref);
        }
      }
    });

    return () => observer.disconnect();
  }, [year, generateCalendar]);

  const monthOptions = MONTH_NAMES.map((month, index) => ({
    name: month,
    value: `${index}`,
  }));
  //TOP BAR
  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl">
      <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select
              name="month"
              value={`${selectedMonth}`}
              options={monthOptions}
              onChange={handleMonthChange}
            />
            <button
              onClick={handleTodayClick}
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:px-5 lg:py-2.5"
            >
              Today
            </button>
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
              aria-label="Previous year"
              title="Previous year"
            >
              <svg
                className="size-5 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
              aria-label="Next year"
              title="Next year"
            >
              <svg
                className="size-5 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid w-full grid-cols-7 justify-between text-slate-500">
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={index}
              className="w-full border-b border-slate-200 py-2 text-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">{generateCalendar}</div>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { name: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg
        className="size-5 text-slate-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
);
