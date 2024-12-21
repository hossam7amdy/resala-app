'use client';

import { signOut } from '@/fetch/auth.client';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/routes';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const { replace } = useRouter();
  const notification = useNotification();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      replace(ROUTES.LOGIN);
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return { logout: mutate, isLoading };
};

export { useLogout };
