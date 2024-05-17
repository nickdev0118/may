import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, VALIDATION_REQUIRED_FIELD } from "@/utils/constants";
import { useFormik } from "@/libraries/formik";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
} from "@/libraries/material-tailwind";
import { useState } from "react";
import api from "@/utils/api";
import yup from "@/libraries/yup";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  verifyPhone: boolean;
  setVerifyPhone: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .required(VALIDATION_REQUIRED_FIELD),
});


const VerifyPhoneDialog: React.FC<IProps> = ({
  verifyPhone,
  setVerifyPhone,
  size,
}: IProps) => {

  const [codeSend, setCodeSend] = useState<boolean>(false);

  const handler = () => {
    setVerifyPhone(!verifyPhone);
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      code: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      if(codeSend){

        const userInput: Object = {
          phone: values.phone,
          code: values.code,
        }

        const verifyNumber = async() =>
        { await api
          .post("/user/verify/phone/number", userInput)
          .then((res) => {
            if (res.data.success) {
              toast.success("Phone verified")
              setVerifyPhone(!verifyPhone)
            }
          })
          .catch((err) => {
            toast.error(getErrorMessage(err));
          });
        }
        verifyNumber();
      }
      else{

        const verifyNumber = async() =>
        {await api
        .post("/user/send/phone/verification", {
          phone: values.phone,
        })
        .then((res) => {
          if (res.data.success) {
            setCodeSend(true);
          }
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
      }
      verifyNumber();
      }
    },

  });

  const handleResend = () => {
    setCodeSend(false);
    formik;
  }

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={verifyPhone}
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
        <div className="p-6 sm:pt-5 xl:pt-10">
          <div className="flex justify-between items-center">
            <Typography
              placeholder=""
              className="text-2xl lg:text-4xl text-dark font-bold"
            >
              Verify Phone Number
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Typography
              placeholder=""
              className="text-sm text-lightDark font-normal pt-6"
            >
              Verify your mobile number
            </Typography>
            <Typography
              placeholder=""
              className="text-sm text-lightDark font-normal"
            >
              You’re on mobile – so are we (we have an app!). You can receive
              messages and notifications from us, but first we need to verify
              your number.
            </Typography>
            <Typography
              placeholder=""
              className="text-sm text-lightDark font-normal"
            >
              Enter your phone number below and we’ll send you a confirmation
              code.
            </Typography>

            <form
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-8 w-full py-6">
                <Input
                  id="phone"
                  type="phone"
                  name="phone"
                  label="Phone Number"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.touched.phone && formik.errors.phone}
                />
              </div>

              {codeSend && <div className="flex flex-col gap-8 w-full">
                <Input
                  id="code"
                  type="code"
                  name="code"
                  label="OTP"
                  placeholder="OTP"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  error={formik.touched.code && formik.errors.code}
                />
              </div>}

              <div className="flex flex-col items-end mt-8">
                {codeSend && <Typography
                  placeholder=""
                  className="text-sm text-secondary font-normal"
                  onClick={handleResend}
                >
                  Resend Code
                </Typography>}
                <Button
                  variant="filled"
                  color="secondary"
                  className="py-1.5 mt-4"
                  type="submit"
                >
                  {codeSend ? "Verify Number" : "Send OTP"}
                </Button>
              </div>
              
            </form>

            {/* <Input
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="Phone number"
            />
            {codeSend && <Input id="OTP" name="OTP" label="OTP" placeholder="OTP" />}
          </div>
          {codeSend && <Typography
            placeholder=""
            className="text-sm font-normal text-secondary text-end  mt-5"
          >
            <Button variant="filled" color="secondary">
              Resend Code
            </Button>
          </Typography>}
          <div className="w-full rounded-lg mt-5">
            <div className="flex justify-end">
              <Button 
                variant="filled" 
                color="secondary" 
                className="text-xs"
                onClick={handleSend}
                >
                Send The Code
              </Button>
            </div>
          </div> */}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default VerifyPhoneDialog;
