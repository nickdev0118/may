"use client";

import { useState } from "react";
import { TEMP_USERS } from "@/components/messages/tempData";
import { IUserItem } from "@/utils/interfaces";
import DP from "@/components/messages/DP";
import MB from "@/components/messages/MB";

export type TUserItem = IUserItem | null;

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<TUserItem>(null);

  return (
    <>
      <DP {...{ selectedUser, setSelectedUser }} />
      <MB {...{ selectedUser, setSelectedUser }} />
    </>
  );
}
