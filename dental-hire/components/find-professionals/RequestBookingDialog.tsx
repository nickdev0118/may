import Button from "@/components/custom/buttons/Button";
import { IComponent, IProfessional } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  item?: IProfessional;
  requestBookingDialogOpened: boolean;
  setRequestBookingDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIndividualProfessionalDialogOpened: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  size: DialogProps["size"];
}

const ReqestBookingDialogue: React.FC<IProps> = ({
  item,
  requestBookingDialogOpened,
  setRequestBookingDialogOpened,
  setIndividualProfessionalDialogOpened,
  size = "lg",
}: IProps) => {
  const handler = () => {
    setRequestBookingDialogOpened(!requestBookingDialogOpened);
    // setIndividualProfessionalDialogOpened(true);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={requestBookingDialogOpened}
      size={size}
    >
      <DialogBody placeholder="">
        <div className="flex justify-end">
          <IconButton
            placeholder=""
            className="text-2xl text-lightDark w-8 h-8"
            variant="text"
            onClick={handler}
          >
            <Icon icon={ICON_MAPPER.close} />
          </IconButton>
        </div>
        <div className="flex flex-col p-4 xl:p-8">
          <Icon
            icon="streamline:logout-1-solid"
            className="text-primary text-3xl text-center m-auto"
          />
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold py-6 m-auto"
          >
            Are you sure you want to logout?
          </Typography>
          <div className="flex justify-center gap-3">
            <Button
              variant="outlined"
              color="lightDark"
              onClick={handler}
              className="py-2 px-4"
            >
              Cancel
            </Button>
            <Button variant="outlined" color="secondary" className="py-2 px-4">
              Yes
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ReqestBookingDialogue;
