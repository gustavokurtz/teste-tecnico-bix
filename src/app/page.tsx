"use client";

import { useRouter } from "next/navigation";
import styled, { createGlobalStyle } from "styled-components";
import { Inter } from 'next/font/google';

// Carregando a fonte Inter do Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Global styles com melhorias na tipografia e cores base
const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #3b82f6;
    --color-primary-dark: #2563eb;
    --color-primary-light: #93c5fd;
    --color-background: #f9fafb;
    --color-card: #ffffff;
    --color-text-primary: #111827;
    --color-text-secondary: #4b5563;
    --color-text-tertiary: #6b7280;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --radius-md: 0.75rem;
    --radius-lg: 1rem;
    --transition-base: all 0.2s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    font-family: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-background);
    color: var(--color-text-primary);
  }
  
  button, input, textarea, select {
    font-family: inherit;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 50%, #93c5fd 100%);
  padding: 2rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const Card = styled.div`
  background: var(--color-card);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-lg);
  padding: 3rem;
  max-width: 32rem;
  width: 100%;
  text-align: center;
  transition: var(--transition-base);
  border: 1px solid rgba(229, 231, 235, 0.8);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  @media (max-width: 640px) {
    padding: 2.5rem 1.5rem;
  }
`;

const Logo = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoIcon = styled.div`
  background-color: var(--color-primary);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
  line-height: 1.2;
  
  @media (max-width: 640px) {
    font-size: 1.875rem;
  }
`;

const Description = styled.p`
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: var(--transition-base);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md), 0 0 0 rgba(59, 130, 246, 0);
  width: 100%;
  max-width: 16rem;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: var(--color-primary-dark);
    box-shadow: var(--shadow-lg), 0 0 0 4px rgba(59, 130, 246, 0.15);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

const ButtonIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 1.25rem;
  display: inline-flex;
  transition: transform 0.2s ease;
  
  ${Button}:hover & {
    transform: translateX(2px);
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
`;

const Link = styled.a`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Home() {
  const router = useRouter();
  
  return (
    <>
      <GlobalStyle />
      <Container>
        <Card>
          <Logo>
            <LogoIcon>💰</LogoIcon>
          </Logo>
          <Title>
            Finance App
          </Title>
          <Description>
            Gerencie suas finanças de forma simples e eficiente com nossa plataforma intuitiva de controle financeiro.
          </Description>
          <Button onClick={() => router.push("/login")}>
            Acessar painel
            <ButtonIcon>→</ButtonIcon>
          </Button>
        </Card>
      </Container>
    </>
  );
}