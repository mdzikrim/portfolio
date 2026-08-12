import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/Reveal";
import { getProject, getProjects } from "@/lib/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    // `images` is deliberately omitted: setting it here — even to undefined —
    // overrides the generated card in opengraph-image.tsx.
    openGraph: {
      title: project.title,
      description: project.summary,
    },
  };
}

const LINK_LABELS: Record<string, string> = {
  repo: "GitHub",
  demo: "Live demo",
  article: "Write-up",
  video: "Demo video",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const next = all[(index + 1) % all.length];
  const links = Object.entries(project.links);

  return (
    <article>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{project.category}</span>
            {project.year && <span>{project.year}</span>}
            {project.role && <span>· {project.role}</span>}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>

          {project.tags.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[0.72rem] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {links.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                >
                  {LINK_LABELS[key] ?? key}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {project.highlights.length > 0 && (
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <dl className="-mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.highlights.map((highlight) => (
              <div key={highlight.label} className="bg-bg px-5 py-6">
                <dt className="font-mono text-[0.7rem] tracking-widest text-muted uppercase">
                  {highlight.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight text-accent">
                  {highlight.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {project.cover && (
        <div className="mx-auto mt-14 max-w-4xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2">
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <Markdown>{project.body}</Markdown>
        </Reveal>
      </div>

      {next && next.slug !== project.slug && (
        <div className="border-t border-line bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Next project</p>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-3 flex flex-wrap items-baseline justify-between gap-3"
            >
              <span className="text-2xl font-semibold tracking-tight transition group-hover:text-accent sm:text-3xl">
                {next.title}
              </span>
              <span className="font-mono text-xs text-accent">Read case study →</span>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
