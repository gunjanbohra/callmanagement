import { atom, selector } from 'recoil';
import { AuthState } from '@/types/auth';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
});

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.user;
  },
});