"use client";

import { useState } from "react";
import Link from "next/link";

export default function SidebarWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Botão mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-20 bg-gray-800 text-white px-3 py-2 rounded shadow md:hidden"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:flex md:flex-col md:p-4 md:space-y-4`}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-xl font-bold">Painel</h1>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            ✖
          </button>
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          <Link href="/" className="hover:bg-gray-700 rounded px-3 py-2">
            🏠 Home
          </Link>
          <Link href="/dashboard" className="hover:bg-gray-700 rounded px-3 py-2">
            📊 Dashboard
          </Link>
          <form action="/login" method="post">
            <button type="submit" className="text-left w-full hover:bg-red-600 rounded px-3 py-2">
              🚪 Logout
            </button>
          </form>
        </nav>
      </aside>
    </>
  );
}
