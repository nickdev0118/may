"use client";

import { IComponent } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";
import CommonInput from "@/components/custom/CommonInput";
import Checkbox from "@/components/custom/Checkbox";
import Textarea from "@/components/custom/Textarea";

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

export default function AddOffice({ className = "" }: IComponent) {
  return (
    <div>
      <div className="col-span-8 pl-6">
        <div>
          <Typography
            placeholder=""
            className="text-dark text-lg xl:text-xl font-bold"
          >
            Add another office
          </Typography>
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
        </div>
      </div>
    </div>
  );
}
