"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import TabButton from "@/components/custom/buttons/TabButton";
import Button from "@/components/custom/buttons/Button";
import Select from "@/components/custom/Select";
import { IComponent, ITabitem, IProfessional, ISkills } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
  Avatar,
} from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { UserContext } from "@/contexts/UserContext";
import moment from "moment";
import Link from "next/link";
import IndividualProfessionalDialog from "@/components/find-professionals/IndividualProfessionalDialog";

interface IProps extends IComponent {
  profissionalsDialog: boolean;
  setProfessionalsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

interface ISortOption {
  id: number;
  label: string;
}

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "All Professionals",
  },
  {
    id: 2,
    label: "Favorite Professionals",
  },
  {
    id: 3,
    label: "Blocked Professionals",
  },
];

const SORT_BY: ISortOption[] = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Dentist",
  },
  {
    id: 3,
    label: "Hygienist",
  },
  {
    id: 4,
    label: "Dental Assistant",
  },
];

const ProfessionalsDialog: React.FC<IProps> = ({
  profissionalsDialog,
  setProfessionalsDialog,
  size,
}: IProps) => {
  const handler = () => {
    setProfessionalsDialog(!profissionalsDialog);
  };

  const [activeTab, setActiveTab] = useState<string>("All Professionals");
  let [professional, setProfessional] = useState<IProfessional[]>([]);
  const {userData} = useContext(UserContext);
  const [tempProfessional, setTempProfessional] = useState<IProfessional[]>([]);

  const [
    individualProfessionalDialogOpened,
    setIndividualProfessionalDialogOpened,
  ] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>();

  const handleFilterBy = (e: ChangeEvent<HTMLSelectElement>) => {
    let filterData = e.target.value
    let tempProfessional: IProfessional[] = [];
    switch(filterData) {
      case "All" :
        setTempProfessional(professional); break ;
      case "Dentist" :
        setTempProfessional(professional.filter((item) => {item.type == "Dentist"})); break ;
      case "Hygienist" :
        setTempProfessional(professional.filter((item) => {item.type == "Hygienist"})); break ;
      case "Dental Assistant" :
        setTempProfessional(professional.filter((item) => {item.type == "Dental Assistant"})); break ;
      default:
        setTempProfessional(professional); break ;
    }
  };

  function filterProfessionals(): IProfessional[] {
    switch (activeTab) {
      case "All Professionals":
        return tempProfessional;
      case "Favorite Professionals":
        return tempProfessional?.filter((item) => {item.isFavorite == true});
      case "Blocked Professionals":
        return [];   // No field in response of API to separate out blocked professionals
      default:
        return tempProfessional;
    }
  }

  const handleDialog = (id : string, index : number) => {
    const selected = filterProfessionals()[index];
    if (selected) {
      setIndividualProfessionalDialogOpened((prev) => !prev);
      setUserId(id);
    }
  };

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star"
            className="text-base sm:text-xl text-primary"
          />
        );
      } else if (i - 0.5 === rate) {
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star-half"
            className="text-base sm:text-xl text-primary"
          />
        );
      } else {
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star-outline"
            className="text-xl text-[#F6F4F9]"
          />
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    if(!userData || userData?.userType == 2) return ;

    api
      .post("/office/professionals/all/1")
      .then((res) => {
        setProfessional(res.data.professionals);
        setTempProfessional(res.data.professionals);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, [userData]);

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={profissionalsDialog}
      size={size}
      className="h-[80%] overflow-y-auto"
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
              Professionals
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div className="flex justify-between items-center pt-6 lg:pt-12">
            <div className="flex items-center gap-2">
              {TAB_ITEMS.map((item: ITabitem) => (
                <TabButton
                  key={item?.id}
                  className="font-semibold"
                  isActive={activeTab === item?.label}
                  onClick={() => setActiveTab(item?.label)}
                >
                  {item?.label}
                </TabButton>
              ))}
            </div>
            <Select onChange={handleFilterBy}>
              {SORT_BY.map((item) => (
                <option key={item?.id} value={item?.label}>
                  {item?.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            { filterProfessionals()?.length == 0 ? "No professionals found" :
              filterProfessionals()?.map((item: IProfessional, index: number) => (
              <div
                key={item?.id}
                className="col-span-2 2xl:col-span-1 pt-4 pb-4 bg-[#FCFCFD] rounded-lg"
              >
                <div className="flex justify-between gap-2">
                  <div className="flex gap-4 items-cebter">
                    <div className="relative">
                      <Avatar
                        variant="rounded"
                        src={item?.avatar || "/assets/images/profile.png"}
                        alt=""
                        className={`w-[58px] h-[58px] sm:w-[94px] sm:h-[94px]`}
                        placeholder=""
                      />
                      <div
                        className={`absolute w-6 h-6 rounded-full border-4 border-white right-[-10px] top-[-10px] flex justify-center items-center ${
                          item?.isFavorite === true ? "bg-[#FFD6DD]" : "bg-[#EAE7F1]"
                        }`}
                      >
                        <Icon
                          icon={ICON_MAPPER.heart}
                          className={`w-3 h-3 ${
                            item?.isFavorite === true
                              ? "text-[#FF3257]"
                              : "text-[#B6AACA]"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <Typography
                        placeholder=""
                        className="text-dark text-sm sm:text-xl font-bold"
                      >
                        {item?.name || "Name"}
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-lightDark text-xs sm:text-sm"
                      >
                        {item?.type || "-"}
                      </Typography>
                      <div className="flex items-center">
                        {renderStars(parseFloat(item?.rate))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex justify-between items-center gap-4">
                    <Button
                      variant="outlined"
                      color="secondary"
                      className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                      onClick={handler}
                    >
                      <Link href={PATH_MAPPER?.messages}>
                        Send A Message
                      </Link>
                    </Button>
                    <Button
                      variant="filled"
                      color="secondary"
                      className="py-1 px-3 h-[40px] text-xs sm:text:sm"
                      onClick={() => handleDialog(item.id, index)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
                <div className="pt-6">
                  <Typography placeholder="" className="text-lightDark text-sm">
                    Skills
                  </Typography>
                  <div className="flex flex-wrap gap-4 pl-2 pt-2">
                    {item?.skills.map((itemSkil: ISkills, i: number) => (
                      <Typography
                        placeholder=""
                        className="text-secondary text-sm bg-[#FFF9FA] p-2"
                        key={itemSkil.id}
                      >
                        {itemSkil.title}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 pt-6">
                  <div className="col-span-3 sm:col-span-1">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-xs sm:text-sm"
                    >
                      Distance
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-dark text-sm font-semibold"
                    >
                      { item?.distance ?  `${item?.distance} miles` : "-"}
                    </Typography>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <Typography
                      placeholder=""
                      className="text-lightDark  text-xs sm:text-sm"
                    >
                      Rate
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-dark text-sm font-semibold"
                    >
                     { item?.rate ?  `$ ${item?.rate}/hr ` : "-"}
                    </Typography>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <Typography
                      placeholder=""
                      className="text-lightDark  text-xs sm:text-sm"
                    >
                      Bookings
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-dark  text-xs sm:text-sm font-semibold"
                    >
                      {item?.bookings ? item?.bookings : "-"}
                    </Typography>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm"
                    >
                      Late-Cancel
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-dark  text-xs sm:text-sm font-semibold"
                    >
                      {(item?.lateCancel).length > 1  ? item?.lateCancel : "-"}
                    </Typography>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm"
                    >
                      No Shows
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-dark  text-xs sm:text-sm font-semibold"
                    >
                      {item?.shows ? item?.shows : "-"}
                    </Typography>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm"
                    >
                      Last Login
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-dark  text-xs sm:text-sm font-semibold"
                    >
                      {moment(item?.lastLoginAt).startOf('day').fromNow() || "-"}
                    </Typography>
                  </div>
                </div>
                <div className="flex justify-around items-center gap-4 pt-4 sm:hidden">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="text-sm md:text-base py-1 px-2 md:py-2 md:px-3"
                  >
                    Send A Message
                  </Button>
                  <Button
                    variant="filled"
                    color="secondary"
                    className="text-sm md:text-base py-1 px-2 md:py-2 md:px-3"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogBody>

      {(individualProfessionalDialogOpened && userId) && (
        <IndividualProfessionalDialog
          // item={selectedProfessional}
          individualProfessionalDialogOpened={
            individualProfessionalDialogOpened
          }
          setIndividualProfessionalDialogOpened={
            setIndividualProfessionalDialogOpened
          }
          userId = {userId}
          size="xl"
          renderStars={renderStars}
        />
      )}
    </Dialog>
  );
};

export default ProfessionalsDialog;
