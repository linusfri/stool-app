import { StateCreator } from 'zustand';
import { Token, User } from 'lib/types/user';

export type AuthState = {
  token: Token | null;
  rememberMe: boolean;
  status: 'signIn' | 'signOut' | 'loading';
  signIn: (token: Token, rememberMe: boolean) => void;
  signOut: () => void;
}

// eslint-disable-next-line
const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  token: null,
  user: null,
  rememberMe: false,
  status: 'signOut',
  signIn: (token, rememberMe = false) => {
    set({ token, rememberMe, status: 'signIn' });
  },
  signOut: () => {
    set({ token: null, rememberMe: false, status: 'signOut' });
  }
});

export default createAuthSlice;
