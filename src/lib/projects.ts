import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/** A single number worth bragging about, rendered as a stat tile. */
export type Highlight = {
  label: string;
  value: string;
};

export type ProjectLinks = {
  repo?: string;
  demo?: string;
  article?: string;
  video?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  /** Free-form grouping used by the filter pills, e.g. "Machine Learning". */
  category: string;
  year: string;
  role: string;
  /** Tech stack chips. */
  tags: string[];
  /** Path under /public, e.g. "/projects/waste/cover.png". Optional. */
  cover?: string;
  /** Draft projects are hidden from the site but still live in the repo. */
  draft: boolean;
  /** Featured projects are surfaced on the homepage. */
  featured: boolean;
  /** Lower numbers sort first. Defaults to 100. */
  order: number;
  links: ProjectLinks;
  highlights: Highlight[];
};

export type Project = ProjectMeta & {
  /** Raw Markdown body (everything below the frontmatter). */
  body: string;
};

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function toHighlights(value: unknown): Highlight[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];
    const { label, value: v } = item as Record<string, unknown>;
    if (typeof label !== "string" || typeof v !== "string") return [];
    return [{ label, value: v }];
  });
}

function toLinks(value: unknown): ProjectLinks {
  if (typeof value !== "object" || value === null) return {};
  const raw = value as Record<string, unknown>;
  const links: ProjectLinks = {};
  for (const key of ["repo", "demo", "article", "video"] as const) {
    const v = raw[key];
    if (typeof v === "string" && v.trim() !== "") links[key] = v.trim();
  }
  return links;
}

function readProject(filename: string): Project {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: typeof data.slug === "string" ? data.slug : slug,
    title: typeof data.title === "string" ? data.title : slug,
    summary: typeof data.summary === "string" ? data.summary : "",
    category: typeof data.category === "string" ? data.category : "Project",
    year: data.year != null ? String(data.year) : "",
    role: typeof data.role === "string" ? data.role : "",
    tags: toStringArray(data.tags),
    cover: typeof data.cover === "string" && data.cover ? data.cover : undefined,
    draft: data.draft === true,
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 100,
    links: toLinks(data.links),
    highlights: toHighlights(data.highlights),
    body: content.trim(),
  };
}

/** All non-draft projects, sorted by `order` then newest year first. */
export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readProject)
    .filter((project) => !project.draft)
    .sort((a, b) => a.order - b.order || b.year.localeCompare(a.year));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Categories present in the published projects, for the filter pills. */
export function getCategories(): string[] {
  return [...new Set(getProjects().map((project) => project.category))].sort();
}
