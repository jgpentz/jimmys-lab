import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";

import { MDXRenderer } from "@/components/MDXRenderer";
import { SectionHeading } from "@/components/SectionHeading";
import { TableOfContents } from "@/components/TableOfContents";
import { TagBadge } from "@/components/TagBadge";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article"
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
      <article className="max-w-[900px] min-w-0 space-y-10">
        <header className="space-y-6 border-b border-[var(--color-border)] pb-8 pt-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-[var(--color-foreground-muted)] transition-colors hover:!text-[#8a8a8a]"
          >
            <ArrowLeft className="h-4 w-4 transition-colors group-hover:text-[#8a8a8a]" />
            <span className="transition-colors group-hover:text-[#8a8a8a]">Go back</span>
          </Link>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
              {project.title}
            </h1>
            <p className="inline-flex items-center gap-2 text-sm text-[var(--color-foreground-muted)]">
              <CalendarDays className="h-4 w-4" />
              {project.formattedDate}
            </p>
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-foreground-muted)]">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-foreground-soft)]">
            {project.links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </header>

        <div className="prose-grid">
          <SectionHeading id="overview">Overview</SectionHeading>
          <MDXRenderer source={project.content} />
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <TableOfContents headings={project.headings} />
        </div>
      </aside>
    </div>
  );
}
