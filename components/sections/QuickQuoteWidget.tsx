"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const bedroomOptions = [
  "1 Bedroom Apartment", "2 Bedroom Apartment", "3 Bedroom Apartment", "4 Bedroom Apartment",
  "1 Bedroom House", "2 Bedroom House", "3 Bedroom House", "4 Bedroom House",
  "1 Bedroom Basement", "2 Bedroom Basement", "Commercial",
];

export default function QuickQuoteWidget() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    router.push(`/quote?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="qq-from" className="mb-1 block text-sm font-medium text-text-primary">
          Moving From
        </label>
        <select
          id="qq-from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full rounded-md border border-border bg-surface-2 p-3 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
          required
        >
          <option value="">Select bedroom type</option>
          {bedroomOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qq-to" className="mb-1 block text-sm font-medium text-text-primary">
          Moving To
        </label>
        <select
          id="qq-to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full rounded-md border border-border bg-surface-2 p-3 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
          required
        >
          <option value="">Select bedroom type</option>
          {bedroomOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qq-date" className="mb-1 block text-sm font-medium text-text-primary">
          Moving Date
        </label>
        <input
          id="qq-date"
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-md border border-border bg-surface-2 p-3 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary-hover"
      >
        Get Free Quote →
      </button>
    </form>
  );
}
