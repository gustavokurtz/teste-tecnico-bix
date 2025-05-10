// app/dashboard/layout.tsx (SERVER COMPONENT - sem "use client")
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SidebarWrapper from "./SidebarWrapper";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isLogged = (await cookies()).get("auth")?.value === "true";
  if (!isLogged) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <main className="flex-1 bg-white text-black overflow-auto md:ml-64 w-full">{children}</main>
    </div>
  );
}
