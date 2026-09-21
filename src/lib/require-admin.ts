import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}
