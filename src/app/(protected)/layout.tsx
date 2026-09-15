import { redirect } from "next/navigation";
import { getCurrentUser } from "../server-actions/auth/getCurrentUser";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/signin");
  }
  return <>{children}</>;
}
