import { ICalEvent } from "@/utils/interfaces";
import { ReactNode, createContext, useContext, useState } from "react";

export const CalendarContext = createContext<{
  events: Array<ICalEvent>;
  setEvents: (
    value: Array<ICalEvent> | ((prev: Array<ICalEvent>) => Array<ICalEvent>)
  ) => void;
}>({
  events: [],
  setEvents: () => {},
});

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Array<ICalEvent>>([]);

  return (
    <CalendarContext.Provider value={{ events, setEvents }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
