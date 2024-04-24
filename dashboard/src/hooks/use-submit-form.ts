'use client';

import { useCallback, useState } from 'react';

const useSubmitForm = <T, B>(submit: (payload: T) => Promise<B>) => {
  const [pending, setPending] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | undefined>();

  const dispatch = useCallback(
    async (payload: T) => {
      setPending(true);
      try {
        return await submit(payload);
      } catch (error) {
        const err = error as Record<string, string>;
        console.log('useSubmitForm error:', err);

        setErrMsg(err?.message || 'Something went wrong!');
      } finally {
        setPending(false);
      }
    },
    [submit]
  );

  return { dispatch, pending, errMsg };
};

export default useSubmitForm;
