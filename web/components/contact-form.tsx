"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InquiryCaptchaField } from "@/components/inquiry-captcha-field";

/** 阶段五：精简为 公司、姓名、电话、邮箱、简要需求 */
export function ContactForm({ companyName }: { companyName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const company = (form.querySelector("#company") as HTMLInputElement)?.value?.trim() ?? "";
    const name = (form.querySelector("#name") as HTMLInputElement)?.value?.trim() ?? "";
    const phone = (form.querySelector("#phone") as HTMLInputElement)?.value?.trim() ?? "";
    const email = (form.querySelector("#email") as HTMLInputElement)?.value?.trim() ?? "";
    const message = (form.querySelector("#message") as HTMLInputElement)?.value?.trim() ?? "";
    const formData = new FormData(form);

    if (!email || !message) {
      toast.error("Please fill in email and brief requirements.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "—",
          email,
          phone: phone || undefined,
          company: company || undefined,
          message,
          captchaScope: String(formData.get("captchaScope") ?? ""),
          captchaToken: String(formData.get("captchaToken") ?? ""),
          captchaAnswer: String(formData.get("captchaAnswer") ?? ""),
          sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setCaptchaRefreshKey((current) => current + 1);
        toast.error(data.error || "Submission failed. Please try again.");
        return;
      }
      toast.success("Inquiry sent. We'll get back to you within 24 hours.");
      form.reset();
      setCaptchaRefreshKey((current) => current + 1);
    } catch {
      setCaptchaRefreshKey((current) => current + 1);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input id="company" name="company" placeholder="Your Company Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="Your Name" required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+86 138 0000 0000" />
        </div>
      </div>

      <div className="space-y-2" id="engineer">
        <Label htmlFor="message">Brief Requirements *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="e.g. Part type, feed rate, application (get quote / talk to engineer / support)"
          rows={4}
          required
        />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="consent" name="consent" className="mt-1" required />
        <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal">
          I agree to receive communications from {companyName}. You can unsubscribe at any time.
        </Label>
      </div>

      <InquiryCaptchaField refreshKey={captchaRefreshKey} />

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold rounded-none"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
