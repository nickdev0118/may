import { ReactNode, SelectHTMLAttributes, useState } from "react";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  available?: boolean;
  iconClassName?: string;
}

export default function Select({
  className = "",
  value,
  available,
  onChange,
  children,
  iconClassName = "",
}: IProps) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={typeof available !== "undefined" && !available}
        className={`${
          typeof available === "undefined" || available
            ? "text-[#1F1233]"
            : "text-lightDark"
        }  text-sm font-semibold border border-gray-300 rounded-lg appearance-none focus:outline-none pl-2 pr-8 py-2 ${className}`}
        onClick={() => setOpened(!opened)}
      >
        {children}
      </select>
      <Icon
        icon={opened ? ICON_MAPPER.upArrow : ICON_MAPPER.downArrow}
        className={`text-sm ${
          typeof available === "undefined" || available
            ? "text-secondary"
            : "text-lightDark"
        } absolute top-2.5 right-2 ${iconClassName}`}
      />
    </div>
  );
}
