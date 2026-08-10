import { profile } from "@content/profile";
import { Reveal } from "./Reveal";

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  medium: "Medium",
  instagram: "Instagram",
};

export function Contact() {
  const socials = Object.entries(profile.socials).filter(([, url]) => url);

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">04 — Contact</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Got a role, a dataset, or a weird idea? Let&apos;s talk.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            I&apos;m currently looking for opportunities in machine learning, data analysis, and
            security engineering. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block text-xl font-medium break-all text-accent underline decoration-accent/30 underline-offset-8 transition hover:decoration-accent sm:text-3xl"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line bg-bg px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
              >
                {SOCIAL_LABELS[key] ?? key}
              </a>
            ))}
            <a
              href={profile.cv.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition hover:opacity-90"
            >
              {profile.cv.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
