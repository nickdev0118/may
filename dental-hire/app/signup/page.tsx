"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/custom/Input";
import LeftSection from "@/components/layout/AuthLayout/LeftSection";
import { IconButton } from "@/libraries/material-tailwind";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import { Icon } from "@/libraries/iconify-react";
import {
  ICON_MAPPER,
  VALIDATION_DISMATCH_PASSWORDS,
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
  PATH_MAPPER,
  L_STORAGE_AUTH_TOKEN,
  L_STORAGE_REFRESH_TOKEN,
} from "@/utils/constants";
import { TPasswordType } from "@/utils/types";
import Checkbox from "@/components/custom/Checkbox";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import Loading from "@/components/custom/Loading";
import { isValidPassword, inValidPasswordString } from "@/utils/validation";
import { useLocalStorage } from "@/libraries/usehooks-ts";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

const validationSchema = yup.object().shape({
  firstName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  lastName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  email: yup
    .string()
    .email(VALIDATION_INVALID_EMAIL)
    .required(VALIDATION_REQUIRED_FIELD),
  practiceName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  password: yup.string().required(VALIDATION_REQUIRED_FIELD),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password", undefined)], VALIDATION_DISMATCH_PASSWORDS)
    .required(VALIDATION_REQUIRED_FIELD),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  practiceName: "",
  password: "",
  confPassword: "",
};

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<TPasswordType>("password");
  const [confPasswordType, setConfPasswordType] =
    useState<TPasswordType>("password");
  const [isReadPolicy, setIsReadPolicy] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<
    string | boolean | undefined
  >(false);
  const [confPasswordError, setConfPasswordError] = useState<
    string | boolean | undefined
  >(false);
  const { setAuthTokenInSessionStorage, setAuthTokenInLocalStorage } =
    useAuth();
  const { setUserData } = useUser();
  const [, setLocalStorage] = useLocalStorage(L_STORAGE_AUTH_TOKEN, "");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const { firstName, lastName, email, practiceName, password } = values;
      setLoading(true);
      api
        .post("/create/office", {
          firstname: firstName,
          lastname: lastName,
          email,
          practicename: practiceName,
          password,
          signedPolicy: isReadPolicy,
        })
        .then((res) => {
          const { registered, token, refreshToken } = res.data;
          setLoading(false);
          if (registered) {
            toast.success("Success! You've been registered.");
            api
              .post("/login", { email, password: password })
              .then((res) => {
                const { userData, token, refreshToken } = res.data;
                let addTime: number = 7200000;
                sessionStorage.setItem(L_STORAGE_AUTH_TOKEN, token);
                setAuthTokenInSessionStorage(token);
                sessionStorage.setItem(L_STORAGE_AUTH_TOKEN, token);

                localStorage.setItem("expireTime", String(Date.now() + addTime));
                setUserData(userData);
                setLoading(false);
                router.push(PATH_MAPPER.dashboard);
              })
              .catch((err) => {
                setLoading(false);
                toast.error(getErrorMessage(err));
              });
          } else {
            toast.warn("Signing up was failed.");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPassword(formik.values.password)) {
      setPasswordError(inValidPasswordString);
      return;
    } else {
      setPasswordError(false);
    }

    if (!isValidPassword(formik.values.confPassword)) {
      setConfPasswordError(inValidPasswordString);
      return;
    } else if (formik.values.password !== formik.values.confPassword) {
      setConfPasswordError("Password confirmation mismatched.");
      return;
    } else {
      setConfPasswordError(false);
    }

    formik.handleSubmit();
  };

  return (
    <>
      <LeftSection className="hidden md:flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4 relative">
          <Image
            src="/assets/images/whiteLogo.png"
            width={54}
            height={54}
            className="w-auto h-auto"
            alt=""
            priority={true}
          />
          <h2 className="text-white text-3xl font-extrabold text-center">
            Dental Jobs
          </h2>
        </div>
        <div className="relative flex flex-col items-center gap-4 w-2/3 mt-48">
          <Image
            src="/assets/images/booking-calendar.png"
            alt=""
            width={477}
            height={400}
            className="h-auto w-auto"
          />
          <Image
            src="/assets/images/calendar-woman.png"
            alt=""
            width={194.7}
            height={201}
            className="h-auto w-auto absolute bottom-[4.5%] -right-[10%]"
          />
          <p className="text-lg font-semibold text-center text-white">
            Habitasse leo mi enim condimentum rhoncus. Sed non tortor gravida .
          </p>
        </div>
      </LeftSection>

      <section className="col-span-2 md:col-span-1 flex flex-col items-center py-16 z-10 bg-[#F5F7F9] h-screen overflow-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col items-center pb-6 md:hidden">
              <Image
                src="/assets/images/logo_purple.png"
                width={52}
                height={52}
                alt=""
                priority={true}
              />
              <Image
                src="/assets/images/letter_logo_purple.png"
                width={90}
                height={8.7}
                alt=""
                priority={true}
              />
            </div>
            <div className="w-full p-8 md:p-0 md:w-2/3 flex flex-col gap-12">
              <h2 className="text-dark text-3xl font-bold text-center md:text-left">
                Dental Practice Registration
              </h2>

              <div className="flex flex-col items-start gap-4 text-gray-500">
                <p>
                  We connect your practice with verified professionals
                  interested in temp and permanent work. Sign up in just 2 steps
                  to start browsing talent in your area.
                </p>
                <p className="font-bold">
                  Are you a dental professional looking for work?{" "}
                  <Link
                    href={`${process.env.NEXT_PUBLIC_WORKER_SITE_URL}/signup`}
                    className="text-secondary"
                  >
                    Register
                  </Link>
                </p>
              </div>

              <form
                className="w-full flex flex-col items-center gap-4"
                onSubmit={handleSubmit}
              >
                <div className="w-full grid grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    placeholder="First name"
                    className="bg-gray-200"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    error={formik.touched.firstName && formik.errors.firstName}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    placeholder="Last name"
                    className="bg-gray-200"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    error={formik.touched.lastName && formik.errors.lastName}
                  />
                  <div className="col-span-2">
                    <Input
                      type="email"
                      name="email"
                      label="Email Address"
                      id="email"
                      placeholder="Email address"
                      className="bg-gray-200"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      name="practiceName"
                      label="Practice Name"
                      id="practiceName"
                      placeholder="Practice Name"
                      className="bg-gray-200"
                      onChange={formik.handleChange}
                      value={formik.values.practiceName}
                      error={
                        formik.touched.practiceName &&
                        formik.errors.practiceName
                      }
                    />
                  </div>
                  <Input
                    id="password"
                    type={passwordType}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    className="bg-gray-200"
                    endAdornment={
                      <IconButton
                        placeholder=""
                        className="w-4 h-4 text-lightDark text-lg"
                        onClick={() =>
                          setPasswordType((prev) =>
                            prev === "text" ? "password" : "text"
                          )
                        }
                        variant="text"
                      >
                        <Icon
                          icon={
                            passwordType === "text"
                              ? ICON_MAPPER.eyeOff
                              : ICON_MAPPER.eye
                          }
                        />
                      </IconButton>
                    }
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={passwordError}
                  />
                  <Input
                    id="conf-password"
                    type={confPasswordType}
                    name="confPassword"
                    className="bg-gray-200"
                    label="Password Confirmation"
                    placeholder="Confirm your password"
                    endAdornment={
                      <IconButton
                        placeholder=""
                        className="w-4 h-4 text-lightDark text-lg"
                        onClick={() =>
                          setConfPasswordType((prev) =>
                            prev === "text" ? "password" : "text"
                          )
                        }
                        variant="text"
                      >
                        <Icon
                          icon={
                            confPasswordType === "text"
                              ? ICON_MAPPER.eyeOff
                              : ICON_MAPPER.eye
                          }
                        />
                      </IconButton>
                    }
                    onChange={formik.handleChange}
                    value={formik.values.confPassword}
                    error={confPasswordError}
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    color="secondary"
                    label
                    id="isReadPolicy"
                    checked={isReadPolicy}
                    onChange={(e) => setIsReadPolicy(e.target.checked)}
                  />
                  <label className="text-gray-500" htmlFor="isReadPolicy">
                    I have read, understand and agree to the Cloud Dentistry
                    Terms of Service, including the{" "}
                    <Link href="#" className="text-secondary">
                      User Agreement
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-secondary">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <Button
                  color="secondary"
                  variant="filled"
                  className="w-64"
                  type="submit"
                  disabled={!isReadPolicy}
                >
                  Sign Up
                </Button>

                <p className="text-gray-500 text-center">
                  Have an account?{" "}
                  <Link href="/signin" className="text-secondary">
                    Login
                  </Link>
                </p>
              </form>

              <p className="text-gray-500">
                Need help?{" "}
                <Link href="#" className="text-secondary">
                  Schedule a time
                </Link>{" "}
                to speak with us.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
