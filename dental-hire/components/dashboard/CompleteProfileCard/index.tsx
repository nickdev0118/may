"use client";

import { useCallback, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import CardTemplate from "@/components/custom/CardTemplate";
import ConfirmEmailDialog from "./ConfirmEmailDialog";
import VerifyPhoneNum from "./VerifyPhoneNum";
import UploadProfilePicDialog from "./UploadProfilePicDialog";
import ContactInfoDialog from "./ContactInfoDialog";

const LINKS_TO_COMPLETE = [
  {
    id: 1,
    label: "Confirm Your Email Address",
  },
  {
    id: 2,
    label: "Verify your phone Number",
  },
  {
    id: 3,
    label: "Upload your profile picture",
  },
  {
    id: 4,
    label: "Add office contact information",
  },
];

export default function CompleteProfileCard({ className = "" }: IComponent) {
  const [confirmEmail, setConfirmEmail] = useState<boolean>(false);
  const [verifyPhone, setVerifyPhone] = useState<boolean>(false);
  const [uploadProfilePic, setUploadProfilePic] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<boolean>(false);

  const handleMenuClick = useCallback((title: string) => {
    switch (title) {
      case "Confirm Your Email Address":
        setConfirmEmail(true);
        break;
      case "Verify your phone Number":
        setVerifyPhone(true);
        break;
      case "Upload your profile picture":
        setUploadProfilePic(true);
        break;
      case "Add office contact information":
        setContactInfo(true);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <CardTemplate className={className} title="Complete Your Profile">
        <div className="grid grid-cols-1 gap-y-4 xl:gap-y-11">
          {LINKS_TO_COMPLETE.map((link) => (
            <div
              key={link.id}
              className="flex gap-2 cursor-pointer"
              onClick={() => handleMenuClick(link.label)}
            >
              <Icon
                icon={ICON_MAPPER.circleCheck}
                className="text-secondary text-2xl"
              />
              <Typography
                placeholder=""
                className="text-dark text-sm xl:text-base font-semibold"
              >
                {link.label}
              </Typography>
            </div>
          ))}
          <Typography
            placeholder=""
            className="text-dark text-sm xl:text-base font-semibold"
          >
            Select a plan: unlock real-time bookings and unfiltered messaging.
            <span className="text-secondary text-sm xl:text-base font-bold cursor-pointer pl-1">
              Learn more
            </span>
          </Typography>
        </div>
      </CardTemplate>
      <ConfirmEmailDialog
        confirmEmail={confirmEmail}
        setConfirmEmail={setConfirmEmail}
        size="sm"
      />
      <VerifyPhoneNum
        verifyPhone={verifyPhone}
        setVerifyPhone={setVerifyPhone}
        size="sm"
      />
      <UploadProfilePicDialog
        uploadProfilePic={uploadProfilePic}
        setUploadProfilePic={setUploadProfilePic}
        size="md"
      />
      <ContactInfoDialog
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        size="md"
      />
    </>
  );
}
