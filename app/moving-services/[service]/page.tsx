import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { services } from "@/lib/data/serviceData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = services.find((s) => s.slug === service);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://www.kaneopromovers.com/moving-services/${data.slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://www.kaneopromovers.com/moving-services/${data.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = services.find((s) => s.slug === service);
  if (!data) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/moving-services" },
          { name: data.title },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                {data.h1}
              </h1>
              <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
                {data.description.split(". ").reduce((acc: string[], _sentence, i, arr) => {
                  if (i % 3 === 0) acc.push(arr.slice(i, i + 3).join(". ") + (i + 3 < arr.length ? "." : ""));
                  return acc;
                }, []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h2 className="mt-10 font-display text-2xl font-bold text-text-primary">
                What&apos;s Included
              </h2>
              <ul className="mt-4 space-y-3">
                {data.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/quote"
                className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-semibold text-black transition hover:bg-primary-hover"
              >
                Get Free Quote →
              </Link>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Quick Links */}
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="font-display font-semibold text-text-primary">All Services</h3>
                  <ul className="mt-3 space-y-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/moving-services/${s.slug}`}
                          className={`block rounded-md px-3 py-2 text-sm transition ${
                            s.slug === data.slug
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                          }`}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Widget */}
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                  <h3 className="font-display font-semibold text-text-primary">
                    Need This Service?
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    Get a free, no-obligation quote today.
                  </p>
                  <Link
                    href="/quote"
                    className="mt-4 block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-primary-hover"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+15873785954"
                    className="mt-2 block text-center text-sm font-medium text-primary"
                  >
                    or call +1(587)-378-5954
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
