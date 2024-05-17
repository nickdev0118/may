"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { IComponent, IProfessional, ITabitem } from "@/utils/interfaces";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import { Typography } from "@/libraries/material-tailwind";
import FindProfessionalDialog from "./FindProfessionalDialog";
import Select from "@/components/custom/Select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { UserContext } from "@/contexts/UserContext";
import Loading from "../custom/Loading";

interface ISortOption {
  id: number;
  label: string;
}

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Hygienist",
  },
  {
    id: 3,
    label: "Dental Assistant",
  },
  {
    id: 4,
    label: "General Dentist",
  },
  {
    id: 5,
    label: "Front Office Staff",
  },
  {
    id: 6,
    label: "Specialist",
  },
  {
    id: 7,
    label: "Dental Service",
  },
];

const SORT_BY: ISortOption[] = [
  {
    id: 1,
    label: "Title",
  },
  {
    id: 2,
    label: "Distance",
  },
  {
    id: 3,
    label: "Rating",
  },
  {
    id: 4,
    label: "Hourly Rate",
  },
];

const FindProfessionals: React.FC = ({ className = "" }: IComponent) => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>(SORT_BY[0].label);
  const [professional, setProfessional] = useState<IProfessional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {userData} = useContext(UserContext);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  function filterProfessionals(): IProfessional[] {
    switch (activeTab) {
      case "All":
        return professional;
      case "Dental Service":
        return professional.filter((data) => data.type === "Dental Service");
      case "Hygienist":
        return professional.filter((data) => data.type === "Hygienist");
      case "Dental Assistant":
        return professional.filter(
          (data) => data.type === "Dental Assistant"
        );
      case "General Dentist":
        return professional.filter(
          (data) => data.type === "General Dentist"
        );
      case "Front Office Staff":
        return professional.filter(
          (data) => data.type === "Front Office Staff"
        );
      case "Specialist":
        return professional.filter((data) => data.type === "Specialist");
      default:
        return professional;
    }
  }

  useEffect(() => {
    setProfessional([]);
    if(!userData || userData?.userType == 2) return ;

    if(activeTab === "All"){
    api
      .post("/office/professionals/all/1")
      .then((res) => {
        setProfessional(res.data.professionals);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Dental Service"){
      api
        .post("/office/professionals/all/1", {
          type : "Dental-Service"
        })
        .then((res) => {
        setProfessional(res.data.professionals);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Hygienist"){
      api
        .post("/office/professionals/all/1", {
          type : "Hygienist"
        })
        .then((res) => {
        setProfessional(res.data.professionals);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Dental Assistant"){
      api
        .post("/office/professionals/all/1", {
          type : "Dental-Assistant"
        })
        .then((res) => {
        setProfessional(res.data.professionals);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "General Dentist"){
      api
        .post("/office/professionals/all/1", {
          type : "General-Dentist"
        })
        .then((res) => {
        setProfessional(res.data.professionals);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Front Office Staff"){
      api
        .post("/office/professionals/all/1", {
          type : "Front-Office-Staff"
        })
        .then((res) => {
        setProfessional(res.data.professionals);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Specialist"){
      api
        .post("/office/professionals/all/1", {
          type : "Specialist"
        })
        .then((res) => {
        setProfessional(res.data.professionals);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    }
    setLoading(false);
  },[activeTab, userData])

  const handleSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);

    if(e.target.value === "Distance"){
      professional.sort((a, b) => a.distance - b.distance)
    } else if(e.target.value === "Hourly Rate"){
      professional.sort((a, b) => a.hourlyRate - b.hourlyRate)
    }else if(e.target.value === 'Rating'){
      professional.sort((a, b) => a.rate.localeCompare(b.rate))
    } else {
      professional.sort((a, b) => a.name.localeCompare(b.name))
    }
      
  };

  return (
    <CardTemplate
      title=""
      className={`${className} min-h-screen overflow-y-auto`}
    >
      { loading ? <Loading /> :
      (<div className="flex flex-col gap-4 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <Swiper
              slidesPerView={6}
              centeredSlides={true}
              spaceBetween={30}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            > */}
            {TAB_ITEMS.map((item: ITabitem) => (
              // <SwiperSlide key={item.id}>
              <TabButton
                key={item.id}
                className="font-semibold"
                isActive={activeTab === item.label}
                onClick={() => setActiveTab(item.label)}
              >
                {item.label}
              </TabButton>
              // </SwiperSlide>
            ))}
            {/* </Swiper> */}
          </div>
          <Select value={sortBy} onChange={handleSortBy}>
            {SORT_BY.map((item) => (
              <option key={item.id} value={item.label}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
      </div>)
      }
      <FindProfessionalDialog filterProfessionals={filterProfessionals} />
    </CardTemplate>
  );
};

export default FindProfessionals;
