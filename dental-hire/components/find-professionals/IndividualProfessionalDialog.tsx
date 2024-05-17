"use client";

import React, { useEffect, useState } from "react";
import TabButton from "../custom/buttons/TabButton";
import { IComponent, IProfessional } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
  Avatar,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import BigCalendarCard from "../calendar/BigCalendarCard";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import LeaveReviewDialog from "./LeaveReviewDialog";
import moment from "moment";
import Link from "next/link";

interface IProps extends IComponent {
  item?: IProfessional;
  individualProfessionalDialogOpened: boolean;
  userId: string;
  setIndividualProfessionalDialogOpened: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  size?: DialogProps["size"];
  renderStars: (rate: number) => React.ReactNode;
}

const IndividualProfessionalDialog: React.FC<IProps> = ({
  item,
  individualProfessionalDialogOpened,
  setIndividualProfessionalDialogOpened,
  userId,
  size = "xl",
  renderStars,
}: IProps) => {
  const handler = () => {
    setIndividualProfessionalDialogOpened(false);
  };
  const [activeTab, setActiveTab] = useState<string>("Reviews Received");
  const [individualProfile, setIndividualProfile] = useState<IProfessional>();
  const [leaveReview, setLeaveReview] = useState<boolean>(false);

  const handleReview = (jobid: string | undefined) => {
    setLeaveReview(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      api
        .post("/office/professional/info", {
          id: userId,
        })
        .then((res) => {
          setIndividualProfile(res.data);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={individualProfessionalDialogOpened}
        size={size}
        className="h-[90%] overflow-y-auto"
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
          {individualProfile && (
            <div className="grid grid-cols-2" key={individualProfile.id}>
              <div className="col-span-2 xl:col-span-1">
                <div className="p-6 bg-[#FCFCFD] rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                      <Avatar
                        variant="rounded"
                        src={
                          individualProfile.avatar ||
                          "/assets/images/profile.png"
                        }
                        alt=""
                        className={`w-[132px] h-[132px]`}
                        placeholder=""
                      />
                      <div className="flex flex-col justify-between h-full">
                        <Typography
                          placeholder=""
                          className="text-dark text-sm sm:text-xl font-bold"
                        >
                          {individualProfile.name || "Profile Name"}
                        </Typography>
                        <Typography
                          placeholder=""
                          className="text-lightDark text-xs sm:text-sm"
                        >
                          {individualProfile.type || "-"}
                        </Typography>
                        <div className="flex items-center">
                          {renderStars(parseFloat(individualProfile.rate))}
                        </div>
                        <Typography
                          placeholder=""
                          className="text-lightDark text-xs sm:text-sm"
                        >
                          Dental Jobs Provider{" "}
                          <span className="text-primary">
                            {individualProfile.jobProvider || "-"}
                          </span>
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Typography
                        placeholder=""
                        className="text-primary text-xl font-bold"
                      >
                        {individualProfile.hourlyRate
                          ? `$${individualProfile.hourlyRate}/hr`
                          : "-"}
                      </Typography>
                      <div className="ml-auto">
                        <Button
                          variant="filled"
                          color="secondary"
                          className="py-1 px-3 mx-4 h-[40px] text-md sm:text:sm ml-auto"
                        >
                          <Link href={PATH_MAPPER?.messages}>
                            {" "}
                            Send a message{" "}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm"
                    >
                      Background
                    </Typography>
                    <Typography placeholder="" className="text-dark text-sm">
                      {individualProfile.bio || "-"}
                    </Typography>
                  </div>

                  <div className="pt-6">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm"
                    >
                      Skills
                    </Typography>
                    <div className="flex flex-wrap gap-4 pl-2 pt-4">
                      {individualProfile.skills.length == 0
                        ? "-"
                        : individualProfile.skills.map((itemskil) => (
                            <Typography
                              placeholder=""
                              className="text-secondary text-sm bg-[#FFF9FA] p-2"
                              key={itemskil.id}
                            >
                              {itemskil.title} : {itemskil.level}
                            </Typography>
                          ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 pt-6">
                    <div className="col-span-2">
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
                        {individualProfile.distance
                          ? `${individualProfile.distance} miles`
                          : "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-xs sm:text-sm"
                      >
                        Bookings
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark text-sm font-semibold"
                      >
                        {individualProfile.bookings || "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark  text-xs sm:text-sm"
                      >
                        Worked
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark text-sm font-semibold"
                      >
                        {individualProfile.workedHours || "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm"
                      >
                        Last Login
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark  text-xs sm:text-sm font-semibold"
                      >
                        {moment(individualProfile.lastLoginAt)
                          .startOf("day")
                          .fromNow() || "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm"
                      >
                        Late-Cancel
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark  text-xs sm:text-sm font-semibold"
                      >
                        {individualProfile.lateCancel || "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm"
                      >
                        No Shows
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark  text-xs sm:text-sm font-semibold"
                      >
                        {individualProfile.shows || "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm"
                      >
                        Education
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark  text-xs sm:text-sm font-semibold"
                      >
                        {individualProfile.Education || "-"}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm"
                      >
                        Licenced in
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-dark  text-xs sm:text-sm font-semibold"
                      >
                        {individualProfile.licencedIn || "-"}
                      </Typography>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm"
                    >
                      Languages
                    </Typography>
                    <div className="flex gap-2">
                      {individualProfile.languages.length == 0
                        ? "-"
                        : individualProfile.languages.map((item: any) => (
                            <Typography
                              key={item.id}
                              placeholder=""
                              className="text-dark  text-xs sm:text-sm font-semibold"
                            >
                              {item.title || "-"} ({item.level || "-"})
                            </Typography>
                          ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <TabButton
                      className="font-semibold"
                      isActive={activeTab === "Reviews Received"}
                      onClick={() => setActiveTab("Reviews Received")}
                    >
                      Reviews Received
                    </TabButton>
                    <TabButton
                      className="font-semibold"
                      isActive={activeTab === "Reviews of Offices"}
                      onClick={() => setActiveTab("Reviews of Offices")}
                    >
                      Reviews of Offices
                    </TabButton>
                  </div>
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-1 px-3 mx-4 h-[40px] text-md sm:text:sm"
                    onClick={() => handleReview(item?.id)}
                  >
                    Leave A Review
                  </Button>
                </div>
              </div>
              <div className="col-span-2 xl:col-span-1 h-full">
                <BigCalendarCard profile={individualProfile} />
              </div>
              {leaveReview && (
                <LeaveReviewDialog
                  leaveReview={leaveReview}
                  setLeaveReview={setLeaveReview}
                  profile={individualProfile}
                  size={"sm"}
                />
              )}
            </div>
          )}
        </DialogBody>
      </Dialog>
      {/* {requestBookingDialogOpened && (
        <ReqestBookingDialogue
          item={item}
          requestBookingDialogOpened={requestBookingDialogOpened}
          setRequestBookingDialogOpened={setRequestBookingDialogOpened}
          setIndividualProfessionalDialogOpened={
            setIndividualProfessionalDialogOpened
          }
          size={"lg"}
        />
      )} */}
    </>
  );
};

export default IndividualProfessionalDialog;
