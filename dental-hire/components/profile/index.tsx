"use client";

import { useCallback, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { ICON_MAPPER } from "@/utils/constants";
import { USER_ACCOUNT_SETTING } from "@/utils/tempData";
import { Icon } from "@/libraries/iconify-react";
import { Avatar, Typography, ListItem } from "@/libraries/material-tailwind";
import CardTemplate from "@/components/custom/CardTemplate";
import ProfileDialog from "../layout/DashboardLayout/ProfileMenuDialogs/ProfileDialog";
import PracticeInfoDialog from "../layout/DashboardLayout/ProfileMenuDialogs/PracticeInfoDialog";
import ProfessionalsDialog from "../layout/DashboardLayout/ProfileMenuDialogs/ProfessionalsDialog";
import AdministratorsDialog from "../layout/DashboardLayout/ProfileMenuDialogs/AdministratorsDialog";
import BillingInfoDialog from "../layout/DashboardLayout/ProfileMenuDialogs/BillingInfoDialog";
import AccountSettingDialog from "../layout/DashboardLayout/ProfileMenuDialogs/AccountSettingDialog";
import NotificationsDialog from "../layout/DashboardLayout/ProfileMenuDialogs/NotificationsDialog.tsx";
import LogOutDialog from "../layout/DashboardLayout/ProfileMenuDialogs/LogoutDialog";
import AddOffice from "./AddOffice";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function ProfilePage({ className = "" }: IComponent) {
  const [profileDialog, setProfileDialog] = useState<boolean>(false);
  const [practiceInfo, setPracticeInfo] = useState<boolean>(false);
  const [profissionalsDialog, setProfessionalsDialog] =
    useState<boolean>(false);
  const [adminDialog, setAdminDialog] = useState<boolean>(false);
  const [billingInfo, setBillingInfo] = useState<boolean>(false);
  const [accountSetting, setAccountSetting] = useState<boolean>(false);
  const [notificationDialog, setNotificationDialog] = useState<boolean>(false);
  const [logoutDialog, setLogOutDialog] = useState<boolean>(false);
  const { userData } = useUser();

  const handleMenuClick = useCallback((title: string) => {
    switch (title) {
      case "Our Public Profile":
        setProfileDialog(true);
        break;
      case "Practice Info":
        setPracticeInfo(true);
        break;
      case "Professionals":
      case "Practice Info":
        setProfessionalsDialog(true);
        break;
      case "Administrators":
        setAdminDialog(true);
        break;
      case "Billing Info":
        setBillingInfo(true);
        break;
      case "Account Settings":
        setAccountSetting(true);
        break;
      case "Notifications":
        setNotificationDialog(true);
        break;
      case "Log out":
        setLogOutDialog(true);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <CardTemplate className={className} title="">
        <div className="grid grid-cols-10 gap-3">
          <div className="col-span-2 px-3 shadow-lg">
            <div className="rounded-lg bg-white shadow-custom">
              <div className="flex items-center gap-3 border-b-2 border-[#F8F4FF] pb-2">
                <Avatar
                  variant="circular"
                  placeholder=""
                  src={userData?.avatar || "/assets/images/profilePhoto.png"}
                  alt=""
                  className="w-12 h-12"
                />
                <div className="flex flex-col">
                  <Typography
                    placeholder=""
                    className="text-dark text-sm xl:text-base font-bold"
                  >
                    {userData?.name}
                  </Typography>
                  <Typography
                    placeholder=""
                    className="text-lightDark text-xs xl:text-sm underline"
                  >
                    45 Engagement Points
                  </Typography>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <Icon
                    icon={ICON_MAPPER.edit}
                    className="w-4 h-4 text-secondary"
                  />
                </div>
              </div>
              {USER_ACCOUNT_SETTING.map((item, i) => (
                <>
                  {item.link ? (
                    <ListItem
                      placeholder=""
                      key={item.id}
                      className={`justify-between items-center ${
                        i === USER_ACCOUNT_SETTING.length - 1
                          ? ""
                          : " border-b-2 border-[#F8F4FF]"
                      }`}
                    >
                      <Link
                        href={item?.link}
                        className="flex justify-between w-full"
                      >
                        <div className="flex gap-3 items-center">
                          <Icon
                            icon={item.logo}
                            className="text-primary text-lg"
                          />
                          <Typography
                            placeholder=""
                            className="text-lightDark text-xs xl:text-sm font-semibold"
                          >
                            {item.desc}
                          </Typography>
                        </div>
                        {item.isExtendible ? (
                          <Icon
                            icon="material-symbols:keyboard-arrow-right"
                            className="text-primary text-lg"
                          />
                        ) : (
                          ""
                        )}
                      </Link>
                    </ListItem>
                  ) : (
                    <ListItem
                      placeholder=""
                      key={item.id}
                      className={`justify-between items-center ${
                        i === USER_ACCOUNT_SETTING.length - 1
                          ? ""
                          : " border-b-2 border-[#F8F4FF]"
                      }`}
                      onClick={() => handleMenuClick(item.desc)}
                    >
                      <div className="flex justify-between w-full">
                        <div className="flex gap-3 items-center">
                          <Icon
                            icon={item.logo}
                            className="text-primary text-lg"
                          />
                          <Typography
                            placeholder=""
                            className="text-lightDark text-xs xl:text-sm font-semibold"
                          >
                            {item.desc}
                          </Typography>
                        </div>
                        {item.isExtendible ? (
                          <Icon
                            icon="material-symbols:keyboard-arrow-right"
                            className="text-primary text-lg"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </ListItem>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="col-span-8 pl-6">
            <AddOffice />
          </div>
        </div>
      </CardTemplate>
      <ProfileDialog
        profileDialog={profileDialog}
        setProfileDialog={setProfileDialog}
        size="lg"
      />
      <PracticeInfoDialog
        practiceInfo={practiceInfo}
        setPracticeInfo={setPracticeInfo}
        size="lg"
      />
      <ProfessionalsDialog
        profissionalsDialog={profissionalsDialog}
        setProfessionalsDialog={setProfessionalsDialog}
        size="lg"
      />
      <AdministratorsDialog
        adminDialog={adminDialog}
        setAdminDialog={setAdminDialog}
        size="lg"
      />
      <BillingInfoDialog
        billingInfo={billingInfo}
        setBillingInfo={setBillingInfo}
        size="lg"
      />
      <AccountSettingDialog
        accountSetting={accountSetting}
        setAccountSetting={setAccountSetting}
        size="md"
      />
      <NotificationsDialog
        notificationDialog={notificationDialog}
        setNotificationDialog={setNotificationDialog}
        size="md"
      />
      <LogOutDialog
        logoutDialog={logoutDialog}
        setLogOutDialog={setLogOutDialog}
        size="md"
      />
    </>
  );
}
