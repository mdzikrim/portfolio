import Link from "next/link";
import { profile } from "@content/profile";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="intro" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to opportunities · {profile.location.split(",").slice(-2).join(",").trim()}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Hi, I&apos;m {profile.shortName}.
            <br />
            <span className="text-muted">I turn messy data into</span>{" "}
            <span className="text-accent">systems people can use.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90"
            >
              View my work
            </Link>
            <a
              href={profile.cv.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {profile.cv.label}
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full px-3 py-3 text-sm text-muted underline-offset-4 transition hover:text-fg hover:underline"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {profile.focusAreas.map((area) => (
              <div key={area} className="bg-surface px-4 py-5">
                <dt className="font-mono text-[0.7rem] tracking-widest text-accent uppercase">Focus</dt>
                <dd className="mt-1.5 text-sm font-medium">{area}</dd>
              </div>
            ))}
            <div className="bg-surface px-4 py-5">
              <dt className="font-mono text-[0.7rem] tracking-widest text-accent uppercase">Since</dt>
              <dd className="mt-1.5 text-sm font-medium">2022</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
