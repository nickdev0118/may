"use client";

import React, { useState } from "react";
import CommonInput from "@/components/custom/CommonInput";
import Checkbox from "@/components/custom/Checkbox";
import Textarea from "@/components/custom/Textarea";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, STATUS_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  addOfficeDialog: boolean;
  setAddOfficeDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

interface ICheckbox {
  id: number;
  label: string;
}

const PPE_SELECTION: ICheckbox[] = [
  {
    id: 1,
    label: "Disposable gowns",
  },
  {
    id: 2,
    label: "Face shields",
  },
  {
    id: 3,
    label: "Goggles",
  },
  {
    id: 4,
    label: "Latex gloves",
  },
  {
    id: 5,
    label: "N95 masks",
  },
  {
    id: 6,
    label: "Nitrile gloves",
  },
  {
    id: 7,
    label: "Regular masks",
  },
  {
    id: 8,
    label: "Respirator mask",
  },
];

const AddOfficeDialog: React.FC<IProps> = ({
  addOfficeDialog,
  setAddOfficeDialog,
  size = "lg",
}: IProps) => {
  const handler = () => {
    setAddOfficeDialog(!addOfficeDialog);
  };

  const [addAdmin, setAddAdmin] = useState<boolean>(false);

  const handleAddAdmin = () => {
    setAddAdmin((curr) => !curr);
  };

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={addOfficeDialog}
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
          <div className="p-6 sm:px-10 xl:px-20">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl lg:text-2xl xl:text-4xl text-dark font-bold text-center"
              >
                Add another office
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
            </div>
            <div className="flex flex-col gap-4  pt-6">
              <CommonInput
                id="practiceName"
                name="practiceName"
                label="Practice Name"
                placeholder="Practice name"
              />
              <Checkbox
                name="isReadPolicy"
                color="lightDark"
                label="Add an internal location name for easy reference"
              />
              <div>
                <Typography
                  placeholder=""
                  className="text-lightDark text-base font-normal"
                >
                  Practice Descritption
                </Typography>
                <Textarea
                  id="practiceDesc"
                  name="practiceDesc"
                  placeholder="Practice Description"
                />
              </div>
              <div>
                <Typography
                  placeholder=""
                  className="text-lightDark text-base font-normal"
                >
                  PPE provided to temps in our office (select all that apply)
                </Typography>
                <div className="grid grid-cols-6 gap-3 pt-2">
                  {PPE_SELECTION.map((item: ICheckbox) => (
                    <div key={item.id} className="col-span-3  ">
                      <Checkbox
                        name={item.label}
                        color="secondary"
                        label={item.label}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 lg:col-span-1">
                  <CommonInput
                    id="additionalPPE"
                    name="additionalPPE"
                    label="Additional PPE"
                    placeholder="Additional PPE"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <CommonInput
                    id="officeContactName"
                    name="officeContactName"
                    label="Office Contact Name"
                    placeholder="Office contact name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 lg:col-span-1">
                  <CommonInput
                    id="officeContactEmail"
                    name="officeContactEmail"
                    label="Office Contact Email"
                    placeholder="Office contact email"
                  />
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <CommonInput
                    id="officeContactPhone"
                    name="officeContactPhone"
                    label="Office Contact Phone"
                    placeholder="Office contact phone"
                  />
                </div>
              </div>
              <Checkbox
                name="isReadPolicy"
                color="lightDark"
                label="Add an internal location name for easy reference"
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default AddOfficeDialog;
