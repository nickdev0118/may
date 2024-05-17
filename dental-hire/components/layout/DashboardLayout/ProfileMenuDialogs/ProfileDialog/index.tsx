"use client";

import React, { useContext, useEffect, useState } from "react";
import { IComponent, ITabitem, IUserInfo } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, COLOR_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  DialogProps,
  IconButton,
  Typography,
  Avatar,
} from "@/libraries/material-tailwind";
import { CircularProgressbarWithChildren } from "@/libraries/react-circular-progressbar";
import Button from "@/components/custom/buttons/Button";
import TabButton from "@/components/custom/buttons/TabButton";
import ProfileEditDialog from "./ProfileEditDialog";
import ContactInfoDialog from "./ContactInfoDialog";
import { UserContext, useUser } from "@/contexts/UserContext";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  profileDialog: boolean;
  setProfileDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

interface IProfileProgress {
  id: number;
  desc: string;
  type: string;
}

type ObjectWithBooleanValues = {
  [key: string]: boolean;
};

const PROFILE_PROGRESS: IProfileProgress[] = [
  {
    id: 1,
    desc: "Add complete address",
    type: "add",
  },
  {
    id: 2,
    desc: "Add practice description",
    type: "add",
  },
  {
    id: 3,
    desc: "Add office contact info",
    type: "add",
  },
  {
    id: 4,
    desc: "Upload your profile photo",
    type: "add",
  },
  {
    id: 5,
    desc: "Upload your account profile photo",
    type: "export",
  },
  {
    id: 6,
    desc: "Confirm your email address",
    type: "export",
  },
];

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "Reviews Received",
  },
  {
    id: 2,
    label: "Reviews of Offices",
  },
];

