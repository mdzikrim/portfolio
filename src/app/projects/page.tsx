import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies across machine learning, data analysis, and security engineering.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Every case study, in one place
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {projects.length} project{projects.length === 1 ? "" : "s"} across machine learning, data
          analysis, and security engineering. Filter by category below.
        </p>
      </Reveal>

      <div className="mt-14">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
