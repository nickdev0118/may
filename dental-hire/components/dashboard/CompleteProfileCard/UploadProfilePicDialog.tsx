import Button from "@/components/custom/buttons/Button";
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
import Image from "next/image";
import api from "@/utils/api";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from "react-toastify";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  uploadProfilePic: boolean;
  setUploadProfilePic: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const UploadProfilePicDialog: React.FC<IProps> = ({
  uploadProfilePic,
  setUploadProfilePic,
  size,
}: IProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { userData, setUserData } = useUser();

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;

    file.onload = function () {
      setSelectedImage(acceptedFiles[0]);
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const handleSave = () => {
    if (!selectedImage) {
      toast.error("Empty Image Not Allowed");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedImage);

    api
      .post("user/upload/profile/photo", formData)
      .then((res) => {
        setUserData({
          ...userData,
          avatar: res.data?.photo,
        });
        toast.success("Image Updated Successfully");
      })
      .catch((err) => toast.error(err));
  };

  const handler = () => {
    setUploadProfilePic(!uploadProfilePic);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={uploadProfilePic}
      size={size}
      className="h-[85%] overflow-y-auto"
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
        <div className="p-6 sm:pt-5 xl:pt-10">
          <div className="flex justify-between items-center">
            <Typography
              placeholder=""
              className="text-2xl lg:text-4xl text-dark font-bold"
            >
              Upload Profile Picture
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div className="flex flex-col gap-4 pt-6">
            <Typography placeholder="" className="text-xl text-dark font-bold">
              Profile Photo
            </Typography>
            <Typography
              placeholder=""
              className="text-sm text-lightDark font-normal"
            >
              (Head Shot)
            </Typography>
            <div className="pt-6">
              <div className="flex flex-col items-center py-20 border border-dashed border-[#D9D2E4] rounded-lg relative">
                {selectedImage ? (
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="object-cover"
                    width={250}
                    height={250}
                  />
                ) : userData?.avatar ? (
                  <Image
                    src={userData?.avatar}
                    alt="Selected"
                    className="object-cover"
                    width={250}
                    height={250}
                  />
                ) : (
                  <Icon
                    icon={ICON_MAPPER.gallery}
                    className="text-[#EAE7F1] w-24 h-24"
                  />
                )}
                <div {...getRootProps()} className="cursor-pointer text-center w-full h-[150px]">
                  <input {...getInputProps({ accept: 'image/jpeg, image/png' })} className="opacity-0 absolute top-0 bottom-0" />
                  {
                    isDragActive ?
                      <Typography
                        placeholder=""
                        className="text-base text-dark font-semibold pt-4"
                      >
                        + Drop your image here...
                      </Typography> :
                      <>
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
                        </Typography>
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 lg:pt-12">
            <div className="flex items-center gap-2"></div>
            <Button
              variant="filled"
              color="secondary"
              className="bg-secondary flex items-center gap-1 p-2"
              onClick={handleSave}
            >
              <Typography
                placeholder=""
                className="hidden md:block text-white text-xs xl:text-sm font-semibold"
              >
                Save
              </Typography>
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default UploadProfilePicDialog;