const ProfileDialog: React.FC<IProps> = ({
  profileDialog,
  setProfileDialog,
  size,
}: IProps) => {
  const handler = () => {
    setProfileDialog(!profileDialog);
  };

  // const {userData} = useContext(UserContext);
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Reviews Received");
  // const [user, setUser] = useState<IUserInfo>();
  const [copied, setCopied] = useState(false);
  const { userData, setUserData } = useUser();
  const copyLink = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleProfileEdit = () => {
    setProfileEdit(true);
    setProfileDialog(false);
  };

  useEffect(() => {
    api
      .get("/office/get/profile/info")
      .then((res) => {
        setUserData({ ...userData, ...res.data });
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, []);

  function calculateTruePercentage(obj: { [key: string]: boolean }) {
    if (!obj) {
      return 0; // or handle this case based on your requirements
    }

    let trueCount = Object.values(obj).filter((value) => value === true).length;
    let totalCount = Object.keys(obj).length;
    return (trueCount / totalCount) * 100;
  }

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={profileDialog}
        size={size}
        className="h-[80%] overflow-y-auto"
      >
        <DialogBody placeholder="">
          <div className="hidden ss:flex justify-end">
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={handler}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </div>
          <div className="p-0 sm:p-6 lg:p-10 xl:p-20">
            <div className="block sm:flex justify-between">
              <div className="flex justify-between items-center">
                <Typography
                  placeholder=""
                  className="text-xl lg:text-2xl xl:text-4xl text-dark font-bold"
                >
                  Our Public Profile
                </Typography>
                <Icon
                  icon={ICON_MAPPER.copy}
                  className="block sm:hidden text-secondary text-xl font-bold"
                />
              </div>
              <Typography
                placeholder=""
                className="text-xs xl:text-sm text-lightDark font-semibold sm:pt-2"
              >
                {userData?.address}
              </Typography>
            </div>
            <div className="flex flex-col items-center gap-4 xl:hidden pt-6">
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
              <div className="flex items-center gap-2">
                <Typography
                  placeholder=""
                  className="text-lg xl:text-2xl text-dark font-bold"
                >
                  {userData?.name}
                </Typography>
                <Icon
                  icon={ICON_MAPPER.edit}
                  className="text-secondary text-xl cursor-pointer"
                  onClick={handleProfileEdit}
                />
              </div>
              <Typography
                placeholder=""
                className="text-base text-lightDark font-normal text-center"
              >
                {userData?.position}
              </Typography>
              <Typography
                placeholder=""
                className="text-base text-lightDark font-normal text-center"
              >
                {userData?.expTime}.
              </Typography>
              <Button
                variant="filled"
                color="secondary"
                onClick={() => setContactInfo(true)}
              >
                See Your Profile
              </Button>
            </div>
            <div className="hidden xl:flex justify-between pt-6 xl:pt-12">
              <div className="flex gap-6">
                <div className="w-20 h-20">
                  <CircularProgressbarWithChildren
                    value={70}
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
                      src={userData?.avatar}
                      alt=""
                      className="w-16 h-16"
                    />
                  </CircularProgressbarWithChildren>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <Typography
                      placeholder=""
                      className="text-lg xl:text-2xl text-dark font-bold"
                    >
                      {userData?.name}
                    </Typography>
                    <Icon
                      icon={ICON_MAPPER.edit}
                      className="text-secondary cursor-pointer"
                      onClick={handleProfileEdit}
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <Typography
                      placeholder=""
                      className="text-base text-lightDark font-normal"
                    >
                      {userData?.jobRole}
                    </Typography>
                    {userData?.expTime && (
                      <div className="flex items-center gap-2">
                        <Icon
                          icon={ICON_MAPPER.clock}
                          className="text-lightDark"
                        />
                        <Typography
                          placeholder=""
                          className="text-base text-lightDark font-normal"
                        >
                          {userData?.expTime}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-[#F3EBFF] rounded-lg p-3">
                  <Typography
                    placeholder=""
                    className="text-sm text-dark font-semibold"
                  >
                    Copy & Share Your Profile Link
                  </Typography>
                  <button onClick={copyLink}>
                    {!copied ? (
                      <Icon
                        icon={ICON_MAPPER.copy}
                        className="text-secondary text-2xl font-bold"
                      />
                    ) : (
                      "Copied!"
                    )}
                  </button>
                </div>
                <Button
                  variant="filled"
                  color="secondary"
                  onClick={() => setContactInfo(true)}
                >
                  See Your Profile
                </Button>
              </div>
            </div>
            <div className="mt-6 xl:pt-12 p-6 bg-[#FFFCF6] rounded-lg">
              <Typography
                placeholder=""
                className="text-sm xl:text-xl text-warning font-bold"
              >
                {calculateTruePercentage(userData?.verifyData)}% Completed
              </Typography>
              <div className="grid grid-cols-2 gap-5 pt-4">
                {PROFILE_PROGRESS.map((item: IProfileProgress) => (
                  <div
                    key={item.id}
                    className="col-span-2 xl:col-span-1 flex justify-between"
                  >
                    <div className="flex items-center gap-1">
                      <Icon
                        icon={
                          item.type === "add"
                            ? ICON_MAPPER.circleFilledCheck
                            : ICON_MAPPER.circleCheck
                        }
                        className={
                          item.type === "add" ? "text-success" : "text-primary"
                        }
                      />
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm xl:text-base font-normal"
                      >
                        {item.desc}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Icon
                        icon={
                          item.type === "add"
                            ? ICON_MAPPER.edit
                            : ICON_MAPPER.externalLink
                        }
                        className="text-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6">
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
            <div className="pt-6">
              {activeTab === "Reviews Received" ? (
                <Typography
                  placeholder=""
                  className="text-dark text-base xl:text-xl font-normal"
                >
                  0 reviews
                </Typography>
              ) : (
                ""
              )}
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <ProfileEditDialog
        profileEdit={profileEdit}
        setProfileEdit={setProfileEdit}
        setProfileDialog={setProfileDialog}
        size="lg"
      />
      <ContactInfoDialog
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        setProfileDialog={setProfileDialog}
        size="lg"
      />
    </>
  );
};

export default ProfileDialog;
