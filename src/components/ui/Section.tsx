import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Section({
  id,
  children,
  className,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("section", className)}
    >
      {children}
    </section>
  );
}
