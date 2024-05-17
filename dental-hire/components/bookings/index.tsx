"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { IComponent, ITabitem } from "@/utils/interfaces";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import { IconButton, Tooltip } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { IBooking } from "@/utils/interfaces";
import CalendarCard from "../dashboard/CalendarCard";
import DTBooking from "./DTBooking";
import MBBooking from "./MBBooking";
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import { toast } from "react-toastify";
import { UserContext } from "@/contexts/UserContext";

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "Today",
  },
  {
    id: 2,
    label: "Past",
  },
  {
    id: 3,
    label: "Future",
  },
];

export default function BookingCard({ className = "" }: IComponent) {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { userData } = useContext(UserContext);

  const toggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (!tooltipRef.current ||
          !tooltipRef.current.contains(event.target as Node)) &&
        (!iconButtonRef.current ||
          !iconButtonRef.current.contains(event.target as Node)) &&
        (!calendarRef.current ||
          !calendarRef.current.contains(event.target as Node))
      ) {
        setIsTooltipOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!userData || userData?.userType == 2) return;
    api.post("/jobs/office/bookings")
      .then(res => {
        if (res.data) {
          setBookings(res.data)
        }
      }).catch(err => {
        toast.error(getErrorMessage(err));
      })
  }, [])

  function filterBookings(): IBooking[] {
    switch (activeTab) {
      case "Today":
        return bookings;
      case "Past":
        return bookings.filter((booking) => booking.status === "completed");
      case "Future":
        return bookings.filter((booking) => booking.status === "pending");
      default:
        return bookings;
    }
  }

  return (
    <CardTemplate
      title="Bookings"
      className={`${className} col-span-9`}
      actions={
        <div ref={tooltipRef}>
          <Tooltip
            placement="bottom-start"
            content={
              isTooltipOpen ? (
                <div ref={calendarRef}>
                  <CalendarCard />
                </div>
              ) : null
            }
            className={`bg-white py-3 px-4 ${isSmallScreen ? "tooltip-center-small-screen" : ""
              }`}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            open={isTooltipOpen}
            dismiss={{
              itemPress: false,
            }}
          >
            <IconButton
              placeholder=""
              variant="text"
              onClick={toggleTooltip}
              ref={iconButtonRef}
            >
              <Icon
                icon="solar:calendar-bold"
                className="text-2xl text-[#FF817B] active:text-[#e76761] hover:text-[#e76761] transition"
              />
            </IconButton>
          </Tooltip>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {TAB_ITEMS.map((item: ITabitem) => (
            <TabButton
              key={item.id}
              className="font-semibold"
              isActive={activeTab === item.label}
              onClick={() => setActiveTab(item.label)}
            >
              {item.label}
            </TabButton>
          ))}
        </div>
        <div className="hidden lg:block">
          <DTBooking filterBookings={filterBookings} />
        </div>
        <div className="block lg:hidden">
          <MBBooking filterBookings={filterBookings} />
        </div>
      </div>
    </CardTemplate>
  );
}
