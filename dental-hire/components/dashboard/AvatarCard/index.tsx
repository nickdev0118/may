"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IComponent, IUserInfo } from "@/utils/interfaces";
import { COLOR_MAPPER, ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import { Avatar, Typography } from "@/libraries/material-tailwind";
import { CircularProgressbarWithChildren } from "@/libraries/react-circular-progressbar";
import { Icon } from "@/libraries/iconify-react";
import CardTemplate from "@/components/custom/CardTemplate";
import AddOfficeDialog from "./AddOfficeDialog";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { calculateTruePercentage, getErrorMessage } from "@/utils/functions";
import Loading from "../../custom/Loading";
import { useUser } from "@/contexts/UserContext";

export default function AvatarCard({ className = "" }: IComponent) {
  const [addOfficeDialog, setAddOfficeDialog] = useState<boolean>(false);
  const { userData, setUserData } = useUser();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    api
      .get("/office/get/profile/info")
      .then((res) => {
        setUserData({ ...userData, ...res.data });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, []);

  return (
    <>
      <CardTemplate
        className={className}
        title={loading ? "Hi, User" : `Hi, ${userData?.name}`}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24">
                <CircularProgressbarWithChildren
                  value={40}
                  strokeWidth={6}
                  styles={{
                    path: {
                      stroke: COLOR_MAPPER.warning,
                    },
                    trail: {
                      stroke: "#F6F4F9",
                    },
                  }}
                >
                  <Avatar
                    variant="circular"
                    placeholder=""
                    src={userData?.avatar || "/assets/images/profile.png"}
                    alt=""
                    className="w-20 h-20"
                  />
                </CircularProgressbarWithChildren>
              </div>

              <div className="bg-[#FFFCF6] px-2 rounded-lg">
                <Typography placeholder="" className="text-warning font-bold">
                  {calculateTruePercentage(userData?.verifyData)}% Completed
                </Typography>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
              <Typography
                placeholder=""
                className="font-bold text-base text-dark"
              >
                {userData?.name}
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-center text-[#7A6899]"
              >
                {userData?.position}
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-center text-[#7A6899]"
              >
                {userData?.address}
              </Typography>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 px-3 py-2 border-2 border-[#D9D2E4] rounded-xl cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={ICON_MAPPER.edit}
                      className="text-secondary text-2xl"
                    />
                    <Link href={PATH_MAPPER.profile}>Edit Profile</Link>
                  </div>
                </div>

                {/* <Typography
                  placeholder=""
                  className="text-secondary text-lg font-semibold cursor-pointer"
                  onClick={() => setAddOfficeDialog(true)}
                >
                  Add Another Office
                </Typography> */}
              </div>
            </div>
          </div>
        )}
      </CardTemplate>
      <AddOfficeDialog
        addOfficeDialog={addOfficeDialog}
        setAddOfficeDialog={setAddOfficeDialog}
        size="lg"
      />
    </>
  );
}
