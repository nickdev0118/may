import { ReactNode, useMemo } from "react";
import { STATUS_MAPPER } from "@/utils/constants";
import { IComponent } from "@/utils/interfaces";

interface IProps extends IComponent {
  status: string;
  isDefault?: boolean;
  beta?: string;
  children: ReactNode;
}

export default function StatusBadge({
  className = "",
  status = "",
  isDefault = false,
  children,
}: IProps) {
  const { colorClassName, fontWeightClassName } = useMemo(() => {
    let colorClass = "";
    let fontWeightClass = "font-bold";

    if (isDefault) {
      colorClass = "bg-lightDark text-lightDark";
    } else {
      switch (status) {
        case STATUS_MAPPER.pending:
          colorClass = "bg-error text-error";
          break;
        case STATUS_MAPPER.ongoing:
          colorClass = "bg-primary text-primary";
          break;
        case STATUS_MAPPER.completed:
          colorClass = "bg-success text-success";
          break;
        case STATUS_MAPPER.open:
        case STATUS_MAPPER.active:
          colorClass = "bg-success text-success";
          fontWeightClass = "font-normal";
          break;
        case STATUS_MAPPER.pendingApproval:
          colorClass = "bg-warning text-warning";
          fontWeightClass = "font-normal";
          break;
        case STATUS_MAPPER.closed:
        case STATUS_MAPPER.notVerified:
          colorClass = "bg-error text-error";
          fontWeightClass = "font-normal";
          break;
        case STATUS_MAPPER.archived:
        case STATUS_MAPPER.unarchived:
          colorClass = "bg-lightDark text-lightDark";
          fontWeightClass = "font-normal";
          break;
        default:
          break;
      }
    }

    return { colorClassName: colorClass, fontWeightClassName: fontWeightClass };
  }, [isDefault, status]);

  return (
    <div
      className={`rounded-lg bg-opacity-5 capitalize ${fontWeightClassName} px-2 py-1 text-sm xl:text-base flex items-center text-center ${colorClassName} w-fit ${className}`}
    >
      {children}
    </div>
  );
}
