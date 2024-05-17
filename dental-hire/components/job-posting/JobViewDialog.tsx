import { useEffect, useState } from "react";

import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import { TEMP_APPLICANT } from "@/utils/tempData";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import Button from "@/components/custom/buttons/Button";
import moment from "moment";
import StatusBadge from "../custom/StatusBadge";
import DTApplicationList from "./DTApplicantList";
import MBApplicationList from "./MBApplicantList";
import ReopenDialog from "./ReopenDialog";
import ArchiveDialog from "./ArchiveDialog";

interface IProps extends IComponent {
  job: IJob | undefined;
  viewOpen: boolean;
  setViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: DialogProps["size"];
}

const JobViewDialog: React.FC<IProps> = ({
  job,
  viewOpen,
  setViewOpen,
  size,
}: IProps) => {
  const handler = () => {
    setViewOpen(false);
  };

  const [reopenDialog, setReopenDialog] = useState<boolean>(false);
  const [archiveDialog, setArchiveDialog] = useState<boolean>(false);

  const handleReopen = () => {
    setReopenDialog((prev) => !prev);
  };
  const handleArchive = () => {
    setArchiveDialog((prev) => !prev);
  };

  useEffect(() => {
    console.log(job);
  }, []);

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={viewOpen}
        size={size}
        className="flex flex-col h-[80%] overflow-y-auto py-3 xl:py-6 px-5 xl:px-10"
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
          {job && (
            <div>
              <div className="flex flex-col">
                <div className="pr-4 break-words">
                  <Typography
                    placeholder=""
                    className="text-dark text-xl xl:text-4xl font-semibold"
                  >
                    {job.title}
                  </Typography>
                </div>
                <div className="hidden sm:flex justify-end items-center gap-4 ">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                    onClick={handleReopen}
                  >
                    {job.isOpened === true ? "Close" : "Re-Open"}
                  </Button>
                  {job.isArchived ? (
                    <Button
                      variant="filled"
                      color="secondary"
                      className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                      onClick={handleArchive}
                    >
                      Unarchive
                    </Button>
                  ) : (
                    <Button
                      variant="filled"
                      color="secondary"
                      className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                      onClick={handleArchive}
                    >
                      Archive
                    </Button>
                  )}
                </div>
                <Typography
                  placeholder=""
                  className="text-lightDark text-xs pt-2"
                >
                  Posted on{" "}
                  {moment(job.postedAt).format("MMMM DD, YYYY hh:mm a")}
                </Typography>
              </div>
              <div className="block sm:flex justify-between items-center pt-6">
                <div className="flex gap-3">
                  <StatusBadge className="" status={job.applyStatus}>
                    {job.isOpened ? "Open" : "Closed"}
                  </StatusBadge>
                  {job.isArchived ? (
                    <StatusBadge className="" status={job.applyStatus}>
                      Archived
                    </StatusBadge>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex gap-5 pt-4 sm:pt-0">
                  <div className="flex gap-2">
                    <Icon
                      icon={ICON_MAPPER.userStars}
                      className="text-primary text-xl"
                    />
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm font-semibold"
                    >
                      {job.expYears || "0 Year"}
                    </Typography>
                  </div>
                  <div className="flex gap-2">
                    <Icon
                      icon={ICON_MAPPER.bag}
                      className="text-primary text-xl"
                    />
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm font-semibold"
                    >
                      {job.type}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Typography
                  placeholder=""
                  className="text-lightDark text-xs sm:text-sm"
                >
                  Description
                </Typography>
                <Typography
                  placeholder=""
                  className="text-dark text-xs sm:text-sm pt-2 pl-2 font-normal break-words"
                >
                  {job.description}
                </Typography>
              </div>
              <div className="pt-6">
                <Typography
                  placeholder=""
                  className="text-lightDark text-xs sm:text-sm"
                >
                  Practice Types
                </Typography>
                <div className="flex flex-wrap gap-3 pl-2">
                  <Typography
                    placeholder=""
                    key={job.id}
                    className="text-dark text-xs sm:text-sm p-2 font-semibold bg-[#FFF9FA] rounded-lg"
                  >
                    {job.type}
                  </Typography>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex justify-center items-center gap-4  sm:hidden ">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                  >
                    {job.isOpened === true ? "Close" : "Re-Open"}
                  </Button>
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                  >
                    {job.isArchived ? "Unarchive" : "Archive"}
                  </Button>
                </div>
              </div>
              <div className="pt-6">
                {/* <Typography
                  placeholder=""
                  className="text-dark text-lg font-bold"
                >
                  Applicants<span className="text-lg font-normal">(200)</span>
                </Typography> */}
                {/* <div className="">
                  <div className="block lg:hidden">
                    <MBApplicationList tempApplicant={TEMP_APPLICANT} />
                  </div>
                  <div className="hidden lg:block grow overflow-y-auto">
                    <DTApplicationList tempApplicant={TEMP_APPLICANT} />
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </DialogBody>
        {archiveDialog && (
          <ArchiveDialog
            job={job}
            archiveDialog={archiveDialog}
            setArchiveDialog={setArchiveDialog}
            size="lg"
          />
        )}
        {reopenDialog && (
          <ReopenDialog
            job={job}
            reopenDialog={reopenDialog}
            setReopenDialog={setReopenDialog}
            size="lg"
          />
        )}
      </Dialog>
    </>
  );
};

export default JobViewDialog;
