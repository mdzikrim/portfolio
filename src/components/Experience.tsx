import { profile } from "@content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

type Entry = {
  role: string;
  org: string;
  period: string;
  location?: string;
  points: readonly string[];
};

function Timeline({ entries }: { entries: readonly Entry[] }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
      {entries.map((entry, i) => (
        <Reveal as="li" key={`${entry.org}-${entry.role}`} delay={i * 80} className="relative">
          <span className="absolute top-1.5 -left-[1.83rem] size-3 rounded-full border-2 border-bg bg-accent sm:-left-[2.33rem]" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{entry.role}</h3>
            <p className="font-mono text-xs text-muted">{entry.period}</p>
          </div>
          <p className="mt-1 text-sm text-accent">
            {entry.org}
            {entry.location && <span className="text-muted"> · {entry.location}</span>}
          </p>
          <ul className="mt-3.5 space-y-2">
            {entry.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-line" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="03 — Experience"
      title="Where I've worked and researched"
      lead="Internships, research, and teaching — plus the organizations that taught me how to work with people."
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <h3 className="mb-8 font-mono text-xs tracking-[0.18em] text-accent uppercase">
            Work &amp; Research
          </h3>
          <Timeline entries={profile.experience} />
        </div>

        <div>
          <h3 className="mb-8 font-mono text-xs tracking-[0.18em] text-accent uppercase">
            Organization &amp; Leadership
          </h3>
          <Timeline entries={profile.activities} />
        </div>
      </div>
    </Section>
  );
}
