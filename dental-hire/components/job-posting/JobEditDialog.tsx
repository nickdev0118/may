import { useState } from "react";
import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import Textarea from "@/components/custom/Textarea";
import Checkbox from "@/components/custom/Checkbox";
import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import { VALIDATION_REQUIRED_FIELD } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
  Select,
  Option,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import { toast } from 'react-toastify';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import { useJobs } from "@/contexts/JobContext";
import { professionalTypes } from "@/utils/constants";
import { IFormValues } from "@/utils/interfaces";

interface IProps extends IComponent {
  jobItem: IJob | undefined;
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: DialogProps["size"];
}

const JobEditDialog: React.FC<IProps> = ({
  jobItem,
  editOpen,
  setEditOpen,
  size
}: IProps) => {
  const handler = () => {
    setEditOpen(false);
  };

  const [scheduleDate, setScheduleDate] = useState<Dayjs | null>(dayjs(jobItem?.startDate));
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(jobItem?.availableTime?.startAt));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(jobItem?.availableTime?.endAt));
  const [cleared, setCleared] = useState<boolean>(false);
  const { expYears, practiceTypes } = useJobs();
  const { jobs, setJobs } = useJobs();
  let currentPracticeTypes: string[] = jobItem?.practiceTypes.map(type => type.name) || [];

  let initValues: IFormValues = {
    jobId: jobItem?.id,
    title: jobItem?.title || "",
    description: jobItem?.description || "",
    jobType: jobItem?.type == "Temporary" ? "temporary" : "fulltime",
    professionalType: String(jobItem?.proType),
    requiredYear: String(jobItem?.expYearsId),
    isReadPolicy: false,
  };

  practiceTypes.forEach(cur => {
    if (currentPracticeTypes.includes(cur.title)) {
      initValues = { ...initValues, [cur.title]: true }
    } else {
      initValues = { ...initValues, [cur.title]: false }
    }
  })

  const handleClose = async () => {
    await api.post("/jobs/office/set/open/status", {
      "isOpened": !jobItem?.isOpened,
      "id": jobItem?.id
    }).then(res => {
      const { success } = res.data;
      if (success) {
        toast.success("Job Closed Successfully!");
        handler();
      }
    }).catch(err => {
      toast.error(getErrorMessage(err));
    });
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required(VALIDATION_REQUIRED_FIELD),
    description: yup.string().required(VALIDATION_REQUIRED_FIELD),
  });

  const formik = useFormik({
    initialValues: initValues,
    validationSchema,
    onSubmit: (values) => {
      switch (values.jobType) {
        case 'fulltime': {
          const newJob: IJob | Object = {
            jobId: values.jobId,
            proType: values.professionalType,
            title: values.title,
            description: values.description,
            jobType: values.jobType,
            expYears: values.requiredYear,
            practiceTypes: practiceTypes.reduce((prev: number[], cur) => { if (values[cur.title]) prev.push(Number(cur.id)); return prev; }, []),
            visibleRestrict: values.isReadPolicy
          };

          const postData = async () => {
            await api.post("/jobs/office/save/job", newJob).then(res => {
              if (res.data.success) {
                toast.success("Successfully Job Edited!");
                setEditOpen(!editOpen);
              }
            }).catch(err => {
              toast.error(getErrorMessage(err));
            });
          }
          postData();
          break;
        }

        case 'temporary': {
          const newJob: IJob | Object = {
            jobId: values.jobId,
            proType: values.professionalType,
            title: values.title,
            description: values.description,
            jobType: values.jobType,
            expYears: values.requiredYear,
            practiceTypes: practiceTypes.reduce((prev: number[], cur) => { if (values[cur.title]) prev.push(Number(cur.id)); return prev; }, []),
            visibleRestrict: values.isReadPolicy,
            scheduleDate,
            startTime,
            endTime
          };

          const postData = async () => {
            await api.post("/jobs/office/save/job", newJob).then(res => {
              if (res.data.success) {
                toast.success("Successfully Job Edited!");
                setEditOpen(!editOpen);
              }
            }).catch(err => {
              toast.error(getErrorMessage(err));
            });
          }
          postData();
          break;
        }

        default: break;
      }

    },
  });

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={editOpen}
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
          {jobItem && (
            <div>
              <Typography
                placeholder=""
                className="text-dark text-xl xl:text-4xl font-semibold"
              >
                Edit Job Posting
              </Typography>
              <div>
                <Typography
                  placeholder=""
                  className="text-lightDark text-xs font-normal pt-6"
                >
                  Note:
                  You do not have an active plan. Any contact information you
                  send in your messages will be filtered. To remove this filter,
                  please select a plan{" "}
                  <span className="text-secondary cursor-pointer">here</span>.
                </Typography>
              </div>
              <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <div className="pt-3">
                  <Typography
                    placeholder=""
                    className="text-lightDark text-base font-normal"
                  >
                    What type of professional are you needing?*
                  </Typography>
                  <div className="w-full">
                    <Select
                      placeholder=""
                      label="Specialist"
                      className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1] bg-[#FCFAFF] pt-1"
                      labelProps={{
                        className:
                          "hidden",
                      }}
                      name="professionalType"
                      value={formik.values.professionalType}
                      onChange={(val) => formik.setFieldValue('professionalType', val)}
                    >
                      {professionalTypes.map((type, _i) => <Option value={String(type.id)} key={_i}>{type.label}</Option>)}
                    </Select>
                  </div>
                </div>
                <div className="pt-3">
                  <Typography
                    placeholder=""
                    className="text-lightDark text-base font-normal"
                  >
                    Post Title*
                  </Typography>
                  <div className="w-full">
                    <Input
                      id="title"
                      className="bg-[#FCFAFF] border-none !border-l-0 !border-r-0 !border-t-0"
                      name="title"
                      placeholder="Title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      error={formik.touched.title && formik.errors.title}
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <Typography
                    placeholder=""
                    className="text-lightDark text-base font-normal"
                  >
                    Description*
                  </Typography>
                  <div className="w-full">
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      error={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 lg:col-span-1">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-base font-normal"
                      >
                        Job type *
                      </Typography>
                      <div className="w-full">
                        <Select
                          placeholder=""
                          label="Permanent"
                          className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1] bg-[#FCFAFF] pt-1"
                          labelProps={{
                            className:
                              "hidden",
                          }}
                          name="jobtype"
                          value={formik.values.jobType}
                          onChange={(val) => {
                            formik.setFieldValue('jobType', val);
                          }}
                        >
                          <Option value="fulltime">Full time</Option>
                          <Option value="temporary">Temporary</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-base font-normal"
                      >
                        Required years of experience
                      </Typography>
                      <div className="w-full">
                        <Select
                          placeholder=""
                          label="1"
                          className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1] bg-[#FCFAFF] pt-1"
                          labelProps={{
                            className:
                              "hidden",
                          }}
                          name="requiredYear"
                          value={formik.values.requiredYear}
                          onChange={(val) => {
                            formik.setFieldValue('requiredYear', val)
                          }}
                        >
                          {expYears.map((val, _i) => <Option value={val.id} key={_i}>{val.title}</Option>)}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                {formik.values.jobType == "temporary" && <div className="pt-3">
                  <Typography
                    placeholder=""
                    className="text-lightDark text-base font-normal"
                  >
                    Date/time schedule
                  </Typography>
                  <div className="grid grid-cols-2 gap-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="col-span-1">
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'left',
                            position: 'relative'
                          }}
                        >
                          <DemoItem>
                            <DatePicker
                              className="border-none"
                              value={scheduleDate}
                              onChange={(newValue) => setScheduleDate(newValue)}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }}
                            />
                          </DemoItem>
                        </Box>
                      </div>
                      <div className="col-span-2 lg:col-span-1 flex justify-between items-center">
                        <TimePicker
                          className="border-none !border-b-[#EAE7F1]"
                          value={startTime}
                          onChange={(newValue) => setStartTime(newValue)}
                          slotProps={{
                            field: { clearable: true, onClear: () => setCleared(true) },
                          }}
                        />
                        <Typography
                          placeholder=""
                          className="text-lightDark text-xl font-base px-2"
                        >
                          To
                        </Typography>
                        <TimePicker
                          className="border-none !border-b-[#EAE7F1]"
                          value={endTime}
                          onChange={(newValue) => setEndTime(newValue)}
                          slotProps={{
                            field: { clearable: true, onClear: () => setCleared(true) },
                          }}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>
                </div>}
                <div className="pt-3">
                  <Typography
                    placeholder=""
                    className="text-lightDark text-base font-normal pb-2"
                  >
                    Practice type
                  </Typography>
                  <div className="grid grid-cols-4 gap-2">
                    {practiceTypes.map((item) => (
                      <div key={item.id} className="col-span-2 lg:col-span-1">
                        <Checkbox
                          name={item.title}
                          color="secondary"
                          label={
                            item.title.charAt(0).toUpperCase() +
                            item.title.slice(1).replace(/([A-Z])/g, " $1")
                          }
                          onChange={formik.handleChange}
                          checked={!!formik.values[item.title]}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Checkbox
                      name="isReadPolicy"
                      color="secondary"
                      label={<>Do not show this job post outside of Dental Jobs</>}
                      onChange={formik.handleChange}
                      checked={formik.values.isReadPolicy}
                      labelProps={{ className: "text-dark" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:justify-around">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="w-[80%] sm:w-[40%] items-center py-1.5 my-2 px-4"
                    type="submit"
                  >
                    Save Job Posting
                  </Button>
                  <Button
                    variant="filled"
                    color="secondary"
                    className="w-[80%] sm:w-[40%] items-center py-1.5 my-2 px-4"
                    onClick={handleClose}
                  >
                    Close Job Post
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default JobEditDialog;
