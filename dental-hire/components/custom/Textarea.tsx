import type { ReactNode, TextareaHTMLAttributes } from "react";
import { Typography } from "@/libraries/material-tailwind";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  children?: ReactNode | string;
  classNameOfInput?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: string | boolean;
}

export default function Textarea({
  label = "",
  id = "",
  name = "",
  className = "",
  classNameOfInput = "",
  startAdornment,
  endAdornment,
  error,
  ...others
}: IProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {!!label && (
        <label htmlFor={id} className="text-lightDark">
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 px-3 py-2 rounded bg-[#FCFAFF] border border-l-0 border-r-0 border-t-0 border-b-[#EAE7F1]  ${className} ${
          error ? "!border-red-500" : ""
        }`}
      >
        {!!startAdornment && <div>{startAdornment}</div>}
        <textarea
          id={id}
          name={name}
          className={`flex-1 focus:outline-none w-full !border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF] bg-transparent text-lightDark placeholder:text-[#B6AACA] ${classNameOfInput}`}
          {...others}
        />
        {!!endAdornment && <div className="text-lightDark">{endAdornment}</div>}
      </div>

      {!!error && (
        <Typography placeholder="" className="text-sm text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}
