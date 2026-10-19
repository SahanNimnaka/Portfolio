import { cn } from "@/lib/utils";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  download?: boolean | string;
  target?: "_blank" | "_self";
  rel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover",
  outline:
    "border border-border-control bg-transparent text-foreground hover:border-primary hover:text-primary",
  ghost:
    "bg-transparent text-muted hover:text-foreground",
};

export default function Button({
  children,
  className,
  variant = "primary",
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href !== undefined) {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
