import Link from "next/link";

type Heading = {
  level: number;
  text: string;
  slug: string;
};

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-elevated)] p-5 shadow-[var(--shadow-card)]">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-foreground-muted)]">
        On this page
      </p>
      <nav className="mt-4 space-y-1">
        {headings.map((heading) => (
          <Link
            key={heading.slug}
            href={`#${heading.slug}`}
            className="block rounded-lg px-3 py-2 text-sm text-[var(--color-foreground-muted)] transition hover:bg-[var(--color-background-muted)] hover:text-[var(--color-foreground)]"
            style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "0.75rem" }}
          >
            {heading.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}
