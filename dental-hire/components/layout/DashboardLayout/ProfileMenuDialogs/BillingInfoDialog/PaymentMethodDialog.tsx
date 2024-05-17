"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TabButton from "@/components/custom/buttons/TabButton";
import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import { IComponent, ITabitem } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, VALIDATION_REQUIRED_FIELD, VALIDATION_DISMATCH_PASSWORDS, COUNTRIES } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
} from "@/libraries/material-tailwind";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import PaymentBank from "./PaymentBank";
import { useBillPlan } from "@/contexts/BillPlanContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface IProps extends IComponent {
  paymentMethod: boolean;
  setPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
  setBillingInfo?: React.Dispatch<React.SetStateAction<boolean>>;
  from: string;
  size: DialogProps["size"];
}

interface ICardFormData {
  email: string;
  cardnumber: string;
  expiration: string;
  cvc: string;
  country?: string
}

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "Card",
  },
  {
    id: 2,
    label: "US Bank Account",
  },
];

const validationSchema = yup.object().shape({
  email: yup.string().required(VALIDATION_REQUIRED_FIELD),
  cardnumber: yup.string().required(VALIDATION_REQUIRED_FIELD),
  expiration: yup.string().required(VALIDATION_REQUIRED_FIELD),
  cvc: yup.string().required(VALIDATION_REQUIRED_FIELD),
});

