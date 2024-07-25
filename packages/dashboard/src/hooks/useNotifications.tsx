import { App } from 'antd';

export const useNotifications = () => {
  const { notification } = App.useApp();

  return {
    success: (description: string) => {
      notification.success({
        message: 'Success',
        description,
      });
    },
    error: (description: string) => {
      notification.error({
        message: 'Error',
        description,
      });
    },
  };
};
