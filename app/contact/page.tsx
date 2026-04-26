import { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Contact Kaneo Pro Movers | Airdrie & Calgary Movers",
  description:
    "Contact Kaneo Pro Movers for a free moving quote. Call +1(587)-378-5954 or email info@kaneopromovers.com. Serving Airdrie, Calgary, and Alberta.",
  alternates: { canonical: "https://www.kaneopromovers.com/contact" },
  openGraph: {
    title: "Contact Kaneo Pro Movers | Airdrie & Calgary Movers",
    description: "Contact Kaneo Pro Movers for a free moving quote. Call +1(587)-378-5954.",
    url: "https://www.kaneopromovers.com/contact",
  },
};

const infoCards = [
  {
    icon: MapPin,
    title: "Our Location",
    line1: "1060 Channelside DR, SW",
    line2: "Airdrie, AB, Canada",
  },
  {
    icon: Phone,
    title: "Phone",
    line1: "+1(587)-378-5954",
    line2: "Mon–Fri 8am–6pm, Sat 8am–4pm",
    href: "tel:+15873785954",
  },
  {
    icon: Mail,
    title: "Email",
    line1: "info@kaneopromovers.com",
    line2: "We respond within 2 hours",
    href: "mailto:info@kaneopromovers.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              24/7 Customer Service and Fast Response
            </h1>
            <p className="mt-3 text-text-secondary">
              Get in touch with Kaneo Pro Movers. We&apos;re here to help with your move.
            </p>
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {infoCards.map((card) => {
              const Wrapper = card.href ? "a" : "div";
              const wrapperProps = card.href
                ? { href: card.href, "aria-label": card.title }
                : {};
              return (
                <Wrapper
                  key={card.title}
                  {...wrapperProps}
                  className="rounded-lg border border-border bg-surface p-6 text-center transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">{card.line1}</p>
                  <p className="text-xs text-text-muted">{card.line2}</p>
                </Wrapper>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="mx-auto mt-16 max-w-2xl">
            <h2 className="text-center font-display text-2xl font-bold text-text-primary">
              Send Us a Message
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
