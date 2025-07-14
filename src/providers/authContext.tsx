import { UserLoginParams } from "abipulli-types";
import { createContext } from "react";
import { AuthState } from "./authProvider";
export interface AuthContextType extends AuthState {
  login: (creds: UserLoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
