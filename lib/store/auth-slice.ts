import { StateCreator } from 'zustand';

export type AuthState = {
  token: string | null;
  rememberMe: boolean;
  status: 'signIn' | 'signOut' | 'loading';
  signIn: (token: string, rememberMe: boolean) => void;
  signOut: () => void;
}

// eslint-disable-next-line
const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  token: null,
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
