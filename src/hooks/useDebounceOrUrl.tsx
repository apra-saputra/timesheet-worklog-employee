import { useState, useEffect } from "react";

export function useDebounceOrUrl<T>(value: T, delay: number, key?: string) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  useEffect(() => {
    if (key) {
      const url = new URL(window.location.href);
      if (debouncedValue) {
        url.searchParams.set(key, debouncedValue.toString());
      } else {
        url.searchParams.delete(key);
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, [debouncedValue, key]);

  return debouncedValue;
}
