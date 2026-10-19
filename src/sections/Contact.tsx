"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Loader2,
  Mail,
  Send,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GithubMark from "@/components/ui/GithubMark";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { contact } from "@/data/contact";

type Status = "idle" | "sending" | "success" | "error";
type FieldKey = "name" | "email" | "message";

interface FormValues {
  name: string;
  email: string;
  message: string;
  botField: string;
}

type FieldErrors = Partial<Record<FieldKey, string>>;

const FIELDS: FieldKey[] = ["name", "email", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
  botField: "",
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email))
    errors.email =
      "Please enter a valid email address, for example name@example.com.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}

function buildMailto(values: FormValues) {
  const subject = encodeURIComponent(
    `Portfolio enquiry from ${values.name.trim() || "a visitor"}`,
  );
  const body = encodeURIComponent(
    `${values.message.trim()}\n\n---\nReply to: ${values.email.trim()}\nSent from the portfolio contact form.`,
  );
  return `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

const inputBase =
  "w-full rounded-xl border border-border-control bg-background px-4 py-3 text-foreground placeholder:text-muted transition-colors duration-150 focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-danger";

const submitBase =
  "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-on-primary press hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60";

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const busy = status === "sending";

  const reduce = useReducedMotion() ?? false;

  // Reduced motion: show immediately with zero duration (framer pattern
  // shared with About/Skills/Projects — hooks stay unconditional).
  const group: Variants = reduce
    ? { show: { transition: { staggerChildren: 0 } } }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      };

  const reveal: Variants = reduce
    ? { show: { opacity: 1, y: 0, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const revealProps = reduce
    ? ({ initial: false, animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.15 },
      } as const);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function setValue(key: FieldKey, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) {
      const nextErrors = validate(next);
      setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
    }
  }

  function blurField(key: FieldKey) {
    const nextErrors = validate(values);
    setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    // Honeypot: a human never sees this field. Do not send, and never
    // claim success for a submission we did not make.
    if (values.botField.trim() !== "") {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        "bot-field": "",
      });
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  return (
    <Section id="contact" ariaLabel="Contact">
      <Container>
        <SectionTitle
          eyebrow="Contact"
          title="Get in Touch"
          description="Recruiters and fellow developers are welcome to get in touch. I'm currently looking for software development internship opportunities, and email is the fastest way to reach me."
        />

        <motion.div
          variants={group}
          {...revealProps}
          className="grid gap-10 lg:grid-cols-2"
        >
          {/* Ways to reach me */}
          <motion.div variants={reveal} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button href={`mailto:${contact.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Sahan
              </Button>
              <Button
                href={contact.linkedin}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInMark className="h-4 w-4" />
                LinkedIn
                <span className="sr-only"> (opens in new tab)</span>
              </Button>
              <Button
                href={contact.github}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubMark className="h-4 w-4 fill-current" />
                GitHub
                <span className="sr-only"> (opens in new tab)</span>
              </Button>
            </div>

            <div className="card p-6">
              <h3 className="mb-2 flex items-center gap-2 text-h3 font-semibold text-foreground">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                Email
              </h3>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block break-all py-1 text-muted transition-colors hover:text-primary"
                >
                  {contact.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address to clipboard"
                  className="press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border-control bg-background hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <span role="status" className="sr-only">
                {copied ? "Email address copied to clipboard." : ""}
              </span>
              {copyFailed && (
                <p className="mt-2 text-sm text-danger" role="status">
                  Copying failed — select the address to copy it manually.
                </p>
              )}
            </div>

            {contact.resumePath ? (
              <a
                href={contact.resumePath}
                download
                className="card group flex items-center gap-4 p-6 transition-colors hover:border-primary"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
                >
                  <Download className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-foreground">
                    Download Résumé
                  </span>
                  <span className="block text-sm text-muted">
                    PDF — my most recent résumé
                    <span className="sr-only"> (PDF file download)</span>
                  </span>
                </span>
              </a>
            ) : (
              <div className="card p-6" data-resume-placeholder>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
                  >
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      Download Résumé (PDF)
                    </p>
                    <p className="text-sm text-muted">
                      Being updated — email me and I&apos;ll send you the
                      latest copy.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact form — posts to Netlify Forms when deployed on Netlify;
              on failure it falls back to a prefilled mail link. */}
          <motion.div variants={reveal}>
          {status === "success" ? (
            <div
              role="status"
              tabIndex={-1}
              ref={successRef}
              className="card fade-in p-8 text-center"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-success"
              >
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-h3 font-semibold text-foreground">
                Message sent
              </h3>
              <p className="mt-2 text-muted">
                Thanks {values.name.trim()} — your message was sent
                successfully. I&apos;ll reply to{" "}
                <span className="break-all font-medium text-foreground">
                  {values.email.trim()}
                </span>{" "}
                as soon as I can.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="press mt-6 inline-flex items-center justify-center rounded-md border border-border-control px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              action="/"
              aria-label="Contact form"
              aria-busy={busy}
              noValidate
              onSubmit={handleSubmit}
              className="card p-6 sm:p-8"
            >
              <input type="hidden" name="form-name" value="contact" readOnly />

              <h3 className="text-h3 font-semibold text-foreground">
                Send a message
              </h3>
              <p className="mt-1 text-sm text-muted">
                Fill in the form and I&apos;ll get back to you by email.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Name{" "}
                    <span aria-hidden="true" className="text-danger">
                      *
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    ref={nameRef}
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    value={values.name}
                    onChange={(e) => setValue("name", e.target.value)}
                    onBlur={() => blurField("name")}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={
                      errors.name ? "name-error" : undefined
                    }
                    className={inputBase}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1.5 text-sm text-danger"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email{" "}
                    <span aria-hidden="true" className="text-danger">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => setValue("email", e.target.value)}
                    onBlur={() => blurField("email")}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    className={inputBase}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1.5 text-sm text-danger"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message{" "}
                    <span aria-hidden="true" className="text-danger">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={5000}
                    placeholder="Tell me about the role or project you'd like to discuss…"
                    value={values.message}
                    onChange={(e) => setValue("message", e.target.value)}
                    onBlur={() => blurField("message")}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${inputBase} resize-y`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1.5 text-sm text-danger"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Spam honeypot — hidden from people, sometimes filled by bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bot-field">Leave this field empty</label>
                  <input
                    id="bot-field"
                    name="bot-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.botField}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        botField: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  className="fade-in mt-5 rounded-xl border border-danger/40 bg-danger/5 p-4 text-sm"
                >
                  <p className="flex items-center gap-2 font-semibold text-danger">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Your message was not sent.
                  </p>
                  <p className="mt-1 text-muted">
                    Please try again, or{" "}
                    <a
                      href={buildMailto(values)}
                      className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
                    >
                      email me directly
                    </a>{" "}
                    — your text will be prefilled in your email app.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={busy}
                  className={submitBase}
                >
                  {busy ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-xs text-muted">
                  <span aria-hidden="true" className="text-danger">
                    *
                  </span>{" "}
                  Required fields
                </p>
              </div>
              <span role="status" className="sr-only">
                {busy ? "Sending your message…" : ""}
              </span>
            </form>
          )}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
