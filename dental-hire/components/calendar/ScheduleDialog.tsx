import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dialog, DialogBody, Typography } from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { SCHEDULE_TIMES } from "@/utils/constants";
import moment from "@/libraries/moment";
import { Radio } from "@/libraries/material-tailwind";
import Select from "@/components/custom/Select";
import Button from "@/components/custom/buttons/Button";
import MonthPick from "@/components/custom/MonthPick";
import DeleteDialog from "./DeleteDialog";

interface IProps {
  opened: boolean;
  setOpened: Function;
  date: Date;
  size: DialogProps["size"];
}

type TAvailiability = "unavailable" | "custom" | "typical";
type TDateWeek = {
  date: number;
  weekDay: string;
};

export default function ScheduleDialog({
  opened,
  setOpened,
  date,
  size,
}: IProps) {
  const [fromTime, setFromTime] = useState<string>(SCHEDULE_TIMES[0]);
  const [toTime, setToTime] = useState<string>(SCHEDULE_TIMES[1]);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [availability, setAvailibility] =
    useState<TAvailiability>("unavailable");
  const [delDialogOpened, setDelDialogOpened] = useState<boolean>(false);

  const fromDateWeeks = useMemo<Array<TDateWeek>>(() => {
    const maxDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth() + 1,
      0
    ).getDate();
    const dates = [];

    for (let i = 1; i <= maxDate; i += 1) {
      dates.push({
        date: i,
        weekDay: moment(
          new Date(fromDate.getFullYear(), fromDate.getMonth(), i)
        ).format("ddd"),
      });
    }

    return dates;
  }, [fromDate]);

  const toDateWeeks = useMemo<Array<TDateWeek>>(() => {
    const maxDate = new Date(
      toDate.getFullYear(),
      toDate.getMonth() + 1,
      0
    ).getDate();
    const dates = [];

    for (let i = 1; i <= maxDate; i += 1) {
      dates.push({
        date: i,
        weekDay: moment(
          new Date(toDate.getFullYear(), toDate.getMonth(), i)
        ).format("ddd"),
      });
    }

    return dates;
  }, [toDate]);

  const handleFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    setFromTime(e.target.value);
  };

  const handleTo = (e: ChangeEvent<HTMLSelectElement>) => {
    setToTime(e.target.value);
  };

  const handler = () => {
    setOpened(!opened);
    setDelDialogOpened(true);
  };

  const pickPrevMonthOfFromDate = () => {
    setFromDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const pickNextMonthOfFromDate = () => {
    setFromDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const pickPrevMonthOfToDate = () => {
    setToDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const pickNextMonthOfToDate = () => {
    setToDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <>
      <Dialog placeholder="" open={opened} handler={handler} size={size}>
        <DialogBody
          placeholder=""
          className="px-4 lg:px-6 py-7 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <Typography
              placeholder=""
              variant="h2"
              className="text-2xl font-bold text-dark"
            >
              Exception to availability
            </Typography>
            <Typography
              placeholder=""
              className="font-semibold text-sm text-dark"
            >
              Date: {moment(date).format("ll")}
            </Typography>
          </div>

          {availability === "custom" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-lightDark">From</span>
                <MonthPick
                  date={fromDate}
                  pickPrevMonth={pickPrevMonthOfFromDate}
                  pickNextMonth={pickNextMonthOfFromDate}
                />
              </div>
              <Swiper
                spaceBetween={10}
                slidesPerView={5}
                className="w-full pr-1"
              >
                {fromDateWeeks.map((dw) => (
                  <SwiperSlide
                    key={dw.date}
                    onClick={() =>
                      setFromDate(
                        new Date(
                          fromDate.getFullYear(),
                          fromDate.getMonth(),
                          dw.date
                        )
                      )
                    }
                  >
                    <div
                      className={`rounded-lg p-4 flex flex-col items-center border ${
                        fromDate.getDate() === dw.date
                          ? "border-primary text-primary bg-primary/5 font-semibold"
                          : "border-gray-200 text-lightDark"
                      }`}
                    >
                      <span>{dw.date}</span>
                      <span>{dw.weekDay}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex items-center justify-between">
                <span className="text-lightDark">To</span>
                <MonthPick
                  date={toDate}
                  pickPrevMonth={pickPrevMonthOfToDate}
                  pickNextMonth={pickNextMonthOfToDate}
                />
              </div>
              <Swiper
                spaceBetween={10}
                slidesPerView={5}
                className="w-full pr-1"
              >
                {toDateWeeks.map((dw) => (
                  <SwiperSlide
                    key={dw.date}
                    onClick={() =>
                      setToDate(
                        new Date(
                          toDate.getFullYear(),
                          toDate.getMonth(),
                          dw.date
                        )
                      )
                    }
                  >
                    <div
                      className={`rounded-lg p-4 flex flex-col items-center border ${
                        toDate.getDate() === dw.date
                          ? "border-primary text-primary bg-primary/5 font-semibold"
                          : "border-gray-200 text-lightDark"
                      }`}
                    >
                      <span>{dw.date}</span>
                      <span>{dw.weekDay}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="flex flex-col items-start gap-2">
            <Radio
              crossOrigin=""
              name="availability"
              label={
                <Typography
                  placeholder=""
                  className="text-sm font-semibold text-lightDark"
                >
                  Set to unavailable
                </Typography>
              }
              className="border-primary checked:border-primary checked:before:border-primary before:bg-primary checked:before:bg-primary text-primary"
              iconProps={{
                className: "text-primary",
              }}
              checked={availability === "unavailable"}
              onChange={() => setAvailibility("unavailable")}
            />

            <hr className="bg-lightDark w-full" />

            <div className="flex flex-col items-start gap-1">
              <Typography
                placeholder=""
                className="text-sm font-semibold text-lightDark px-2"
              >
                Set to available at these items
              </Typography>

              <div className="flex items-center gap-2">
                <Radio
                  crossOrigin=""
                  name="availability"
                  label={
                    <Typography
                      placeholder=""
                      className="text-sm font-semibold text-lightDark"
                    >
                      From:
                    </Typography>
                  }
                  className="border-primary checked:border-primary checked:before:border-primary before:bg-primary checked:before:bg-primary text-primary"
                  iconProps={{
                    className: "text-primary",
                  }}
                  checked={availability === "custom"}
                  onChange={() => setAvailibility("custom")}
                />
                <Select value={fromTime} onChange={handleFrom}>
                  {SCHEDULE_TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <Typography
                  placeholder=""
                  className="text-sm font-semibold text-lightDark"
                >
                  To:
                </Typography>
                <Select value={toTime} onChange={handleTo}>
                  {SCHEDULE_TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <hr className="bg-lightDark w-full" />

            <Radio
              crossOrigin=""
              name="availability"
              label={
                <Typography
                  placeholder=""
                  className="text-sm font-semibold text-lightDark"
                >
                  Use availability as set in{" "}
                  <Link href="#" className="underline text-primary">
                    Typical Availability
                  </Link>
                </Typography>
              }
              className="border-primary checked:border-primary checked:before:border-primary before:bg-primary checked:before:bg-primary text-primary"
              iconProps={{
                className: "text-primary",
              }}
              checked={availability === "typical"}
              onChange={() => setAvailibility("typical")}
            />
          </div>
          <div className="flex items-start gap-2 justify-end w-full">
            <Button
              variant="outlined"
              color="lightDark"
              className="text-sm px-3 py-2"
              onClick={handler}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              color="secondary"
              className="text-sm px-5 py-2"
              onClick={handler}
            >
              Save
            </Button>
          </div>
        </DialogBody>
      </Dialog>
      <DeleteDialog
        opened={delDialogOpened}
        setOpened={setDelDialogOpened}
        dialogSize={size}
      />
    </>
  );
}
