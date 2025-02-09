export interface LoginRes {
  userId: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}

export interface RegisterRes {
  userId: string;
  accessToken: string;
}

export interface AuthContextType extends AuthState {
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
