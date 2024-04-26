'use client';

import type { DefaultResponseBody } from '@resala/shared';
import type { FormInstance } from 'antd';
import { useCallback, useState } from 'react';

/**
 * useSubmitForm is a custom hook that handles antd form submission
 * and sets the pending state and error message accordingly.
 *
 * @param submit The submit function that will be called when the form is submitted
 * @param form The antd form instance
 * @returns An object containing the dispatch function, pending state, and error message
 */
const useSubmitForm = <T, B extends DefaultResponseBody>(
  submit: (payload: T) => Promise<B>,
  form?: FormInstance
) => {
  const [pending, setPending] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | undefined>();

  const dispatch = useCallback(
    async (payload: T) => {
      setPending(true);
      try {
        const response = await submit(payload);

        // If the response is not an object, return
        // should only match DefaultResponseBody type
        if (typeof response?.success !== 'boolean') return;

        if (response?.success) {
          form?.resetFields();
          setErrMsg(undefined);
        } else {
          setErrMsg(response?.message || 'Something went wrong!');
        }
      } finally {
        setPending(false);
      }
    },
    [submit, form]
  );

  return { dispatch, pending, errMsg };
};

export default useSubmitForm;
