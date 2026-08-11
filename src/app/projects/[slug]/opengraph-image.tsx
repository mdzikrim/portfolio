import { ImageResponse } from "next/og";
import { profile } from "@content/profile";
import { getProject, getProjects } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

const DANGLING = new Set([
  "a", "an", "the", "and", "or", "with", "in", "of", "to", "for", "on", "by", "from", "at", "plus",
]);

/**
 * Trim to a whole word, then drop trailing filler ("… with a") so the card
 * ends on something that reads like a phrase rather than a cut cable.
 */
function truncate(text: string, limit = 150) {
  if (text.length <= limit) return text;

  const words = text.slice(0, limit).split(" ");
  words.pop(); // the last word is probably cut in half

  while (words.length > 1 && DANGLING.has(words[words.length - 1].toLowerCase())) {
    words.pop();
  }

  return `${words.join(" ").replace(/[,;:—–-]$/, "")}…`;
}

/** Social preview card for a single case study. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0D11",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#2A2113",
              color: "#F0B429",
              fontSize: 24,
            }}
          >
            {project?.category ?? "Project"}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8D98A7" }}>
            {project?.year ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              color: "#E9EDF2",
              lineHeight: 1.1,
            }}
          >
            {project?.title ?? "Case study"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              color: "#8D98A7",
              maxWidth: 980,
              lineHeight: 1.45,
            }}
          >
            {truncate(project?.summary ?? "")}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#F0B429",
              color: "#14100A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {profile.shortName.charAt(0)}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8D98A7" }}>{profile.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
