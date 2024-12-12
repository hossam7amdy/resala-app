import { admin } from '@/fetch/auth.client';
import { useMutation, useNotification } from '@/hooks';
import { useRouter } from 'next/navigation';

const useUnbanCustomer = () => {
  const router = useRouter();
  const notification = useNotification();
  const { mutate, isLoading } = useMutation({
    mutationFn: (values: { userId: string }) => {
      return admin.unbanUser(values);
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return { unbanCustomer: mutate, isLoading };
};

export { useUnbanCustomer };
