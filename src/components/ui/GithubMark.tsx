import { siGithub } from "simple-icons";

export default function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={siGithub.path} />
    </svg>
  );
}
