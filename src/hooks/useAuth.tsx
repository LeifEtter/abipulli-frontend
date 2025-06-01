import { useContext } from "react";
import { AuthContext } from "src/providers/authContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  } else {
    return context;
  }
}
