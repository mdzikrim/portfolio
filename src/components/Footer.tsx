import { profile } from "@content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js &amp; Tailwind CSS · {profile.location}</p>
      </div>
    </footer>
  );
}