const PaymentMethodDialog: React.FC<IProps> = ({
  paymentMethod,
  setPaymentMethod,
  setBillingInfo,
  from,
  size,
}: IProps) => {
  const handler = () => {
    setPaymentMethod(!paymentMethod);
    if (from == "billinginfo" && setBillingInfo) {
      setBillingInfo(true);
    };
  };

  const [activeTab, setActiveTab] = useState<string>("Card");
  const [country, setCountry] = useState<string>("");
  const { selectedPlan } = useBillPlan();

  const [cardFormData, setCardFormData] = useState<ICardFormData>({
    email: "",
    cardnumber: "",
    expiration: "",
    cvc: "",
    country: "US"
  });

  const formik = useFormik({
    initialValues: cardFormData,
    validationSchema,
    onSubmit: (values) => {
      switch (from) {
        case 'billinginfo': {
          const formData: {
            cardNumber: string;
            expiry: string;
            pin: string;
          } = {
            cardNumber: values.cardnumber,
            expiry: values.expiration,
            pin: values.cvc,
          };
          api
            .post("/membership/save/credit/card", formData)
            .then((res) => {
              const { success } = res.data;
              if (success) {
                toast.success("Billing information is successfully saved!");
                setPaymentMethod(false);
              }
            })
            .catch((err) => {
              toast.error(getErrorMessage(err));
            });
          break;
        }
        case 'selectplan': {
          const formData: {
            planId: string;
            cardData: {
              cardNumber: string;
              expiry: string;
              cvv: string;
              // country?: string;
            }
          } = {
            planId: selectedPlan.id,
            cardData: {
              cardNumber: values.cardnumber,
              expiry: values.expiration,
              cvv: values.cvc,
              // country: country
            }
          };
          api
            .post("/membership/office/make/membership/payment", formData)
            .then((res) => {
              const { success } = res.data;
              if (success) {
                toast.success("Payment method is successfully confirmed!");
                setPaymentMethod(false);
              }
            })
            .catch((err) => {
              toast.error(getErrorMessage(err));
            });
          break;
        }
      }
    },
  });

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={paymentMethod}
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
              {from == "billinginfo" ? 'Billing Info' : 'Please Select your payment method'}
            </Typography>
            <Icon
              icon={ICON_MAPPER.close}
              className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
              onClick={handler}
            />
          </div>
          <div className="">
            <Typography
              placeholder=""
              className="text-dark text-xl font-bold pt-12"
            >
              {from == "billinginfo" ? 'Add payment method' : ''}
            </Typography>
            {from == "selectplan" &&
              <div className="flex flex-col gap-4">
                <Typography placeholder="" className="font-sans text-sm font-normal leading-5 text-[#7A6899]">If you need to hire a temp or permanent hire right away, you will need to use a credit card or, an US Bank Account that supports instant verification for ACH. If you can’t find your bank in the search below, it means that manual verification is required to authorize ACH, which can take up to 2 days. In this case, please use a credit card to start.<br />If your bank requires manual verification to authorize ACH, you can add this as a payment option and then switch to it once the verification is complete and the connection is authorized.</Typography>
                <Typography placeholder="" className="font-sans text-base font-bold leading-6 text-[#7A6899]">Subscribing to Deluxe Plan</Typography>
                <Typography placeholder="" className="font-sans text-base font-bold leading-6 text-[#8032FF]">${selectedPlan.cost}<span className="text-[#7A6899] text-xs font-sans font-bold leading-5 pr-2 border-r-2 border-[#D9D2E4]">/Month</span><span className="text-base font-bold leading-6 text-[#8032FF] font-sans pl-2">12 month, Billed monthly</span></Typography>
              </div>
            }
            <div className="flex items-center pt-6">
              {TAB_ITEMS.map((item: ITabitem) => (
                <TabButton
                  key={item.id}
                  className="font-semibold"
                  isActive={activeTab === item.label}
                  onClick={() => setActiveTab(item.label)}
                >
                  {item.label}
                </TabButton>
              ))}
            </div>
          </div>
          <div className="pt-4">
            {activeTab === "Card" ? (
              <div className="border border-[#F6F4F9] rounded-lg p-2">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Icon
                          icon={ICON_MAPPER.lock}
                          className="text-primary w-5 h-5"
                        />
                        <Typography
                          placeholder=""
                          className="text-dark text-xs font-semibold"
                        >
                          Secure, 1-click checkout with Link
                        </Typography>
                      </div>
                      <Icon
                        icon={ICON_MAPPER.close}
                        className="text-dark w-3 h-3"
                      />
                    </div>
                    <div className="pl-7">
                      <Typography
                        placeholder=""
                        className="text-lightDark text-xs font-normal pt-2"
                      >
                        Securely pay with your saved info, or create a Link
                        account for faster checkout next time.
                      </Typography>
                      <div className="pt-4">
                        <Input
                          id="email"
                          name="email"
                          label="Email"
                          placeholder="Enter your Email Address"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          error={formik.touched.email && formik.errors.email}
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <Image
                          src="/assets/images/linkImg.png"
                          alt=""
                          width={56}
                          height={36}
                          className="width:auto height:auto"
                        />
                        <Typography
                          placeholder=""
                          className="text-secondary text-base font-normal cursor-pointer hover:underline"
                        >
                          Learn more
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 pl-7">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          id="cardnumber"
                          name="cardnumber"
                          label="Card number"
                          placeholder="xxxx xxxx xxxx xxxx"
                          onChange={formik.handleChange}
                          value={formik.values.cardnumber}
                          error={
                            formik.touched.cardnumber &&
                            formik.errors.cardnumber
                          }
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          id="expiration"
                          name="expiration"
                          label="Expiration"
                          placeholder="MM / YY"
                          onChange={formik.handleChange}
                          value={formik.values.expiration}
                          error={
                            formik.touched.expiration &&
                            formik.errors.expiration
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          id="cvc"
                          name="cvc"
                          label="CVC"
                          placeholder="CVC"
                          onChange={formik.handleChange}
                          value={formik.values.cvc}
                          error={
                            formik.touched.cvc &&
                            formik.errors.cvc
                          }
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        {from == "selectplan" &&
                          <>
                            <Typography placeholder="Country here..." >Country</Typography>
                            <Autocomplete
                              id="country-select-demo"
                              className="w-full h-[40px]"
                              options={COUNTRIES}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              inputValue={country}
                              onInputChange={(event, newInputValue) => {
                                setCountry(newInputValue);
                              }}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt=""
                                  />
                                  {option.label} ({option.code})
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a country"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          </>
                        }
                      </div>
                    </div>
                  </div>
                  <div>
                    <Typography
                      placeholder=""
                      variant="h2"
                      className="text-xs font-normal text-lightDark"
                    >
                      By providing your card information, you allow Dental Jobs
                      to charge your card for future payments in accordance with
                      their terms.
                    </Typography>
                    <div className="pt-2">
                      <Button
                        variant="filled"
                        color="secondary"
                        className="w-full text-sm"
                        type="submit"
                      >
                        {from == "billinginfo" ? "Save" : "Confirm Payment"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <PaymentBank />
            )}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PaymentMethodDialog;
