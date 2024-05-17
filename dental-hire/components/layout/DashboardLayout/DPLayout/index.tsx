import { ReactNode } from "react";
import Navbar from "@/components/layout/DashboardLayout/DPLayout/Navbar";
import Header from "@/components/layout/DashboardLayout/DPLayout/Header";
import { IComponent } from "@/utils/interfaces";

interface IProps extends IComponent {
  children: ReactNode;
}

export default function DPLayout({ children }: IProps) {
  return (
    <div className="bg-gray-100 hidden md:block">
      <div className="flex gap-6">
        <div className="p-3 h-screen flex flex-col sticky top-0">
          <Navbar className="flex-1" />
        </div>

        <div className="flex-1 flex flex-col gap-8 py-3 pr-8">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
