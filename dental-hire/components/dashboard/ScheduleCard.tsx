import { IComponent } from "@/utils/interfaces";
import { Avatar, Typography } from "@/libraries/material-tailwind";
import CardTemplate from "@/components/custom/CardTemplate";
import Button from "@/components/custom/buttons/Button";
import { useState } from "react";
import ScheduleBook from "./schedule-book.tsx/ScheduleBook";

const SCHEDULES = [
  {
    id: 1,
    title: "Heather Thurman",
    content: "Onboarding Manager assigned to your account.",
    src: "/assets/images/avatar1.png",
  },
  {
    id: 2,
    title: "Adriana Kwock",
    content: "Onboarding Manager assigned to your account.",
    src: "/assets/images/avatar2.png",
  },
  {
    id: 3,
    title: "Emery Saris",
    content: "Onboarding Manager assigned to your account.",
    src: "/assets/images/avatar3.png",
  },
  {
    id: 4,
    title: "Chance George",
    content: "Onboarding Manager assigned to your account.",
    src: "/assets/images/avatar4.png",
  },
];

export default function ScheduleCard({ className = "" }: IComponent) {

  const [bookNow, setBookNow] = useState<boolean>(false);

  const handleBook = () => {
    setBookNow(true);
  }

  return (
    <CardTemplate className={className} title="Schedule a Demo">
      <div>
        {SCHEDULES.map((item, i) => (
          <div
            key={item.id}
            className={`flex justify-between items-center py-2 xl:py-4 ${
              i === SCHEDULES.length - 1 ? "" : " border-b-2 border-[#F8F4FF]"
            }`}
          >
            <div className="flex-1 flex items-start gap-2">
              <Avatar
                variant="circular"
                placeholder=""
                src={item.src}
                alt=""
                className="w-12 h-12"
              />
              <div className="flex-1 flex flex-col">
                <Typography
                  placeholder=""
                  className="text-dark text-base font-semibold"
                >
                  {item.title}
                </Typography>
                <Typography placeholder="" className="text-lightDark text-sm">
                  {item.content}
                </Typography>
              </div>
            </div>
            <div>
              <Typography
                placeholder=""
                className="text-secondary text-sm xl:text-lg font-bold underline cursor-pointer block xl:hidden"
              >
                Book a demo
              </Typography>
              <Button
                variant="filled"
                color="secondary"
                className="py-1 xl:py-2 px-1 xl:px-3 hidden xl:block cursor-pointer"
                onClick={handleBook}
              >
                Book A Demo
              </Button>
            </div>
            {item.id && (
            <ScheduleBook
              job={item.id}
              bookNow={bookNow}
              setBookNow={setBookNow}
            />
          )}
          </div>
        ))}
      </div>
    </CardTemplate>
  );
}
