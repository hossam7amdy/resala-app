import { deleteUser } from '@/fetch/users';
import { useMutation, useNotification } from '@/hooks';
import { useRouter } from 'next/navigation';

const useDeleteCustomer = () => {
  const router = useRouter();
  const notification = useNotification();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ userId }: { userId: string }) => deleteUser(userId),
    onSuccess: () => {
      notification.success('Customer has been banned successfully');
      router.back();
      router.refresh();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return { deleteCustomer: mutate, isLoading };
};

export { useDeleteCustomer };
