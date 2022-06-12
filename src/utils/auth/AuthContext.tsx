import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authProvider from "./auth-provider";
import type { ReactNode } from "react";

const missingContextError =
  "You must use this component within a AuthContextProvider";

type AuthContextValue = {
  isAuth: boolean;
  login: (identifiant: string, password: string) => Promise<string | undefined>;
  logout: () => Promise<string | undefined>;
};

const AuthContext = createContext<AuthContextValue>({
  isAuth: false,
  login: () => {
    throw new Error(missingContextError);
  },
  logout: () => {
    throw new Error(missingContextError);
  },
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = useCallback(
    async (identifiant: string, password: string) => {
      if (token || !identifiant || !password) {
        return;
      }
      try {
        const session_token = await authProvider.login(identifiant, password);
        setToken(session_token);
      } catch (e) {
        return (e as Error).message;
      }
    },
    [token]
  );

  const logout = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      await authProvider.logout(token);
      setToken(undefined);
    } catch (e) {
      return (e as Error).message;
    }
  }, [token]);

  useEffect(() => {
    return () => {
      logout();
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuth: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
