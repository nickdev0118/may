import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Typography, Radio } from "@/libraries/material-tailwind";

interface IProps extends IComponent {}

interface IRadio {
  id: number;
  label: string;
}

const RADIO_ITEM: IRadio[] = [
  {
    id: 1,
    label: "Same Day",
  },
  {
    id: 2,
    label: "Within 7 days",
  },
  {
    id: 3,
    label: "Within 14 days",
  },
];

const PaymentTermsTab: React.FC<IProps> = ({}: IProps) => {
  return (
    <div className="px-6 sm:px-10 xl:px-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Typography
            placeholder=""
            className="text-xs lg:text-sm text-lightDark font-semibold"
          >
            Note:
          </Typography>
          <Typography
            placeholder=""
            className="text-xs lg:text-sm text-lightDark font-normal"
          >
            The payment terms of the shift will be the option selected unless
            the professional has listed “W2 Only” as their payment method.
          </Typography>
          <Typography
            placeholder=""
            className="text-xs lg:text-sm text-dark font-normal"
          >
            When you post a temp job, professionals will want to know how they
            will be paid. You can change this at any time, but you will need to
            renegotiate any agreements that are already in place for the new
            term to apply.
          </Typography>
          <Typography
            placeholder=""
            className="text-xs lg:text-sm text-dark font-normal"
          >
            Here are your options:
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <Typography
            placeholder=""
            className="text-sm lg:text-base text-dark font-bold"
          >
            As an independent contractor (1099)
          </Typography>
          <Typography
            placeholder=""
            className="text-xs lg:text-sm text-lightDark font-normal"
          >
            Pay professionals as an independent contractor. The office will need
            to prepare 1099 forms for each professional who temps at your office
            throughout the year.
          </Typography>
          <div className="grid grid-cols-3 gap-3">
            {RADIO_ITEM.map((item: IRadio) => (
              <div key={item.id} className="col-span-3 md:col-span-1">
                <Radio
                  crossOrigin=""
                  name="paymentPeriod"
                  label={
                    <Typography
                      placeholder=""
                      className="text-sm font-normal text-dark"
                    >
                      {item.label}
                    </Typography>
                  }
                  className="border-secondary checked:border-secondary checked:before:border-secondary before:bg-secondary checked:before:bg-secondary text-secondary"
                  iconProps={{
                    className: "text-secondary",
                  }}
                  checked={item.id === 1 ? true : false}
                />
              </div>
            ))}
          </div>
          <div>
            <Typography
              placeholder=""
              className="text-sm lg:text-base text-dark font-bold"
            >
              As an employee (W2)
            </Typography>
            <Typography
              placeholder=""
              className="text-xs lg:text-sm text-lightDark font-normal"
            >
              When professionals do temp work for you, even for a single day,
              you will add them as an employee.
            </Typography>
            <Radio
              crossOrigin=""
              name="paymentPeriod"
              label={
                <Typography
                  placeholder=""
                  className="text-sm font-normal text-dark"
                >
                  As an employee (W2)
                </Typography>
              }
              className="border-secondary checked:border-secondary checked:before:border-secondary before:bg-secondary checked:before:bg-secondary text-secondary"
              iconProps={{
                className: "text-secondary",
              }}
              checked={true}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end  pt-3">
        <Button variant="filled" color="secondary" className="text-sm">
          Submit changes
        </Button>
      </div>
    </div>
  );
};

export default PaymentTermsTab;
