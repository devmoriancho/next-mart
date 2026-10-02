"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies, headers } from "next/headers";

export async function getCurrentUser() {
  let session;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");
    cookieStore.delete("__Secure-better-auth.session_token");

    console.warn(
      "Invalid Better Auth session cleared:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }

  if (!session?.user.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
    },
  });

  return user;
}
