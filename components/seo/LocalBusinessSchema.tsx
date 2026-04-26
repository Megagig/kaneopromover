interface LocalBusinessSchemaProps {
  city?: string;
}

export default function LocalBusinessSchema({ city = "Airdrie" }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Kaneo Pro Movers",
    image: "https://www.kaneopromovers.com/images/logo-dark.png",
    url: "https://www.kaneopromovers.com",
    telephone: "+15873785954",
    email: "info@kaneopromovers.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1060 Channelside DR, SW",
      addressLocality: city,
      addressRegion: "AB",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.2917,
      longitude: -114.0144,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
    ],
    areaServed: ["Airdrie", "Calgary", "Cochrane", "Chestermere", "Okotoks", "Crossfield", "Carstairs", "Olds"],
    priceRange: "$$",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "100" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
