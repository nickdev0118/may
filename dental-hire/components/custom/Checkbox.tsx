"use client";

import {
  CheckboxProps,
  Checkbox as MTCheckbox,
  Typography,
} from "@/libraries/material-tailwind";
import { IComponent } from "@/utils/interfaces";
import { TColor } from "@/utils/types";
import { useEffect, useState } from "react";

interface IProps extends IComponent {
  color: TColor;
  label: CheckboxProps["label"];
  labelProps?: CheckboxProps["labelProps"];
  name?: CheckboxProps["name"];
  checked?: CheckboxProps["checked"];
  onChange?: CheckboxProps["onChange"];
  id?: string;
}

export default function Checkbox({
  className: propClassName = "",
  color = "primary",
  label,
  labelProps = {},
  name,
  checked,
  onChange,
  id = "",
}: IProps) {
  const [classNameOfIconProps, setClassNameOfIconProps] =
    useState<string>("bg-primary");
  const [className, setClassName] = useState<string>(
    "border-primary checked:border-primary checked:bg-primary"
  );

  useEffect(() => {
    switch (color) {
      case "secondary":
        setClassNameOfIconProps("bg-secondary");
        setClassName(
          "border-secondary checked:border-secondary checked:bg-secondary"
        );
        break;

      case "success":
        setClassNameOfIconProps("bg-success");
        setClassName(
          "border-success checked:border-success checked:bg-success"
        );
        break;

      case "info":
        setClassNameOfIconProps("bg-info");
        setClassName("border-info checked:border-info checked:bg-info");
        break;

      case "warning":
        setClassNameOfIconProps("bg-warning");
        setClassName(
          "border-warning checked:border-warning checked:bg-warning"
        );
        break;

      case "error":
        setClassNameOfIconProps("bg-error");
        setClassName("border-error checked:border-error checked:bg-error");
        break;

      case "dark":
        setClassNameOfIconProps("bg-dark");
        setClassName("border-dark checked:border-dark checked:bg-dark");
        break;

      case "lightDark":
        setClassNameOfIconProps("bg-lightDark");
        setClassName(
          "border-lightDark checked:border-lightDark checked:bg-lightDark"
        );
        break;

      default:
        setClassNameOfIconProps("bg-primary");
        setClassName(
          "border-primary checked:border-primary checked:bg-primary"
        );
    }
  }, [color]);

  return (
    <MTCheckbox
      id={id}
      crossOrigin=""
      className={`border ${className} ${propClassName}`}
      iconProps={{
        className: classNameOfIconProps,
      }}
      containerProps={{
        className: "p-1",
      }}
      label={
        label ? (
          <Typography
            placeholder=""
            className={`ml-2 text-sm font-semibold ${
              labelProps?.className || "text-lightDark"
            }`}
          >
            {label}
          </Typography>
        ) : (
          <></>
        )
      }
      labelProps={labelProps}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  );
}
