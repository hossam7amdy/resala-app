import { useSession } from '@/fetch/auth.client';
import type { User } from '@resala/shared';

export const useCurrentUser = () => {
  const { data, isPending, error } = useSession();

  return {
    isLoading: isPending,
    user: data?.user as User | null,
    error,
  };
};
