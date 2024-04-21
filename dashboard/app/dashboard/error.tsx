'use client';

import { Button } from 'antd';
import { useEffect } from 'react';

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
    <main>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
