import { ImageResponse } from "next/og";

import { ogImageAlt } from "@/lib/site";

export const alt = ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#020617",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                border: "2px solid #22d3ee",
                borderRadius: "14px",
                color: "#22d3ee",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              {"</>"}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                letterSpacing: "4px",
                color: "#94a3b8",
              }}
            >
              SAHAN NIMNAKA
            </div>
          </div>
          <div style={{ display: "flex", fontSize: "20px", color: "#64748b" }}>
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              maxWidth: "980px",
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-2px",
            }}
          >
            Computer Science Undergraduate
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "#94a3b8" }}>
            Web / Mobile / Backend / AI &amp; Data Science
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1e293b",
            paddingTop: "26px",
            fontSize: "22px",
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex" }}>
            Sahan Nimnaka Pinnagaspitiya
          </div>
          <div style={{ display: "flex", color: "#22d3ee" }}>
            github.com/sahan721
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
