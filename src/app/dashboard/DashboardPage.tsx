"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import transactionsData from "../../data/transactions.json";

interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState({
    type: "",
    state: "",
    industry: "",
    account: "",
    startDate: "",
    endDate: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    setTransactions(transactionsData as Transaction[]);
  }, []);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = filter.type ? t.transaction_type === filter.type : true;
      const matchState = filter.state ? t.state === filter.state : true;
      const matchIndustry = filter.industry ? t.industry === filter.industry : true;
      const matchAccount = filter.account ? t.account === filter.account : true;

      const matchStart = filter.startDate ? new Date(t.date) >= new Date(filter.startDate) : true;
      const matchEnd = filter.endDate ? new Date(t.date) <= new Date(filter.endDate) : true;

      return matchType && matchState && matchIndustry && matchAccount && matchStart && matchEnd;
    });
  }, [filter, transactions]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const resume = useMemo(() => {
    const receitas = filtered.filter((t) => t.transaction_type === "deposit").reduce((acc, cur) => acc + Number(cur.amount), 0);
    const despesas = filtered.filter((t) => t.transaction_type === "withdraw").reduce((acc, cur) => acc + Number(cur.amount), 0);
    return {
      receitas,
      despesas,
      saldo: receitas - despesas,
      pendentes: 0
    };
  }, [filtered]);

  const estados = useMemo(() => [...new Set(transactions.map((t) => t.state))], [transactions]);
  const industrias = useMemo(() => [...new Set(transactions.map((t) => t.industry))], [transactions]);
  const contas = useMemo(() => [...new Set(transactions.map((t) => t.account))], [transactions]);

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > maxVisible + 2) pages.push("...");
      for (let i = Math.max(2, currentPage - maxVisible); i <= Math.min(totalPages - 1, currentPage + maxVisible); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - maxVisible - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((p, idx) => (
      <button
        key={idx}
        disabled={p === "..."}
        onClick={() => typeof p === "number" && setCurrentPage(p)}
        className={`px-3 py-1 border rounded ${currentPage === p ? "bg-black text-white" : "bg-white"} ${p === "..." ? "cursor-default" : ""}`}
      >
        {p}
      </button>
    ));
  };

  const barData = useMemo(() => {
    const grouped: Record<string, { deposit: number; withdraw: number }> = {};
    filtered.forEach((t) => {
      const key = t.state;
      if (!grouped[key]) grouped[key] = { deposit: 0, withdraw: 0 };
      grouped[key][t.transaction_type] += Number(t.amount);
    });
    return Object.entries(grouped).map(([state, values]) => ({ state, ...values }));
  }, [filtered]);

  const lineData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filtered.forEach((t) => {
      const date = new Date(t.date);
      const label = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      grouped[label] = (grouped[label] || 0) + Number(t.amount);
    });
    return Object.entries(grouped).map(([date, total]) => ({ date, total }));
  }, [filtered]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Receitas vs Despesas por Estado</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deposit" stackId="a" fill="#22c55e" name="Receitas" />
              <Bar dataKey="withdraw" stackId="a" fill="#ef4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Total movimentado por mês</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <select onChange={(e) => setFilter({ ...filter, type: e.target.value })} className="border p-2">
          <option value="">Todos os tipos</option>
          <option value="deposit">Depósitos</option>
          <option value="withdraw">Saques</option>
        </select>

        <select onChange={(e) => setFilter({ ...filter, state: e.target.value })} className="border p-2">
          <option value="">Todos os estados</option>
          {estados.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select onChange={(e) => setFilter({ ...filter, industry: e.target.value })} className="border p-2">
          <option value="">Todas as indústrias</option>
          {industrias.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <select onChange={(e) => setFilter({ ...filter, account: e.target.value })} className="border p-2">
          <option value="">Todas as contas</option>
          {contas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <input
          type="date"
          value={filter.startDate}
          onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
          className="border p-2"
        />
        <input
          type="date"
          value={filter.endDate}
          onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
          className="border p-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-100 p-4 rounded">Receitas: R$ {resume.receitas.toLocaleString()}</div>
        <div className="bg-red-100 p-4 rounded">Despesas: R$ {resume.despesas.toLocaleString()}</div>
        <div className="bg-yellow-100 p-4 rounded">Pendentes: {resume.pendentes}</div>
        <div className="bg-blue-100 p-4 rounded">Saldo: R$ {resume.saldo.toLocaleString()}</div>
      </div>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Data</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Conta</th>
            <th className="p-2">Indústria</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Valor (R$)</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((t, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-2">{t.transaction_type}</td>
              <td className="p-2">{t.account}</td>
              <td className="p-2">{t.industry}</td>
              <td className="p-2">{t.state}</td>
              <td className="p-2">{Number(t.amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {renderPagination()}
      </div>
    </div>
  );
}
