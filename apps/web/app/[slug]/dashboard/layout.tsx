import { DashboardNav } from "./_componentes/dashboard-nav";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav slug={slug} />
      {children}
    </div>
  );
}