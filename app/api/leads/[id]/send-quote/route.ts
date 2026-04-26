import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/getSession";
import { sendCustomerQuoteEmail } from "@/lib/email/resend";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: RouteParams) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;

    const quote = await prisma.quote.findUnique({ where: { id } });
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const pricing = await prisma.pricing.findFirst({
      where: { label: quote.bedroomTypeFrom, isActive: true },
    });

    const estimatedPrice = pricing
      ? pricing.basePrice + pricing.hourlyRate * pricing.minHours
      : quote.estimatedPrice || 299;

    await sendCustomerQuoteEmail(quote, estimatedPrice);

    await prisma.quote.update({
      where: { id },
      data: { status: "QUOTED", estimatedPrice },
    });

    return NextResponse.json({ success: true, estimatedPrice });
  } catch (error) {
    console.error("Send quote error:", error);
    return NextResponse.json({ error: "Failed to send quote" }, { status: 500 });
  }
}
