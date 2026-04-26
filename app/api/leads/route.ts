import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/getSession";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const city = url.searchParams.get("city");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    const where = {
      ...(status && { status: status as "PENDING" | "REVIEWED" | "QUOTED" | "BOOKED" | "COMPLETED" | "CANCELLED" }),
      ...(city && { fromCity: { contains: city, mode: "insensitive" as const } }),
    };

    const [quotes, total] = await Promise.all([
      prisma.quote.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.quote.count({ where }),
    ]);

    return NextResponse.json({ quotes, total, page, limit });
  } catch (error) {
    console.error("Leads GET error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
