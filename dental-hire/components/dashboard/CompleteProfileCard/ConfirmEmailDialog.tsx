import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
} from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  confirmEmail: boolean;
  setConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const ConfirmEmailDialog: React.FC<IProps> = ({
  confirmEmail,
  setConfirmEmail,
  size,
}: IProps) => {
  const handler = () => {
    setConfirmEmail(!confirmEmail);
  };

  const handleVerify = () => {
    (async() => {
      await api
        .get("/user/send/email/verification")
        .then((res) => {
          if(res.data.success)
            toast.success("Email Verified")
            setConfirmEmail(!confirmEmail);
        })
        .catch((err) => toast.error(getErrorMessage(err)));
    })();
  }

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={confirmEmail}
      size={size}
      className="h-[50%] overflow-y-auto"
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
              Email Address
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <Typography
            placeholder=""
            className="text-sm text-lightDark font-normal pt-4"
          >
            Click the link below if you want to receive the confirmation email
            again.
          </Typography>
          <div className="flex justify-between items-center pt-6 lg:pt-12">
            <div className="flex items-center gap-2"></div>
            <Button
              variant="filled"
              color="secondary"
              className="bg-secondary flex items-center gap-1 p-2"
              onClick={handleVerify}
            >
              <Typography
                placeholder=""
                className="hidden md:block text-white text-xs xl:text-sm font-semibold"
              >
                Resend Confirmation Mail
              </Typography>
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ConfirmEmailDialog;
