"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between p-5 text-left"
            aria-expanded={open === i}
          >
            <span className="pr-4 font-display font-semibold text-text-primary">
              {faq.question}
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-text-muted transition-transform",
                open === i && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
