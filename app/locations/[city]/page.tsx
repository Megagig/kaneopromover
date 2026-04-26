import { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/city/CityPage";
import { cities } from "@/lib/data/cityData";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = cities.find((c) => c.slug === city);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: data.canonicalUrl },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: data.canonicalUrl,
      images: [{ url: data.heroImage }],
      locale: "en_CA",
      type: "website",
    },
  };
}

export default async function CityMoversPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Locations" },
          { name: cityData.city },
        ]}
      />
      <LocalBusinessSchema city={cityData.city} />
      <FAQSchema faqs={cityData.faq} />
      <CityPage cityData={cityData} />
    </>
  );
}
