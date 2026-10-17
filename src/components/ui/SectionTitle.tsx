import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12 max-w-3xl", className)}>
      <p className="font-mono text-label uppercase text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-h2 font-bold text-foreground">{title}</h2>

      <div
        aria-hidden="true"
        className="mt-5 h-px w-16 bg-primary"
      />

      {description && (
        <p className="mt-6 text-body-lg text-muted">{description}</p>
      )}
    </div>
  );
}
