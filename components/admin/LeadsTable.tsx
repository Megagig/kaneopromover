"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { Loader2, Send, CalendarPlus, ChevronDown, ChevronUp } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  REVIEWED: "bg-blue-500/10 text-blue-400",
  QUOTED: "bg-purple-500/10 text-purple-400",
  BOOKED: "bg-green-500/10 text-green-400",
  COMPLETED: "bg-gray-500/10 text-gray-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

const statuses = ["ALL", "PENDING", "REVIEWED", "QUOTED", "BOOKED", "COMPLETED", "CANCELLED"];

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bedroomTypeFrom: string;
  bedroomTypeTo: string;
  movingDate: string;
  fromAddress: string;
  toAddress: string;
  fromCity: string;
  toCity: string;
  notes: string | null;
  source: string | null;
  status: string;
  estimatedPrice: number | null;
  createdAt: string;
}

interface LeadsTableProps {
  quotes: Quote[];
  total: number;
  currentPage: number;
  limit: number;
  currentStatus: string;
  currentCity: string;
}

export default function LeadsTable({
  quotes,
  total,
  currentPage,
  limit,
  currentStatus,
  currentCity,
}: LeadsTableProps) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [bookingModal, setBookingModal] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");

  const totalPages = Math.ceil(total / limit);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (key === "status") params.set("status", value);
    else params.set("status", currentStatus);
    if (key === "city") params.set("city", value);
    else if (currentCity) params.set("city", currentCity);
    params.set("page", "1");
    router.push(`/admin/leads?${params.toString()}`);
  };

  const updateStatus = async (id: string, status: string) => {
    setLoadingAction(id);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoadingAction(null);
    router.refresh();
  };

  const sendQuoteEmail = async (id: string) => {
    setLoadingAction(`send-${id}`);
    await fetch(`/api/leads/${id}/send-quote`, { method: "POST" });
    setLoadingAction(null);
    router.refresh();
  };

  const convertToBooking = async (id: string) => {
    if (!scheduledDate) return;
    setLoadingAction(`book-${id}`);
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteId: id, scheduledAt: scheduledDate }),
    });
    setLoadingAction(null);
    setBookingModal(null);
    setScheduledDate("");
    router.refresh();
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={currentStatus}
          onChange={(e) => updateFilters("status", e.target.value)}
          className="rounded-md border border-[#2E2E2E] bg-[#252525] px-3 py-2 text-sm text-white"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "ALL" ? "All Statuses" : s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter by city..."
          defaultValue={currentCity}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateFilters("city", (e.target as HTMLInputElement).value);
          }}
          className="rounded-md border border-[#2E2E2E] bg-[#252525] px-3 py-2 text-sm text-white placeholder:text-gray-600"
        />
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-lg border border-[#2E2E2E]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#2E2E2E] bg-[#111]">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-400">Customer</th>
              <th className="hidden px-4 py-3 font-medium text-gray-400 md:table-cell">Move</th>
              <th className="hidden px-4 py-3 font-medium text-gray-400 lg:table-cell">Route</th>
              <th className="px-4 py-3 font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 font-medium text-gray-400">Received</th>
              <th className="px-4 py-3 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2E2E2E]">
            {quotes.map((q) => (
              <>
                <tr
                  key={q.id}
                  className="cursor-pointer bg-[#1A1A1A] hover:bg-[#222]"
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{q.firstName} {q.lastName}</p>
                    <p className="text-xs text-gray-500">{q.email}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 md:table-cell">
                    {q.bedroomTypeFrom}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-400 lg:table-cell">
                    {q.fromCity} → {q.toCity}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[q.status] || ""}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-4 py-3">
                    {expandedId === q.id ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </td>
                </tr>
                {expandedId === q.id && (
                  <tr key={`${q.id}-detail`} className="bg-[#151515]">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-400">Phone: <span className="text-white">{q.phone}</span></p>
                          <p className="text-gray-400">From: <span className="text-white">{q.fromAddress}, {q.fromCity}</span></p>
                          <p className="text-gray-400">To: <span className="text-white">{q.toAddress}, {q.toCity}</span></p>
                          <p className="text-gray-400">Date: <span className="text-white">{format(new Date(q.movingDate), "PPP")}</span></p>
                          {q.notes && <p className="text-gray-400">Notes: <span className="text-white">{q.notes}</span></p>}
                          {q.estimatedPrice && <p className="text-gray-400">Estimated: <span className="text-[#FFCC00] font-bold">${q.estimatedPrice}</span></p>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {q.status === "PENDING" && (
                            <button
                              onClick={(e) => { e.stopPropagation(); updateStatus(q.id, "REVIEWED"); }}
                              disabled={loadingAction === q.id}
                              className="rounded-md bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20 disabled:opacity-50"
                            >
                              {loadingAction === q.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Mark Reviewed"}
                            </button>
                          )}
                          {(q.status === "PENDING" || q.status === "REVIEWED") && (
                            <button
                              onClick={(e) => { e.stopPropagation(); sendQuoteEmail(q.id); }}
                              disabled={loadingAction === `send-${q.id}`}
                              className="flex items-center gap-1 rounded-md bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-400 hover:bg-purple-500/20 disabled:opacity-50"
                            >
                              {loadingAction === `send-${q.id}` ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                              Send Quote
                            </button>
                          )}
                          {q.status === "QUOTED" && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setBookingModal(q.id); }}
                              className="flex items-center gap-1 rounded-md bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/20"
                            >
                              <CalendarPlus className="h-3 w-3" />
                              Convert to Booking
                            </button>
                          )}
                          <a
                            href={`tel:${q.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-md bg-[#FFCC00]/10 px-3 py-1.5 text-xs font-medium text-[#FFCC00] hover:bg-[#FFCC00]/20"
                          >
                            Call
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {quotes.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">No quotes found</p>
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
                if (currentCity) params.set("city", currentCity);
                params.set("page", String(p));
                router.push(`/admin/leads?${params.toString()}`);
              }}
              className={`rounded-md px-3 py-1 text-sm ${p === currentPage ? "bg-[#FFCC00] text-black" : "bg-[#252525] text-gray-400 hover:text-white"}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setBookingModal(null)}>
          <div className="w-full max-w-sm rounded-lg border border-[#2E2E2E] bg-[#1A1A1A] p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white">Schedule Booking</h3>
            <p className="mt-1 text-sm text-gray-500">Pick a date for this move</p>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="mt-4 w-full rounded-md border border-[#2E2E2E] bg-[#252525] p-3 text-sm text-white"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => convertToBooking(bookingModal)}
                disabled={!scheduledDate || loadingAction === `book-${bookingModal}`}
                className="flex-1 rounded-md bg-[#FFCC00] px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
              >
                {loadingAction === `book-${bookingModal}` ? "Creating..." : "Confirm Booking"}
              </button>
              <button
                onClick={() => setBookingModal(null)}
                className="rounded-md border border-[#2E2E2E] px-4 py-2 text-sm text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
