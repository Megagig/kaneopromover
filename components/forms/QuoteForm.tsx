"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

const bedroomOptions = [
  "1 Bedroom Apartment", "2 Bedroom Apartment", "3 Bedroom Apartment", "4 Bedroom Apartment",
  "1 Bedroom House", "2 Bedroom House", "3 Bedroom House", "4 Bedroom House",
  "1 Bedroom Basement", "2 Bedroom Basement", "Commercial",
];

interface QuoteFormData {
  bedroomTypeFrom: string;
  bedroomTypeTo: string;
  movingDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fromAddress: string;
  toAddress: string;
  fromCity: string;
  toCity: string;
  notes: string;
}

const inputClass =
  "w-full rounded-md border border-border bg-surface-2 p-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none";

export default function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      bedroomTypeFrom: searchParams.get("from") || "",
      bedroomTypeTo: searchParams.get("to") || "",
      movingDate: searchParams.get("date") || "",
      fromCity: searchParams.get("city") || "",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit quote");
      router.push("/success");
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Section 1 */}
      <fieldset>
        <legend className="font-display text-lg font-semibold text-text-primary">
          About Your Move
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bedroomTypeFrom" className="mb-1 block text-sm font-medium text-text-primary">
              Moving From *
            </label>
            <select
              id="bedroomTypeFrom"
              className={inputClass}
              {...register("bedroomTypeFrom", { required: "Required" })}
            >
              <option value="">Select type</option>
              {bedroomOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.bedroomTypeFrom && (
              <p className="mt-1 text-xs text-error">{errors.bedroomTypeFrom.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="bedroomTypeTo" className="mb-1 block text-sm font-medium text-text-primary">
              Moving To *
            </label>
            <select
              id="bedroomTypeTo"
              className={inputClass}
              {...register("bedroomTypeTo", { required: "Required" })}
            >
              <option value="">Select type</option>
              {bedroomOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.bedroomTypeTo && (
              <p className="mt-1 text-xs text-error">{errors.bedroomTypeTo.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="movingDate" className="mb-1 block text-sm font-medium text-text-primary">
            Moving Date *
          </label>
          <input
            id="movingDate"
            type="date"
            min={today}
            className={inputClass}
            {...register("movingDate", { required: "Required" })}
          />
          {errors.movingDate && (
            <p className="mt-1 text-xs text-error">{errors.movingDate.message}</p>
          )}
        </div>
      </fieldset>

      {/* Section 2 */}
      <fieldset>
        <legend className="font-display text-lg font-semibold text-text-primary">
          Your Details
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-text-primary">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className={inputClass}
              {...register("firstName", { required: "Required" })}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-error">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-text-primary">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              className={inputClass}
              {...register("lastName", { required: "Required" })}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-error">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-primary">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={inputClass}
              {...register("email", {
                required: "Required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text-primary">
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 (587) 000-0000"
              className={inputClass}
              {...register("phone", { required: "Required" })}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 3 */}
      <fieldset>
        <legend className="font-display text-lg font-semibold text-text-primary">
          Addresses
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fromAddress" className="mb-1 block text-sm font-medium text-text-primary">
              From Address *
            </label>
            <input
              id="fromAddress"
              type="text"
              placeholder="123 Main St"
              className={inputClass}
              {...register("fromAddress", { required: "Required" })}
            />
          </div>
          <div>
            <label htmlFor="toAddress" className="mb-1 block text-sm font-medium text-text-primary">
              To Address *
            </label>
            <input
              id="toAddress"
              type="text"
              placeholder="456 Oak Ave"
              className={inputClass}
              {...register("toAddress", { required: "Required" })}
            />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fromCity" className="mb-1 block text-sm font-medium text-text-primary">
              From City *
            </label>
            <input
              id="fromCity"
              type="text"
              placeholder="Airdrie"
              className={inputClass}
              {...register("fromCity", { required: "Required" })}
            />
          </div>
          <div>
            <label htmlFor="toCity" className="mb-1 block text-sm font-medium text-text-primary">
              To City *
            </label>
            <input
              id="toCity"
              type="text"
              placeholder="Calgary"
              className={inputClass}
              {...register("toCity", { required: "Required" })}
            />
          </div>
        </div>
      </fieldset>

      {/* Section 4 */}
      <fieldset>
        <legend className="font-display text-lg font-semibold text-text-primary">
          Additional Info
        </legend>
        <div className="mt-4">
          <label htmlFor="notes" className="mb-1 block text-sm font-medium text-text-primary">
            Notes / Special Requests
          </label>
          <textarea
            id="notes"
            rows={4}
            placeholder="Any special items, stairs, timing preferences..."
            className={inputClass}
            {...register("notes")}
          />
        </div>
      </fieldset>

      {error && (
        <div className="rounded-md bg-error/10 p-4 text-sm text-error">{error}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary-hover disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Get My Free Quote →
      </button>
    </form>
  );
}
