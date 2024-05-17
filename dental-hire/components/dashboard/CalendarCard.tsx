"use client";
import { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { ICON_MAPPER, SHORT_WEEKDAYS } from "@/utils/constants";
import CardTemplate from "@/components/custom/CardTemplate";
import { Calendar } from "@/libraries/react-calendar";
import MonthPick from "@/components/custom/MonthPick";

export default function CalendarCard({ className = "" }: IComponent) {
  const [date, setDate] = useState<Date>(new Date());

  const prevMonth = () => {
    setDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <CardTemplate
      title="Calendar"
      actions={
        <MonthPick
          pickPrevMonth={prevMonth}
          pickNextMonth={nextMonth}
          date={date}
        />
      }
      className={className}
    >
      <div className="flex-1 flex flex-col items-center justify-between">
        <Calendar
          className="!border-none !text-xl !font-sans"
          showNavigation={false}
          formatShortWeekday={(_, date) => SHORT_WEEKDAYS[date.getDay()]}
          calendarType="gregory"
          value={date}
        />
      </div>
    </CardTemplate>
  );
}
