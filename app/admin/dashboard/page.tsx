import { prisma } from "@/lib/db/prisma";
import { Inbox, Clock, Calendar, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  REVIEWED: "bg-blue-500/10 text-blue-400",
  QUOTED: "bg-purple-500/10 text-purple-400",
  BOOKED: "bg-green-500/10 text-green-400",
  COMPLETED: "bg-gray-500/10 text-gray-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalQuotesThisMonth,
    pendingQuotes,
    confirmedBookings,
    unreadMessages,
    recentQuotes,
    recentMessages,
  ] = await Promise.all([
    prisma.quote.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.quote.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Total Quotes", value: totalQuotesThisMonth, icon: Inbox, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Pending Review", value: pendingQuotes, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Confirmed Bookings", value: confirmedBookings, icon: Calendar, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Unread Messages", value: unreadMessages, icon: MessageSquare, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {now.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-[#2E2E2E] bg-[#111] p-5">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Quotes */}
        <div className="rounded-lg border border-[#2E2E2E] bg-[#111]">
          <div className="flex items-center justify-between border-b border-[#2E2E2E] px-5 py-4">
            <h2 className="font-semibold text-white">Recent Quotes</h2>
            <Link href="/admin/leads" className="text-sm text-[#FFCC00] hover:underline">
              View all →
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-gray-500">No quotes yet</p>
          ) : (
            <div className="divide-y divide-[#2E2E2E]">
              {recentQuotes.map((q) => (
                <div key={q.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {q.firstName} {q.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {q.fromCity} → {q.toCity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[q.status] || ""}`}>
                      {q.status}
                    </span>
                    <span className="text-xs text-gray-600">
                      {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="rounded-lg border border-[#2E2E2E] bg-[#111]">
          <div className="flex items-center justify-between border-b border-[#2E2E2E] px-5 py-4">
            <h2 className="font-semibold text-white">Recent Messages</h2>
          </div>
          {recentMessages.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-gray-500">No messages yet</p>
          ) : (
            <div className="divide-y divide-[#2E2E2E]">
              {recentMessages.map((m) => (
                <div key={m.id} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{m.name}</p>
                    <span className="text-xs text-gray-600">
                      {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">{m.subject}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-gray-500">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
