import { ReactNode} from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <main className="bg-[#F5F7F9] min-h-screen overflow-hidden">
      <div className="grid grid-cols-2">{children}</div>
    </main>
  );
}
