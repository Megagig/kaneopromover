"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const inputClass =
  "w-full rounded-md border border-border bg-surface-2 p-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      reset();
      // GA4 conversion tracking
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "contact_form_submitted", {
          event_category: "conversion",
          event_label: "contact_form_success",
        });
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">
          Message Sent!
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          We&apos;ll get back to you within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-text-primary">
            Name *
          </label>
          <input
            id="c-name"
            type="text"
            placeholder="Your name"
            className={inputClass}
            {...register("name", { required: "Required" })}
          />
          {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-text-primary">
            Email *
          </label>
          <input
            id="c-email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register("email", {
              required: "Required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
          />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="mb-1 block text-sm font-medium text-text-primary">
            Phone
          </label>
          <input
            id="c-phone"
            type="tel"
            placeholder="+1 (587) 000-0000"
            className={inputClass}
            {...register("phone")}
          />
        </div>
        <div>
          <label htmlFor="c-subject" className="mb-1 block text-sm font-medium text-text-primary">
            Subject *
          </label>
          <input
            id="c-subject"
            type="text"
            placeholder="Moving inquiry"
            className={inputClass}
            {...register("subject", { required: "Required" })}
          />
          {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-text-primary">
          Message *
        </label>
        <textarea
          id="c-message"
          rows={5}
          placeholder="Tell us about your move..."
          className={inputClass}
          {...register("message", { required: "Required" })}
        />
        {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
      </div>

      {error && <div className="rounded-md bg-error/10 p-4 text-sm text-error">{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary-hover disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </button>
    </form>
  );
}
