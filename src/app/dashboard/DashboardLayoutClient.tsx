"use client";
import { ReactNode } from "react";
import styled from "styled-components";
import SidebarWrapper from "./SidebarWrapper";

// Definição de variáveis de design para manter consistência
const theme = {
  colors: {
    background: "#f8fafc",
    primary: "#3b82f6",
    text: "#1e293b",
    border: "#e2e8f0",
    sidebar: "#ffffff"
  },
  shadows: {
    subtle: "0 2px 10px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.08)"
  },
  borderRadius: "12px",
  transitions: "all 0.2s ease-in-out"
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow: auto;
  transition: ${theme.transitions};
  
  /* Design responsivo */
  @media (min-width: 768px) {
    margin-left: 16rem;
    padding: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
  
  /* Container para o conteúdo com sombra e arredondamento */
  & > div {
    background-color: #ffffff;
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.shadows.subtle};
    padding: 2rem;
    height: calc(100% - 1.5rem);
    transition: ${theme.transitions};
    
    &:hover {
      box-shadow: ${theme.shadows.medium};
    }
  }
`;

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      <SidebarWrapper />
      <Main>
        <div>{children}</div>
      </Main>
    </LayoutContainer>
  );
}