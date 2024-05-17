"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserData } from "@/utils/interfaces";
import api from "@/utils/api";
import { useAuth } from "./AuthContext";
import { isEqual } from "@/utils/functions";

type TUserData = IUserData | null;

export const UserContext = createContext<{
  userData: TUserData;
  setUserData: (value: TUserData | ((prev: TUserData) => TUserData)) => void;
}>({
  userData: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { authTokenInLocalStorage, authTokenInSessionStorage } = useAuth();
  const [userData, setUserData] = useState<TUserData>(null);

  useEffect(() => {
    if (
      (authTokenInLocalStorage != "" || authTokenInSessionStorage != "") &&
      !userData
    ) {
      api
        .get("/office/get/profile/info")
        .then((res) => {
          if (!userData || !isEqual(userData, res.data)) {
            setUserData(res.data);
          }
        })
        .catch(() => {});
    }
  }, [authTokenInLocalStorage, authTokenInSessionStorage, setUserData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
