"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

// Definição de variáveis de design para manter consistência
const theme = {
  colors: {
    background: "#ffffff",
    primary: "#3b82f6",
    secondary: "#f3f4f6",
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1"
    },
    sidebar: {
      background: "#1e293b",
      hover: "#334155",
      active: "#3b82f6"
    },
    danger: "#ef4444"
  },
  shadows: {
    subtle: "0 2px 10px rgba(0, 0, 0, 0.08)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.12)"
  },
  borderRadius: "12px",
  transitions: "all 0.2s ease-in-out"
};

// Mobile toggle button com design melhorado
const MobileToggle = styled.button`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 20;
  background-color: ${theme.colors.sidebar.background};
  color: ${theme.colors.text.primary};
  padding: 0.75rem;
  border-radius: 10px;
  box-shadow: ${theme.shadows.subtle};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: ${theme.transitions};
  
  &:hover {
    background-color: ${theme.colors.sidebar.hover};
    box-shadow: ${theme.shadows.medium};
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

// Overlay para quando o sidebar estiver aberto no mobile
const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 20;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

// Define a interface para as props do SidebarContainer
interface SidebarContainerProps {
  open?: boolean;
}

// Sidebar container com design moderno
const SidebarContainer = styled.aside<SidebarContainerProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  width: 16rem;
  background-color: ${theme.colors.sidebar.background};
  color: ${theme.colors.text.primary};
  box-shadow: ${theme.shadows.medium};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    position: fixed;
    transform: translateX(0);
    padding: 1.5rem 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${theme.colors.text.primary};
  
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  color: ${theme.colors.text.primary};
`;

const CloseButton = styled.button`
  color: ${theme.colors.text.secondary};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions};
  
  &:hover {
    background-color: ${theme.colors.sidebar.hover};
    color: ${theme.colors.text.primary};
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
  flex: 1;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
  transition: ${theme.transitions};
  
  svg, span {
    transition: ${theme.transitions};
  }
  
  &:hover {
    background-color: ${theme.colors.sidebar.hover};
    color: ${theme.colors.text.primary};
  }
  
  &.active {
    background-color: ${theme.colors.sidebar.active};
    color: ${theme.colors.text.primary};
  }
`;

const Footer = styled.div`
  padding: 1rem;
  margin-top: auto;
`;

const StyledLogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-weight: 500;
  transition: ${theme.transitions};
  text-align: left;
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.15);
    color: ${theme.colors.danger};
  }
`;

export default function SidebarWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <MobileToggle onClick={() => setSidebarOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </MobileToggle>

      {/* Dark overlay for mobile */}
      <Overlay open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <SidebarContainer open={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Painel Admin</SidebarTitle>
          <CloseButton onClick={() => setSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </SidebarHeader>
        
        {/* Logo for desktop */}
        <Logo>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Dashboard</span>
        </Logo>
        
        <Navigation>
          <NavLink href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </NavLink>
          
          <NavLink href="/dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Dashboard</span>
          </NavLink>
          
          
        </Navigation>
        
        <Footer>
          <form action="/login" method="post">
            <StyledLogoutButton type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sair</span>
            </StyledLogoutButton>
          </form>
        </Footer>
      </SidebarContainer>
    </>
  );
}