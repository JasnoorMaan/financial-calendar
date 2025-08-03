// app/hooks/usePersistentState.ts
import { useState, useEffect, useCallback } from 'react';

export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  // Always start with default value (fixes hydration)
  const [state, setState] = useState<T>(defaultValue);

  // Load from localStorage AFTER component mounts
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setState(deserialize(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, deserialize]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setState(prevState => {
          const newValue = value instanceof Function ? value(prevState) : value;
          localStorage.setItem(key, serialize(newValue));
          return newValue;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serialize]
  );

  const clearValue = useCallback(() => {
    try {
      setState(defaultValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error clearing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key) return;
      
      try {
        const newValue = e.newValue ? deserialize(e.newValue) : defaultValue;
        setState(newValue);
      } catch (error) {
        console.warn(`Error syncing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, defaultValue, deserialize]);

  return [state, setValue, clearValue];
}