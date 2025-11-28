import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { setAuthToken } from "../api/axiosInstance";

interface User {
  email: string;
  username: string;
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
    case "AUTH_START":
      return {
        ...state,
        error: null,
      };

    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        success: "success",
        user: {
          email: action.payload.email,
          username: action.payload.username,
        },
      };

    case "AUTH_USER_DATA":
      return {
        ...state,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "Logout":
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextAction | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const api = axios.create({
    baseURL: "https://hangman-game-backend-evjq.onrender.com/api/v1/auth",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const logIn = async (loginData: LoginData) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await api.post("/login", {
        username: loginData.username,
        password: loginData.password,
      });

      console.log(response.data);

      setAuthToken(response.data.token);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: "There was an error, try again later",
      });
    }
  };

  const signUp = async (signUpData: SignUpData) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await api.post("/signup", {
        username: signUpData.username,
        email: signUpData?.email,
        password: signUpData.password,
        confirmPassword: signUpData.confirmPassword,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: "There was an error, try again later",
      });
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/logout");

      console.log(response.data);
      dispatch({ type: "Logout" });

      return response.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: "There was an error, try again later",
      });
    }
  };

  const value: AuthContextAction = {
    state,
    logIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Wrap the app in the auth provider");
  }

  return context;
};

export default AuthProvider;
