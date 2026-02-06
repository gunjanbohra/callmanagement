export interface User {
  id: string;
  mobile: string;
  name: string;
  isAuthenticated: boolean;
  isOwner?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}