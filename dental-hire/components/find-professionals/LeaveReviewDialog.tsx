import Button from "@/components/custom/buttons/Button";
import { IComponent, IJob, IProfessional } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  DialogProps,
  IconButton,
} from "@/libraries/material-tailwind";
import { ellipsisString, getErrorMessage } from "@/utils/functions";
import { ChangeEvent, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { Avatar, Textarea } from "@material-tailwind/react";

interface IProps extends IComponent {
  leaveReview : boolean;
  setLeaveReview: React.Dispatch<React.SetStateAction<boolean>>;
  profile: IProfessional;
  size: DialogProps["size"];
}

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ filled, onClick }) => {
  return (
    <Icon
        icon={
          filled
            ? "material-symbols:star"
            : "material-symbols:star-outline"
        }
        height={36}
        width={36}
        className="text-xl text-[#FFAD32]"
        onClick={onClick}
      />
  );
};

const LeaveReviewDialog: React.FC<IProps> = ({
  leaveReview,
  setLeaveReview,
  profile,
  size
}: IProps) => {

  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handler = () => {
    setLeaveReview(!leaveReview);
  };

  const handleReview = () => {

    const reviewMessage = async() =>{
      await api
        .post("/send/review", {
          professionalId: profile.id,
          review: review,
          rate: rating
        })
        .then((res)=>{
          console.log(res.data);
          toast.success("Review Submitted");
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    }
    reviewMessage();
    setReview("");
    setRating(0);
  }

  return (
    <Dialog placeholder="" handler={handler} open={leaveReview} size={size}>
      <DialogHeader placeholder="" className="flex justify-end">
        <IconButton
          placeholder=""
          className="text-2xl text-lightDark w-8 h-8"
          variant="text"
          onClick={handler}
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </DialogHeader>
      <DialogBody placeholder="" className="mx-20 py-3 rounded-xl">
        <div className="flex flex-col pb-6 gap-2">
        <Typography
            placeholder=""
            className="text-2xl lg:text-4xl text-center text-dark font-bold"
          >
            Leave A Review
          </Typography>
          <div className="flex gap-2 p-2">
          <Avatar
            variant="rounded"
            src={profile?.avatar || "/assets/images/profile.png"}
            alt=""
            className="w-[68px] h-[68px]"
            placeholder=""
          />
          <div className="flex flex-row ">
            <div className=" md:hidden">
              <Typography
                placeholder=""
                variant="h3"
                className="text-dark text-xl font-bold"
              >
                {ellipsisString(`${profile.name}`, 30)}
              </Typography>
            </div>
            <div className="flex flex-col items-between">
                <Typography
                  placeholder=""
                  variant="h3"
                  className="text-dark text-xl font-bold"
                >
                  {profile?.name || "Name"}
                </Typography>
                <Typography placeholder="" className="text-md text-lightDark">
                  {profile?.type || "-"}
                </Typography>
            </div>
          </div>
        </div>
        <div>
          <Typography
            placeholder=""
            className="text-xs text-md font-normal text-lightDark"
          >
            Click the stars to rate
          </Typography>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                filled={index < rating}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
        </div>
        <div>
            <Typography
              placeholder=""
              className="text-xs text-md font-normal text-lightDark"
            >
              Review
            </Typography>
            <Textarea
              rows={5}
              resize={false}
              placeholder="Enter your review here..."
              className="min-h-full !border-0 focus:border-transparent rounded-lg !bg-[#FCFAFF]"
              containerProps={{
                className: "grid h-full",
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={review}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center gap-3">
            <Button
              variant="filled"
              color="secondary"
              onClick={handleReview}
              className="py-2 px-4"
            >
              Leave A Review
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default LeaveReviewDialog;
