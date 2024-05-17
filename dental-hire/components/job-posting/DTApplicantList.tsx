import { Typography, Avatar } from "@/libraries/material-tailwind";
import { IApplicant, IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps extends IComponent {
  tempApplicant: IApplicant[];
}

const DTApplicationList: React.FC<IProps> = ({ tempApplicant }: IProps) => {
  return (
    <>
      <div className="p-3 bg-[#FCFAFF] grid grid-cols-7 gap-2 rounded-lg">
        <div className="col-span-2">
          <Typography
            placeholder=""
            className="text-dark text-sm font-semibold"
          >
            Name
          </Typography>
        </div>
        <div className="col-span-1">
          <Typography
            placeholder=""
            className="text-dark text-sm font-semibold"
          >
            Reviews
          </Typography>
        </div>
        <div className="col-span-1">
          <Typography
            placeholder=""
            className="text-dark text-sm font-semibold"
          >
            Rate
          </Typography>
        </div>
        <div className="col-span-1">
          <Typography
            placeholder=""
            className="text-dark text-sm font-semibold text-center"
          >
            Bookings
          </Typography>
        </div>
        <div className="col-span-2">
          <Typography
            placeholder=""
            className="text-dark text-sm font-semibold text-center"
          >
            Actions
          </Typography>
        </div>
      </div>
      {tempApplicant.map((item: IApplicant, i: number) => (
        <div
          key={item.id}
          className={`grid grid-cols-7 gap-2 items-center p-3 ${
            i === tempApplicant.length - 1 ? "" : " border-b-2 border-[#F8F4FF]"
          }`}
        >
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Avatar
                variant="circular"
                placeholder=""
                src={item.avatar}
                alt=""
                className="w-5 h-5"
              />
              <Typography
                placeholder=""
                className="text-lightDark text-sm font-normal"
              >
                {item.name}
              </Typography>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center gap-2">
              <Icon icon={ICON_MAPPER.star} className="text-primary" />
              <Typography
                placeholder=""
                className="text-lightDark text-sm font-normal"
              >
                {item.reviews}
              </Typography>
            </div>
          </div>
          <div className="col-span-1">
            <Typography
              placeholder=""
              className="text-lightDark text-sm font-normal"
            >
              {`$${item.rate}/hr`}
            </Typography>
          </div>
          <div className="col-span-1">
            <Typography
              placeholder=""
              className="text-lightDark text-sm font-normal text-center"
            >
              {item.booking}
            </Typography>
          </div>
          <div className="col-span-2 flex justify-center gap-4">
            <Typography
              placeholder=""
              className="text-secondary text-sm font-normal text-center underline cursor-pointer"
            >
              Messages
            </Typography>
            <Typography
              placeholder=""
              className="text-secondary text-sm font-normal text-center underline cursor-pointer"
            >
              View Profile
            </Typography>
          </div>
        </div>
      ))}
    </>
  );
};

export default DTApplicationList;
