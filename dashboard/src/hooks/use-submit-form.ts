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
const useSubmitForm = <T>(
  submit: (payload: T) => Promise<DefaultResponseBody>,
  form?: FormInstance
) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ message: string | undefined }>({ message: undefined });

  const dispatch = (payload: T) =>
    startTransition(async () => {
      try {
        const response = await submit(payload);

        response?.success && form?.resetFields();
        setError({ message: response?.message });
      } catch (e) {
        setError({ message: (e as Error).message || 'Something went wrong' });
      }
    });

  return { dispatch, pending, error };
};

export default useSubmitForm;
