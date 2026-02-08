"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const inquiryTypes = [
  { value: "quote", label: "Request a Quote" },
  { value: "engineer", label: "Talk to an Engineer" },
  { value: "support", label: "Technical Support" },
  { value: "partnership", label: "Partnership Inquiry" },
] as const;

export function ContactForm({ companyName }: { companyName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = [
      (form.querySelector("#firstName") as HTMLInputElement)?.value?.trim(),
      (form.querySelector("#lastName") as HTMLInputElement)?.value?.trim(),
    ]
      .filter(Boolean)
      .join(" ");
    const email = (form.querySelector("#email") as HTMLInputElement)?.value?.trim() ?? "";
    const phone = (form.querySelector("#phone") as HTMLInputElement)?.value?.trim() ?? "";
    const company = (form.querySelector("#company") as HTMLInputElement)?.value?.trim() ?? "";
    const message = (form.querySelector("#message") as HTMLInputElement)?.value?.trim() ?? "";

    if (!email || !message) {
      toast.error("Please fill in email and message.");
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
          sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error || "Submission failed. Please try again.");
        return;
      }
      toast.success("Inquiry sent. We'll get back to you within 24 hours.");
      form.reset();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" name="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" name="lastName" placeholder="Smith" required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input id="company" name="company" placeholder="Your Company Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input id="country" name="country" placeholder="United States" required />
        </div>
      </div>

      <div className="space-y-2" id="engineer">
        <Label htmlFor="inquiryType">Inquiry Type *</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            {inquiryTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automotive">Automotive</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="medical">Medical Devices</SelectItem>
            <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
            <SelectItem value="consumer">Consumer Goods</SelectItem>
            <SelectItem value="hardware">Hardware & Fasteners</SelectItem>
            <SelectItem value="food">Food & Beverage</SelectItem>
            <SelectItem value="aerospace">Aerospace</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="partDescription">Part Description</Label>
        <Input id="partDescription" name="partDescription" placeholder="Describe the parts you need to feed" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project requirements, feed rate needs, and any special considerations..."
          rows={5}
          required
        />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="consent" name="consent" className="mt-1" required />
        <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal">
          I agree to receive communications from {companyName}. You can unsubscribe at any time.
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
