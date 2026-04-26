"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    label: "Our Vision",
    content:
      "The following principles reflect our values and guide everything we do at Kaneo Pro Movers. We envision a future where moving is no longer a source of stress but an exciting step forward. By combining modern logistics with old-fashioned care, we aim to set the standard for moving services across Alberta.",
  },
  {
    label: "Our Mission",
    content:
      "To provide dependable, efficient, and stress-free moving services to families and businesses across Alberta. We are committed to transparent pricing, careful handling of every item, and delivering an experience that exceeds expectations. Every move matters to us, and we treat each client like family.",
  },
  {
    label: "Our Values",
    content:
      "We believe in integrity, respect, and reliability. These core values drive every interaction with our clients, from the first phone call to the final box delivered. We hold ourselves accountable to the highest standards of professionalism, and we continuously invest in training our team to deliver exceptional service.",
  },
];

export default function AboutTabs() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "px-5 py-3 text-sm font-semibold transition",
              active === i
                ? "border-b-2 border-primary text-primary"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <p className="leading-relaxed text-text-secondary">{tabs[active].content}</p>
      </div>
    </div>
  );
}
