import { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import {
  ICON_MAPPER,
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import Input from "@/components/custom/Input";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

interface IProps extends IComponent {
  accountSetting: boolean;
  setAccountSetting: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATION_INVALID_EMAIL)
    .required(VALIDATION_REQUIRED_FIELD),
});

const AccountSettingDialog: React.FC<IProps> = ({
  accountSetting,
  setAccountSetting,
  size,
}: IProps) => {
  const handler = () => {
    setAccountSetting(!accountSetting);
  };

  const [passwordDialogOpened, setPasswordDialogOpened] =
    useState<boolean>(false);
  const [deleteAccountDialogOpened, setDeleteAccountDialogOpened] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  const handleChangePassDialog = () => {
    setPasswordDialogOpened(true);
    setAccountSetting(false);
  };

  const handleDeleteAccountDialog = () => {
    setDeleteAccountDialogOpened(true);
    setAccountSetting(false);
  };

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={accountSetting}
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
                Account Settings
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
            </div>
            <Typography
              placeholder=""
              className="text-sm lg:text-base text-dark font-bold pt-8 pb-4"
            >
              Change Details
            </Typography>
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
            </div>

            <div className="block md:flex justify-between pt-6">
              <Typography
                placeholder=""
                className="text-base text-secondary hover:text-error underline cursor-pointer"
                onClick={handleChangePassDialog}
              >
                Change Password?
              </Typography>
              <Typography
                placeholder=""
                className="text-base text-error hover:text-red-500 underline cursor-pointer pt-4 md:pt-0"
                onClick={handleDeleteAccountDialog}
              >
                Delete Account?
              </Typography>
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <ChangePasswordDialog
        passwordDialogOpened={passwordDialogOpened}
        setPasswordDialogOpened={setPasswordDialogOpened}
        setAccountSetting={setAccountSetting}
        size="md"
      />
      <DeleteAccountDialog
        deleteAccountDialogOpened={deleteAccountDialogOpened}
        setDeleteAccountDialogOpened={setDeleteAccountDialogOpened}
        setAccountSetting={setAccountSetting}
        size="md"
      />
    </>
  );
};

export default AccountSettingDialog;
