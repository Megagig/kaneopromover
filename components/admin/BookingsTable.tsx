"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-green-500/10 text-green-400",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400",
  COMPLETED: "bg-gray-500/10 text-gray-300",
  CANCELLED: "bg-red-500/10 text-red-400",
};

const bookingStatuses = ["ALL", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

interface BookingQuote {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bedroomTypeFrom: string;
  fromCity: string;
  toCity: string;
}

interface Booking {
  id: string;
  scheduledAt: string;
  status: string;
  assignedTo: string | null;
  notes: string | null;
  quote: BookingQuote;
  createdAt: string;
}

interface BookingsTableProps {
  bookings: Booking[];
  total: number;
  currentPage: number;
  limit: number;
  currentStatus: string;
}

export default function BookingsTable({
  bookings,
  total,
  currentPage,
  limit,
  currentStatus,
}: BookingsTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const totalPages = Math.ceil(total / limit);

  const updateStatus = async (id: string, status: string) => {
    setLoadingId(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoadingId(null);
    router.refresh();
  };

  return (
    <div>
      {/* Filter */}
      <div className="flex gap-3">
        <select
          value={currentStatus}
          onChange={(e) => {
            const params = new URLSearchParams();
            if (e.target.value !== "ALL") params.set("status", e.target.value);
            params.set("page", "1");
            router.push(`/admin/bookings?${params.toString()}`);
          }}
          className="rounded-md border border-[#2E2E2E] bg-[#252525] px-3 py-2 text-sm text-white"
        >
          {bookingStatuses.map((s) => (
            <option key={s} value={s}>{s === "ALL" ? "All Statuses" : s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-lg border border-[#2E2E2E]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#2E2E2E] bg-[#111]">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-400">Customer</th>
              <th className="hidden px-4 py-3 font-medium text-gray-400 md:table-cell">Scheduled</th>
              <th className="hidden px-4 py-3 font-medium text-gray-400 lg:table-cell">Route</th>
              <th className="px-4 py-3 font-medium text-gray-400">Status</th>
              <th className="hidden px-4 py-3 font-medium text-gray-400 md:table-cell">Assigned</th>
              <th className="px-4 py-3 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2E2E2E]">
            {bookings.map((b) => (
              <tr key={b.id} className="bg-[#1A1A1A] hover:bg-[#222]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{b.quote.firstName} {b.quote.lastName}</p>
                  <p className="text-xs text-gray-500">{b.quote.phone}</p>
                </td>
                <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                  {format(new Date(b.scheduledAt), "PPP")}
                </td>
                <td className="hidden px-4 py-3 text-gray-400 lg:table-cell">
                  {b.quote.fromCity} → {b.quote.toCity}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status] || ""}`}>
                    {b.status.replace("_", " ")}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                  {b.assignedTo || "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {b.status === "CONFIRMED" && (
                      <button
                        onClick={() => updateStatus(b.id, "IN_PROGRESS")}
                        disabled={loadingId === b.id}
                        className="rounded px-2 py-1 text-xs text-blue-400 hover:bg-blue-500/10 disabled:opacity-50"
                      >
                        {loadingId === b.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Start"}
                      </button>
                    )}
                    {b.status === "IN_PROGRESS" && (
                      <button
                        onClick={() => updateStatus(b.id, "COMPLETED")}
                        disabled={loadingId === b.id}
                        className="rounded px-2 py-1 text-xs text-green-400 hover:bg-green-500/10 disabled:opacity-50"
                      >
                        {loadingId === b.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Complete"}
                      </button>
                    )}
                    <a
                      href={`tel:${b.quote.phone}`}
                      className="rounded px-2 py-1 text-xs text-[#FFCC00] hover:bg-[#FFCC00]/10"
                    >
                      Call
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">No bookings found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                const params = new URLSearchParams();
                if (currentStatus !== "ALL") params.set("status", currentStatus);
                params.set("page", String(p));
                router.push(`/admin/bookings?${params.toString()}`);
              }}
              className={`rounded-md px-3 py-1 text-sm ${p === currentPage ? "bg-[#FFCC00] text-black" : "bg-[#252525] text-gray-400 hover:text-white"}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
