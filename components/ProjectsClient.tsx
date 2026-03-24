"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ProjectCard } from "@/components/ProjectCard";
import { TagBadge } from "@/components/TagBadge";
import { ProjectMeta } from "@/lib/projects";

export function ProjectsClient({ projects }: { projects: ProjectMeta[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [query, setQuery] = useState("");

  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();

    for (const project of projects) {
      for (const tag of project.tags) {
        uniqueTags.add(tag);
      }
    }

    return ["All", ...Array.from(uniqueTags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesTag = activeTag === "All" || project.tags.includes(activeTag);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [project.title, project.description, project.summary, project.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, projects, query]);

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, protocols, or tooling"
            className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-elevated)] py-3 pl-11 pr-4 text-sm text-[var(--color-foreground)] outline-none transition placeholder:text-[var(--color-foreground-muted)] focus:border-[var(--color-border-strong)]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              active={tag === activeTag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background-elevated)] p-8 text-sm text-[var(--color-foreground-muted)]">
          No projects match that search and tag combination.
        </div>
      ) : null}
    </section>
  );
}
