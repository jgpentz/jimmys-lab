import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  children,
  className
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "scroll-mt-24 border-b border-[var(--color-border)] pb-3 text-2xl font-semibold tracking-tight text-[var(--color-foreground)]",
        className
      )}
    >
      {children}
    </h2>
  );
}
