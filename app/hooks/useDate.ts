import { useState, useCallback } from "react";
import { DateSelection } from "@/app/types/types";

export const useDate = () => {
  const [dateSelection, setDateSelection] = useState<DateSelection>({
    startDate: null,
    endDate: null,
    selectedDates: [],
  });

  const selectDate = useCallback((day: number, month: number, year: number) => {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    setDateSelection(prev => {
      if (!prev.startDate && !prev.endDate) {
        return {
          startDate: date,
          endDate: null,
          selectedDates: [date],
        };
      }
      if (prev.startDate && !prev.endDate) {
        if (date === prev.startDate) return prev;
        
        const [start, end] = date < prev.startDate ? [date, prev.startDate] : [prev.startDate, date];
        return {
          startDate: start,
          endDate: end,
          selectedDates: [start, end]
        };
      }

      return {
        startDate: date,
        endDate: null,
        selectedDates: [date]
      };
    });

    return date;
  }, []);

  const clearSelection = useCallback(() => {
    setDateSelection({
      startDate: null,
      endDate: null,
      selectedDates: []
    });
  }, []);

  const isValidSelection = dateSelection.startDate && dateSelection.endDate && 
                          dateSelection.startDate !== dateSelection.endDate;

  return {
    dateSelection,
    selectDate,
    clearSelection,
    isValidSelection,   
  };
};
