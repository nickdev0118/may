"use client";

import React, { ChangeEvent, useState } from "react";
import TabButton from "@/components/custom/buttons/TabButton";
import Button from "@/components/custom/buttons/Button";
import { IComponent, ITabitem } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
} from "@/libraries/material-tailwind";
import OfficeProfileDialog from "./OfficeProfileTab";
import RequiredSkillsTab from "./RequiredSkillsTab";
import PaymentTermsTab from "./PaymentTermsTab";

interface IProps extends IComponent {
  practiceInfo: boolean;
  setPracticeInfo: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "Office Profile",
  },
  {
    id: 2,
    label: "Skills required in this office",
  },
  {
    id: 3,
    label: "Payment terms for temps",
  },
];

const PracticeInfoDialog: React.FC<IProps> = ({
  practiceInfo,
  setPracticeInfo,
  size,
}: IProps) => {
  const handler = () => {
    setPracticeInfo(!practiceInfo);
  };

  const [activeTab, setActiveTab] = useState<string>("Office Profile");

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={practiceInfo}
      size={size}
      className="h-[90%] overflow-y-auto"
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
        <div className="p-6 sm:pt-5 xl:pt-10">
          <div className="flex justify-between items-center">
            <Typography
              placeholder=""
              className="text-2xl lg:text-4xl text-dark font-bold"
            >
              Practice Info
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div className="flex justify-between items-center pt-6 lg:pt-12">
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
            <Button
              variant="filled"
              color="secondary"
              className="bg-secondary flex items-center gap-1 p-2"
            >
              <Icon
                icon={ICON_MAPPER.plus}
                className="text-lg xl:text-xl text-bold"
              />
              <Typography
                placeholder=""
                className="hidden md:block text-white text-xs xl:text-sm font-semibold"
              >
                Post A New Job
              </Typography>
            </Button>
          </div>
        </div>
      </DialogBody>
      {activeTab === "Office Profile" ? (
        <OfficeProfileDialog />
      ) : activeTab === "Skills required in this office" ? (
        <RequiredSkillsTab />
      ) : (
        <PaymentTermsTab />
      )}
    </Dialog>
  );
};

export default PracticeInfoDialog;
