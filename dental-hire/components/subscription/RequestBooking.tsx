import React from 'react'
import { 
    Dialog, 
    DialogBody, 
    type DialogProps, 
    Typography, 
    Avatar, 
    IconButton
} from "@/libraries/material-tailwind";
import { IProfessional } from '@/utils/interfaces';
import { ellipsisString } from '@/utils/functions';
import Button from "@/components/custom/buttons/Button";
import { Icon } from '@/libraries/iconify-react';
import { ICON_MAPPER } from '@/utils/constants';

interface IProps {
    opened: boolean;
    setOpened: Function;
    profile: IProfessional
    size: DialogProps["size"];
}

export default function RequestBooking({
    opened,
    setOpened,
    profile,
    size,
}: IProps) {

    const handler = () => {
        setOpened(false);
    }

    const handleAddPlan = () => {
        console.log("Add Plan")
    }

  return (
    <>
        <Dialog 
        placeholder=""
        handler={handler}
        open={opened}
        size={size}
        className="h-[70%] overflow-y-auto"
        >
        <DialogBody placeholder="" className="mx-20 py-3 rounded-xl">
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
        <div className="flex flex-col pb-6 gap-2">
        <Typography
            placeholder=""
            className="text-2xl lg:text-4xl text-center text-dark font-bold pt-4 pb-4"
          >
            Request Booking To
          </Typography>
          <div className="flex items-center gap-4 p-2">
          <Avatar
            variant="rounded"
            src={profile.avatar ? profile.avatar : "/assets/images/profile.png"}
            alt=""
            className="w-[68px] h-[68px]"
            placeholder=""
          />
          <div className="flex flex-row pt-4 pb-4">
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
                  {`${profile?.name}`}
                </Typography>
                <Typography placeholder="" className="text-md text-lightDark">
                  {profile?.type}
                </Typography>
            </div>
          </div>
        </div>
        <div className='flex justify-center pt-4 pb-4'>
            <Typography placeholder="" className="text-dark text-sm">
                In order to book this professional, you will need to purchase a plan for this office.
            </Typography>
        </div>
          <div className="flex justify-end pt-4">
            <Button
              variant="filled"
              color="secondary"
              onClick={handleAddPlan}
              className="py-2 px-4"
            >
              Add A Plan
            </Button>
          </div>
        </div>
      </DialogBody>
        </Dialog>
    </>
  )
}
