import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-32 sm:px-8">
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-4 text-muted">
        The link may be outdated, or the project is still a draft.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90"
      >
        Back home
      </Link>
    </div>
  );
}
