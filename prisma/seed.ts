import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("Admin@2024!", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@kaneopromovers.com" },
    update: {},
    create: {
      email: "admin@kaneopromovers.com",
      password: hashedPassword,
      name: "Kaneo Admin",
      role: "admin",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  const pricingTiers = [
    { label: "1 Bedroom Apartment", basePrice: 299, hourlyRate: 85, minHours: 2 },
    { label: "2 Bedroom Apartment", basePrice: 399, hourlyRate: 95, minHours: 3 },
    { label: "3 Bedroom Apartment", basePrice: 499, hourlyRate: 105, minHours: 4 },
    { label: "4 Bedroom Apartment", basePrice: 599, hourlyRate: 115, minHours: 4 },
    { label: "1 Bedroom House", basePrice: 349, hourlyRate: 90, minHours: 2 },
    { label: "2 Bedroom House", basePrice: 449, hourlyRate: 100, minHours: 3 },
    { label: "3 Bedroom House", basePrice: 599, hourlyRate: 115, minHours: 4 },
    { label: "4 Bedroom House", basePrice: 749, hourlyRate: 130, minHours: 5 },
    { label: "1 Bedroom Basement", basePrice: 299, hourlyRate: 85, minHours: 2 },
    { label: "2 Bedroom Basement", basePrice: 399, hourlyRate: 95, minHours: 3 },
    { label: "Commercial", basePrice: 799, hourlyRate: 150, minHours: 4 },
  ];

  for (const tier of pricingTiers) {
    const existing = await prisma.pricing.findFirst({ where: { label: tier.label } });
    if (existing) {
      await prisma.pricing.update({ where: { id: existing.id }, data: tier });
    } else {
      await prisma.pricing.create({ data: tier });
    }
  }
  console.log(`✅ ${pricingTiers.length} pricing tiers seeded`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
