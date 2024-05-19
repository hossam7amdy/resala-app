'use client';

import { type DefaultResponseBody } from '@resala/shared';
import type { FormInstance } from 'antd';
import { useState, useTransition } from 'react';

/**
 * useSubmitForm is a custom hook that handles antd form submission
 * and sets the pending state and error message accordingly.
 *
 * @param submit The submit function that will be called when the form is submitted
 * @param form The antd form instance
 * @returns An object containing the dispatch function, pending state, and error message
 */
const useSubmitForm = <Payload>(
  submit: (payload: Payload) => Promise<DefaultResponseBody>,
  form?: FormInstance
) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ message: string | undefined }>({ message: undefined });

  const dispatch = (payload: Payload) => {
    setError({ message: undefined });

    return startTransition(async () => {
      try {
        const response = await submit(payload);

        response?.success && form?.resetFields();
        !response?.success && setError({ message: response?.message });
      } catch (e) {
        const error = e as Error;
        setError({ message: error?.message });
      }
    });
  };

  return { dispatch, pending, error };
};

export default useSubmitForm;
