"use client";

import { useMemo, useState } from "react";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

const ALL = "All";

export function ProjectGrid({ projects }: { projects: ProjectMeta[] }) {
  const [filter, setFilter] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(projects.map((project) => project.category))],
    [projects],
  );

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  if (projects.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">
        No published projects yet. Add a Markdown file in <code className="font-mono">content/projects/</code>.
      </p>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${
                filter === category
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line bg-surface text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.slug} as="article" delay={i * 70} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
