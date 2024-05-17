import { useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import {
  ICON_MAPPER,
  VALIDATION_DISMATCH_PASSWORDS,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/custom/Input";
import { TPasswordType } from "@/utils/types";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";


interface IPasswordType {
  newPassword: string;
  currentPassword: string;
}

const validationSchema = yup.object().shape({
  password: yup.string().required(VALIDATION_REQUIRED_FIELD),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password", undefined)], VALIDATION_DISMATCH_PASSWORDS)
    .required(VALIDATION_REQUIRED_FIELD),
});

interface IProps extends IComponent {
  passwordDialogOpened: boolean;
  setPasswordDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountSetting: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

export default function ChangePasswordDialog({
  passwordDialogOpened,
  setPasswordDialogOpened,
  setAccountSetting,
  size = "lg",
}: IProps) {
  const handler = () => {
    setPasswordDialogOpened(!passwordDialogOpened);
    setAccountSetting(true);
  };

  const formik = useFormik({
    initialValues: {
      currentPass: "",
      password: "",
      confPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData: IPasswordType = {
        newPassword: values.password,
        currentPassword: values.currentPass
      }
      api
        .post("/user/update/profile/password", formData)
        .then((res) => {
          const {success} = res.data;
          if(success) {
            toast.success("Password successfully changed!");
            setPasswordDialogOpened(false);
          }
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    },
  });

  const [currentPassType, setCurrentPassType] =
    useState<TPasswordType>("password");
  const [passwordType, setPasswordType] = useState<TPasswordType>("password");
  const [confPasswordType, setConfPasswordType] =
    useState<TPasswordType>("password");

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={passwordDialogOpened}
      size={size}
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
              Change Password
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <form
            className="flex flex-col gap-12 w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-8 w-full pt-6">
              <Input
                id="password"
                type={currentPassType}
                name="currentPass"
                label="Current Password"
                placeholder="Current Password"
                endAdornment={
                  <IconButton
                    placeholder=""
                    className="w-4 h-4 text-lightDark text-lg"
                    onClick={() =>
                      setCurrentPassType((prev) =>
                        prev === "text" ? "password" : "text"
                      )
                    }
                    variant="text"
                  >
                    <Icon
                      icon={
                        passwordType === "text"
                          ? ICON_MAPPER.eyeOff
                          : ICON_MAPPER.eye
                      }
                    />
                  </IconButton>
                }
                onChange={formik.handleChange}
                value={formik.values.currentPass}
                error={formik.touched.currentPass && formik.errors.currentPass}
              />
              <Input
                id="password"
                type={passwordType}
                name="password"
                label="New Password"
                placeholder="Password"
                endAdornment={
                  <IconButton
                    placeholder=""
                    className="w-4 h-4 text-lightDark text-lg"
                    onClick={() =>
                      setPasswordType((prev) =>
                        prev === "text" ? "password" : "text"
                      )
                    }
                    variant="text"
                  >
                    <Icon
                      icon={
                        passwordType === "text"
                          ? ICON_MAPPER.eyeOff
                          : ICON_MAPPER.eye
                      }
                    />
                  </IconButton>
                }
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
              />
              <Input
                id="conf-password"
                type={confPasswordType}
                name="confPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                endAdornment={
                  <IconButton
                    placeholder=""
                    className="w-4 h-4 text-lightDark text-lg"
                    onClick={() =>
                      setConfPasswordType((prev) =>
                        prev === "text" ? "password" : "text"
                      )
                    }
                    variant="text"
                  >
                    <Icon
                      icon={
                        confPasswordType === "text"
                          ? ICON_MAPPER.eyeOff
                          : ICON_MAPPER.eye
                      }
                    />
                  </IconButton>
                }
                onChange={formik.handleChange}
                value={formik.values.confPassword}
                error={
                  formik.touched.confPassword && formik.errors.confPassword
                }
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="filled"
                color="secondary"
                className=""
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
}
