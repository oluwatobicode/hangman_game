import React, { createContext } from "react";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserData {
  id?: string;
  username: string;
  email: string;
}

type AuthState = {
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  success: string | null;
  error: string | null;
};

type LoginData = {
  username: string;
  password: string;
};

type SignUpData = {
  username: string;
  email?: string;
  password: string;
  confirmPassword: string;
};

type AuthContextAction = {
  state: AuthState;
  logIn: (data: LoginData) => void;
  signUp: (data: SignUpData) => void;
  logout: () => void;
  checkAuthStatus: () => void;
};

const initialState: AuthState = {
  user: null,
  userData: null,
  isAuthenticated: false,
  success: null,
  error: null,
};

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_USER_DATA"; payload: UserData }
  | { type: "ERROR"; payload: string }
  | { type: "Logout" }
  | { type: "CLEAR_ERROR" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextAction | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};
