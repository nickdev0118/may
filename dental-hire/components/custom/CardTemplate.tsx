import { ReactNode } from "react";
import { IComponent } from "@/utils/interfaces";
import { Card, CardBody, Typography } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function CardTemplate({
  className = "",
  title = "",
  children,
  actions,
}: IProps) {
  return (
    <Card placeholder="" className={`grow flex flex-col ${className}`}>
      <CardBody placeholder="" className="grow flex flex-col">
        <div className="flex items-center justify-between mb-3 xl:mb-6">
          <Typography
            placeholder=""
            variant="h2"
            className="text-xl font-bold text-dark"
          >
            {title}
          </Typography>
          {actions}
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
