"use client";

import { Children, isValidElement, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockFrameProps = {
  children: React.ReactNode;
};

export function CodeBlockFrame({ children }: CodeBlockFrameProps) {
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => extractText(children).trim(), [children]);

  async function handleCopy() {
    if (!codeText) {
      return;
    }

    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="relative max-w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background-muted)]">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-background)_92%,transparent)] px-2 py-1 text-xs text-[var(--color-foreground-muted)] transition hover:text-[var(--color-foreground)]"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
      {children}
    </div>
  );
}

function extractText(node: React.ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement<{ children?: React.ReactNode }>(child)) {
        return extractText(child.props.children);
      }

      return "";
    })
    .join("");
}
