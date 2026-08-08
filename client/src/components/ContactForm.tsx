import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ sourcePage = "/contact" }: { sourcePage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourcePage }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending that — please email info@prama-ai.com directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border hairline bg-ink-2 p-8 text-center">
        <p className="font-display text-2xl text-paper">Message received.</p>
        <p className="mt-2 text-sm text-slate">
          Thanks for reaching out — we reply to every enquiry within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" />
        <div>
          <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-dim">
            I'm interested in
          </label>
          <select
            name="interest"
            className="w-full rounded-lg border hairline bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-teal"
          >
            <option value="consulting">Data & AI consulting</option>
            <option value="product">A specific product</option>
            <option value="partnership">Partnership</option>
            <option value="careers">Careers</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-dim">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about the problem you're solving."
          className="w-full rounded-lg border hairline bg-ink px-4 py-3 text-sm text-paper outline-none placeholder:text-slate-dim/70 focus:border-teal"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-brass px-7 py-3 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && <p className="text-sm text-danger">{errorMsg}</p>}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-dim">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border hairline bg-ink px-4 py-3 text-sm text-paper outline-none placeholder:text-slate-dim/70 focus:border-teal"
      />
    </div>
  );
}
