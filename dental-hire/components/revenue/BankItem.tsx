"use client";

import React from "react";
import { IComponent, IBank } from "@/utils/interfaces";
import { Typography, Avatar } from "@/libraries/material-tailwind";
import StatusBadge from "../custom/StatusBadge";

interface IBankItem extends IComponent {
  bank: IBank;
}

export default function BankItem({ bank }: IBankItem) {
  return (
    <div className="flex flex-col bg-[#FFF] border border-[#F6F4F9] py-6 px-8">
      <div className="flex justify-center">
        <Avatar placeholder="" className="w-20 h-20" src={bank.logo} />
      </div>
      <Typography
        placeholder=""
        className="text-dark font-bold text-sm pt-2 text-center"
      >
        {bank.name}
      </Typography>
      <Typography
        placeholder=""
        className="text-lightDark font-normal text-sm pt-2 text-center"
      >
        {bank.bankNum}
      </Typography>
      <div className="flex justify-center gap-6 pt-3">
        <StatusBadge status={bank.status}>Instant {bank.status}</StatusBadge>
        {bank.isDefault ? (
          <StatusBadge status={bank.status} isDefault={bank.isDefault}>
            Default
          </StatusBadge>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
