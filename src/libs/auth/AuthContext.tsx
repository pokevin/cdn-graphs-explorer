import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
  authFetcher: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue>({
  isAuth: false,
  login: () => {
    throw new Error(missingContextError);
  },
  logout: () => {
    throw new Error(missingContextError);
  },
  authFetcher: () => {
    throw new Error(missingContextError);
  },
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const logoutRef = useRef<() => Promise<string | undefined>>();

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

  // Logout automaticaly when navigate away
  useEffect(() => {
    if (logoutRef.current) {
      window.removeEventListener("beforeunload", logoutRef.current);
    }
    logoutRef.current = logout;
    window.addEventListener("beforeunload", logoutRef.current);
  }, [logout]);

  const authFetcher = (input: RequestInfo | URL, init?: RequestInit) => {
    const requestBody =
      init?.body && typeof init.body === "string"
        ? JSON.parse(init.body)
        : init?.body ?? {};
    return fetch(input, {
      ...init,
      body: JSON.stringify({
        ...requestBody,
        session_token: token,
      }),
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: !!token, login, logout, authFetcher }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
