"use client";

/**
 * Light/dark switch.
 *
 * There is deliberately no React state here. The current theme lives in
 * `document.documentElement.dataset.theme` (set before first paint by the
 * inline script in layout.tsx), and which icon shows is decided by CSS via the
 * `dark:` variant. That keeps server and client markup identical — no
 * hydration mismatch, no flash.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-accent hover:text-accent"
    >
      <SunIcon className="hidden size-4 dark:block" />
      <MoonIcon className="size-4 dark:hidden" />
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
      />
    </svg>
  );
}
