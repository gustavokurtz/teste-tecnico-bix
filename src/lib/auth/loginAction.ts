"use server";

import { cookies } from "next/headers";
import { MOCK_USER } from "./mockUser";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    email === MOCK_USER.email &&
    password === MOCK_USER.password
  ) {
    (await cookies()).set("auth", "true", { httpOnly: true });
    return { success: true };
  }

  return { success: false, message: "Usuário ou senha inválidos" };
}
