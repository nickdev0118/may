import { AllHTMLAttributes } from "react";
import Image from "next/image";
import { IMessage } from "@/utils/interfaces";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  message: IMessage;
}

export default function SentMessage({
  className = "",
  message,
  ...others
}: IProps) {
  return (
    <div className={`w-full flex justify-end ${className}`} {...others}>
      <div className="w-full md:w-3/4 flex items-start gap-2">
        <div className="flex-1 flex items-end bg-gray-200 p-4 rounded-2xl rounded-tr-none">
          <p className="flex-1 text-dark text-sm md:text-base">
            {message.message}
          </p>
          <span className="text-lightDark text-xs md:text-sm">
            {message.sentAt.slice(11, 16)}
          </span>
        </div>

        <Image
          src="/assets/images/profilePhoto.png"
          alt=""
          width={40}
          height={40}
          className="h-auto"
        />
      </div>
    </div>
  );
}
