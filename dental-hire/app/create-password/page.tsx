import Image from "next/image";
import LeftSection from "@/components/layout/AuthLayout/LeftSection";
import { Typography } from "@/libraries/material-tailwind";
import CreatePasswordForm from "@/components/create-password/CreatePasswordForm";

export default function CreatePasswordPage() {
  return (
    <>
      <LeftSection className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col items-center gap-4 relative z-4">
          <Image
            src="/assets/images/whiteLogo.png"
            width={54}
            height={54}
            className="w-auto h-auto"
            alt=""
            priority={true}
          />
          <Typography
            variant="h1"
            placeholder=""
            className="text-white text-3xl font-extrabold text-center"
          >
            Dental Jobs
          </Typography>
        </div>
        <div className="relative">
          <Image
            src="/assets/images/booking-calendar.png"
            width={383}
            height={406}
            className="w-auto h-auto"
            alt=""
          />
          <Image
            src="/assets/images/comment-of-calendar.png"
            width={260}
            height={100}
            className="w-auto h-auto absolute top-[11%] -right-[41%]"
            alt=""
          />
        </div>
        <Typography
          placeholder=""
          className="text-center text-gray-200 font-semibold text-lg"
        >
          Habitasse leo mi enim condimentum rhoncus. Sed non tortor gravida .
        </Typography>
      </LeftSection>
      <section className="flex flex-col items-center justify-center py-16 z-10 bg-[#F5F7F9] h-screen overflow-auto">
        <div className="w-1/2 flex flex-col items-center gap-10">
          <Typography
            placeholder=""
            variant="h2"
            className="font-bold text-3xl text-center text-dark"
          >
            Create New Password
          </Typography>
          <CreatePasswordForm />
        </div>
      </section>
    </>
  );
}
