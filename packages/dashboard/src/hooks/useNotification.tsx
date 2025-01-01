'use client';

import { App } from 'antd';
import { useCallback } from 'react';

export const useNotification = () => {
  const { notification } = App.useApp();

  const successCallback = useCallback(
    (description: string) => {
      notification.success({
        message: 'Success',
        description,
      });
    },
    [notification]
  );

  const errorCallback = useCallback(
    (description: string) => {
      notification.error({
        message: 'Error',
        description,
      });
    },
    [notification]
  );

  return Object.freeze({
    success: successCallback,
    error: errorCallback,
  } as const);
};
