import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, loginUser, logoutUser, refreshToken } from 'lib/services/user-service';
import { useBoundStore } from 'lib/store/store';

type LoginParams = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useAuth() {
  const queryClient = useQueryClient();
  const { status, signIn, signOut, refreshClientToken } = useBoundStore();
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: status === 'signIn', // Only run if we're signed in
    refetchInterval: 60000,
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ email, password, rememberMe }: LoginParams) =>
      await loginUser(email, password, 'mobile', rememberMe),
    onSuccess: (data, variables) => {
      signIn(data.token, variables.rememberMe);
    },
    retry: false,
  });

  const refreshTokenMutation = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async ({ _refreshToken }: { _refreshToken: string }) =>
      await refreshToken(_refreshToken),
    onSuccess: (data) => {
      refreshClientToken(data.token);
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      signOut();
      queryClient.removeQueries({ queryKey: ['user'] });
    },
  });

  return {
    user: userQuery.data,
    refreshToken: refreshTokenMutation.mutate,
    isLoading: userQuery.isLoading || logoutMutation.isPending,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    error: userQuery.error,
  };
}

export default useAuth;
