import { ImageResponse } from "next/og";
import { profile } from "@content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/** Social preview card for the homepage (LinkedIn, WhatsApp, X). */
export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#F0B429",
              color: "#14100A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {profile.shortName.charAt(0)}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8D98A7" }}>
            {profile.shortName.toLowerCase()}/portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#E9EDF2" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 38, color: "#F0B429" }}>
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#8D98A7",
              maxWidth: 900,
              lineHeight: 1.45,
            }}
          >
            {profile.focusAreas.join("  ·  ")}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8D98A7" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
