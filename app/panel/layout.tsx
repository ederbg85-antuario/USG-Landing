import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PanelNav from "./PanelNav";

export const metadata = {
  title: "Panel de control — USG Liga de Campeones",
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="lg:flex min-h-screen bg-black/40">
      <PanelNav email={user.email} />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
