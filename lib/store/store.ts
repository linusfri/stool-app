import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import createAuthSlice, { AuthState } from './auth-slice';
import createItemsSlice, { ItemsState } from './items-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoreState = AuthState & ItemsState;

export const useBoundStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createItemsSlice(...a),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (state.rememberMe) {
          return {
            token: state.token,
            status: state.status,
            rememberMe: state.rememberMe,
          };
        } else {
          return {
            rememberMe: state.rememberMe,
          };
        }
      },
    }
  )
);
