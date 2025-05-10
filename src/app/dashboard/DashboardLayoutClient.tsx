"use client";
import { ReactNode } from "react";
import styled from "styled-components";
import SidebarWrapper from "./SidebarWrapper";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
`;

const Main = styled.main`
  flex: 1;
  background-color: #ffffff;
  color: #000000;
  overflow: auto;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 16rem;
  }
`;

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      <SidebarWrapper />
      <Main>{children}</Main>
    </LayoutContainer>
  );
}