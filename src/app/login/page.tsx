"use client";

import { loginAction } from "../../lib/auth/loginAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { Inter } from 'next/font/google';

// Carregando a fonte Inter do Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Criando um componente de estilo global para variáveis consistentes
const FormWrapper = styled.div`
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #93c5fd;
  --color-primary-lightest: #e0f2fe;
  --color-background: #f9fafb;
  --color-card: #ffffff;
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #6b7280;
  --color-border: #e5e7eb;
  --color-placeholder: #9ca3af;
  --color-error: #ef4444;
  --color-success: #10b981;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --transition-base: all 0.2s ease;
  
  font-family: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 50%, #93c5fd 100%);
  padding: 1.5rem;
`;

const FormContainer = styled.form`
  background-color: var(--color-card);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 26rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  
  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const Logo = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoIcon = styled.div`
  background-color: var(--color-primary);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1);
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.p`
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  background-color: var(--color-card);
  color: var(--color-text-primary);
  transition: var(--transition-base);
  
  &::placeholder {
    color: var(--color-placeholder);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;

const InputIcon = styled.div`
  position: relative;
  width: 100%;
`;

const IconLeft = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-tertiary);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

const InputWithIcon = styled(Input)`
  padding-left: 2.75rem;
`;

const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  background-color: rgba(239, 68, 68, 0.05);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(239, 68, 68, 0.1);
`;

const Button = styled.button`
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  padding: 0.875rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition-base);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: var(--shadow-sm);
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md), 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
`;

const Link = styled.a`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition-base);
  
  &:hover {
    text-decoration: underline;
    color: var(--color-primary-dark);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  
  &::before, &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: var(--color-border);
  }
  
  span {
    padding: 0 1rem;
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await loginAction(formData);
      if (res.success) {
        router.push("/dashboard");
      } else {
        setError(res.message || "Erro ao fazer login");
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormWrapper>
      <Container>
        <FormContainer onSubmit={handleSubmit}>
          <HeaderSection>
            <Logo>
              <LogoIcon>💰</LogoIcon>
            </Logo>
            <Title>Login</Title>
            <Subtitle>Acesse sua conta para gerenciar suas finanças</Subtitle>
          </HeaderSection>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputIcon>
              <IconLeft>📧</IconLeft>
              <InputWithIcon
                id="email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                required
              />
            </InputIcon>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <InputIcon>
              <IconLeft>🔒</IconLeft>
              <InputWithIcon
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </InputIcon>
          </FormGroup>
          
          <ForgotPassword>
            <Link href="/recuperar-senha">Esqueceu a senha?</Link>
          </ForgotPassword>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processando..." : "Entrar"}
          </Button>
          
          <Footer>
            Ainda não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
          </Footer>
        </FormContainer>
      </Container>
    </FormWrapper>
  );
}