import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

/** Deterministic hue per project so cover-less cards still look intentional. */
function hueFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

export function ProjectCard({ project }: { project: ProjectMeta }) {
  const hue = hueFor(project.slug);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center"
            style={{
              backgroundImage: `radial-gradient(120% 100% at 20% 0%, hsl(${hue} 70% 55% / 0.22), transparent 60%)`,
            }}
          >
            <span className="font-mono text-5xl font-semibold text-fg/10 select-none">
              {project.title
                .split(" ")
                .slice(0, 3)
                .map((word) => word.charAt(0))
                .join("")}
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-full border border-line bg-bg/85 px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-muted backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold tracking-tight transition group-hover:text-accent">{project.title}</h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
            >
              {tag}
            </li>
          ))}
          {project.tags.length > 4 && (
            <li className="rounded-full px-1.5 py-1 font-mono text-[0.68rem] text-muted">
              +{project.tags.length - 4}
            </li>
          )}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-accent">
          Read case study
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 transition group-hover:translate-x-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
