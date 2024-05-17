import Button from "@/components/custom/buttons/Button";
import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import api from "@/utils/api";
import {toast} from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useJobs } from "@/contexts/JobContext";
import { Dialog, DialogBody, Typography } from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  job: IJob | undefined;
  reopenDialog: boolean;
  setReopenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size?: DialogProps["size"];
}

const ReopenDialog: React.FC<IProps> = ({
  job,
  reopenDialog,
  setReopenDialog,
  size = "lg",
}: IProps) => {
  const {jobs, setJobs} = useJobs();

  const handler = () => {
    setReopenDialog(!reopenDialog);
  };

  const handleReopen = () => {
    api.post("/jobs/office/set/open/status", {
      "isOpened": !job?.isOpened,
      "id": job?.id
    }).then(res => {
      if(res.data) {
        handler();
        toast.success(`Successfully ${job?.isOpened ? "Closed" : "Re-Opened"}!`);
        let tempJobs = Array.isArray(jobs) && jobs?.filter(j => j != job); 
        setJobs(tempJobs);
      } else {
        toast.error(`Failed in ${job?.isOpened ? "Closing" : "Re-Opening"}!`)
      };
    }).catch(err => {
      toast.error(getErrorMessage(err));
    });
  }

  return (
    <Dialog placeholder="" handler={handler} open={reopenDialog} size={size}>
      <DialogBody placeholder="">
        <div className="flex flex-col items-center p-10">
          <div className="flex justify-center items-center bg-[#F8F4FF] p-8 rounded-lg w-[92px] h-[92px]">
            <Icon
              icon={ICON_MAPPER.reopenClock}
              className="text-black text-3xl text-center m-auto"
            />
          </div>
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold py-6 m-auto"
          >
            Are you sure you want to {job?.isOpened ? "close" : "re-open"} the job post?
          </Typography>
          <div className="flex justify-center gap-3">
            <Button
              variant="outlined"
              color="lightDark"
              onClick={handler}
              className="py-2 px-4"
            >
              No
            </Button>
            <Button variant="outlined" color="secondary" className="py-2 px-4" onClick={handleReopen}>
              Yes
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ReopenDialog;
