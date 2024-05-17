"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ICON_MAPPER, PATHNAME_MAPPER } from "@/utils/constants";
import {
  Avatar,
  Badge,
  IconButton,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  ListItem,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { USER_ACCOUNT_SETTING } from "@/utils/tempData";
import Msgmenu from "../MsgMenu";
import NotiMenu from "../NotiMenu";
import ProfileDialog from "../ProfileMenuDialogs/ProfileDialog";
import PracticeInfoDialog from "../ProfileMenuDialogs/PracticeInfoDialog";
import ProfessionalsDialog from "../ProfileMenuDialogs/ProfessionalsDialog";
import AdministratorsDialog from "../ProfileMenuDialogs/AdministratorsDialog";
import BillingInfoDialog from "../ProfileMenuDialogs/BillingInfoDialog";
import AccountSettingDialog from "../ProfileMenuDialogs/AccountSettingDialog";
import NotificationsDialog from "../ProfileMenuDialogs/NotificationsDialog.tsx";
import LogOutDialog from "../ProfileMenuDialogs/LogoutDialog";
import { useUser } from "@/contexts/UserContext";
import api from "@/utils/api";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { userData } = useUser();
  //Menu state
  const [msgMenuOpened, setMsgMenuOpened] = useState<boolean>(false);
  const [NotiMenuOpened, setNotiMenuOpened] = useState<boolean>(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);

  //Dialog state
  const [profileDialog, setProfileDialog] = useState<boolean>(false);
  const [practiceInfo, setPracticeInfo] = useState<boolean>(false);
  const [profissionalsDialog, setProfessionalsDialog] =
    useState<boolean>(false);
  const [adminDialog, setAdminDialog] = useState<boolean>(false);
  const [billingInfo, setBillingInfo] = useState<boolean>(false);
  const [accountSetting, setAccountSetting] = useState<boolean>(false);
  const [notificationDialog, setNotificationDialog] = useState<boolean>(false);
  const [logoutDialog, setLogOutDialog] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleMsgMenuOpened = () => {
    setMsgMenuOpened((prev) => !prev);
  };

  const handleNotiMenuOpened = () => {
    setNotiMenuOpened((prev) => !prev);
  };

  const handleAccountMenu = () => {
    setOpenProfileMenu((prev) => !prev);
  };

  useEffect(() => {
    api
      .get("/user/get/latest/messages")
      .then((res) => setMessages(res.data?.filter((item: any) => !item.read)))
      .catch((err) => console.log(err));

    api
      .get("/user/get/top/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log(err));
  }, []);

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
      <header className="flex justify-between items-center mt-3">
        <Typography
          placeholder=""
          variant="h1"
          className="text-3xl font-bold text-dark"
        >
          {PATHNAME_MAPPER[pathname || ""] || ""}
        </Typography>

        <div className="flex items-center gap-4">
          <Menu
            open={msgMenuOpened}
            handler={handleMsgMenuOpened}
            placement="bottom"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              {messages.length > 0 ? (
                <Badge color="red">
                  <IconButton
                    placeholder=""
                    variant="text"
                    className="text-3xl text-primary w-8 h-8"
                    onClick={handleMsgMenuOpened}
                  >
                    <Icon icon={ICON_MAPPER.message} />
                  </IconButton>
                </Badge>
              ) : (
                <IconButton
                  placeholder=""
                  variant="text"
                  className="text-3xl text-primary w-8 h-8"
                  onClick={handleMsgMenuOpened}
                >
                  <Icon icon={ICON_MAPPER.message} />
                </IconButton>
              )}
            </MenuHandler>
            <MenuList
              placeholder=""
              className="mt-[60px] mr-0 w-[334px] rounded-lg bg-white shadow-custom"
            >
              <Msgmenu />
            </MenuList>
          </Menu>

          <Menu
            open={NotiMenuOpened}
            handler={handleNotiMenuOpened}
            placement="bottom"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              {notifications.length > 0 ? (
                <Badge color="red">
                  <IconButton
                    placeholder=""
                    variant="text"
                    className="text-3xl text-primary w-8 h-8"
                    onClick={handleNotiMenuOpened}
                  >
                    <Icon icon={ICON_MAPPER.notification} />
                  </IconButton>
                </Badge>
              ) : (
                <IconButton
                  placeholder=""
                  variant="text"
                  className="text-3xl text-primary w-8 h-8"
                  onClick={handleNotiMenuOpened}
                >
                  <Icon icon={ICON_MAPPER.notification} />
                </IconButton>
              )}
            </MenuHandler>
            <MenuList
              placeholder=""
              className="mt-[60px] mr-0 w-[334px] rounded-lg bg-white shadow-custom"
            >
              <NotiMenu />
            </MenuList>
          </Menu>

          <Menu
            open={openProfileMenu}
            handler={handleAccountMenu}
            placement="bottom-end"
          >
            <MenuHandler>
              <Avatar
                src={userData?.avatar || "/assets/images/profile.png"}
                alt="Avatar"
                placeholder="Avatar"
                variant="circular"
                size="md"
                className="cursor-pointer"
                onClick={handleAccountMenu}
              />
            </MenuHandler>
            <MenuList
              placeholder=""
              className="mt-[20px] w-[334px] rounded-lg bg-white shadow-custom"
            >
              <div className="flex items-center gap-3 border-b-2 border-[#F8F4FF] pb-2">
                <Avatar
                  variant="circular"
                  placeholder=""
                  src={userData?.avatar || "/assets/images/profile.png"}
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
                    {userData?.practiceName && userData?.practiceName.replace(/\b\w/g, x => x.toUpperCase())}
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
                <ListItem
                  placeholder=""
                  key={item.id}
                  className={`justify-between items-center ${i === USER_ACCOUNT_SETTING.length - 1
                    ? ""
                    : " border-b-2 border-[#F8F4FF]"
                    }`}
                  onClick={() => handleMenuClick(item.desc)}
                >
                  <div className="flex justify-between w-full">
                    <div className="flex gap-3 items-center">
                      <Icon icon={item.logo} className="text-primary text-lg" />
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
              ))}
            </MenuList>
          </Menu>
        </div>
      </header>
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
};

export default Header;
