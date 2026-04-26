import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const pricing = await prisma.pricing.findMany({
      where: { isActive: true },
      orderBy: { basePrice: "asc" },
    });
    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}
