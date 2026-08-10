import Link from "next/link";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const all = getProjects();
  const featured = all.filter((project) => project.featured);
  // Show featured projects if any are marked, otherwise the first six.
  const shown = (featured.length > 0 ? featured : all).slice(0, 6);
  const hasMore = all.length > shown.length;

  return (
    <>
      <Hero />
      <About />

      <Section
        id="projects"
        index="02 — Projects"
        title="Things I've built"
        lead="Each one has a full case study: the problem, how I approached it, what the numbers said, and what I'd do differently."
      >
        <ProjectGrid projects={shown} />

        {hasMore && (
          <Reveal className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              See all {all.length} projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        )}
      </Section>

      <Experience />
      <Contact />
    </>
  );
}
