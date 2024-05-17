"use client"
import { IComponent, IDashbordProfessional } from "@/utils/interfaces";
import { Avatar, Typography } from "@/libraries/material-tailwind";
import CardTemplate from "@/components/custom/CardTemplate";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import moment from "moment";
import Loading from "../custom/Loading";


export default function ProfessionalsCard({ className = "" }: IComponent) {

  const [professional, setProfessional] = useState<IDashbordProfessional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    api
      .post("/office/professionals/dashboard")
      .then((res) => {
        setProfessional(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
    });
  },[]);

  return (
    <CardTemplate className={className} title="New Professionals Near You">
      {loading ? <Loading /> :
       <div>
        {professional.map((item, i) => (
          <div
            key={item.id}
            className={`flex justify-between items-center py-2 xl:py-4 ${
              i === professional.length - 1
                ? ""
                : " border-b-2 border-[#F8F4FF]"
            }`}
          >
            <div className="flex-1 flex items-center gap-2">
              <div className="relative">
                <Avatar
                  variant="circular"
                  placeholder=""
                  src={item.avatar || "/assets/images/profile.png"}
                  alt=""
                  className="w-12 h-12"
                />
                <div
                  className={`absolute w-6 h-6 rounded-full border-4 border-white right-0 bottom-[-5px] flex justify-center items-center ${
                    item.isFavorite === true ? "bg-[#FFD6DD]" : "bg-[#EAE7F1]"
                  }`}
                >
                  <Icon
                    icon={ICON_MAPPER.heart}
                    className={`w-3 h-3 ${
                      item.isFavorite === true ? "text-[#FF3257]" : "text-[#B6AACA]"
                    }`}
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <Typography
                  placeholder=""
                  className="text-dark text-base font-semibold"
                >
                  {item.name || "Name"}
                </Typography>
                <div className="flex justify-between  ">
                  <Typography placeholder="" className="text-lightDark text-sm">
                    {item.type || "-"}
                  </Typography>
                  <Typography placeholder="" className="text-lightDark text-sm">
                    {moment(item.createdAt).startOf('hour').fromNow()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Typography
          placeholder=""
          className="text-secondary text-lg font-semibold cursor-pointer text-center"
        >
          <Link href={PATH_MAPPER.findProfessionals} className="text-secondary">
            See All Professionals
          </Link>
        </Typography>
      </div>}
    </CardTemplate>
  );
}
