import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 675,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "#f6fbff",
          background:
            "radial-gradient(circle at 20% 20%, rgba(46, 203, 255, 0.22), transparent 26%), radial-gradient(circle at 80% 25%, rgba(74, 163, 255, 0.18), transparent 24%), linear-gradient(180deg, #070b1a 0%, #0b1328 54%, #0a1122 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 880 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "12px 18px",
              borderRadius: 999,
              border: "1px solid rgba(53, 163, 255, 0.34)",
              background: "rgba(11, 19, 38, 0.8)",
              color: "#d5f3ff",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Amit Kumar
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 68, lineHeight: 0.98, fontWeight: 800, letterSpacing: -2 }}>
            <span>Full stack developer portfolio</span>
            <span>with a premium cyberpunk UI.</span>
          </div>

          <div style={{ fontSize: 28, lineHeight: 1.5, color: "rgba(246, 251, 255, 0.85)", maxWidth: 780 }}>
            Next.js, Supabase, Tailwind CSS, and modern admin workflows built for production.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {[
            "Next.js",
            "Supabase",
            "Tailwind CSS",
            "Node.js",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px 18px",
                borderRadius: 999,
                border: "1px solid rgba(53, 163, 255, 0.22)",
                background: "rgba(15, 24, 50, 0.76)",
                color: "#f6fbff",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}