import { admin } from '@/actions/auth.client';
import { useMutation, useNotification } from '@/hooks';
import { useRouter } from 'next/navigation';

const useBanCustomer = () => {
  const router = useRouter();
  const notification = useNotification();
  const { mutate, isLoading } = useMutation({
    mutationFn: (values: { userId: string; reason: string; duration: number }) => {
      const banExpiresIn = values.duration ? values.duration * 24 * 60 * 60 : undefined;
      return admin.banUser({ userId: values.userId, banExpiresIn, banReason: values.reason });
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return { banCustomer: mutate, isLoading };
};

export { useBanCustomer };
