'use client';

import { useCallback, useRef } from 'react';

/**
 * Debounce function to delay the execution of a function
 *
 * @param fn Function to be debounced
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export const useDebounce = (fn: (...args: unknown[]) => void, delay: number) => {
  const tRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: unknown[]) => {
      if (tRef.current) {
        clearTimeout(tRef.current);
      }

      tRef.current = setTimeout(() => {
        tRef.current = null;
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );
};
