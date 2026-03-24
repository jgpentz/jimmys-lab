import { cn } from "@/lib/utils";

export function CodeBlock({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "rounded-md bg-[var(--color-background-muted)] px-1.5 py-0.5 text-[0.92em] text-[var(--color-foreground-soft)]",
        className
      )}
      {...props}
    />
  );
}
