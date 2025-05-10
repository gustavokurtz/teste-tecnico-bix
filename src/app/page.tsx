"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Finance App 💸</h1>
        <p className="mb-6 text-gray-700">Gerencie suas transações financeiras com facilidade.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Acessar painel
        </button>
      </div>
    </div>
  );
}
