import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ThumbsUp, Star, Users, Clock } from "lucide-react";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import AboutTabs from "@/components/sections/AboutTabs";

export const metadata: Metadata = {
  title: "About Kaneo Pro Movers | Airdrie & Calgary Moving Company",
  description:
    "Learn about Kaneo Pro Movers — trusted movers in Airdrie and Calgary, AB. Licensed, insured, and committed to stress-free moving experiences.",
  alternates: { canonical: "https://www.kaneopromovers.com/about" },
  openGraph: {
    title: "About Kaneo Pro Movers | Airdrie & Calgary Moving Company",
    description: "Learn about Kaneo Pro Movers — trusted movers in Airdrie and Calgary, AB.",
    url: "https://www.kaneopromovers.com/about",
    images: [{ url: "/images/about.jpg" }],
  },
};

const stats = [
  { icon: ThumbsUp, value: "99%", label: "Customer Satisfaction" },
  { icon: Star, value: "5-Star", label: "Rating" },
  { icon: Users, value: "100+", label: "Happy Customers" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const whyPoints = [
  "Licensed and insured professional movers",
  "Transparent pricing with no hidden fees",
  "Careful handling of furniture and fragile items",
  "Same-day and last-minute moving available",
  "Friendly, experienced, and punctual crew",
  "Serving Airdrie, Calgary & all of Alberta",
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "About Us" }]}
      />

      {/* Hero */}
      <section className="relative flex h-[50vh] min-h-[350px] items-center justify-center overflow-hidden md:h-[55vh]">
        <Image
          src="/images/about.jpg"
          alt="About Kaneo Pro Movers"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Know About Us
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl">
            About Kaneo Pro Movers
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 md:grid-cols-2 md:items-start lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Reliable And Express Moving Services
            </h2>
            <div className="mt-6 space-y-4 text-text-secondary">
              <p>
                Kaneo Pro Movers is a trusted local moving company based in Airdrie, Alberta. We
                specialize in residential and commercial moving services across Airdrie, Calgary,
                and surrounding communities. Our mission is simple: to make every move stress-free,
                affordable, and professional.
              </p>
              <p>
                Founded with a commitment to honest pricing and exceptional service, we have grown
                to become one of the most reliable moving companies in central Alberta. Our team of
                experienced movers treats every item as if it were their own, ensuring safe
                transportation from start to finish.
              </p>
              <p>
                Whether you need a full-service move with packing and unpacking, help with heavy
                furniture, or a simple loading and unloading service, Kaneo Pro Movers has you
                covered. We serve Airdrie, Calgary, Cochrane, Chestermere, Okotoks, Crossfield,
                Carstairs, and Olds.
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              {whyPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-text-secondary">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {p}
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
          <div>
            <Image
              src="/images/about.jpg"
              alt="Kaneo Pro Movers team at work"
              width={600}
              height={450}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-t border-border bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
            Why Choose Us
          </h2>
          <div className="mt-12">
            <AboutTabs />
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
            Ready To Move?
          </h2>
          <p className="mt-3 text-text-secondary">
            Get your free moving quote today. Serving Airdrie, Calgary, and all of Alberta.
          </p>
          <Link
            href="/quote"
            className="mt-6 inline-block rounded-md bg-primary px-8 py-3 font-semibold text-black transition hover:bg-primary-hover"
          >
            Get Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
