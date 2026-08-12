import { profile } from "@content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Renders *asterisk emphasis* in bio paragraphs. Just enough Markdown to let
 * profile.ts stress a word, without pulling a parser into the About section.
 */
function withEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i} className="text-fg not-italic underline decoration-accent/50 underline-offset-4">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}

export function About() {
  return (
    <Section
      id="about"
      index="01 — About"
      title={`The short version of ${profile.shortName}`}
      lead={profile.role + " · " + profile.location}
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="space-y-5">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="leading-relaxed text-muted">
              {withEmphasis(paragraph)}
            </p>
          ))}

          <div className="pt-4">
            <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Education</h3>
            {profile.education.map((item) => (
              <div key={item.school} className="mt-4 rounded-2xl border border-line bg-surface p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{item.school}</p>
                  <p className="font-mono text-xs text-muted">{item.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{item.degree}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.notes.map((note) => (
                    <li key={note} className="flex gap-2 text-sm text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="space-y-8">
          <div>
            <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Toolbox</h3>
            <div className="mt-4 space-y-6">
              {profile.skills.map((group) => (
                <div key={group.group}>
                  <p className="text-sm font-medium">{group.group}</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[0.72rem] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Languages</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {profile.languages.map((lang) => (
                  <li key={lang.name}>
                    {lang.name} <span className="text-muted/70">— {lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Interests</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {profile.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
