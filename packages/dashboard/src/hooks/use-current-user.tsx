import { getCurrentUser } from '@/fetch/users';
import type { User } from '@resala/shared';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        setUser(user);
      } finally {
        // setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, user: user };
};
