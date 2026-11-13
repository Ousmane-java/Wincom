import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a" }}>
        <svg width="132" height="100" viewBox="-2 -4 46 36">
          <path d="M2 9 L10.5 28 L19 13.5 L27.5 28 L37 4" fill="none" stroke="#f5f3ee" strokeWidth="3.2" strokeLinecap="square" />
          <rect x="34.1" y="-0.9" width="5.8" height="5.8" transform="rotate(45 37 2)" fill="#c9a96e" />
        </svg>
      </div>
    ),
    size
  );
}
