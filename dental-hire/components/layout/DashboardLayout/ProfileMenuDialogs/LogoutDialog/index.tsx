"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import {
  Dialog,
  DialogBody,
  Typography,
  DialogProps,
} from "@/libraries/material-tailwind";
import {
  L_STORAGE_AUTH_TOKEN,
  PATH_MAPPER,
} from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  logoutDialog: boolean;
  setLogOutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const LogOutDialog: React.FC<IProps> = ({
  logoutDialog,
  setLogOutDialog,
  size,
}: IProps) => {
  const router = useRouter();
  const {
    setAuthTokenInSessionStorage,
    setAuthTokenInLocalStorage,
  } = useAuth();
  const {setUserData} = useUser();

  const handler = () => {
    setLogOutDialog(!logoutDialog);
  };

  const handleLogout = () => {
    setAuthTokenInLocalStorage("");
    setAuthTokenInSessionStorage("");
    localStorage.setItem(L_STORAGE_AUTH_TOKEN, "");
    sessionStorage.setItem(L_STORAGE_AUTH_TOKEN, "");
    setUserData(null);
    localStorage.setItem("expireTime", "");
    router.push(PATH_MAPPER.signin);
  };

  return (
    <Dialog placeholder="" handler={handler} open={logoutDialog} size={size}>
      <DialogBody placeholder="">
        <div className="flex flex-col p-10">
          <Icon
            icon="streamline:logout-1-solid"
            className="text-primary text-3xl text-center m-auto"
          />
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold py-6 m-auto"
          >
            Are you sure you want to logout?
          </Typography>
          <div className="flex justify-center gap-3">
            <Button
              variant="outlined"
              color="lightDark"
              onClick={handler}
              className="py-2 px-4"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="py-2 px-4"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default LogOutDialog;
