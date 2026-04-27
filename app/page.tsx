import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, Building, Package, Truck, CheckCircle, Star, ThumbsUp, Users, Clock } from "lucide-react";
import HeroSlider from "@/components/sections/HeroSlider";
import QuickQuoteWidget from "@/components/sections/QuickQuoteWidget";
import FAQAccordion from "@/components/sections/FAQAccordion";
import GoogleReviews from "@/components/sections/GoogleReviews";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: "Kaneo Pro Movers | Airdrie & Calgary Moving Company",
  description:
    "Trusted moving company in Airdrie and Calgary, AB. Affordable residential, furniture & same-day movers. Call +1(587)-378-5954 for a free quote!",
  openGraph: {
    title: "Kaneo Pro Movers | Airdrie & Calgary Moving Company",
    description:
      "Trusted moving company in Airdrie and Calgary, AB. Affordable residential, furniture & same-day movers.",
    url: "https://www.kaneopromovers.com/",
    images: [{ url: "/images/og-home.jpg" }],
  },
  alternates: { canonical: "https://www.kaneopromovers.com/" },
};

const serviceCards = [
  { icon: Home, title: "Residential Moving", desc: "Full-service home moves for families and individuals. We handle packing, loading, transport, and setup at your new home." },
  { icon: Building, title: "Commercial Moving", desc: "Office and business relocations with minimal downtime. Professional handling of equipment, furniture, and sensitive documents." },
  { icon: Package, title: "Packing & Unpacking", desc: "Expert packing with quality materials to keep your belongings safe. We also unpack and organize at your destination." },
  { icon: Truck, title: "Loading & Unloading", desc: "Need help with the heavy lifting? Our experienced crew handles loading and unloading quickly and safely." },
];

const stats = [
  { icon: ThumbsUp, value: "99%", label: "Customer Satisfaction" },
  { icon: Star, value: "5-Star", label: "Rating" },
  { icon: Users, value: "100+", label: "Happy Customers" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const citiesList = [
  { name: "Airdrie", slug: "airdrie" },
  { name: "Calgary", slug: "calgary" },
  { name: "Crossfield", slug: "crossfield" },
  { name: "Carstairs", slug: "carstairs" },
  { name: "Chestermere", slug: "chestermere" },
  { name: "Cochrane", slug: "cochrane" },
  { name: "Okotoks", slug: "okotoks" },
  { name: "Olds", slug: "olds" },
];

const homeFaqs = [
  { question: "How much do movers cost in Airdrie and Calgary?", answer: "Moving costs start at $299 for a 1-bedroom apartment. Prices vary based on home size, distance, and services needed. Contact us for a free, personalized quote." },
  { question: "Do you offer same-day moving services?", answer: "Yes, we offer same-day and last-minute moving services subject to crew availability. Call us to check if we can accommodate your timeline." },
  { question: "What areas do you serve?", answer: "We serve Airdrie, Calgary, Cochrane, Chestermere, Okotoks, Crossfield, Carstairs, Olds, and surrounding Alberta communities." },
  { question: "Are your movers licensed and insured?", answer: "Yes, Kaneo Pro Movers is fully licensed and insured. Your belongings are protected throughout the entire moving process." },
  { question: "How do I get a free moving quote?", answer: "You can get a free quote by calling +1(587)-378-5954, emailing info@kaneopromovers.com, or filling out our online quote form. We respond within 2 hours." },
];

const aboutBullets = [
  "Licensed and insured professional movers",
  "Transparent pricing — no hidden fees",
  "Careful handling of all your belongings",
  "Same-day and last-minute service available",
  "Serving Airdrie, Calgary & surrounding areas",
  "Friendly, experienced, and punctual crew",
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <FAQSchema faqs={homeFaqs} />

      {/* 1. Hero */}
      <HeroSlider />

      {/* 2. Services Grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Our Moving Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((s) => (
              <div
                key={s.title}
                className="group rounded-lg border border-border bg-surface p-6 transition-all hover:border-l-4 hover:border-l-primary hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
                <Link
                  href="/moving-services"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About */}
      <section className="border-t border-border bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Know About Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-primary md:text-4xl">
              What Drives Us To Deliver Excellence!
            </h2>
            <p className="mt-6 text-text-secondary">
              Kaneo Pro Movers is a trusted local moving company based in Airdrie, Alberta. We provide
              professional residential and commercial moving services across Airdrie, Calgary, and
              surrounding communities. Our team is dedicated to making every move stress-free with
              careful handling, transparent pricing, and exceptional customer service.
            </p>
            <ul className="mt-6 space-y-3">
              {aboutBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-text-secondary">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary-hover"
            >
              About Us
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/images/about.jpg"
              alt="Kaneo Pro Movers team"
              width={600}
              height={450}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 4. Stats */}
      <section className="bg-primary py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto h-8 w-8 text-black" />
              <p className="mt-3 font-display text-3xl font-bold text-black md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium text-black/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quick Quote */}
      <section className="border-b border-t border-border bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                Get Your Free Moving Quote
              </h2>
              <p className="mt-4 text-text-secondary">
                Tell us about your move and we&apos;ll provide a free, no-obligation estimate.
                Our team responds within 2 hours.
              </p>
              <Image
                src="/images/quote-img.jpg"
                alt="Moving quote"
                width={500}
                height={350}
                className="mt-8 hidden rounded-xl md:block"
              />
            </div>
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <QuickQuoteWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cities */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Cities We Serve
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {citiesList.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="rounded-lg border border-border bg-surface p-5 text-center transition hover:border-primary/30 hover:shadow-md"
              >
                <p className="font-display text-lg font-semibold text-text-primary">{c.name}</p>
                <span className="mt-1 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  AB
                </span>
                <p className="mt-2 text-xs text-primary hover:underline">View Services →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Google Reviews */}
      <GoogleReviews />

      {/* 8. FAQ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          </div>
          <div className="mt-12">
            <FAQAccordion faqs={homeFaqs} />
          </div>
        </div>
      </section>

      {/* 9. CTA Banner */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-black md:text-3xl">
            Ready To Move? Get Your Free Quote Today!
          </h2>
          <p className="mt-3 text-black/80">
            Serving Airdrie, Calgary, and all of Alberta
          </p>
          <Link
            href="/quote"
            className="mt-6 inline-block rounded-md bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Get Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
