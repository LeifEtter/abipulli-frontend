import { useState, useEffect, ReactElement, useCallback } from "react";
import { User, UserLoginParams } from "abipulli-types";
import { AuthContext } from "./authContext";
import { UserApi } from "src/api/endpoints/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthState {
  user: Partial<User> | null;
  error: string | null;
  isLoading: boolean;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [state, setState] = useState<AuthState>({
    user: null,
    error: null,
    isLoading: true,
  });

  const setError = (error: string) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  };

  const login = async (creds: UserLoginParams) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const user = await UserApi.login(creds);
    setState({ user, error: null, isLoading: false });
  };

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      setState({ user: null, error: null, isLoading: false });
    } catch (error) {
      setError("Logout failed");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { id } = await UserApi.retrieveUserId();
        setState({ user: { id }, error: null, isLoading: false });
      } catch (error) {
        setError("Authentication failed");
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
