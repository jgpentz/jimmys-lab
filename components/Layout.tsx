"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Projects" },
  { href: "https://jimmys.place/", label: "Blog", external: true },
  { href: "https://github.com/jgpentz", label: "GitHub", external: true }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-background)_92%,transparent)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-[var(--color-foreground)] transition hover:text-[var(--color-accent)] sm:text-2xl"
          >
            Jimmy Pentz
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : false;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className={cn(
                      "group rounded-full px-3 py-2 text-base transition-colors sm:text-md",
                      "text-[var(--color-foreground-muted)] hover:!text-[var(--color-accent)]",
                      isActive && "text-[var(--color-foreground)] underline decoration-[var(--color-accent)] underline-offset-4"
                    )}
                  >
                    <span className="inline-flex items-center gap-2 transition-colors group-hover:text-[var(--color-accent)]">
                      {item.label === "GitHub" ? (
                        <Github className="h-4 w-4 transition-colors group-hover:text-[var(--color-accent)]" />
                      ) : null}
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-20 sm:px-8">{children}</main>
    </div>
  );
}
