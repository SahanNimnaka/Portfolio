export type Achievement = {
  id: string;
  title: string;
  category:
    | "Academic"
    | "Competition"
    | "Certificate"
    | "Workshop"
    | "Extracurricular"
    | "Technical";
  /** Issuer, host, or organising body. */
  organization?: string;
  /** Display string, e.g. "Aug 2025" — only set when verified. */
  date?: string;
  description?: string;
  /** Link to credential, repository, or proof. */
  url?: string;
};

/**
 * Verified achievements, competitions, certificates, workshops, and
 * extracurricular activities go here — the section renders nothing while
 * this list is empty, so there are never placeholder cards.
 *
 * Example entry:
 *
 *   {
 *     id: "web-dev-certificate",
 *     title: "Web Development Fundamentals",
 *     category: "Certificate",
 *     organization: "Issuing organisation",
 *     date: "Aug 2025",
 *     description: "One-line description.",
 *     url: "https://credential-link",
 *   },
 *
 * Only add items you can verify with a certificate, link, or record.
 * The "Achievements" nav link and section appear automatically once at
 * least one entry exists — no component edits required.
 */
export const achievements: Achievement[] = [];
