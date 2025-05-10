import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isLogged = (await cookies()).get("auth")?.value === "true";
  if (!isLogged) {
    redirect("/login");
  }

  // Delegate all styled-components and client-side logic to a Client Component
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}