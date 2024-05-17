import Button from "@/components/custom/buttons/Button";
import CommonInput from "@/components/custom/CommonInput";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
  MTInput,
} from "@/libraries/material-tailwind";
import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import Image from "next/image";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  contactInfo: boolean;
  setContactInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const ContactInfoDialog: React.FC<IProps> = ({
  contactInfo,
  setContactInfo,
  setProfileDialog,
  size,
}: IProps) => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const { userData, setUserData } = useUser();

  useEffect(() => {
    api
      .get("/user/info")
      .then((res) => {
        const { firstName, lastName, address, city, zipCode, phone } = res.data;
        setFname(firstName);
        setLname(lastName);
        setAddress(address);
        setCity(city);
        setZipcode(zipCode);
        setPhone(phone);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, []);

  const handler = () => {
    setContactInfo(!contactInfo);
    setProfileDialog(true);
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;

    if (id === "fname") {
      setFname(value);
    } else if (id === "lname") {
      setLname(value);
    } else if (id === "address") {
      setAddress(value);
    } else if (id === "city") {
      setCity(value);
    } else if (id === "zipcode") {
      setZipcode(value);
    } else if (id === "phone") {
      setPhone(value);
    } else {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    const updateData = async () => {
      await api
        .post("/user/update/office/profile/info", {
          firstName: fname,
          lastName: lname,
          address: address,
          city: city,
          zipCode: zipcode,
          phone: phone,
        })
        .then((res) => {
          avatar && handleUploadAvatar(avatar);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    };
    updateData();
  };

  const handleUploadAvatar = (_avatar: File) => {
    const formData = new FormData();
    formData.append("avatar", _avatar);

    api
      .post("user/upload/profile/photo", formData)
      .then((res) => {
        setUserData({
          ...userData,
          avatar: res.data?.photo,
        });
        toast.success("Saved Successfully");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={contactInfo}
      size={size}
      className="h-[75%] overflow-y-auto"
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
              Edit Profile
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  First Name
                </Typography>
                <Input
                  placeholder="First Name"
                  id="fname"
                  value={fname}
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
                  Last Name
                </Typography>
                <MTInput
                  placeholder="Last Name"
                  id="lname"
                  value={lname}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
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
                  Address
                </Typography>
                <MTInput
                  placeholder="Street number and name"
                  id="address"
                  value={address}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
                <div className="flex justify-between items-center gap-3 pt-2">
                  <MTInput
                    placeholder="City"
                    id="city"
                    value={city}
                    className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                    labelProps={{
                      className: "hidden",
                    }}
                    crossOrigin={undefined}
                    onChange={handleChange}
                  />
                  <MTInput
                    placeholder="Zip Code"
                    id="zipcode"
                    value={zipcode}
                    className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
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
                    Phone Number
                  </Typography>
                  <MTInput
                    placeholder="Phone Number"
                    id="phone"
                    maxLength={10}
                    value={phone}
                    className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                    labelProps={{
                      className: "hidden",
                    }}
                    crossOrigin={undefined}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <div className="flex gap-2 justify-center items-center md:justify-start text-2xl text-dark font-bold">
                      Profile Photo
                      <Icon
                        icon={ICON_MAPPER.edit}
                        className="w-5 h-4 text-secondary"
                      />
                    </div>
                    <div className="text-0.5xl">(Head Shot)</div>
                  </div>
                  <div className="flex flex-col h-40 justify-center items-center !bg-[#FCFAFF]">
                    {avatar ? (
                      <Image
                        src={URL.createObjectURL(avatar)}
                        alt="Selected"
                        className="w-24 h-24 object-cover"
                        width={500}
                        height={500}
                      />
                    ) : (
                      <Image
                        className="w-auto h-auto  bg-white rounded-lg"
                        src="/assets/images/gallery.png"
                        alt="Image"
                        width={150}
                        height={150}
                      />
                    )}

                    <input
                      id="profilephoto"
                      type="file"
                      // value={profilephoto}
                      className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                      // crossOrigin={undefined}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button
              variant="filled"
              color="secondary"
              className="text-xs"
              onClick={handleUpdate}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ContactInfoDialog;
