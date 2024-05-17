import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-12 2xl:grid-cols-9 gap-4 w-full">
      {children}
    </section>
  );
}
