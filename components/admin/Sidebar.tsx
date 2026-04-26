"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  Inbox,
  Tag,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Leads / Quotes", href: "/admin/leads", icon: Inbox },
  { label: "Pricing", href: "/admin/pricing", icon: Tag },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

interface SidebarProps {
  userName: string;
}

export default function AdminSidebar({ userName }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="border-b border-[#2E2E2E] px-5 py-5">
        <Link href="/admin/dashboard" className="block">
          <h2 className="text-lg font-bold text-[#FFCC00]">KANEO PRO</h2>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
              isActive(item.href)
                ? "bg-[#FFCC00]/10 text-[#FFCC00]"
                : "text-gray-400 hover:bg-[#252525] hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#2E2E2E] px-3 py-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium text-white">{userName}</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
        <Link
          href="/"
          className="mt-2 block px-3 py-1 text-xs text-gray-600 hover:text-gray-400"
        >
          ← Back to website
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-md bg-[#1A1A1A] p-2 text-white lg:hidden"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0D0D0D] transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar — desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#2E2E2E] bg-[#0D0D0D] lg:flex">
        {sidebarContent}
      </aside>
    </>
  );
}
