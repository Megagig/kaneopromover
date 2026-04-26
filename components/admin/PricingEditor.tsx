"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";

interface PricingTier {
  id: string;
  label: string;
  basePrice: number;
  hourlyRate: number;
  minHours: number;
  isActive: boolean;
}

interface PricingEditorProps {
  tiers: PricingTier[];
}

export default function PricingEditor({ tiers }: PricingEditorProps) {
  const router = useRouter();
  const [editedTiers, setEditedTiers] = useState<Record<string, Partial<PricingTier>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const getVal = (tier: PricingTier, field: keyof PricingTier) => {
    return editedTiers[tier.id]?.[field] ?? tier[field];
  };

  const setField = (id: string, field: string, value: number | boolean) => {
    setEditedTiers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const saveTier = async (tier: PricingTier) => {
    const edits = editedTiers[tier.id];
    if (!edits) return;

    setSavingId(tier.id);
    await fetch(`/api/pricing/${tier.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edits),
    });

    setSavingId(null);
    setEditedTiers((prev) => {
      const next = { ...prev };
      delete next[tier.id];
      return next;
    });
    setToast(`${tier.label} updated`);
    setTimeout(() => setToast(null), 3000);
    router.refresh();
  };

  const toggleActive = async (tier: PricingTier) => {
    const newActive = !getVal(tier, "isActive");
    setSavingId(tier.id);
    await fetch(`/api/pricing/${tier.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: newActive }),
    });
    setSavingId(null);
    router.refresh();
  };

  const hasEdits = (id: string) => !!editedTiers[id] && Object.keys(editedTiers[id]).length > 0;

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#2E2E2E]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#2E2E2E] bg-[#111]">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-400">Label</th>
              <th className="px-4 py-3 font-medium text-gray-400">Base Price ($)</th>
              <th className="px-4 py-3 font-medium text-gray-400">Hourly Rate ($/hr)</th>
              <th className="px-4 py-3 font-medium text-gray-400">Min Hours</th>
              <th className="px-4 py-3 font-medium text-gray-400">Active</th>
              <th className="px-4 py-3 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2E2E2E]">
            {tiers.map((tier) => (
              <tr key={tier.id} className="bg-[#1A1A1A]">
                <td className="px-4 py-3 font-medium text-white">{tier.label}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={getVal(tier, "basePrice") as number}
                    onChange={(e) => setField(tier.id, "basePrice", parseFloat(e.target.value))}
                    className="w-24 rounded border border-[#2E2E2E] bg-[#252525] px-2 py-1 text-sm text-white"
                    step="1"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={getVal(tier, "hourlyRate") as number}
                    onChange={(e) => setField(tier.id, "hourlyRate", parseFloat(e.target.value))}
                    className="w-24 rounded border border-[#2E2E2E] bg-[#252525] px-2 py-1 text-sm text-white"
                    step="1"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={getVal(tier, "minHours") as number}
                    onChange={(e) => setField(tier.id, "minHours", parseInt(e.target.value))}
                    className="w-16 rounded border border-[#2E2E2E] bg-[#252525] px-2 py-1 text-sm text-white"
                    min="1"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(tier)}
                    disabled={savingId === tier.id}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      getVal(tier, "isActive")
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {getVal(tier, "isActive") ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  {hasEdits(tier.id) && (
                    <button
                      onClick={() => saveTier(tier)}
                      disabled={savingId === tier.id}
                      className="flex items-center gap-1 rounded-md bg-[#FFCC00] px-3 py-1 text-xs font-semibold text-black disabled:opacity-50"
                    >
                      {savingId === tier.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Check className="h-3 w-3" />
                      )}
                      Save
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400 shadow-lg">
          ✓ {toast}
        </div>
      )}
    </>
  );
}
