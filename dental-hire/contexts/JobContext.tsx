"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IJob, IExpYear, IPracticeType } from "@/utils/interfaces";

type TJobs = IJob[] | undefined;

export const JobContext = createContext<{
  jobs: TJobs | Object;
  setJobs: (value: TJobs | ((prev: TJobs) => TJobs) | Object | undefined) => void;
  expYears: IExpYear[];
  setExpYears: (value: IExpYear[]) => void;
  practiceTypes: IPracticeType[];
  setPracticeTypes: (value: IPracticeType[]) => void;
}>({
  jobs: [],
  setJobs: () => { },
  expYears: [],
  setExpYears: () => { },
  practiceTypes: [],
  setPracticeTypes: () => { }
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<TJobs | Object>([]);
  const [expYears, setExpYears] = useState<IExpYear[]>([]);
  const [practiceTypes, setPracticeTypes] = useState<IPracticeType[]>([]);

  return (
    <JobContext.Provider value={{ jobs, setJobs, expYears, setExpYears, practiceTypes, setPracticeTypes }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
