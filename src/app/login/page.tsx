"use client";

import { loginAction } from "../../lib/auth/loginAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6; /* bg-gray-100 */
`;

const FormContainer = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2563eb; /* border-blue-600 */
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444; /* text-red-500 */
  font-size: 0.875rem;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  background-color: #2563eb; /* bg-blue-600 */
  color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.15s ease-in-out;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8; /* bg-blue-700 */
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.message || "Erro ao fazer login");
    }
  }

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">
          Entrar
        </Button>
      </FormContainer>
    </Container>
  );
}