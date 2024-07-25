import { useCallback, useRef } from 'react';

/**
 * Debounce function to delay the execution of a function
 *
 * @param fn Function to be debounced
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const useDebounce = (fn: (...args: any) => void, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );
};
