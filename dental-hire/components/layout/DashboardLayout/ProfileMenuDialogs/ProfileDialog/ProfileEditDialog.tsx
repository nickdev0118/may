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
} from "@/libraries/material-tailwind";
import { useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  profileEdit: boolean;
  setProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileDialog: React.Dispatch<React.SetStateAction<boolean>>;

  size: DialogProps["size"];
}

const ProfileEditDialog: React.FC<IProps> = ({
  profileEdit,
  setProfileEdit,
  setProfileDialog,
  size,
}: IProps) => {
  const handler = () => {
    setProfileEdit(!profileEdit);
    setProfileDialog(true);
  };

  const [image, setImage] = useState<any>(null);
  const { userData, setUserData } = useUser();


  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (image) {
      const formData = new FormData();
      formData.append("avatar", image);

      api
        .post("/user/upload/profile/photo", formData)
        .then((res) => {
          setUserData({
            ...userData,
            avatar: res.data?.photo,
          });
          toast.success("Image Updated Successfully");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error uploading image:", error);
          toast.error("Failed to update image");
        });
    }
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={profileEdit}
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
          <div className="block lg:hidden">
            <div className="flex flex-col gap-4 pt-6">
              <CommonInput
                id="firstname"
                name="firstname"
                label="First Name"
                placeholder="Your First name here..."
              />
              <CommonInput
                id="lastname"
                name="lastname"
                label="Last Name"
                placeholder="Your Last name here..."
              />
              <CommonInput
                id="address"
                name="address"
                label="Address"
                placeholder="Street number and name"
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1">
                  <CommonInput id="city" name="city" placeholder="Enter City" />
                </div>
                <div className="col-span-1">
                  <CommonInput
                    id="postalCode"
                    name="postalCode"
                    placeholder="Enter Postal code"
                  />
                </div>
              </div>
              <CommonInput
                id="phoneNum"
                name="phoneNum"
                label="Phone number"
                placeholder="xxx-xxx-xxxx"
              />
            </div>
            <div className="pt-6">
              <div className="flex items-center gap-3">
                <Typography
                  placeholder=""
                  className="text-sm text-dark font-bold"
                >
                  Profile Photo
                </Typography>
                <Icon icon={ICON_MAPPER.edit} className="text-secondary" />
              </div>
              <Typography
                placeholder=""
                className="text-xs text-lightDark font-normal"
              >
                (Head Shot)
              </Typography>
            </div>
            <div className="pt-2 relative">
              {image ? (
                <Image
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                  width={24}
                  height={24}
                />
              ) : (
                <>
                  <Icon
                    icon={ICON_MAPPER.gallery}
                    className="text-[#EAE7F1] w-12 h-12 "
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>
            <div className="pt-4">
              <Button variant="filled" color="secondary" className="w-full">
                Update Profile
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div>
              <Typography
                placeholder=""
                className="text-xl text-dark font-bold pt-12"
              >
                Profile Photo
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-lightDark font-normal pt-1"
              >
                (Head Shot)
              </Typography>
            </div>
            <div className="pt-6">
              <div className="flex flex-col items-center py-20 border border-dashed border-[#D9D2E4] rounded-lg relative">
                {image ? (
                  <Image
                    src={image}
                    alt="Uploaded"
                    className="w-12 h-12 object-cover rounded-lg"
                    width={24}
                    height={24}
                  />
                ) : (
                  <>
                    <Icon
                      icon={ICON_MAPPER.gallery}
                      className="text-[#EAE7F1] w-12 h-12"
                    />
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                  onChange={handleImageUpload}
                />
                <Typography
                  placeholder=""
                  className="text-base text-dark font-semibold pt-4"
                >
                  + Drop your image here, or{" "}
                  <span className="text-secondary">browse</span>
                </Typography>
                <Typography
                  placeholder=""
                  className="text-sm text-lightDark font-normal pt-4"
                >
                  (Accepted file types: JPG or PNG)
                  <span className="text-secondary"> browse</span>
                </Typography>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                variant="filled"
                color="secondary"
                className="h-[50px]"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ProfileEditDialog;
