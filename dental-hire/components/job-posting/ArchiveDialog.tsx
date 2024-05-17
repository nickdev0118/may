import Button from "@/components/custom/buttons/Button";
import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import api from "@/utils/api";
import {toast} from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { Dialog, DialogBody, Typography } from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { useJobs } from "@/contexts/JobContext";


interface IProps extends IComponent {
  job: IJob | undefined;
  archiveDialog: boolean;
  setArchiveDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size?: DialogProps["size"];
}

const ArchiveDialog: React.FC<IProps> = ({
  job,
  archiveDialog,
  setArchiveDialog,
  size = "lg",
}: IProps) => {
  const {jobs, setJobs} = useJobs();

  const handler = () => {
    setArchiveDialog(!archiveDialog);
  };

  const handleArchieve = () => {
    api.post("/jobs/office/set/archive/status", {
      "isArchived": !job?.isArchived,
      "id": job?.id
    }).then(res => {
      if(res.data) {
        handler();
        toast.success(`Successfully ${job?.isArchived ? "Unarchived" : "Archived"}!`);
        let tempJobs = Array.isArray(jobs) && jobs?.filter(j => j != job); 
        setJobs(tempJobs);
      } else {
        toast.error(`Failed in ${job?.isArchived ? "Unarchiving" : "Archiving"}!`)
      };
    }).catch(err => {
      toast.error(getErrorMessage(err));
    });
  }
  
  return (
    <Dialog placeholder="" handler={handler} open={archiveDialog} size={size}>
      <DialogBody placeholder="">
        <div className="flex flex-col items-center p-10">
          <div className="flex justify-center items-center bg-[#EAE7F1] p-8 rounded-lg w-[92px] h-[92px]">
            <Icon
              icon={ICON_MAPPER.archive}
              className="text-black text-3xl text-center m-auto"
            />
          </div>
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold py-6 m-auto"
          >
            Are you sure you want to {job?.isArchived ? "unarchive" : "archive"} the job post?
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
            <Button variant="outlined" color="secondary" className="py-2 px-4" onClick={() => handleArchieve()}>
              {job?.isArchived ? "Unarchive" : "Archive"}
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ArchiveDialog;
