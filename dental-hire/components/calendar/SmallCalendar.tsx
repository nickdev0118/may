import { ForwardedRef, forwardRef, useMemo } from "react";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { IconButton, Typography } from "@/libraries/material-tailwind";
import { Calendar } from "@/libraries/react-calendar";
import { ICON_MAPPER, SHORT_WEEKDAYS } from "@/utils/constants";
import Button from "@/components/custom/buttons/Button";

interface IProps extends IComponent {
  date: Date;
  pickPrevMonth: () => void;
  pickNextMonth: () => void;
}

const SmallCalendar = forwardRef<HTMLDivElement, IProps>(
  (
    { className = "", date, pickPrevMonth, pickNextMonth }: IProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const monthYear = useMemo(() => {
      const formatter = new Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "long",
      });
      return formatter.format(date).replaceAll(".", "");
    }, [date]);

    return (
      <div className={`flex flex-col gap-4 ${className}`} ref={ref}>
        <div className="flex md:hidden items-center justify-between">
          <Typography
            placeholder=""
            variant="h5"
            className="text-lg font-bold text-dark"
          >
            Calendar
          </Typography>
          <div className="border border-lightDark border-opacity-30 rounded-lg py-1 px-2 flex items-center">
            <IconButton
              placeholder=""
              variant="text"
              className="w-4 h-4 text-secondary"
              onClick={pickPrevMonth}
            >
              <Icon icon={ICON_MAPPER.leftArrow} />
            </IconButton>
            <Typography placeholder="" className="text-sm font-semibold">
              {monthYear}
            </Typography>
            <IconButton
              placeholder=""
              variant="text"
              className="w-4 h-4 text-secondary"
              onClick={pickNextMonth}
            >
              <Icon icon={ICON_MAPPER.rightArrow} />
            </IconButton>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between">
          <IconButton
            placeholder=""
            variant="text"
            className="w-6 h-6 text-secondary text-base"
            onClick={pickPrevMonth}
          >
            <Icon icon={ICON_MAPPER.leftArrow} />
          </IconButton>
          <Typography placeholder="" className="text-lg font-bold text-dark">
            {monthYear}
          </Typography>
          <IconButton
            placeholder=""
            variant="text"
            className="w-6 h-6 text-secondary text-base"
            onClick={pickNextMonth}
          >
            <Icon icon={ICON_MAPPER.rightArrow} />
          </IconButton>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Calendar
            className="!border-none !text-xl !font-sans"
            showNavigation={false}
            formatShortWeekday={(_, date) => SHORT_WEEKDAYS[date.getDay()]}
            calendarType="gregory"
            value={date}
          />
          <button className="underline text-lightDark hidden md:block">
            Clear Selection
          </button>
          <Button
            variant="text"
            color="secondary"
            className="flex md:hidden items-center"
          >
            <Icon icon={ICON_MAPPER.plus} className="text-lg" />
            Add Schedule
          </Button>
        </div>
      </div>
    );
  },
);

SmallCalendar.displayName = "SmallCalendar";

export default SmallCalendar;
