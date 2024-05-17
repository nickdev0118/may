import axios from "axios";
import { PATHS_BEFORE_AUTH } from "./constants";
import { TLayout } from "./types";

export const getLayout = (pathname: string): TLayout => {
  if (PATHS_BEFORE_AUTH.includes(pathname)) {
    return "auth";
  }
  return "dashboard";
};

export const ellipsisString = (str: string, maxLen: number): string => {
  if (str.length > maxLen) {
    return `${str.slice(0, maxLen - 1)}...`;
  }
  return str;
};

export function calculateTruePercentage(obj: { [key: string]: boolean }) {
  if (!obj) {
    return 0; // or handle this case based on your requirements
  }

  let trueCount = Object.values(obj).filter((value) => value === true).length;
  let totalCount = Object.keys(obj).length;
  return (trueCount / totalCount) * 100;
}

export function isEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const isAuthLayout = (pathname: string): boolean => {
  if (PATHS_BEFORE_AUTH.includes(pathname)) {
    return true;
  }
  return false;
};

export const getErrorMessage = (err: Error): string => {
  return axios.isAxiosError(err)
    ? `${err.response?.status}: ${err.response?.data.message}`
    : "Ooops! Something went wrong.";
};
