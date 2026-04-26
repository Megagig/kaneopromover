import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/getSession";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const { basePrice, hourlyRate, minHours, isActive } = body;

    const pricing = await prisma.pricing.update({
      where: { id },
      data: {
        ...(basePrice !== undefined && { basePrice }),
        ...(hourlyRate !== undefined && { hourlyRate }),
        ...(minHours !== undefined && { minHours }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Pricing PATCH error:", error);
    return NextResponse.json({ error: "Failed to update pricing" }, { status: 500 });
  }
}
