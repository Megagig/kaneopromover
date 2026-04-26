import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Home, Building, Package, Truck } from "lucide-react";
import type { CityData } from "@/lib/data/cityData";
import { cities } from "@/lib/data/cityData";

const serviceCards = [
  { icon: Home, title: "Residential Moving", desc: "Full-service home moves for families and individuals. We handle everything from packing to setup." },
  { icon: Building, title: "Commercial Moving", desc: "Office and business relocations with minimal downtime. Professional handling of equipment and furniture." },
  { icon: Package, title: "Packing & Unpacking", desc: "Expert packing with quality materials to keep your belongings safe during transit." },
  { icon: Truck, title: "Loading & Unloading", desc: "Need help with the heavy lifting? Our crew handles loading and unloading efficiently." },
];

interface CityPageProps {
  cityData: CityData;
}

export default function CityPage({ cityData }: CityPageProps) {
  const nearby = cities.filter((c) => cityData.nearbyAreas.includes(c.city));
  const otherCities = cities.filter((c) => c.slug !== cityData.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden">
        <Image
          src={cityData.heroImage}
          alt={`Moving services in ${cityData.city}`}
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Ready To Move in {cityData.city}?
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            {cityData.h1}
          </h1>
          <Link
            href="/quote"
            className="mt-6 inline-block rounded-md bg-primary px-8 py-3 font-semibold text-black transition hover:bg-primary-hover"
          >
            Get A Quote →
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
              Moving Services in {cityData.city}, {cityData.province}
            </h2>
            <div className="mt-6 space-y-4 text-text-secondary">
              {cityData.bodyText.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary">
              Why Choose Kaneo Pro Movers?
            </h3>
            <ul className="mt-6 space-y-3">
              {cityData.whyChooseUs.map((item) => (
                <li key={item} className="flex items-start gap-3 text-text-secondary">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/quote"
              className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary-hover"
            >
              Get Free Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-text-primary md:text-3xl">
            Our Services in {cityData.city}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((s) => (
              <div
                key={s.title}
                className="rounded-lg border border-border bg-background p-6 transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
                <Link href="/moving-services" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {nearby.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
              Also Serving Near {cityData.city}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/locations/${c.slug}`}
                  className="rounded-lg border border-border bg-surface p-5 transition hover:border-primary/30 hover:shadow-md"
                >
                  <p className="font-display font-semibold text-text-primary">{c.city}</p>
                  <span className="text-xs text-text-muted">{c.province}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cities */}
      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-display text-lg font-semibold text-text-primary">
            All Service Areas
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm text-text-secondary transition hover:border-primary hover:text-primary"
              >
                {c.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-black md:text-3xl">
            Ready To Move in {cityData.city}?
          </h2>
          <p className="mt-3 text-black/80">
            Get your free moving quote today. Serving {cityData.city} and all of Alberta.
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
