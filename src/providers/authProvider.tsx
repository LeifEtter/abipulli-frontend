import { useState, useEffect, ReactElement, useCallback } from "react";
import {
  User,
  UserCheckAuthResult,
  UserLoginParams,
  UserLoginResult,
} from "abipulli-types";
import { AuthContext } from "./authContext";
import { UsersApi } from "src/services/endpoints/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthState {
  isLoading: boolean;
  user: Partial<User> | null;
  error: string | null;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    error: null,
    user: null,
  });

  const checkAuth = async () => {
    try {
      const res: UserCheckAuthResult = await UsersApi.retrieveUserId();
      setAuthState({ isLoading: false, error: null, user: res });
    } catch (error) {
      console.log(error);
      setAuthState({
        isLoading: false,
        error: "Token could not be verified",
        user: null,
      });
    }
  };

  const login = async (creds: UserLoginParams) => {
    try {
      const res: UserLoginResult = await UsersApi.login(creds);
      setAuthState({ isLoading: false, error: null, user: res });
    } catch (error) {
      console.log(error);
      setAuthState({
        isLoading: false,
        error: "Something went wrong during login",
        user: null,
      });
    }
  };

  const logout = useCallback(async () => {
    try {
      // User logout
      setAuthState({ isLoading: false, error: null, user: null });
    } catch (error) {
      console.log(error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Something went wrong during logout",
      }));
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
