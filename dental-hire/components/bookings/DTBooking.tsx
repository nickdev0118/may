"use client";

import React from "react";
import { Typography, ListItem } from "@/libraries/material-tailwind";
import { TEMP_BOOKING } from "@/utils/tempData";
import { IconButton } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import moment from "moment";
import StatusBadge from "../custom/StatusBadge";

interface IProps {
  filterBookings: Function;
}

export default function DTBooking({ filterBookings }: IProps) {
  return (
    <div className="px-4">
      <div className="grid grid-cols-10 px-3">
        <Typography
          placeholder=""
          className="text-dark text-lg font-semibold col-span-3"
        >
          Date & Time
        </Typography>
        <Typography
          placeholder=""
          className="text-dark text-lg font-semibold col-span-3"
        >
          Booking with
        </Typography>
        <Typography
          placeholder=""
          className="text-dark text-lg font-semibold col-span-3"
        >
          Hourly Rate
        </Typography>
        <Typography
          placeholder=""
          className="text-dark text-lg font-semibold col-span-1 text-center"
        >
          Message
        </Typography>
      </div>
      <div>
        {filterBookings().map((b: any, i: number) => (
          <ListItem
            placeholder=""
            key={b.id}
            className={`grid grid-cols-10 items-center justify-between${
              i !== TEMP_BOOKING.length - 1
                ? " border-b-2 border-[#F8F4FF]"
                : ""
            }`}
          >
            <Typography
              placeholder=""
              className="text-lightDark text-sm col-span-3"
            >
              {moment(b.bookedDateTime).format("llll")}
            </Typography>
            <Typography
              placeholder=""
              className="text-lightDark text-sm col-span-3"
            >
              {b?.bookingWith || ""}
            </Typography>
            <Typography
              placeholder=""
              className="text-lightDark text-sm col-span-3"
            >
              {b?.hourlyRate || ""}
            </Typography>

            <div className="flex justify-center text-lightDark text-sm col-span-1">
              <IconButton placeholder="" variant="text">
                <Icon
                  icon={ICON_MAPPER.message}
                  className="text-primary text-2xl transition"
                />
              </IconButton>
            </div>

            {/* <StatusBadge status={b.status}>{b.status}</StatusBadge> */}
          </ListItem>
        ))}
      </div>
    </div>
  );
}
