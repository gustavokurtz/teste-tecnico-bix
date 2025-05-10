import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardPage from "./DashboardPage";

export default async function DashboardPageWrapper() {
  const isLogged = (await cookies()).get("auth")?.value === "true";

  if (!isLogged) {
    redirect("/login");
  }

  return <DashboardPage />;
}
