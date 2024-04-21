'use client';

import { Button } from 'antd';
import { useEffect } from 'react';

import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <p>Something went wrong!</p>
      <Button size="large" danger onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
