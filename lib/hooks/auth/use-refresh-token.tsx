import { useMutation } from '@tanstack/react-query';
import { refreshToken } from 'lib/services/user-service';
import { useBoundStore } from 'lib/store/store';
import { useEffect } from 'react';
import useAuth from 'lib/hooks/auth/use-auth';

export default function useRefreshToken() {
  const { refreshClientToken, token } = useBoundStore();
  const { user } = useAuth();

  const refreshTokenMutation = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async ({ _refreshToken }: { _refreshToken: string }) =>
      await refreshToken(_refreshToken),
    onSuccess: (data) => {
      refreshClientToken(data.token);
    },
    retry: false,
  });

  useEffect(() => {
    if (!user || !token?.refresh_token) return;
    const ONE_HOUR = 1000 * 60 * 60;

    const interval = setInterval(() => {
      refreshTokenMutation.mutate({ _refreshToken: token.refresh_token });
    }, ONE_HOUR);
    return () => clearInterval(interval);
  }, []);
}
