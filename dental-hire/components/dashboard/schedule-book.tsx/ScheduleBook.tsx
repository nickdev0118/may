import { useEffect, useState } from "react";

import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import Button from "@/components/custom/buttons/Button";

import SmallCalendar from "@/components/calendar/SmallCalendar";

const currentDate = new Date();

const TIMING = [
    {
        id: 1,
        label: "9:00 AM - 10:00 AM",
    },
    {
        id: 2,
        label: "10:00 AM - 11:00 AM",
    },
    {
        id: 3,
        label: "11:00 AM - 12:00 PM",
    },
    {
        id: 4,
        label: "12:00 PM - 01:00 PM",
    },
    {
        id: 5,
        label: "02:00 PM - 03:00 PM",
    },
    {
        id: 6,
        label: "03:00 AM - 04:00 PM",
    },
    {
        id: 7,
        label: "04:00 AM - 05:00 PM",
    },
    {
        id: 8,
        label: "05:00 AM - 06:00 PM",
    },
    {
        id: 9,
        label: "06:00 AM - 07:00 PM",
    },
    {
        id: 10,
        label: "07:00 AM - 08:00 PM",
    }
]

interface IProps extends IComponent {
  job: number;
  bookNow: boolean;
  setBookNow: React.Dispatch<React.SetStateAction<boolean>>;
  size?: DialogProps["size"];
}

const ScheduleBook: React.FC<IProps> = ({
  job,
  bookNow,
  setBookNow,
  size = "md",
}: IProps) => {
  const handler = () => {
    setBookNow(!bookNow);
  };

  const [selectedDate, setSelectedDate] = useState(currentDate);


const pickPrevMonth = () => {
    setSelectedDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const pickNextMonth = () => {
    setSelectedDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
      <Dialog
        placeholder=""
        handler={handler}
        open={bookNow}
        size={size}
        className="flex flex-col h-[80%] overflow-y-auto py-3 xl:py-6 px-5 xl:px-10"
      >
        <DialogBody placeholder="">
          <div className="flex justify-end">
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={handler}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </div>
          <Typography
          placeholder=""
          className="text-dark text-xl xl:text-4xl font-semibold py-4"
          >
            Schedule A Demo
          </Typography>
          <div className="grid grid-cols-2 gap-2">
            <SmallCalendar 
                date={currentDate}
                pickPrevMonth={pickPrevMonth}
                pickNextMonth={pickNextMonth}
            />
            <div>
                <Typography
                placeholder=""
                className="text-dark text-lg font-semibold pb-2"
                >
                    Select Your Convenient Time
                </Typography>
                <div className="flex flex-row flex-wrap justify-around">
                    {TIMING.map((hours) => (
                        <div key={hours.id}>
                        <Button variant="outlined" color="dark" className="text-xs px-2 py-4 my-2">
                        {hours.label}
                        </Button>
                        </div>
                    ))}
                </div>
            </div>
          </div>
          <div className="w-full rounded-lg mt-5">
            <div className="flex justify-end">
              <Button variant="filled" color="secondary" className="text-xs">
                Schedule
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
  );
};

export default ScheduleBook;
