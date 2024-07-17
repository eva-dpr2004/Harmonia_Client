import { createContext } from "react";

export const AuthContext = createContext({
  authState: { isAuthenticated: false, user: null },
  setAuthState: () => {}
});
