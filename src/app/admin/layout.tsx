import AdminLayout from "@/components/layout/AdminLayout";
import { requireAdmin } from "../../lib/require-admin";

export default async function Admin({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <AdminLayout>{children}</AdminLayout>;
}
