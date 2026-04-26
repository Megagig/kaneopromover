import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/db/prisma";
import {
  sendCustomerQuoteEmail,
  sendAdminQuoteNotification,
} from "@/lib/email/resend";

const quoteSchema = z.object({
  bedroomTypeFrom: z.string().min(1),
  bedroomTypeTo: z.string().min(1),
  movingDate: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  fromAddress: z.string().min(1),
  toAddress: z.string().min(1),
  fromCity: z.string().min(1),
  toCity: z.string().min(1),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Fetch pricing for the bedroom type
    const pricing = await prisma.pricing.findFirst({
      where: { label: data.bedroomTypeFrom, isActive: true },
    });

    const estimatedPrice = pricing
      ? pricing.basePrice + pricing.hourlyRate * pricing.minHours
      : 299; // fallback

    // Save quote to DB
    const quote = await prisma.quote.create({
      data: {
        bedroomTypeFrom: data.bedroomTypeFrom,
        bedroomTypeTo: data.bedroomTypeTo,
        movingDate: new Date(data.movingDate),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        fromAddress: data.fromAddress,
        toAddress: data.toAddress,
        fromCity: data.fromCity,
        toCity: data.toCity,
        notes: data.notes || null,
        source: data.source || null,
        status: "PENDING",
        estimatedPrice,
      },
    });

    // Send emails (don't block response on email failures)
    const emailData = { ...data, movingDate: new Date(data.movingDate) };
    await Promise.allSettled([
      sendCustomerQuoteEmail(emailData, estimatedPrice),
      sendAdminQuoteNotification(emailData, estimatedPrice),
    ]);

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      estimatedPrice,
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote" },
      { status: 500 }
    );
  }
}
