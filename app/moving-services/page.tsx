import { Metadata } from "next";
import Link from "next/link";
import { Home, Building, Package, Truck, Zap, Shield, Clock, Warehouse } from "lucide-react";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Moving Services | Residential, Furniture & Local Movers | Kaneo Pro",
  description:
    "Professional moving services in Airdrie and Calgary. Residential, commercial, packing, loading, furniture, and long-distance moving. Get a free quote!",
  alternates: { canonical: "https://www.kaneopromovers.com/moving-services" },
  openGraph: {
    title: "Moving Services | Residential, Furniture & Local Movers | Kaneo Pro",
    description: "Professional moving services in Airdrie and Calgary. Residential, commercial, packing, and more.",
    url: "https://www.kaneopromovers.com/moving-services",
  },
};

const services = [
  { icon: Home, title: "Residential Moving", desc: "Full-service home moves for families and individuals. We handle packing, loading, transport, and setup at your new home with care and efficiency." },
  { icon: Building, title: "Commercial Moving", desc: "Office and business relocations with minimal downtime. We move furniture, equipment, and documents professionally and securely." },
  { icon: Package, title: "Packing & Unpacking", desc: "Expert packing with quality materials to keep your belongings safe. We also unpack and organize everything at your new location." },
  { icon: Truck, title: "Loading & Unloading", desc: "Need help with the heavy lifting? Our experienced crew handles loading and unloading quickly, safely, and affordably." },
  { icon: Home, title: "Furniture Moving", desc: "Specialized furniture moving with disassembly and reassembly. We protect every piece with blankets, straps, and careful handling." },
  { icon: Truck, title: "Local Movers", desc: "Affordable local moving within Airdrie, Calgary, and surrounding Alberta communities. Same-day service available." },
  { icon: Truck, title: "Long Distance Moving", desc: "Reliable long-distance moving across Alberta. We plan every detail to ensure your belongings arrive safely and on time." },
  { icon: Building, title: "Heavy Item Moving", desc: "Pianos, safes, appliances, and oversized furniture. Our team has the equipment and expertise to move your heaviest items." },
];

const features = [
  { icon: Zap, title: "Fast & Efficient", desc: "Our trained crew works quickly without cutting corners on safety." },
  { icon: Package, title: "Professional Packing", desc: "Quality materials and expert techniques to protect every item." },
  { icon: Shield, title: "Safe Transportation", desc: "Secure loading, padded trucks, and careful driving throughout." },
  { icon: Home, title: "Unpacking & Setup", desc: "We unpack and set up furniture so you can settle in right away." },
  { icon: Clock, title: "24/7 Support", desc: "Reach us anytime for questions, updates, or last-minute changes." },
  { icon: Warehouse, title: "Warehouse Storage", desc: "Short-term storage solutions when you need a place between moves." },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Services" }]}
      />

      {/* Hero */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Our Moving Services
          </h1>
          <p className="mt-3 text-text-secondary">
            From packing to delivery, we handle every step of your move with care.
          </p>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-lg border border-border bg-surface p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
            From Start To Finish
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-primary">{f.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-black md:text-3xl">
            Ready To Get Started?
          </h2>
          <p className="mt-3 text-black/80">
            Get your free moving quote today. No obligation, no hidden fees.
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
