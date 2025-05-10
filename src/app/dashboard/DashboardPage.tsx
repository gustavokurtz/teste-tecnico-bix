"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
  amount: string; // em centavos
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

// Styled components
const PageWrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ChartsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const ChartCard = styled.div`
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
`;
const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
`;
const SubTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;
const Select = styled.select`
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
  min-width: 10rem;
`;
const DateInput = styled.input`
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
`;
const SummaryGrid = styled.div`
  display: grid;
  gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const SummaryCard = styled.div<{ bg: string }>`
  background: ${({ bg }) => bg};
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: center;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;
const Th = styled.th`
  padding: 0.75rem;
  background: #f3f4f6;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
`;
const Td = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;
const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;
const PageButton = styled.button<{ $active?: boolean }>`
  padding: 0.25rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: ${({ $active }) => ($active ? "#000" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState({
    type: "",
    state: "",
    industry: "",
    account: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    setTransactions(transactionsData as Transaction[]);
  }, []);

  // Converter centavos para reais
  const dataWithReais = useMemo(
    () =>
      transactions.map((t) => ({
        ...t,
        amount: (Number(t.amount) / 100).toFixed(2),
      })),
    [transactions]
  );

  // Filtro
  const filtered = useMemo(
    () =>
      dataWithReais.filter((t) => {
        const matchType = filter.type ? t.transaction_type === filter.type : true;
        const matchState = filter.state ? t.state === filter.state : true;
        const matchIndustry = filter.industry ? t.industry === filter.industry : true;
        const matchAccount = filter.account ? t.account === filter.account : true;
        const matchStart = filter.startDate
          ? new Date(t.date) >= new Date(filter.startDate)
          : true;
        const matchEnd = filter.endDate
          ? new Date(t.date) <= new Date(filter.endDate)
          : true;
        return (
          matchType &&
          matchState &&
          matchIndustry &&
          matchAccount &&
          matchStart &&
          matchEnd
        );
      }),
    [filter, dataWithReais]
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  // Resumo
  const resume = useMemo(() => {
    const receitas = filtered
      .filter((t) => t.transaction_type === "deposit")
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
    const despesas = filtered
      .filter((t) => t.transaction_type === "withdraw")
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
    return { receitas, despesas, saldo: receitas - despesas, pendentes: 0 };
  }, [filtered]);

  // Opções de filtro
  const estados = useMemo(
    () => [...new Set(dataWithReais.map((t) => t.state))],
    [dataWithReais]
  );
  const industrias = useMemo(
    () => [...new Set(dataWithReais.map((t) => t.industry))],
    [dataWithReais]
  );
  const contas = useMemo(
    () => [...new Set(dataWithReais.map((t) => t.account))],
    [dataWithReais]
  );

  // Dados dos gráficos
  const barData = useMemo(() => {
    const grouped: Record<string, { deposit: number; withdraw: number }> = {};
    filtered.forEach((t) => {
      const key = t.state;
      if (!grouped[key]) grouped[key] = { deposit: 0, withdraw: 0 };
      grouped[key].deposit += Number(t.amount) * (t.transaction_type === "deposit" ? 1 : 0);
      grouped[key].withdraw += Number(t.amount) * (t.transaction_type === "withdraw" ? 1 : 0);
    });
    return Object.entries(grouped).map(([state, values]) => ({ state, ...values }));
  }, [filtered]);

  const lineData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filtered.forEach((t) => {
      const date = new Date(t.date);
      const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      grouped[label] = (grouped[label] || 0) + Number(t.amount);
    });
    return Object.entries(grouped).map(([label, total]) => ({ date: label, total }));
  }, [filtered]);

  // Paginação
  const renderPagination = () => {
    const pages: Array<number | string> = [];
    const maxVisible = 3;
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > maxVisible + 2) pages.push("...");
      for (
        let i = Math.max(2, currentPage - maxVisible);
        i <= Math.min(totalPages - 1, currentPage + maxVisible);
        i++
      ) pages.push(i);
      if (currentPage < totalPages - maxVisible - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages.map((p, idx) => (
      <PageButton
        key={idx}
        disabled={p === "..."}
        $active={p === currentPage}
        onClick={() => typeof p === "number" && setCurrentPage(p)}
      >
        {p}
      </PageButton>
    ));
  };

  return (
    <PageWrapper>
      <Title>Dashboard Financeiro</Title>
      <ChartsGrid>
        <ChartCard>
          <SubTitle>Receitas vs Despesas por Estado</SubTitle>
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
        </ChartCard>
        <ChartCard>
          <SubTitle>Total movimentado por mês</SubTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                name="Total"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>
      <FiltersWrapper>
        <Select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="">Todos os tipos</option>
          <option value="deposit">Depósitos</option>
          <option value="withdraw">Saques</option>
        </Select>
        <Select
          value={filter.state}
          onChange={(e) => setFilter({ ...filter, state: e.target.value })}
        >
          <option value="">Todos os estados</option>
          {estados.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
        <Select
          value={filter.industry}
          onChange={(e) => setFilter({ ...filter, industry: e.target.value })}
        >
          <option value="">Todas as indústrias</option>
          {industrias.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </Select>
        <Select
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
        >
          <option value="">Todas as contas</option>
          {contas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </Select>
        <DateInput
          type="date"
          value={filter.startDate}
          onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
        />
        <DateInput
          type="date"
          value={filter.endDate}
          onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
        />
      </FiltersWrapper>
      <SummaryGrid>
        <SummaryCard bg="#d1fae5">Receitas: R$ {resume.receitas.toLocaleString()}</SummaryCard>
        <SummaryCard bg="#fee2e2">Despesas: R$ {resume.despesas.toLocaleString()}</SummaryCard>
        <SummaryCard bg="#fef9c3">Pendentes: {resume.pendentes}</SummaryCard>
        <SummaryCard bg="#dbf4ff">Saldo: R$ {resume.saldo.toLocaleString()}</SummaryCard>
      </SummaryGrid>
      <Table>
        <thead>
          <tr>
            <Th>Data</Th>
            <Th>Tipo</Th>
            <Th>Conta</Th>
            <Th>Indústria</Th>
            <Th>Estado</Th>
            <Th>Valor (R$)</Th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((t, idx) => (
            <tr key={idx}>
              <Td>{new Date(t.date).toLocaleDateString()}</Td>
              <Td>{t.transaction_type}</Td>
              <Td>{t.account}</Td>
              <Td>{t.industry}</Td>
              <Td>{t.state}</Td>
              <Td>{Number(t.amount).toLocaleString()}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationWrapper>{renderPagination()}</PaginationWrapper>
    </PageWrapper>
  );
}
