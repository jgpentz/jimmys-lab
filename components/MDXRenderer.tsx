import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/components/CodeBlock";
import { SectionHeading } from "@/components/SectionHeading";

const prettyCodeOptions = {
  theme: "github-dark"
};

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <SectionHeading id={slugify(String(props.children))}>{props.children}</SectionHeading>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={slugify(String(props.children))}
      className="scroll-mt-24 pt-4 text-xl font-semibold tracking-tight text-[var(--color-foreground)]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-8 text-[var(--color-foreground-soft)]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    props.href?.startsWith("http") ? (
      <a
        href={props.href}
        target="_blank"
        rel="noreferrer"
        className="text-[var(--color-accent)] underline decoration-[var(--color-border-strong)] underline-offset-4"
      >
        {props.children}
      </a>
    ) : (
      <Link
        href={props.href ?? "#"}
        className="text-[var(--color-accent)] underline decoration-[var(--color-border-strong)] underline-offset-4"
      >
        {props.children}
      </Link>
    )
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc space-y-3 pl-6 text-[var(--color-foreground-soft)]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal space-y-3 pl-6 text-[var(--color-foreground-soft)]" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1 leading-7" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
      <table className="min-w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[var(--color-background-muted)]" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-[var(--color-border)] px-4 py-3 font-medium text-[var(--color-foreground)]"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-[var(--color-border)] px-4 py-3 text-[var(--color-foreground-soft)]" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    if (props.className) {
      return <code {...props} />;
    }

    return <CodeBlock {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[#0b1118] p-4 text-sm shadow-[var(--shadow-card)]"
      {...props}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-elevated)]">
      <Image
        src={typeof props.src === "string" ? props.src : ""}
        alt={props.alt ?? ""}
        width={1400}
        height={800}
        className="h-auto w-full"
      />
    </span>
  )
};

export function MDXRenderer({ source }: { source: string }) {
  return (
    <div className="space-y-6">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
          }
        }}
      />
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
