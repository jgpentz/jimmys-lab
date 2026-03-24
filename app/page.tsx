import { getAllProjects } from "@/lib/projects";
import { ProjectsClient } from "@/components/ProjectsClient";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-10">
      <section className="max-w-3xl space-y-4 pt-6">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Network Engineering Labs
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
          Technical labs focused around networking, automation, and self-hosting.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--color-foreground-muted)] sm:text-lg">
          A focused portfolio of network engineering projects. Each writeup involves a detailed breakdown
          of the problem, implementation details, and presentation of the results.
          <br></br>
          Kind of like an engineering notebook...
        </p>
      </section>

      <ProjectsClient projects={projects} />
    </div>
  );
}
