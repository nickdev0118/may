"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useReadLocalStorage } from "@/libraries/usehooks-ts";
import {
  L_STORAGE_AUTH_TOKEN,
  L_STORAGE_REFRESH_TOKEN,
} from "@/utils/constants";

export const AuthContext = createContext<{
  authTokenInLocalStorage: string;
  setAuthTokenInLocalStorage: (
    value: string | ((prev: string) => string)
  ) => void;
  authTokenInSessionStorage: string;
  setAuthTokenInSessionStorage: (
    value: string | ((prev: string) => string)
  ) => void;
  emailForOTP: string;
  setEmailForOTP: (value: string | ((prev: string) => string)) => void;
  refId: string;
  setRefId: (value: string | ((prev: string) => string)) => void;
}>({
  authTokenInLocalStorage: "",
  setAuthTokenInLocalStorage: () => {},
  authTokenInSessionStorage: "",
  setAuthTokenInSessionStorage: () => {},
  emailForOTP: "",
  setEmailForOTP: () => {},
  refId: "",
  setRefId: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const tokenInStore = useReadLocalStorage<string>(L_STORAGE_AUTH_TOKEN);
  const tokenInSession =
    typeof window !== "undefined"
      ? sessionStorage.getItem(L_STORAGE_AUTH_TOKEN)
      : null;

  const [authTokenInLocalStorage, setAuthTokenInLocalStorage] =
    useState<string>("");
  const [authTokenInSessionStorage, setAuthTokenInSessionStorage] =
    useState<string>("");
  const [emailForOTP, setEmailForOTP] = useState<string>("");
  const [refId, setRefId] = useState<string>("");

  useEffect(() => {
    setAuthTokenInLocalStorage(tokenInStore || "");
    setAuthTokenInSessionStorage(tokenInSession || "");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authTokenInLocalStorage,
        authTokenInSessionStorage,
        setAuthTokenInLocalStorage,
        setAuthTokenInSessionStorage,
        emailForOTP,
        setEmailForOTP,
        refId,
        setRefId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
