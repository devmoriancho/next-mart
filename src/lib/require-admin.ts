import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!session || !session.user) {
    throw new Error("UNAUTHENTICATED");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}
