import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

const projectsDirectory = path.join(process.cwd(), "content/projects");

type ProjectLink = {
  label: string;
  href: string;
};

type Heading = {
  level: number;
  text: string;
  slug: string;
};

type ProjectFrontmatter = {
  title: string;
  description: string;
  summary: string;
  tags: string[];
  links?: ProjectLink[];
};

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
  readingTime: string;
};

export type Project = ProjectMeta & {
  content: string;
  headings: Heading[];
  links: ProjectLink[];
};

export function getAllProjectSlugs() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  return getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project))
    .map(({ content, headings, links, ...meta }) => meta)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ProjectFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    summary: frontmatter.summary,
    tags: frontmatter.tags,
    links: frontmatter.links ?? [],
    content,
    headings: extractHeadings(content),
    readingTime: readingTime(content).text
  };
}

function extractHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s/, "").trim();

      return {
        level,
        text,
        slug: slugify(text)
      };
    });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
