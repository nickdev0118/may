"use client";

import React, { useEffect, useState } from "react";
import TabButton from "@/components/custom/buttons/TabButton";
import Button from "@/components/custom/buttons/Button";
import { IChoosePlan, IComponent, ITabitem } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
} from "@/libraries/material-tailwind";
import PaymentMethodDialog from "./PaymentMethodDialog";
import api from "@/utils/api";
import Image from "next/image";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useBillPlan } from "@/contexts/BillPlanContext";

interface IProps extends IComponent {
  billingInfo: boolean;
  setBillingInfo: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

interface IconContainerProps {
  link: string;
  icon: string;
  colorClass: string;
}

const IconContainer: React.FC<IconContainerProps> = ({ link, icon, colorClass }) => (
  <div
    className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClass}`}
  >
    {link == "" ? <Icon href={link} icon={icon} className="text-base" />
      : <Image
        src={link}
        alt="icon"
        width={30}
        height={30}
      />
    }
  </div>
);

const TAB_ITEMS: ITabitem[] = [
  {
    id: 1,
    label: "Plan",
  },
  {
    id: 2,
    label: "Invoices",
  },
  {
    id: 3,
    label: "Payment methods",
  },
];

const BillingInfoDialog: React.FC<IProps> = ({
  billingInfo,
  setBillingInfo,
  size,
}: IProps) => {
  const handler = () => {
    setBillingInfo(!billingInfo);
  };

  const bgColorClasses: Record<number, string> = {
    1: "bg-[#F4FFFC] text-success",
    2: "bg-[#F3EBFF] text-primary",
    3: "border border-warning text-warning",
  };
  const textColorClasses: Record<number, string> = {
    1: "text-success",
    2: "text-primary",
    3: "text-warning",
  };

  const [activeTab, setActiveTab] = useState<string>("Plan");
  const [paymentMethod, setPaymentMethod] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [plan, setPlan] = useState<IChoosePlan[]>();
  const { setSelectedPlan } = useBillPlan();

  const handlePaymentMethod = () => {
    setPaymentMethod(true);
    setBillingInfo(false);
  };

  const handleSelect = (_item: IChoosePlan) => {
    setSelectedPlan(_item);
    setPaymentMethod(true);
  }

  useEffect(() => {
    const getData = async () => {
      api
        .get("/membership/office/get/active/plans")
        .then((res) => {
          setPlan(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.info(getErrorMessage(err));
        })
    }
    getData();
  }, [])


  // function filtered() : IChoosePlan {
  //   const variable = Math.floor(Math.random()*3);
  
  //   return plan? plan[variable] : {};
  // }

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={billingInfo}
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
          <div className="pt-6 sm:px-10 xl:px-20">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl lg:text-2xl xl:text-4xl text-dark font-bold"
              >
                Billing Info
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
            </div>
            <div className="flex justify-between items-center pt-6 lg:pt-12">
              <div className="flex items-center gap-2">
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
              <div className="hidden sm:block">
                <Button
                  variant="filled"
                  color="secondary"
                  className="bg-secondary flex items-center gap-1 p-2"
                >
                  <Typography
                    placeholder=""
                    className="text-white text-xs xl:text-sm font-semibold"
                  >
                    Change Plan
                  </Typography>
                </Button>
              </div>
            </div>
            {activeTab === "Plan" ? (
              <div className="flex flex-col pt-6">
                {/* <div className="w-full py-20 border-b border-b-[#F6F4F9]">
                  <Typography
                    placeholder=""
                    className="text-lightDark text-sm xl:text-base font-normal text-center"
                  >
                    You must select a plan to start booking assignments
                  </Typography>
                </div> */}
                <div>
                  <div className="pt-6">
                    <div className="flex flex-wrap justify-around">
                      {plan?.map((item) => (
                        <div
                          key={item.id}
                          className={`col-span-3 2xl:col-span-1 p-4 border border-[#F6F4F9] rounded-lg ${parseInt(item?.id) === 2 ? "bg-[#FCFAFF]" : ""
                            }`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center gap-2">
                              <IconContainer
                                icon={item?.icon}
                                link={item?.icon}
                                colorClass={bgColorClasses[parseInt(item?.id)]}
                              />
                              <Typography
                                placeholder=""
                                className={`${textColorClasses[parseInt(item?.id)]
                                  } text-base xl:text-lg font-semibold`}
                              >
                                {item.type}
                              </Typography>
                            </div>
                            <Typography
                              placeholder=""
                              className="text-dark text-base font-bold"
                            >
                              {`$${item.cost}`}
                              <span className="text-lightDark text-sm">/Month</span>
                            </Typography>
                          </div>
                          <div className="pt-4">
                            {item.item.map((feature) => (
                              <div
                                key={feature.id}
                                className="flex items-center gap-2 py-1"
                              >
                                <IconContainer
                                  icon={
                                    feature.checked ? ICON_MAPPER.check : ICON_MAPPER.cross
                                  }
                                  link=""
                                  colorClass={
                                    parseInt(item?.id) === 1
                                      ? feature.checked
                                        ? "bg-[#F4FFFC] text-success"
                                        : "bg-[#FFF9FA] text-error"
                                      : parseInt(item?.id) === 2
                                        ? feature.checked
                                          ? "bg-[#F3EBFF] text-primary"
                                          : "bg-[#FFF9FA] text-error"
                                        : feature.checked
                                          ? "bg-[#FFFCF6] text-warning"
                                          : "bg-[#FFF9FA] text-error"
                                  }
                                />
                                <Typography
                                  placeholder=""
                                  className="text-dark text-sm font-semibold"
                                >
                                  {feature.content}
                                </Typography>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            <Button
                              variant="outlined"
                              color={
                                parseInt(item?.id) === 1
                                  ? "success"
                                  : parseInt(item?.id) === 2
                                    ? "primary"
                                    : "warning"
                              }
                              className="w-full py-2"
                              onClick={() => handleSelect(item)}
                            >
                              Choose Plan
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center sm:hidden pt-10">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="bg-secondary flex items-center gap-1 p-2"
                  >
                    <Typography
                      placeholder=""
                      className="text-white text-xs xl:text-sm font-semibold"
                    >
                      Change Plan
                    </Typography>
                  </Button>
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <Typography
                    placeholder=""
                    className="text-dark text-lg xl:text-xl font-bold"
                  >
                    Your next subscription payment will be:
                  </Typography>
                  <Typography
                    placeholder=""
                    className="text-lightDark text-sm xl:text-base font-normal"
                  >
                    No future payments.
                  </Typography>
                  <Typography
                    placeholder=""
                    className="text-lightDark text-sm xl:text-base font-normal"
                  >
                    <span className="font-semibold">NOTE:</span> Further changes
                    to plan may impact next payments.
                  </Typography>
                </div>
              </div>
            ) : activeTab === "Invoices" ? (
              <div className="flex items-center justify-center">
                <Typography
                  placeholder=""
                  className="text-sm lg:text-base text-lightDark font-normal text-center"
                >
                  No payments found
                </Typography>
              </div>
            ) : (
              <div className="pt-6">
                <Typography
                  placeholder=""
                  className="text-lg lg:text-xl text-dark font-bold"
                >
                  Add new payment method
                </Typography>
                <div className="flex justify-center py-20">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="bg-secondary flex items-center gap-1 p-2"
                    onClick={handlePaymentMethod}
                  >
                    <Typography
                      placeholder=""
                      className="text-white text-xs xl:text-sm font-semibold"
                    >
                      Add payment method
                    </Typography>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
      <PaymentMethodDialog
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        setBillingInfo={setBillingInfo}
        from="billinginfo"
        size="lg"
      />
    </>
  );
};

export default BillingInfoDialog;
