import { ReactNode} from "react";
import DPLayout from "@/components/layout/DashboardLayout/DPLayout";
import MBLayout from "@/components/layout/DashboardLayout/MBLayout";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <DPLayout>{children}</DPLayout>
      <MBLayout>{children}</MBLayout>
    </>
  );
}
