"use client";

import AvatarCard from "@/components/dashboard/AvatarCard";
import CompleteProfileCard from "@/components/dashboard/CompleteProfileCard";
import ProfessionalsCard from "@/components/dashboard/ProfessionalsCard";
import ChoosePlanCard from "@/components/dashboard/ChoosePlanCard";
import CalendarCard from "@/components/dashboard/CalendarCard";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

export default function Dashboard() {
  const { userData } = useUser();

  useEffect(() => {
    if (!userData || userData?.userType == 2) return;
  }, []);

  return (
    <>
      <AvatarCard className="col-span-12 lg:col-span-3 2xl:col-span-2" />
      <CompleteProfileCard className="col-span-12 lg:col-span-4 2xl:col-span-3" />
      <ProfessionalsCard className="col-span-12 lg:col-span-5 2xl:col-span-4" />
      <ChoosePlanCard className="col-span-12 lg:col-span-6 2xl:col-span-6" />
      <CalendarCard className="col-span-12 lg:col-span-6 2xl:col-span-3" />
    </>
  );
}
