import { auth } from "@/lib/auth/auth";
import AdminSidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin | Kaneo Pro Movers",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Allow login page through without session
  // Middleware handles the redirect, but this is a safety net
  if (!session?.user) {
    // Don't redirect if we're on the login page (handled by middleware)
    // This layout wraps login too, so we just render children
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#111]">
      <AdminSidebar userName={session.user.name || "Admin"} />
      <main className="flex-1 overflow-auto bg-[#1A1A1A] p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
