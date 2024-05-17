import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
  MTInput,
} from "@/libraries/material-tailwind";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps extends IComponent {
  contactInfo: boolean;
  setContactInfo: React.Dispatch<React.SetStateAction<boolean>>;

  size: DialogProps["size"];
}

const ContactInfoDialog: React.FC<IProps> = ({
  contactInfo,
  setContactInfo,
  size,
}: IProps) => {
  const handler = () => {
    setContactInfo(!contactInfo);
  };

  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    handleLoad();
  }, []);

  const handleChange = (e: any) => {
    const { id, value } = e.target;

    if (id === "name") {
      setName(value);
    } else if (id === "phone") {
      setPhone(value);
    } else {
      setEmail(value);
    }
  };

  const handleLoad = () => {
    const updateData = async () => {
      await api
        .get("/user/get/profile/office")
        .then((res) => {
          const { name, email, phone } = res.data || {};
          setName(name);
          setEmail(email);
          setPhone(phone);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    };
    updateData();
  };
  const handleSave = () => {
    const updateData = async () => {
      await api
        .post("/office/save/contact", {
          name: name,
          email: email,
          phone: phone,
        })
        .then((res) => {
          toast.success("Saved successfully.");
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    };
    updateData();
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={contactInfo}
      size={size}
      className="h-[70%] overflow-y-auto"
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
        <div className="p-0 sm:p-6 lg:p-10 xl:p-20">
          <div className="flex justify-between items-center">
            <Typography
              placeholder=""
              className="text-xl lg:text-2xl xl:text-4xl text-dark font-bold"
            >
              Add Office Contact Info
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div>
            <div className="flex flex-col gap-4 pt-6">
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  Office Contact Name
                </Typography>
                <MTInput
                  placeholder="Office Contact Name"
                  id="name"
                  value={name}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF] "
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  Office Contact Email ID
                </Typography>
                <MTInput
                  placeholder="Office Contact Email address"
                  id="email"
                  value={email}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF] "
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  Office Contact Phone
                </Typography>
                <MTInput
                  placeholder="Office Contact Phone"
                  id="phone"
                  maxLength={10}
                  value={phone}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF] "
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full rounded-lg mt-5">
              <div className="flex justify-end">
                <Button
                  variant="filled"
                  color="secondary"
                  className="text-xs"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ContactInfoDialog;
