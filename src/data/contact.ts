/**
 * Single source of truth for contact and résumé details.
 * Used by the Contact section, Hero, and Footer — edit here only.
 *
 * `email` and the profile URLs were already present in this project;
 * nothing here has been invented.
 *
 * How to connect your real résumé:
 *  1. Put a healthy PDF at `public/resume.pdf` (the file currently in the
 *     repository is encoding-damaged, so it is deliberately NOT linked
 *     anywhere in the site).
 *  2. Change `resumePath` below from `null` to `"/resume.pdf"`.
 * The Contact placeholder and the Hero button will automatically turn
 * into a working download link.
 */
export interface ContactInfo {
  /** Primary contact address (already present in the project). */
  email: string;
  linkedin: string;
  github: string;
  /** Set to e.g. `"/resume.pdf"` once a valid PDF exists in `public/`. */
  resumePath: string | null;
}

export const contact: ContactInfo = {
  email: "nimnakasahan6@gmail.com",
  linkedin: "https://www.linkedin.com/in/sahan-pinnagaspitiya-931042325",
  github: "https://github.com/sahan721",
  resumePath: null,
};
