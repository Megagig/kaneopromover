"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function SuccessContent() {
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "quote_submission", {
        event_category: "conversion",
        event_label: "quote_form_success",
      });
    }
  }, []);

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-success" />
        <h1 className="mt-6 font-display text-3xl font-bold text-text-primary">
          Thank You! We&apos;ve Received Your Request
        </h1>
        <p className="mt-4 text-text-secondary">
          Our team will contact you within 2 hours at the number you provided.
        </p>
        <a
          href="tel:+15873785954"
          className="mt-6 block text-2xl font-bold text-primary"
        >
          +1(587)-378-5954
        </a>
        <p className="mt-1 text-sm text-text-muted">
          Need immediate help? Call us directly.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-semibold text-black transition hover:bg-primary-hover"
        >
          Return to Homepage
        </Link>
      </div>
    </section>
  );
}
