"use client";
import { ThemeProvider } from "@/libraries/material-tailwind";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ToastContainer } from "@/libraries/react-toastify";
import { isAuthLayout } from "@/utils/functions";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { usePathname } from "next/navigation";
import { CalendarProvider } from "@/contexts/CalendarContext";
import { ScheduleProvider } from "@/contexts/ScheduleContext";
import { UserProvider } from "@/contexts/UserContext";
import { JobProvider } from "@/contexts/JobContext";
import { BillPlanProvider } from "@/contexts/BillPlanContext";

interface IProps {
  children: React.ReactNode;
}
export function InitialPageLoadingSkeleton({ children }: IProps) {
  const pathname = usePathname();
  return (
    <>
      <ThemeProvider>
        <LoadingProvider>
          <AuthProvider>
            {isAuthLayout(pathname) ? (

              <CalendarProvider>
                <ScheduleProvider>
                  <UserProvider>
                    <JobProvider>
                      <AuthLayout>{children}</AuthLayout>
                    </JobProvider>
                  </UserProvider>
                </ScheduleProvider>
              </CalendarProvider>

            ) : (
              <CalendarProvider>
                <ScheduleProvider>
                  <UserProvider>
                    <JobProvider>
                      <BillPlanProvider>
                        <DashboardLayout>
                          {children}
                        </DashboardLayout>
                      </BillPlanProvider>
                    </JobProvider>
                  </UserProvider>
                </ScheduleProvider>
              </CalendarProvider>
            )}
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
      <ToastContainer className="z-[999999]" />
    </>
  );
}
