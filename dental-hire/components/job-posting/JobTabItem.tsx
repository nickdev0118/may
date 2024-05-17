import React, { useState } from "react";
import { IComponent, IJob } from "@/utils/interfaces";
import { Typography, Button } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import { ellipsisString } from "@/utils/functions";
import StatusBadge from "../custom/StatusBadge";
import JobViewDialog from "./JobViewDialog";
import JobEditDialog from "./JobEditDialog";

interface IProps extends IComponent {
  jobItem: IJob;
}

const JobTabItem: React.FC<IProps> = ({ jobItem }: IProps) => {
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleView = () => {
    setViewOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setEditOpen((prev) => !prev);
  };

  return (
    <div className="col-span-6 lg:col-span-3 2xl:col-span-2 bg-[#FCFCFD] p-4 rounded-xl gap-4 justify-between">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <Typography
            placeholder=""
            className="text-dark text-xl font-bold break-words"
          >
            {ellipsisString(jobItem?.title, 30)}
          </Typography>
          <Typography
            placeholder=""
            className="text-[#8032FF] text-sm bg-[#F3EBFF] rounded-[8px] px-2 py-1 gap-10"
          >
            {jobItem?.numOfAppliers} applicants
          </Typography>
        </div>
      </div>
      <div className="pt-6">
        <Typography
          placeholder=""
          className="text-lightDark text-sm line-clamp-1"
        >
          {ellipsisString(jobItem?.description, 60)}
        </Typography>
      </div>
      <div className="flex gap-3 pt-4">
        <StatusBadge key="Open" status="Open">
          {jobItem?.isOpened ? "Open" : "Pending"}
        </StatusBadge>
        {/* <StatusBadge key="Pending Approval" status="Pending Approval">
          Pending Approval
        </StatusBadge> */}
      </div>
      <div className="block lg:flex justify-between items-center pt-6">
        <div className="flex gap-5">
          <div className="flex gap-2">
            <Icon
              icon={ICON_MAPPER.userStars}
              className="text-primary text-xl"
            />
            <Typography
              placeholder=""
              className="text-dark text-sm font-semibold"
            >
              {jobItem?.expYears || "0 Year"}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Icon icon={ICON_MAPPER.bag} className="text-primary text-xl" />
            <Typography
              placeholder=""
              className="text-dark text-sm font-semibold"
            >
              {jobItem?.type}
            </Typography>
          </div>
        </div>
        <div className="flex justify-center gap-3 pt-4 lg:pt-0">
          <Button
            placeholder=""
            variant="outlined"
            className="text-secondary border border-secondary px-5 py-2"
            onClick={handleView}
          >
            View
          </Button>
          <Button
            placeholder=""
            variant="filled"
            className="bg-secondary px-5 py-2"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      </div>
      {viewOpen && (
        <JobViewDialog
          job={jobItem}
          viewOpen={viewOpen}
          setViewOpen={setViewOpen}
          size="xl"
        />
      )}
      {editOpen && (
        <JobEditDialog
          jobItem={jobItem}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          size="xl"
        />
      )}
    </div>
  );
};

export default JobTabItem;
