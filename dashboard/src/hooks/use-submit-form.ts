'use client';

import type { DefaultResponseBody } from '@resala/shared';
import { useCallback, useState } from 'react';

const useSubmitForm = <T, B extends DefaultResponseBody>(submit: (payload: T) => Promise<B>) => {
  const [pending, setPending] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | undefined>();

  const dispatch = useCallback(
    async (payload: T) => {
      setPending(true);
      try {
        const response = await submit(payload);

        if (typeof response?.success === 'boolean' && response.success === false) {
          setErrMsg(response?.message || 'Something went wrong!');
        }
      } finally {
        setPending(false);
      }
    },
    [submit]
  );

  return { dispatch, pending, errMsg };
};

export default useSubmitForm;
