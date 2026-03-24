import { cn } from "@/lib/utils";

type TagBadgeProps = {
  tag: string;
  active?: boolean;
  onClick?: () => void;
};

export function TagBadge({ tag, active = false, onClick }: TagBadgeProps) {
  const className = cn(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition",
    active
      ? "border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
      : "border-[var(--color-border)] bg-[var(--color-background-elevated)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)]"
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {tag}
      </button>
    );
  }

  return <span className={className}>{tag}</span>;
}
