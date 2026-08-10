"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@content/profile";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently filling the viewport.
  useEffect(() => {
    if (!onHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-semibold text-accent-ink">
            {profile.shortName.charAt(0)}
          </span>
          <span className="hidden font-semibold sm:inline">{profile.shortName.toLowerCase()}</span>
          <span className="hidden text-muted sm:inline">/portfolio</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={href(section.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                onHome && active === section.id
                  ? "bg-surface-2 text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv.href}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition hover:opacity-90 sm:inline-block"
          >
            {profile.cv.label}
          </a>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={href(section.id)}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-sm text-muted last:border-b-0 hover:text-fg"
              >
                {section.label}
              </a>
            ))}
            <a
              href={profile.cv.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 mb-3 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-ink sm:hidden"
            >
              {profile.cv.label}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
