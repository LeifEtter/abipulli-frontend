import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
  ReactElement,
} from "react";
import { errorMessages, User, UserLoginParams } from "abipulli-types";
import { UserApi } from "src/api/endpoints/user";
import { ApiError } from "src/api/ApiError";

export interface AuthState {
  user: Partial<User> | null;
  error: ApiError | null;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (creds: UserLoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [state, setState] = useState<AuthState>({
    user: null,
    error: null,
    isLoading: true,
  });

  const setError = (error: ApiError) => {
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
      await UserApi.logout();
      setState({ user: null, error: null, isLoading: false });
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error);
      } else {
        setError(new ApiError({ code: 400, info: "Logout Fehlgeschlagen" }));
      }
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { id } = await UserApi.retrieveUserId();
        setState({ user: { id }, error: null, isLoading: false });
      } catch (error) {
        if (error instanceof ApiError) {
          setError(error);
        } else {
          setError(new ApiError({ code: 400, info: "Logout Fehlgeschlagen" }));
        }
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
