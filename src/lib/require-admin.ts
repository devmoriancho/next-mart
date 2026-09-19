import { redirect } from "next/navigation";
import { getCurrentUser } from "../server-actions/auth/getCurrentUser";
import { prisma } from "@/lib/db";

export async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/signin");
  }

  const users = await prisma.$queryRaw<{ role: string }[]>`
    SELECT role FROM "user" WHERE id = ${currentUser.id}
  `;
  const user = users[0];

  if (user?.role !== "ADMIN") {
    redirect("/account");
  }
}
