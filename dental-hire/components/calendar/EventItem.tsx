import { Typography } from "@/libraries/material-tailwind";
import type { EventProps } from "@/libraries/react-big-calendar";

export default function EventItem({ title }: EventProps) {
  return (
    <div className="rounded-lg bg-gray-100 py-1 border border-gray-200">
      <Typography
        placeholder=""
        className="text-primary text-center text-sm font-semibold"
      >
        {title}
      </Typography>
    </div>
  );
}
