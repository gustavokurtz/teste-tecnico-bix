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

// Definição das cores e estilos consistentes
const theme = {
  colors: {
    background: "#f8fafc",
    surface: "#ffffff",
    primary: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      light: "#94a3b8"
    },
    border: "#e2e8f0",
    chart: {
      deposit: "#10b981",
      withdraw: "#f43f5e",
      line: "#3b82f6"
    }
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.03)",
    md: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.07), 0 4px 6px rgba(0, 0, 0, 0.05)"
  },
  radius: {
    sm: "6px",
    md: "12px",
    lg: "16px"
  },
  transition: "all 0.2s ease-in-out"
};

interface Transaction {
  date: number;
  amount: string; // em centavos
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

// Styled components modernizados e otimizados para mobile
const PageWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 2rem;
    gap: 2rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin: 0;
  
  @media (min-width: 640px) {
    font-size: 1.75rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  min-width: 0;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;


const ChartCard = styled.div`
  background: ${theme.colors.surface};
  padding: 1rem;
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transition};
  
  @media (min-width: 640px) {
    padding: 1.25rem;
    border-radius: ${theme.radius.lg};
  }
  
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

const ChartHeader = styled.div`
  margin-bottom: 0.75rem;
  
  @media (min-width: 640px) {
    margin-bottom: 1rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.25rem 0;
  
  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin: 0 0 0.375rem 0;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
  }
`;

const ChartDescription = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.text.secondary};
  margin: 0;
  
  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  min-width: 0;
  height: 250px;

  @media (min-width: 640px) {
    height: 275px;
  }

  @media (min-width: 1024px) {
    height: 300px;
  }
`;


const FiltersSection = styled.div`
  background: ${theme.colors.surface};
  padding: 1rem;
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.md};
  
  @media (min-width: 640px) {
    padding: 1.25rem;
    border-radius: ${theme.radius.lg};
  }
  
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

const FiltersTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
  
  @media (min-width: 640px) {
    font-size: 1rem;
    margin: 0 0 1rem 0;
  }
`;

const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  min-width: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;


const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  
  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`;

const FilterLabel = styled.label`
  font-size: 0.75rem;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
`;

const Select = styled.select`
  border: 1px solid ${theme.colors.border};
  padding: 0.5rem;
  border-radius: ${theme.radius.sm};
  width: 100%;
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.surface};
  outline: none;
  transition: ${theme.transition};
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    padding: 0.625rem 0.75rem;
  }
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const DateInput = styled.input`
  border: 1px solid ${theme.colors.border};
  padding: 0.5rem;
  border-radius: ${theme.radius.sm};
  width: 100%;
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.surface};
  outline: none;
  transition: ${theme.transition};
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    padding: 0.625rem 0.75rem;
  }
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const SummaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;


const SummaryCard = styled.div<{ $variant: string }>`
  background: ${theme.colors.surface};
  padding: 1rem;
  border-radius: ${theme.radius.md};
  border-left: 4px solid ${({ $variant }) => {
    switch ($variant) {
      case 'success': return theme.colors.success;
      case 'danger': return theme.colors.danger;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.primary;
    }
  }};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transition};
  
  @media (min-width: 640px) {
    padding: 1.25rem;
  }
  
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
  
  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const CardLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.375rem;
  
  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
`;

const CardValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const TableCard = styled.div`
  background: ${theme.colors.surface};
  padding: 1rem;
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.md};
  overflow-x: auto;
  
  @media (min-width: 640px) {
    padding: 1.25rem;
    border-radius: ${theme.radius.lg};
  }
  
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

const TableTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
  
  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const TableInfo = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.text.secondary};
  
  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -1rem;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    margin: 0;
    padding: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 650px;
`;

const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  white-space: nowrap;
  
  @media (min-width: 640px) {
    padding: 0.875rem 1rem;
  }
  
  &:first-child {
    border-top-left-radius: ${theme.radius.sm};
  }
  
  &:last-child {
    border-top-right-radius: ${theme.radius.sm};
  }
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.primary};
  font-size: 0.75rem;
  white-space: nowrap;
  
  @media (min-width: 640px) {
    padding: 1rem;
    font-size: 0.875rem;
  }
`;

