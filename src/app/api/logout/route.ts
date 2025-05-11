import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).set("auth", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expira imediatamente
  });

  return NextResponse.redirect(new URL("/login"));
}
