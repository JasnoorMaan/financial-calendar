import { useCallback } from 'react';
import { DateSelection } from '@/app/types/types';
import { usePersistentState } from './usePersistentState';

const DEFAULT_DATE_SELECTION: DateSelection = {
  startDate: null,
  endDate: null,
  selectedDates: [],
};

export const usePersistentDate = () => {
  const [dateSelection, setDateSelection, clearDateSelection] = usePersistentState(
    'financial-calendar-date-selection',
    DEFAULT_DATE_SELECTION
  );

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
  }, [setDateSelection]);

  const clearSelection = useCallback(() => {
    clearDateSelection();
  }, [clearDateSelection]);

  const isValidSelection = dateSelection.startDate && dateSelection.endDate && 
                          dateSelection.startDate !== dateSelection.endDate;

  return {
    dateSelection,
    selectDate,
    clearSelection,
    isValidSelection,   
  };
};