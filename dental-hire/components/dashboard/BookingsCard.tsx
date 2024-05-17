"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IComponent } from "@/utils/interfaces";
import { PATH_MAPPER } from "@/utils/constants";
import CardTemplate from "@/components/custom/CardTemplate";
import TabButton from "@/components/custom/buttons/TabButton";
import { List, ListItem, Typography } from "@/libraries/material-tailwind";
import StatusBadge from "@/components/custom/StatusBadge";
import moment from "@/libraries/moment";

const BOOKINGS = [
  {
    id: 1,
    label: "Marvel Dental",
    bookedAt: "2023-12-30T10:00:00",
    status: "pending",
  },
  {
    id: 2,
    label: "Hulen Crossing Dental",
    bookedAt: "2023-12-30T10:00:00",
    status: "completed",
  },
  {
    id: 3,
    label: "Oakheights Family Dental",
    bookedAt: "2023-12-30T10:00:00",
    status: "pending",
  },
  {
    id: 4,
    label: "G J Dental",
    bookedAt: "2023-12-30T10:00:00",
    status: "ongoing",
  },
  {
    id: 5,
    label: "G J Dental",
    bookedAt: "2023-12-30T10:00:00",
    status: "ongoing",
  },
];

export default function BookingsCard({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Today");

  function filterBookings() {
    switch (activeTab) {
      case "Today":
        return BOOKINGS;
      case "Past":
        return BOOKINGS.filter((booking) => booking.status === "completed");
      case "Future":
        return BOOKINGS.filter((booking) => booking.status === "pending");
      default:
        return BOOKINGS;
    }
  }

  return (
    <CardTemplate
      title="Bookings"
      className={className}
      actions={
        <Link href={PATH_MAPPER.bookings} className="underline text-lightDark">
          See All
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Today"}
            onClick={() => setActiveTab("Today")}
          >
            Today
          </TabButton>
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Future"}
            onClick={() => setActiveTab("Future")}
          >
            Future
          </TabButton>
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Past"}
            onClick={() => setActiveTab("Past")}
          >
            Past
          </TabButton>
        </div>

        <List placeholder="">
          {filterBookings().map((b, i) => (
            <ListItem
              placeholder=""
              key={b.id}
              className={`flex items-center justify-between${
                i !== BOOKINGS.length - 1 ? " border-b-2 border-[#F8F4FF]" : ""
              }`}
            >
              <div className="flex flex-col">
                <Typography
                  placeholder=""
                  className="text-dark text-base xl:text-lg font-semibold"
                >
                  {b.label}
                </Typography>
                <Typography
                  placeholder=""
                  className="text-lightDark text-sm xl:text-base"
                >
                  {moment(b.bookedAt).format("llll")}
                </Typography>
              </div>

              <StatusBadge status={b.status}>{b.status}</StatusBadge>
            </ListItem>
          ))}
        </List>
      </div>
    </CardTemplate>
  );
}
