import { User } from "abipulli-types";
import { createContext } from "react";

export interface AuthContextType {
  user: Partial<User> | null;
  login: (user: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
