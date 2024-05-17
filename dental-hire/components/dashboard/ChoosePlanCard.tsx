import React, { useEffect, useState } from "react";
import { IChoosePlan, IComponent } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import CardTemplate from "@/components/custom/CardTemplate";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import { toast } from "@/libraries/react-toastify";
import Image from "next/image";
import PaymentMethodDialog from "@/components/layout/DashboardLayout/ProfileMenuDialogs/BillingInfoDialog/PaymentMethodDialog";
import { useBillPlan } from "@/contexts/BillPlanContext";
import Loading from "../custom/Loading";


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

interface ProfessionalsCardProps extends IComponent {
  className?: string;
}

const ProfessionalsCard: React.FC<ProfessionalsCardProps> = ({ className }) => {
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
  const [plan, setPlan] = useState<IChoosePlan[]>();
  const [paymentMethod, setPaymentMethod] = useState<boolean>(false);
  const { setSelectedPlan } = useBillPlan();
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <>
      <CardTemplate className={className} title="Choose Your Plan">{
        loading ? <Loading /> :
          <>
            <Typography placeholder="" className="text-lightDark text-sm xl:text-lg">
              All plans include unlimited messaging, unlimited temp hires, and
              unlimited permanent hires with zero permanent placement fees.
            </Typography>
            <div className="pt-6">
              <div className="flex flex-wrap gap-1 justify-center">
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
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center pt-4">
              <div>
                <Typography
                  placeholder=""
                  className="text-lightDark text-sm xl:text-base"
                >
                  Note: All pricing is per-location. If you have more than one location,
                  please contact us at
                  <span className="text-secondary"> service@dentaljobs.com</span> or
                  <span className="text-secondary"> (173)496-2329</span> to enable your
                  account for multiple locations.
                </Typography>
              </div>
              <div>
                <Button
                  variant="filled"
                  color="secondary"
                  className="py-4 rounded-xl"
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
      }</CardTemplate>
      <PaymentMethodDialog
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        from="selectplan"
        size="xl"
      />
    </>
  );
};

export default ProfessionalsCard;
