interface LocalBusinessSchemaProps {
  city?: string;
}

export default function LocalBusinessSchema({ city = "Airdrie" }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Kaneo Pro Movers",
    image: "https://www.kaneopromovers.com/images/logo-dark.png",
    logo: "https://www.kaneopromovers.com/images/logo-dark.png",
    url: "https://www.kaneopromovers.com",
    telephone: "+15873785954",
    email: "info@kaneopromovers.com",
    description:
      "Professional residential and commercial moving services in Airdrie, Calgary, and surrounding Alberta communities. Licensed, insured, and trusted movers.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1060 Channelside DR, SW",
      addressLocality: city,
      addressRegion: "AB",
      postalCode: "T4B 3S7",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.2917,
      longitude: -114.0144,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Airdrie", "@id": "https://www.kaneopromovers.com/locations/airdrie" },
      { "@type": "City", name: "Calgary", "@id": "https://www.kaneopromovers.com/locations/calgary" },
      { "@type": "City", name: "Cochrane", "@id": "https://www.kaneopromovers.com/locations/cochrane" },
      { "@type": "City", name: "Chestermere", "@id": "https://www.kaneopromovers.com/locations/chestermere" },
      { "@type": "City", name: "Okotoks", "@id": "https://www.kaneopromovers.com/locations/okotoks" },
      { "@type": "City", name: "Crossfield", "@id": "https://www.kaneopromovers.com/locations/crossfield" },
      { "@type": "City", name: "Carstairs", "@id": "https://www.kaneopromovers.com/locations/carstairs" },
      { "@type": "City", name: "Olds", "@id": "https://www.kaneopromovers.com/locations/olds" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Moving" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Moving" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Packing and Unpacking" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Loading and Unloading" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heavy Item Moving" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Furniture Moving" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local Moving" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Long Distance Moving" } },
      ],
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "100",
    },
    sameAs: [
      "https://www.facebook.com/kaneopromovers",
      "https://www.instagram.com/kaneopromovers",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
