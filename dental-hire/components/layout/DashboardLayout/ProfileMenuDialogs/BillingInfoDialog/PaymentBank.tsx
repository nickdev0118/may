

import React, { useState } from "react";
import Image from "next/image";
import TabButton from "@/components/custom/buttons/TabButton";
import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import { IComponent, ITabitem } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, VALIDATION_REQUIRED_FIELD, VALIDATION_DISMATCH_PASSWORDS } from "@/utils/constants";
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



interface IBankFormData {
    firstName: string,
    lastName: string,
    accountName: String,
    accountNumber: string,
    accountType: string,
    routingNumber: string,
    BankName: string,
}

const IMAGES = [
  {
    id: 1,
    path: "/assets/images/bank1.png",
    alt: "BankImg",
    height: 40,
    width: 80,
  },
  {
    id: 2,
    path: "/assets/images/bank2.png",
    alt: "BankImg",
    height: 40,
    width: 80,
  },
  {
    id: 3,
    path: "/assets/images/bank3.png",
    alt: "BankImg",
    height: 40,
    width: 80,
  },
  {
    id: 4,
    path: "/assets/images/bank4.png",
    alt: "BankImg",
    height: 40,
    width: 80,
  },
  {
    id: 5,
    path: "/assets/images/bank5.png",
    alt: "BankImg",
    height: 40,
    width: 80,
  },
  {
    id: 6,
    path: "/assets/images/bank6.png",
    alt: "BankImg",
    height: 40,
    width: 80,
  }
]

  export default function PaymentBank (){

    const validationSchema = yup.object().shape({
        firstName: yup.string().required(VALIDATION_REQUIRED_FIELD),
        lastName: yup.string().required(VALIDATION_REQUIRED_FIELD),
        accountName: yup.string().required(),
        accountNumber: yup.string().required(),
        accountType: yup.string().required(),
        routingNumber: yup.string().required(),
        bankName: yup.string().required(),
      });

    const formik = useFormik({
        initialValues : {
            firstName: "",
            lastName: "",
            accountName: "",
            accountNumber: "",
            accountType: "",
            routingNumber: "",
            bankName: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const formData : IBankFormData | object = {
                firstName: values.firstName,
                lastName: values.lastName,
                accountName: values.accountName,
                accountNumber: values.accountNumber,
                accountType: values.accountType,
                routingNumber: values.routingNumber,
                BankName: values.bankName,
            }
        }
    })


    return(
        <div>
            <div className="border border-[#F6F4F9] rounded-lg p-2">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="flex flex-col gap-4 px-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          placeholder="First Name"
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                          error={
                            formik.touched.firstName &&
                            formik.errors.firstName
                          }
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          placeholder="Last Name "
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                          error={
                            formik.touched.lastName &&
                            formik.errors.lastName
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <Input
                          id="bankName"
                          name="bankName"
                          label="Bank Account"
                          placeholder={` search for your bank`}
                          startAdornment={<Icon
                            icon={ICON_MAPPER.search}
                          />}
                          onChange={formik.handleChange}
                          value={formik.values.bankName}
                          error={
                            formik.touched.bankName &&
                            formik.errors.bankName
                          }
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <div className="flex gap-2">
                          {IMAGES.map(( item ) => <div key={item.id} className="grid grid-rows-2 gap-2">
                            <div className="py-2 px-4 border border-lightDark border-opacity-30 rounded-lg">
                              <Image
                              src={item.path}
                              alt={item.alt}
                              height={item.height}
                              width={item.width}
                              />
                            </div>
                            <div className="py-2 px-4 border border-lightDark border-opacity-30 rounded-lg">
                              <Image
                              src={item.path}
                              alt={item.alt}
                              height={item.height}
                              width={item.width}
                              />
                            </div>
                          </div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Typography
                      placeholder=""
                      variant="h2"
                      className="text-sm font-bold text-secondary"
                    >
                      Enter bank details manually  <span className="text-xs font-normal text-lightDark">  Takes 1-2 business days</span>
                    </Typography>
                    <div className="pt-2">
                      <Button
                        variant="filled"
                        color="secondary"
                        className="text-sm"
                        type="submit"
                      >
                        Confirm Payment
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
        </div>
    )
  }