export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  /** Awarding body, when different from the institution. */
  awarding?: string | null;
  /** Display string — only set when the dates are verified. */
  period?: string;
  status?: "Pursuing" | "Completed";
  description: string;
};

/**
 * Both entries below were carried over from the original portfolio, which
 * you authored (degree period "2023 – Present", A-Level year "2022").
 * Update or blank the `period` fields here if anything needs correcting —
 * dates render only when present.
 */
export const education: EducationEntry[] = [
  {
    id: "bsc",
    degree: "BSc (Hons) Computer Science",
    institution: "APIIT Sri Lanka",
    awarding: "Awarded by Staffordshire University",
    period: "2023 – Present",
    status: "Pursuing",
    description:
      "Pursuing a BSc (Hons) in Computer Science with a focus on software engineering, web development, and modern software practices — building practical projects alongside my studies.",
  },
  {
    id: "alevel",
    degree: "G.C.E. Advanced Level",
    institution: "Combined Mathematics Stream",
    period: "2022",
    status: "Completed",
    description:
      "Completed Advanced Level studies with a strong foundation in mathematics and analytical problem solving.",
  },
];
