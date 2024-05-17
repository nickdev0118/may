import type { ReactNode, InputHTMLAttributes, ChangeEvent } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  children?: ReactNode | string;
  classNameOfInput?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CommonInput({
  label = "",
  id = "",
  name = "",
  placeholder,
  classNameOfInput = "",
  value = "",
  onChange = () => {}
}: IProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {!!label && (
        <label htmlFor={id} className="text-lightDark text-base font-normal">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#FCFAFF] !border-none">
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          className={`flex-1 focus:outline-none w-full !border-none !bg-[#FCFAFF] bg-transparent text-dark placeholder:text-[#B6AACA] ${classNameOfInput}`}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
