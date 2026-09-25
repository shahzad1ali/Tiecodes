import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Portfolio Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await getAdmin();
  if (!admin) redirect("/");
  return children;
}
