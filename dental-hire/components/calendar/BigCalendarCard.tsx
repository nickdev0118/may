"use client";
import { useMemo, useState } from "react";
import CardTemplate from "@/components/custom/CardTemplate";
import { BigCalendar, momentLocalizer } from "@/libraries/react-big-calendar";
import moment from "@/libraries/moment";
import { Icon } from "@/libraries/iconify-react";
import {
  Dialog,
  DialogBody,
  DialogProps,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@/libraries/material-tailwind";
import { TEMP_CALENDAR_EVENTS } from "@/utils/tempData";
import { ICON_MAPPER, SCREEN_MAPPER } from "@/utils/constants";
import WeekDay from "@/components/calendar/WeekDay";
import EventItem from "@/components/calendar/EventItem";
import ScheduleDialog from "@/components/calendar/ScheduleDialog";
import SmallCalendar from "@/components/calendar/SmallCalendar";
import { useMediaQuery } from "@/libraries/usehooks-ts";
import RequestBooking from "../subscription/RequestBooking";
import { IProfessional } from "@/utils/interfaces";


const localizer = momentLocalizer(moment);
const currentDate = new Date();

interface IProps{
  profile: IProfessional,
}

export default function BigCalendarCard({profile} : IProps) {
  const isSm = useMediaQuery(`(max-width: ${SCREEN_MAPPER.sm})`);
  const isMd = useMediaQuery(`(max-width: ${SCREEN_MAPPER.md})`);
  const isLg = useMediaQuery(`(max-width: ${SCREEN_MAPPER.lg})`);
  const isXl = useMediaQuery(`(max-width: ${SCREEN_MAPPER.xl})`);

  const dialogSize = useMemo<DialogProps["size"]>(() => {
    if (isSm) return "xl";
    if (isMd) return "md";
    if (isLg) return "lg";
    if (isXl) return "xl";
    return "xs";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [smallCalendarOpened, setSmallCalendarOpened] =
    useState<boolean>(false);
  const [sCalDialogOpened, setSCalDialogOpened] = useState<boolean>(false);

  const handleDialogOpened = (date: Date) => {
    setSelectedDate(date);
    setDialogOpened(true);
  };

  const handleSmallCalendarOpened = () => {
    setSmallCalendarOpened((prev) => !prev);
  };

  const handleSCalDialogOpened = () => {
    setSCalDialogOpened((prev) => !prev);
  };

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
    <>
      <CardTemplate
        title={`Today ${moment(currentDate).format("ll")}`}
        actions={
          <>
            <IconButton
              placeholder=""
              variant="outlined"
              className="border-gray-200 text-secondary text-2xl block md:hidden"
              onClick={() => setSCalDialogOpened(true)}
            >
              <Icon icon={ICON_MAPPER.calendar} />
            </IconButton>

            <Menu
              open={smallCalendarOpened}
              handler={handleSmallCalendarOpened}
            >
              <MenuHandler>
                <div className="items-center gap-4 border border-lightDark/20 rounded-lg py-1 px-2 hidden md:flex">
                  <Icon
                    icon={ICON_MAPPER.leftArrow}
                    className="text-secondary text-sm"
                  />
                  <div className="flex items-center gap-1 cursor-pointer">
                    <Icon
                      icon={ICON_MAPPER.calendar}
                      className="text-secondary"
                    />
                    <Typography
                      placeholder=""
                      className="text-sm text-dark font-semibold"
                    >
                      Today
                    </Typography>
                  </div>
                  <Icon
                    icon={ICON_MAPPER.rightArrow}
                    className="text-secondary text-sm"
                  />
                </div>
              </MenuHandler>
              <MenuList placeholder="" className="hidden md:block">
                <SmallCalendar
                  date={selectedDate}
                  pickPrevMonth={pickPrevMonth}
                  pickNextMonth={pickNextMonth}
                />
              </MenuList>
            </Menu>
          </>
        }
        className="h-full"
      >
        <BigCalendar
          date={selectedDate}
          localizer={localizer}
          events={TEMP_CALENDAR_EVENTS}
          step={60}
          showMultiDayTimes
          components={{
            toolbar: () => <></>,
            month: {
              header: WeekDay,
              event: EventItem,
            },
          }}
          onNavigate={handleDialogOpened}
        />
      </CardTemplate>
      <RequestBooking 
        opened={dialogOpened}
        setOpened={setDialogOpened}
        profile={profile}
        size="md"
      />
      {/* <ScheduleDialog
        opened={dialogOpened}
        setOpened={setDialogOpened}
        date={selectedDate}
        size={dialogSize}
      /> */}
      <Dialog
        placeholder=""
        open={sCalDialogOpened}
        handler={handleSCalDialogOpened}
        size={dialogSize}
      >
        <DialogBody placeholder="">
          <SmallCalendar
            date={selectedDate}
            pickPrevMonth={pickPrevMonth}
            pickNextMonth={pickNextMonth}
          />
        </DialogBody>
      </Dialog>
    </>
  );
}
