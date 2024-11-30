import { useSession } from '@/lib/auth.client';
import type { User } from '@resala/shared';

export const useCurrentUser = () => {
  const { data, isPending, error } = useSession();

  return {
    isLoading: isPending,
    user: {
      ...data?.user,
      firstName: data?.user?.name?.split(' ')[0],
      lastName: data?.user?.name?.split(' ')[1] || '',
      phone: data?.user?.phoneNumber,
      isPhoneVerified: data?.user?.phoneNumberVerified ?? false,
      isEmailVerified: data?.user?.emailVerified ?? false,
    } as Partial<User>,
    error,
  };
};
