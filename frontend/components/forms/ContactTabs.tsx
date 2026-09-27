"use client";

import { useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

type Tab = "enquiry" | "consultation";

export function ContactTabs() {
  const [tab, setTab] = useState<Tab>("enquiry");

  return (
    <div>
      <div role="tablist" aria-label="Contact options" className="flex gap-2 border-b border-border">
        {(
          [
            { id: "enquiry", label: "Project Enquiry" },
            { id: "consultation", label: "Book a Consultation" },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            id={`tab-${option.id}`}
            aria-selected={tab === option.id}
            aria-controls={`panel-${option.id}`}
            onClick={() => setTab(option.id)}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              tab === option.id
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div
        id="panel-enquiry"
        role="tabpanel"
        aria-labelledby="tab-enquiry"
        hidden={tab !== "enquiry"}
        className="pt-6"
      >
        <ContactForm />
      </div>
      <div
        id="panel-consultation"
        role="tabpanel"
        aria-labelledby="tab-consultation"
        hidden={tab !== "consultation"}
        className="pt-6"
      >
        <ConsultationForm />
      </div>
    </div>
  );
}
