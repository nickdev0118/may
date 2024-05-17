"use client"

import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@/libraries/material-tailwind";
import Button from "@/components/custom/buttons/Button";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, PATHNAME_MAPPER, PATH_MAPPER } from "@/utils/constants";
import IndividualProfessionalDialog from "./IndividualProfessionalDialog";
import { IProfessional } from "@/utils/interfaces";
import Link from "next/link";
import moment from "moment";

interface IProps {
  filterProfessionals: () => IProfessional[];
}

const renderStars = (rate: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars.push(
        <Icon
          key={i}
          icon="material-symbols:star"
          className="text-base sm:text-xl text-primary"
        />
      );
    } else if (i - 0.5 === rate) {
      stars.push(
        <Icon
          key={i}
          icon="material-symbols:star-half"
          className="text-base sm:text-xl text-primary"
        />
      );
    } else {
      stars.push(
        <Icon
          key={i}
          icon="material-symbols:star-outline"
          className="text-xl text-[#F6F4F9]"
        />
      );
    }
  }
  return stars;
};

export default function FindProfessionalDialog({
  filterProfessionals,
}: IProps) {
  const [
    individualProfessionalDialogOpened,
    setIndividualProfessionalDialogOpened,
  ] = useState<boolean>(false);

  const [selectedProfessional, setSelectedProfessional] = useState<
    IProfessional | undefined
  >(undefined);

  const [count, setCount] = useState<number>(0);
  const [userId, setUserId] = useState<string>();

  const handleDialog = (id : string, index : number) => {
    const selected = filterProfessionals()[index];
    if (selected) {
      setIndividualProfessionalDialogOpened((prev) => !prev);
      // setSelectedProfessional(selected);
      setUserId(id);
    }
  };

  useEffect(() => {
    setCount(filterProfessionals().length);
    filterProfessionals().sort((itemA: IProfessional, itemB: IProfessional) => 
    itemA?.lastLoginAt?.localeCompare(itemB?.lastLoginAt)
  )
  }, [filterProfessionals])

  return (
    <div>
      <Typography placeholder="" className="text-dark text-base pb-6">
        <span className="font-bold">{count}</span> Professionals match your needs
        and are located near your practice !
      </Typography>
      <div className="grid grid-cols-2 gap-2">
        {count != 0 && filterProfessionals().map((item: IProfessional, index: number) => (
          <div
            key={item.id}
            className="col-span-2 xl:col-span-1 p-6 bg-[#FCFCFD] rounded-lg"
          >
            <div className="flex justify-between gap-2">
              <div className="flex gap-4 items-cebter">
                <div className="relative">
                  <Avatar
                    variant="rounded"
                    src={item.avatar || "/assets/images/profile.png"}
                    alt=""
                    className={`w-[58px] h-[58px] sm:w-[94px] sm:h-[94px]`}
                    placeholder=""
                  />
                  <div
                    className={`absolute w-6 h-6 rounded-full border-4 border-white right-[-5px] top-[-5px] flex justify-center items-center ${
                      item.isFavorite === true ? "bg-[#FFD6DD]" : "bg-[#EAE7F1]"
                    }`}
                  >
                    <Icon
                      icon={ICON_MAPPER.heart}
                      className={`w-3 h-3 ${
                        item.isFavorite === true ? "text-[#FF3257]" : "text-[#B6AACA]"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <Typography
                    placeholder=""
                    className="text-dark text-sm sm:text-xl font-bold"
                  >
                    {item?.name || "-"}
                  </Typography>
                  <Typography
                    placeholder=""
                    className="text-lightDark text-xs sm:text-sm"
                  >
                    {item?.type || "-"}
                  </Typography>
                  <div className="flex items-center">
                    {renderStars(parseFloat(item?.rate))}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex justify-between items-center gap-4">
                <Button
                  variant="outlined"
                  color="secondary"
                  className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                >
                  <Link href={PATH_MAPPER?.messages}>
                    Send A Message
                  </Link>
                </Button>
                <Button
                  variant="filled"
                  color="secondary"
                  className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                  onClick={() => handleDialog(item.id, index)}
                >
                  View Profile
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <Typography placeholder="" className="text-lightDark text-sm">
                Skills
              </Typography>
              <div className="flex flex-wrap gap-2 pl-2 pt-2">
                { item.skills.length == 0 ? "-" :
                  item.skills.map((itemskil) => (
                  <Typography
                  placeholder=""
                  className="text-secondary text-sm bg-[#FFF9FA] px-2"
                  key={itemskil.id}
                  >
                    {itemskil?.title || ""} : {itemskil?.level || ""}
                  </Typography>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 pt-6">
              <div className="col-span-3 sm:col-span-1">
                <Typography
                  placeholder=""
                  className="text-lightDark text-xs sm:text-sm"
                >
                  Distance
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark text-sm font-semibold"
                >
                  { item?.distance ? `${item?.distance} miles` : "-" }
                </Typography>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Typography
                  placeholder=""
                  className="text-lightDark  text-xs sm:text-sm"
                >
                  Rate
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark text-sm font-semibold"
                >
                  {item?.hourlyRate ? `$${item?.hourlyRate}/hr` : "-"}
                </Typography>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Typography
                  placeholder=""
                  className="text-lightDark  text-xs sm:text-sm"
                >
                  Bookings
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark  text-xs sm:text-sm font-semibold"
                >
                  {item?.bookings || "-"}
                </Typography>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Typography placeholder="" className="text-lightDark text-sm">
                  Late-Cancel
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark  text-xs sm:text-sm font-semibold"
                >
                  {item?.lateCancel || "-"}
                </Typography>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Typography placeholder="" className="text-lightDark text-sm">
                  No Shows
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark  text-xs sm:text-sm font-semibold"
                >
                  {item?.shows || "-"}
                </Typography>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Typography placeholder="" className="text-lightDark text-sm">
                  Last Login
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark  text-xs sm:text-sm font-semibold"
                >
                  {moment(item?.lastLoginAt).startOf('day').fromNow() || "-"}
                </Typography>
              </div>
            </div>
            <div className="flex justify-around items-center gap-4 pt-4 sm:hidden">
              <Button
                variant="outlined"
                color="secondary"
                className="text-sm md:text-base py-1 px-2 md:py-2 md:px-3"
              >
                Send A Message
              </Button>
              <Button
                variant="filled"
                color="secondary"
                className="text-sm md:text-base py-1 px-2 md:py-2 md:px-3"
              >
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
      {(individualProfessionalDialogOpened && userId) && (
        <IndividualProfessionalDialog
          // item={selectedProfessional}
          individualProfessionalDialogOpened={
            individualProfessionalDialogOpened
          }
          setIndividualProfessionalDialogOpened={
            setIndividualProfessionalDialogOpened
          }
          userId = {userId}
          size="xl"
          renderStars={renderStars}
        />
      )}
    </div>
  );
}
