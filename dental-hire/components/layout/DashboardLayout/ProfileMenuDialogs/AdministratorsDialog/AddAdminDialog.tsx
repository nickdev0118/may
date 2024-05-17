"use client";

import React, { ChangeEvent, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import type { DialogProps } from "@/libraries/material-tailwind";
import {
  ICON_MAPPER,
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import Input from "@/components/custom/Input";
import Checkbox from "@/components/custom/Checkbox";
// import Select from "@/components/custom/Select";
import Button from "@/components/custom/buttons/Button";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";

interface IProps extends IComponent {
  addAdmin: boolean;
  setAddAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  lastName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  email: yup
    .string()
    .email(VALIDATION_INVALID_EMAIL)
    .required(VALIDATION_REQUIRED_FIELD),
});

// interface ISelectOption {
//   id: number;
//   label: string;
// }

const AddAdminDialog: React.FC<IProps> = ({
  addAdmin,
  setAddAdmin,
  setAdminDialog,
  size = "lg",
}: IProps) => {
  const handler = () => {
    setAddAdmin(!addAdmin);
    setAdminDialog: true;
  };

  // const SELECT_OPTION: ISelectOption[] = [
  //   {
  //     id: 1,
  //     label: "Specific locations",
  //   },
  //   {
  //     id: 2,
  //     label: "Specific locations",
  //   },
  //   {
  //     id: 3,
  //     label: "Specific locations",
  //   },
  // ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      // selectOption: SELECT_OPTION[0].label,
      isPhinoleRoberts: false,
      isCECJobPost: false,
      isEditOfficeSetting: false,
      isSendReplyToMsg: false,
      isTagPros: false,
      isCACBookings: false,
      isCEDAdmin: false,
      isAddNewOffices: false,
    },
    validationSchema,
    onSubmit: () => {},
  });

  // const [selectOption, setSelectOption] = useState<string>(
  //   SELECT_OPTION[0].label
  // );

  // const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectOption(e.target.value);
  // };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={addAdmin}
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
              className="text-xl lg:text-2xl xl:text-4xl text-dark font-bold"
            >
              Add Administrator
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <form
            className="flex flex-col items-center gap-6 pt-12"
            onSubmit={formik.handleSubmit}
          >
            <Input
              id="first-name"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.touched.firstName && formik.errors.firstName}
            />
            <Input
              id="last-name"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && formik.errors.lastName}
            />
            <div>
              <Input
                id="email"
                name="email"
                label="Email"
                placeholder="Email address"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
              />
              <Typography
                placeholder=""
                className="text-base text-lightDark font-normal"
              >
                An email will be sent to the admin at this address. The email
                will contain a link that will verify they are the owner of that
                email and will ask the admin to create a password for their
                account.
              </Typography>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="col-span-2 md:col-span-1">
                <Input id="role" name="role" label="Role" placeholder="Role" />
              </div>
              {/* <div className="col-span-2 md:col-span-1">
                <Select value={selectOption} onChange={handleSelect}>
                  {SELECT_OPTION.map((item) => (
                    <option key={item.id} value={selectOption}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div> */}
            </div>
            <div className="w-full">
              <Checkbox
                name="isPhinoleRoberts"
                color="secondary"
                label="Phinole Roberts (92660)"
                onChange={formik.handleChange}
                checked={formik.values.isPhinoleRoberts}
              />
            </div>
            <div className="w-full">
              <Typography
                placeholder=""
                className="text-base text-lightDark font-normal"
              >
                Access
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isCECJobPost"
                    color="secondary"
                    label="Create/edit/close job posts"
                    onChange={formik.handleChange}
                    checked={formik.values.isCECJobPost}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isEditOfficeSetting"
                    color="secondary"
                    label="Edit office settings"
                    onChange={formik.handleChange}
                    checked={formik.values.isEditOfficeSetting}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isSendReplyToMsg"
                    color="secondary"
                    label="Send or reply to messages"
                    onChange={formik.handleChange}
                    checked={formik.values.isSendReplyToMsg}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isTagPros"
                    color="secondary"
                    label="Tag professionals as office favorites"
                    onChange={formik.handleChange}
                    checked={formik.values.isTagPros}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isCACBookings"
                    color="secondary"
                    label="Create/accept/cancel bookings"
                    onChange={formik.handleChange}
                    checked={formik.values.isCACBookings}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isCEDAdmin"
                    color="secondary"
                    label="Can create, edit, and delete admins"
                    onChange={formik.handleChange}
                    checked={formik.values.isCEDAdmin}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Checkbox
                    name="isAddNewOffices"
                    color="secondary"
                    label="Add new offices to this account"
                    onChange={formik.handleChange}
                    checked={formik.values.isAddNewOffices}
                  />
                </div>
              </div>
            </div>

            <Button
              variant="filled"
              color="secondary"
              className="w-full py-1.5"
              type="submit"
            >
              Add Admin
            </Button>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AddAdminDialog;
