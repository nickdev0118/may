import { AllHTMLAttributes } from "react";
import type { DialogProps } from "@/libraries/material-tailwind";
import { Dialog, DialogBody, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import Button from "@/components/custom/buttons/Button";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  opened: boolean;
  setOpened: (value: boolean | ((prev: boolean) => boolean)) => void;
  dialogSize: DialogProps["size"];
}

export default function DeleteDialog({
  opened,
  setOpened,
  dialogSize,
}: IProps) {
  const closeDialog = () => {
    setOpened(false);
  };

  return (
    <Dialog placeholder="" open={opened} handler={setOpened} size={dialogSize}>
      <DialogBody placeholder="" className="flex flex-col items-center gap-8">
        <div className="w-1/3 flex justify-center py-8 bg-secondary/5 rounded-lg">
          <Icon icon={ICON_MAPPER.trash} className="text-secondary text-5xl" />
        </div>

        <Typography placeholder="" className="text-lightDark text-center">
          Are you sure want to delete?
          <br /> This exception from{" "}
          <span className="font-bold text-dark">
            {" "}
            01/15/2024 12:00 am to 01/15/2024 11:59 pm
          </span>
          .
        </Typography>

        <div className="flex items-center gap-4">
          <Button variant="outlined" color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="outlined" color="lightDark" onClick={closeDialog}>
            Delete
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
