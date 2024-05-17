"use client";

import Image from "next/image";
import Button from "@/components/custom/buttons/Button";
import CommonInput from "@/components/custom/CommonInput";
import Textarea from "@/components/custom/Textarea";
import Checkbox from "@/components/custom/Checkbox";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import { Typography } from "@/libraries/material-tailwind";

interface IProps extends IComponent {}

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

const PRACTICE_TYPE_SELECTION: ICheckbox[] = [
  {
    id: 1,
    label: "General",
  },
  {
    id: 2,
    label: "Pedodontics",
  },
  {
    id: 3,
    label: "Periodontics",
  },
  {
    id: 4,
    label: "Orthodontics",
  },
  {
    id: 5,
    label: "Oral surgery",
  },
  {
    id: 6,
    label: "Prosthodontics",
  },
  {
    id: 7,
    label: "Multi-specialty",
  },
  {
    id: 8,
    label: "Single doctor",
  },
  {
    id: 9,
    label: "Multi doctor",
  },
  {
    id: 10,
    label: "Medicaid",
  },
  {
    id: 11,
    label: "HMO",
  },
  {
    id: 12,
    label: "PPO",
  },
  {
    id: 13,
    label: "Private",
  },
  {
    id: 14,
    label: "Corporate",
  },
];

const OfficeProfileDialog: React.FC<IProps> = ({}: IProps) => {
  return (
    <div className="px-6 sm:px-10 xl:px-20">
      <div className="">
        <div className="block lg:flex gap-20">
          <Typography
            placeholder=""
            className="text-sm lg:text-base text-dark font-bold"
          >
            Practice Logo
          </Typography>
          <div className="relative">
            <Image
              src="/assets/images/purpleLogo.png"
              width={53}
              height={53}
              alt=""
              className="pt-2 lg:pt-0"
            />
            <div
              className="absolute w-6 h-6 rounded-full border-4 border-white right-[-10px] bottom-[-10px] flex justify-center items-center 
                bg-[#FFE6E5]"
            >
              <Icon
                icon={ICON_MAPPER.edit}
                className="w-3 h-3 text-secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <CommonInput
          id="practiceName"
          name="practiceName"
          label="Practice name"
          placeholder="Your Practice name here..."
        />
        <div>
          <Typography
            placeholder=""
            className="text-sm lg:text-base text-lightDark font-normal pb-2"
          >
            Practice description
          </Typography>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
          />
        </div>
        <div>
          <Typography
            placeholder=""
            className="text-sm lg:text-base text-lightDark font-normal pb-2"
          >
            PPE provided to temps in our office (select all that apply)
          </Typography>
          <div className="grid grid-cols-6 gap-3">
            {PPE_SELECTION.map((item: ICheckbox) => (
              <div key={item.id} className="col-span-3 lg:col-span-2">
                <Checkbox
                  name={item.label}
                  color="secondary"
                  label={item.label}
                />
              </div>
            ))}
            <div className="flex gap-2 col-span-3 lg:col-span-2 items-center pl-1">
              <Icon icon={ICON_MAPPER.plus} className="text-secondary" />
              <Typography
                placeholder=""
                className="text-sm text-secondary font-normal"
              >
                Additional PPE
              </Typography>
            </div>
          </div>
        </div>
        <CommonInput
          id="office-contact-name"
          name="office-contact-name"
          label="Office contact name"
          placeholder="Office contact name"
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 md:col-span-1">
            <CommonInput
              id="office-contact-email"
              name="office-contact-email"
              label="Office contact email"
              placeholder="Office contact email"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <CommonInput
              id="office-contact-phone"
              name="office-contact-phone"
              label="Office contact phone"
              placeholder="Office contact phone"
            />
          </div>
        </div>
        <Checkbox
          name="requirement"
          color="secondary"
          label="Professionals may not initiate contact with this office outside of job posts or booking requests"
        />
      </div>
      <div className="flex flex-col gap-4 pt-6">
        <Typography placeholder="" className="text-base text-dark font-bold">
          Address Info
        </Typography>
        <div>
          <CommonInput
            id="address"
            name="address"
            label="Address"
            placeholder="Enter street name"
          />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="col-span-2 md:col-span-1">
              <CommonInput
                id="state"
                name="state"
                placeholder="Office contact email"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <CommonInput
                id="postal-code"
                name="postal-code"
                placeholder="Enter postal code"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <Typography
          placeholder=""
          className="text-sm lg:text-base text-lightDark font-normal pb-2"
        >
          Practice type (select all that apply)
        </Typography>
        <div className="grid grid-cols-6 gap-3">
          {PRACTICE_TYPE_SELECTION.map((item: ICheckbox) => (
            <div key={item.id} className="col-span-3 lg:col-span-2">
              <Checkbox
                name={item.label}
                color="secondary"
                label={item.label}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end  pt-3">
        <Button variant="filled" color="secondary" className="text-sm">
          Update Information
        </Button>
      </div>
    </div>
  );
};

export default OfficeProfileDialog;