const TableRow = styled.tr`
  transition: ${theme.transition};
  
  &:hover {
    background-color: ${theme.colors.background};
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const TransactionType = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.375rem;
  border-radius: ${theme.radius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $type }) => 
    $type === 'deposit' 
      ? 'rgba(16, 185, 129, 0.1)' 
      : 'rgba(239, 68, 68, 0.1)'
  };
  color: ${({ $type }) => 
    $type === 'deposit' 
      ? theme.colors.success 
      : theme.colors.danger
  };
  
  @media (min-width: 640px) {
    padding: 0.25rem 0.5rem;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  justify-content: center;
  margin-top: 1rem;
  
  @media (min-width: 640px) {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 0.375rem 0.5rem;
  border: 1px solid ${({ $active }) => $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.radius.sm};
  background: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $active }) => ($active ? "#fff" : theme.colors.text.primary)};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: ${theme.transition};
  min-width: 2rem;
  
  @media (min-width: 640px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  
  &:hover:not(:disabled) {
    background: ${({ $active }) => $active ? theme.colors.primary : theme.colors.background};
    border-color: ${({ $active }) => $active ? theme.colors.primary : theme.colors.primary};
  }
  
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const EmptyTable = styled.div`
  padding: 2rem 0;
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 0.875rem;
`;

// Componente principal
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
  const pageSize = 10; // Reduzido para melhor experiência visual

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
    return Object.entries(grouped)
      .map(([label, total]) => ({ date: label, total }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filtered]);

  // Formatador de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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
      if (totalPages > 1) pages.push(totalPages);
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

  // Custom tooltip para os gráficos
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: theme.colors.surface, 
          padding: '0.75rem', 
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.sm,
          boxShadow: theme.shadows.md
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ 
              margin: '0.25rem 0', 
              color: entry.color, 
              fontSize: '0.875rem'
            }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Dashboard Financeiro</Title>
      </PageHeader>
      
      <SummaryGrid>
        <SummaryCard $variant="success">
          <CardLabel>Receitas</CardLabel>
          <CardValue>{formatCurrency(resume.receitas)}</CardValue>
        </SummaryCard>
        <SummaryCard $variant="danger">
          <CardLabel>Despesas</CardLabel>
          <CardValue>{formatCurrency(resume.despesas)}</CardValue>
        </SummaryCard>
        <SummaryCard $variant="warning">
          <CardLabel>Pendentes</CardLabel>
          <CardValue>{resume.pendentes}</CardValue>
        </SummaryCard>
        <SummaryCard $variant="primary">
          <CardLabel>Saldo Total</CardLabel>
          <CardValue>{formatCurrency(resume.saldo)}</CardValue>
        </SummaryCard>
      </SummaryGrid>
      
      <ChartsGrid>
        <ChartCard>
          <ChartHeader>
            <SubTitle>Receitas vs Despesas por Estado</SubTitle>
            <ChartDescription>Comparativo de valores por localização geográfica</ChartDescription>
          </ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <XAxis dataKey="state" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="deposit" 
                stackId="a" 
                fill={theme.colors.chart.deposit} 
                name="Receitas"
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="withdraw" 
                stackId="a" 
                fill={theme.colors.chart.withdraw} 
                name="Despesas"
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard>
          <ChartHeader>
            <SubTitle>Total movimentado por mês</SubTitle>
            <ChartDescription>Evolução do fluxo financeiro ao longo do tempo</ChartDescription>
          </ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.colors.border} />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12, fill: theme.colors.text.secondary }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12, fill: theme.colors.text.secondary }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke={theme.colors.chart.line}
                name="Total"
                strokeWidth={3}
                dot={{ stroke: theme.colors.chart.line, strokeWidth: 2, r: 4, fill: "white" }}
                activeDot={{ r: 6, stroke: theme.colors.chart.line, strokeWidth: 2, fill: "white" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>
      
      <FiltersSection>
        <FiltersTitle>Filtros</FiltersTitle>
        <FiltersWrapper>
          <FilterGroup>
            <FilterLabel>Tipo de Transação</FilterLabel>
            <Select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="">Todos os tipos</option>
              <option value="deposit">Depósitos</option>
              <option value="withdraw">Saques</option>
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Estado</FilterLabel>
            <Select
              value={filter.state}
              onChange={(e) => setFilter({ ...filter, state: e.target.value })}
            >
              <option value="">Todos os estados</option>
              {estados.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Indústria</FilterLabel>
            <Select
              value={filter.industry}
              onChange={(e) => setFilter({ ...filter, industry: e.target.value })}
            >
              <option value="">Todas as indústrias</option>
              {industrias.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Conta</FilterLabel>
            <Select
              value={filter.account}
              onChange={(e) => setFilter({ ...filter, account: e.target.value })}
            >
              <option value="">Todas as contas</option>
              {contas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Data inicial</FilterLabel>
            <DateInput
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Data final</FilterLabel>
            <DateInput
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
            />
          </FilterGroup>
        </FiltersWrapper>
      </FiltersSection>
      
      <TableCard>
        <TableHeader>
          <TableTitle>Transações</TableTitle>
          <TableInfo>Mostrando {paginated.length} de {filtered.length} transações</TableInfo>
        </TableHeader>
        
        {paginated.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Data</Th>
                  <Th>Tipo</Th>
                  <Th>Conta</Th>
                  <Th>Indústria</Th>
                  <Th>Estado</Th>
                  <Th>Valor</Th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((t, idx) => (
                  <TableRow key={idx}>
                    <Td>{new Date(t.date).toLocaleDateString()}</Td>
                    <Td>
                      <TransactionType $type={t.transaction_type}>
                        {t.transaction_type === "deposit" ? "Depósito" : "Saque"}
                      </TransactionType>
                    </Td>
                    <Td>{t.account}</Td>
                    <Td>{t.industry}</Td>
                    <Td>{t.state}</Td>
                    <Td style={{ 
                      fontWeight: '600', 
                      color: t.transaction_type === "deposit" 
                        ? theme.colors.success 
                        : theme.colors.danger 
                    }}>
                      {formatCurrency(Number(t.amount))}
                    </Td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <PaginationWrapper>{renderPagination()}</PaginationWrapper>
          </>
        ) : (
          <EmptyTable>Nenhuma transação encontrada com os filtros atuais.</EmptyTable>
        )}
      </TableCard>
    </PageWrapper>
  );
}