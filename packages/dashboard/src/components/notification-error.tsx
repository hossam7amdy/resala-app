'use client';

import { useNotification } from '@/hooks';
import React, { useEffect } from 'react';

interface NotificationErrorProps {
  statusCode?: number;
  message?: string;
}
export const NotificationError: React.FC<NotificationErrorProps> = ({ statusCode, message }) => {
  const { error } = useNotification();

  useEffect(() => {
    if (statusCode && statusCode >= 400) {
      error(message ?? `${statusCode} Something went wrong!`);
    }
  }, [error, message, statusCode]);

  return <></>;
};
