"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/custom/buttons/Button";
import StatusBadge from "@/components/custom/StatusBadge";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, STATUS_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import AddAdminDialog from "./AddAdminDialog";
import api from "@/utils/api";
import { IAdminInfo } from "@/utils/interfaces";
import { toast } from 'react-toastify';
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  adminDialog: boolean;
  setAdminDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const AdministratorsDialog: React.FC<IProps> = ({
  adminDialog,
  setAdminDialog,
  size = "lg",
}: IProps) => {
  const handler = () => {
    setAdminDialog(!adminDialog);
  };

  const [addAdmin, setAddAdmin] = useState<boolean>(false);
  const [adminInfo, setAdminInfo] = useState<IAdminInfo[]>();

  const handleAddAdmin = () => {
    setAddAdmin((curr) => !curr);
  };

  useEffect(() => {
    const getData = async () => {
      api
        .get("/office/get/administrator")
        .then((res) => {
          console.log(res.data);
          setAdminInfo(res.data);
        })
        .catch((err) => {
          toast.info(getErrorMessage(err));
        })
    }
    getData();
  }, [])

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={adminDialog}
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
                Administrators
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
              <Button
                variant="filled"
                color="secondary"
                className="hidden ss:flex items-center px-3 py-2"
                onClick={handleAddAdmin}
              >
                <Icon icon={ICON_MAPPER.plus} className="text-lg" />
                <Typography
                  placeholder=""
                  className="text-xs lg:text-sm font-bold"
                >
                  Add Administrator
                </Typography>
              </Button>
            </div>
            <div className="hidden xl:block pt-11 w-full">
              <div className="grid grid-cols-11 gap-5 w-full p-3 bg-[#FCFAFF] rounded-lg">
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-semibold"
                  >
                    Admin ID
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-semibold"
                  >
                    Name
                  </Typography>
                </div>
                <div className="col-span-3">
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-semibold"
                  >
                    Email ID
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-semibold"
                  >
                    Position
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-semibold"
                  >
                    Status
                  </Typography>
                </div>
              </div>
              {adminInfo && adminInfo?.map((admin : IAdminInfo) => <div key={admin.id} className="grid grid-cols-11 gap-5 w-full p-3">
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark font-normal"
                  >
                    {admin.id}
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark font-normal"
                  >
                    {admin.name}
                  </Typography>
                </div>
                <div className="col-span-3">
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark font-normal"
                  >
                    {admin.email}
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark font-normal"
                  >
                   {admin.position}
                  </Typography>
                </div>
                <div className="col-span-2">
                  <StatusBadge status={admin.status == "Active"? STATUS_MAPPER.active : STATUS_MAPPER.notVerified}>
                    {admin.status == "Active"? STATUS_MAPPER.active : STATUS_MAPPER.notVerified}
                  </StatusBadge>
                </div>
              </div>
              )}
            </div>
            <div className="block xl:hidden pt-6">
              {adminInfo && adminInfo.map( (admin) => <div key={admin.id} className="p-4 shadow-lg">
                <div className="flex justify-between items-center">
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-bold"
                  >
                    {admin.name}
                  </Typography>
                  <StatusBadge status={admin.status == "Active"? STATUS_MAPPER.active : STATUS_MAPPER.notVerified}>
                    {admin.status == "Active"? STATUS_MAPPER.active : STATUS_MAPPER.notVerified}
                  </StatusBadge>
                </div>
                <div className="grid grid-cols-4 gap-4 pt-4">
                  <div className="col-span-4 sm:col-span-2">
                    <div className="flex flex-col gap-1">
                      <Typography
                        placeholder=""
                        className="text-base text-dark font-semibold"
                      >
                        Admin ID
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-base text-lightDark font-normal"
                      >
                        {admin.id}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <div className="flex flex-col gap-1">
                      <Typography
                        placeholder=""
                        className="text-base text-dark font-semibold"
                      >
                        Name
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-base text-lightDark font-normal"
                      >
                        {admin.name}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <div className="flex flex-col gap-1">
                      <Typography
                        placeholder=""
                        className="text-base text-dark font-semibold"
                      >
                        Email ID
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-base text-lightDark font-normal"
                      >
                        {admin.email}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <div className="flex flex-col gap-1">
                      <Typography
                        placeholder=""
                        className="text-base text-dark font-semibold"
                      >
                        Position
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-base text-lightDark font-normal"
                      >
                        {admin.position}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              )}
              <div className="flex justify-center ss:hidden pt-6">
                <Button
                  variant="filled"
                  color="secondary"
                  className="flex items-center px-3 py-2"
                  onClick={handleAddAdmin}
                >
                  <Icon icon={ICON_MAPPER.plus} className="text-lg" />
                  <Typography
                    placeholder=""
                    className="text-xs lg:text-sm font-bold"
                  >
                    Add Administrator
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <AddAdminDialog
        addAdmin={addAdmin}
        setAddAdmin={setAddAdmin}
        setAdminDialog={setAdminDialog}
        size="lg"
      />
    </>
  );
};

export default AdministratorsDialog;
