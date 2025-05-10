"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

// Mobile toggle button
const MobileToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 20;
  background-color: #1f2937; /* bg-gray-800 */
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

// Define a interface para as props do SidebarContainer
interface SidebarContainerProps {
  open?: boolean;
}

// Sidebar container com tipagem correta
const SidebarContainer = styled.aside<SidebarContainerProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  width: 16rem; /* w-64 */
  background-color: #111827; /* bg-gray-900 */
  color: white;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.2s ease-in-out;
  
  @media (min-width: 768px) {
    position: static;
    transform: translateX(0);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem; /* space-y-4 */
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* space-y-2 */
  padding: 0 1rem;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  text-decoration: none;
  color: white;
  
  &:hover {
    background-color: #374151; /* hover:bg-gray-700 */
  }
`;

const StyledLogoutButton = styled.button`
  text-align: left;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #dc2626; /* hover:bg-red-600 */
  }
`;

export default function SidebarWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <MobileToggle onClick={() => setSidebarOpen(true)}>
        ☰
      </MobileToggle>

      {/* Sidebar */}
      <SidebarContainer open={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Painel</SidebarTitle>
          <CloseButton onClick={() => setSidebarOpen(false)}>
            ✖
          </CloseButton>
        </SidebarHeader>
        <Navigation>
          <NavLink href="/">
            🏠 Home
          </NavLink>
          <NavLink href="/dashboard">
            📊 Dashboard
          </NavLink>
          <form action="/login" method="post">
            <StyledLogoutButton type="submit">
              🚪 Logout
            </StyledLogoutButton>
          </form>
        </Navigation>
      </SidebarContainer>
    </>
  );
}