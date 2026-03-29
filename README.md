# Network Engineering Labs Portfolio

Static-exportable Next.js portfolio for publishing network engineering lab case studies.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX project content
- Static export via `next build`

## Local Development

This project uses Node through `nvm`.

Load Node:

```bash
source /Users/jamespentz/.nvm/nvm.sh
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Build the static site:

```bash
npm run build
```

The exported static files are written to:

```text
out/
```

To preview the exported site locally:

```bash
python3 -m http.server 8080 -d out
```

Then open:

```text
http://localhost:8080
```

## Project Structure

```text
app/
  page.tsx                     Homepage
  projects/[slug]/page.tsx    Project detail page

components/
  Layout.tsx
  ProjectCard.tsx
  ProjectsClient.tsx
  TagBadge.tsx
  MDXRenderer.tsx

content/
  projects/
    *.mdx                      Project content files

public/
  *.svg
  *.png
  *.jpg                        Images and diagrams referenced by MDX

lib/
  projects.ts                  Reads project metadata and content
```

## How To Add A New Project

Create a new file in:

```text
content/projects/
```

Example:

```text
content/projects/mpls-l3vpn-lab.mdx
```

Use this template:

~~~mdx
---
title: "MPLS L3VPN Lab"
description: "Short description shown on the homepage card."
summary: "Short summary shown at the top of the project page."
tags:
  - MPLS
  - BGP
  - L3VPN
links:
  - label: "GitHub"
    href: "https://github.com/jgpentz/your-repo"
  - label: "Configs"
    href: "/configs/mpls-l3vpn.pdf"
  - label: "Diagram"
    href: "/topology-mpls.svg"
---

## Problem / Goal

Describe the lab objective.

## Topology

![MPLS topology](/topology-mpls.svg)

## Approach

Explain the design and validation method.

## Implementation

```txt
put configs, CLI snippets, or automation examples here
```

## Results

| Metric | Value |
| --- | ---: |
| Convergence | 420 ms |

## Key Takeaways

- Main conclusion
- Important tradeoff
~~~

Once the file exists, the site picks it up automatically. You do not need to register it anywhere else.

## Frontmatter Fields

Every project file should start with frontmatter:

```yaml
---
title: "Project title"
description: "Homepage card text"
summary: "Project page intro text"
tags:
  - TagOne
  - TagTwo
links:
  - label: "GitHub"
    href: "https://..."
---
```

Field meanings:

- `title`: Main project title
- `description`: Short card description on the homepage
- `summary`: Intro paragraph at the top of the project page
- `tags`: Used for filtering and badges
- `links`: Action links shown under the summary

## Customizing MDX Content

Project bodies are written in MDX. In practice, that means standard Markdown works well:

- `##` and `###` headings
- bullet lists
- numbered lists
- fenced code blocks
- tables
- images
- links

Example heading structure:

```mdx
## Problem / Goal
## Topology
## Approach
## Implementation
## Results
## Key Takeaways
```

These headings are also used to build the right-side table of contents on project pages.

## Code Blocks

Use fenced code blocks with a language label when possible:

<pre lang="mdx"><code>```frr
router bgp 65010
 neighbor 203.0.113.1 remote-as 64501
```
</code></pre>

You can use any language label that matches the content:

- `bash`
- `frr`
- `cisco`
- `json`
- `yaml`
- `python`
- `txt`

## Images And Diagrams

Put images and diagrams in:

```text
public/
```

Then reference them in MDX with a root-relative path:

```mdx
![Topology diagram](/topology-bgp.svg)
```

For grouped assets, you can also create subfolders:

```text
public/diagrams/
public/images/
public/configs/
```

Example:

```mdx
![Lab diagram](/diagrams/mpls-core.svg)
```

## Tables

Markdown tables work out of the box:

```mdx
| Test Run | Detection | Packet Loss |
| --- | ---: | ---: |
| Baseline | 780 ms | 1.1 s |
| Tuned | 128 ms | 240 ms |
```

## Links In Projects

There are two types of links:

1. Frontmatter `links`
   These appear below the project title as action links like GitHub, Configs, and Diagram.

2. Normal markdown links inside the content body
   Example:

```mdx
[FRRouting docs](https://frrouting.org/)
```

## Homepage Cards

The homepage card for each project pulls from:

- `title`
- `description`
- `tags`

If you want a card to look cleaner, shorten the `description` to one or two lines.

## Search And Tag Filtering

The homepage supports:

- tag filtering
- text search

Search currently matches:

- title
- description
- summary
- tags

This logic lives in:

[components/ProjectsClient.tsx](/Users/jamespentz/Documents/New%20project/components/ProjectsClient.tsx)

## Site Branding And Nav

Header/nav settings are in:

[components/Layout.tsx](/Users/jamespentz/Documents/New%20project/components/Layout.tsx)

Theme defaults and color tokens are in:

[app/globals.css](/Users/jamespentz/Documents/New%20project/app/globals.css)

Site-level metadata is in:

[app/layout.tsx](/Users/jamespentz/Documents/New%20project/app/layout.tsx)

Before deployment, update `metadataBase` in `app/layout.tsx` to your real domain.

## How Project Pages Are Built

Project content is loaded from disk by:

[lib/projects.ts](/Users/jamespentz/Documents/New%20project/lib/projects.ts)

This file:

- reads all `.mdx` files in `content/projects`
- parses frontmatter
- extracts headings for the table of contents
- generates the list of project slugs for static export

## Deploying To Cloudflare Pages

Recommended settings:

- Build command: `npm run build`
- Output directory: `out`
- Node version: `22`

Cloudflare Pages can deploy either:

- from GitHub
- from a direct upload of the generated `out/` directory

## Common Edits

Change the homepage intro:

- Edit [app/page.tsx](/Users/jamespentz/Documents/New%20project/app/page.tsx)

Change the header links or name:

- Edit [components/Layout.tsx](/Users/jamespentz/Documents/New%20project/components/Layout.tsx)

Change card styling:

- Edit [components/ProjectCard.tsx](/Users/jamespentz/Documents/New%20project/components/ProjectCard.tsx)

Change project page layout:

- Edit [app/projects/[slug]/page.tsx](/Users/jamespentz/Documents/New%20project/app/projects/%5Bslug%5D/page.tsx)

Change MDX rendering styles:

- Edit [components/MDXRenderer.tsx](/Users/jamespentz/Documents/New%20project/components/MDXRenderer.tsx)

## Notes

- This app is static-export compatible.
- All project pages are generated at build time.
- External fonts are not required for the build.
- If a page looks stale during testing, restart `npm run dev` or rebuild `out/`.
