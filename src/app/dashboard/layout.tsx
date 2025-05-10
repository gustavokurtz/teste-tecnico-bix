// app/dashboard/layout.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isLogged = (await cookies()).get("auth")?.value === "true";
  if (!isLogged) redirect("/login");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-xl font-bold">Painel</h1>
        <nav className="flex flex-col space-y-2">
          <Link href="/" className="hover:bg-gray-700 rounded px-3 py-2">🏠 Home</Link>
          <Link href="/dashboard" className="hover:bg-gray-700 rounded px-3 py-2">📊 Dashboard</Link>
          <form action="/login" method="post">
            <button type="submit" className="text-left w-full hover:bg-red-600 rounded px-3 py-2">🚪 Logout</button>
          </form>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-white text-black overflow-auto">
        {children}
      </main>
    </div>
  );
} 
