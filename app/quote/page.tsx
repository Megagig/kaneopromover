import { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "@/components/forms/QuoteForm";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Get a Free Moving Quote | Kaneo Pro Movers Airdrie & Calgary",
  description:
    "Request a free quote from Kaneo Pro Movers. Serving Airdrie, Calgary, Crossfield, and all of Alberta. Instant estimate + same-day response.",
  alternates: { canonical: "https://www.kaneopromovers.com/quote" },
  robots: { index: true, follow: true },
};

export default function QuotePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Get a Free Quote" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Get Your Free Moving Quote
            </h1>
            <p className="mt-3 text-text-secondary">
              Fill out the form below and we&apos;ll get back to you within 2 hours.
            </p>
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-surface" />}>
                <QuoteForm />
              </Suspense>
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-lg border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  Need Help?
                </h3>
                <p className="mt-3 text-sm text-text-secondary">
                  Call us directly for immediate assistance:
                </p>
                <a
                  href="tel:+15873785954"
                  className="mt-2 block text-lg font-bold text-primary"
                >
                  +1(587)-378-5954
                </a>
                <a
                  href="mailto:info@kaneopromovers.com"
                  className="mt-1 block text-sm text-text-secondary hover:text-primary"
                >
                  info@kaneopromovers.com
                </a>
                <div className="mt-6 rounded-md bg-primary/10 p-4">
                  <p className="text-sm font-medium text-primary">
                    ⚡ We respond within 2 hours
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary text-primary" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-text-muted">5-Star Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
