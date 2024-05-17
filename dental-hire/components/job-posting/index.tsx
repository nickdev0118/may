"use client";

import React, { useContext, useEffect, useState } from "react";
import { IJob, ITabitem } from "@/utils/interfaces";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import JobTabItem from "./JobTabItem";
import Button from "@/components/custom/buttons/Button";
import JobAddDialog from "./JobAddDialog";
import { Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import api from "@/utils/api";
import { useJobs } from "@/contexts/JobContext";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { UserContext } from "@/contexts/UserContext";

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "Active",
  },
  // {
  //   id: 2,
  //   label: "Temporary",
  // },
  // {
  //   id: 3,
  //   label: "Unclaimed Bookings",
  // },
  {
    id: 2,
    label: "Closed",
  },
];

const JobPostingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Active");
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const { jobs, setJobs } = useJobs();
  const { userData } = useContext(UserContext);

  const handleAdd = () => {
    setAddOpen((prev) => !prev);
  };

  useEffect(() => {
    if (userData?.userType == 2) return;

    switch (activeTab) {
      case "Active":
        api
          .post("/jobs/office/list/pending")
          .then((res) => {
            setJobs(res.data ?? []);
          })
          .catch((err) => {
            toast.error(getErrorMessage(err));
          });
        break;

      // case "Temporary":
      //   api
      //     .post("/jobs/office/list/temporary")
      //     .then((res) => {
      //       setJobs(res.data ?? []);
      //     })
      //     .catch((err) => {
      //       toast.error(getErrorMessage(err));
      //     });
      //   break;

      // case "Unclaimed Bookings":
      //   api
      //     .post("/jobs/office/list/pending")
      //     .then((res) => {
      //       setJobs(res.data ?? []);
      //     })
      //     .catch((err) => {
      //       toast.error(getErrorMessage(err));
      //     });
      //   break;

      case "Closed":
        api
          .post("/jobs/office/list/archived")
          .then((res) => {
            setJobs(res.data ?? []);
          })
          .catch((err) => {
            toast.error(getErrorMessage(err));
          });
        break;
    }
  }, [activeTab, addOpen]);

  return (
    <CardTemplate title="" className="w-full bg-[#FFF]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {TAB_ITEMS.map((item: ITabitem) => (
              <TabButton
                key={item.id}
                className="font-semibold"
                isActive={activeTab === item.label}
                onClick={() => setActiveTab(item.label)}
              >
                {item.label}
              </TabButton>
            ))}
          </div>

          <Button
            variant="filled"
            color="secondary"
            className="bg-secondary flex items-center gap-1 p-2"
            onClick={handleAdd}
          >
            <Icon icon={ICON_MAPPER.plus} className="text-xl text-bold" />
            <Typography
              placeholder=""
              className="hidden md:block text-white text-base font-semibold"
            >
              Post A New Job
            </Typography>
          </Button>
        </div>

        {Array.isArray(jobs) && jobs?.length === 0 ? (
          <div className="flex flex-col items-center">
            <Typography
              placeholder=""
              className="text-lightDark text-xl font-semibold"
            >
              No Job Posts to Display
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-3">
            {Array.isArray(jobs) &&
              jobs?.map((job) => <JobTabItem key={job.id} jobItem={job} />)}
          </div>
        )}
      </div>

      {addOpen && (
        <JobAddDialog
          addOpen={addOpen}
          setAddOpen={setAddOpen}
          activeTab={activeTab}
        />
      )}
    </CardTemplate>
  );
};

export default JobPostingPage;
