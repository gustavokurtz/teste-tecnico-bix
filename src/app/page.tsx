"use client";

import { useRouter } from "next/navigation";
import styled, { createGlobalStyle } from "styled-components";

// Global styles to reset browser defaults
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
  padding: 1rem;
`;

const Card = styled.div`
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  max-width: 28rem;
  width: 100%;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  color: #4b5563;
  margin-bottom: 2rem;
  font-size: 1.125rem;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.875rem 1.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.25);
  
  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 6px 10px rgba(29, 78, 216, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const EmojiIcon = styled.span`
  font-size: 1.5rem;
  vertical-align: middle;
  margin-left: 0.25rem;
`;

export default function Home() {
  const router = useRouter();
  
  return (
    <>
      <GlobalStyle />
      <Container>
        <Card>
          <Title>
            Bem-vindo ao Finance App <EmojiIcon>💸</EmojiIcon>
          </Title>
          <Description>
            Gerencie suas transações financeiras com facilidade.
          </Description>
          <Button onClick={() => router.push("/login")}>
            Acessar painel
          </Button>
        </Card>
      </Container>
    </>
  );
}