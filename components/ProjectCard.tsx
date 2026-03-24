import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TagBadge } from "@/components/TagBadge";
import { ProjectMeta } from "@/lib/projects";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-elevated)] p-6 shadow-[var(--shadow-card)] transition duration-150 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background)]"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--color-foreground)]">
            {project.title}
          </h2>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--color-foreground-muted)] transition group-hover:text-[var(--color-accent)]" />
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-[var(--color-foreground-muted)]">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}
