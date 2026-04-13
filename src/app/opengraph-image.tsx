import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: "linear-gradient(135deg, #4fe0ff 0%, #2ea9ff 100%)",
              boxShadow: "0 0 22px rgba(46, 203, 255, 0.55)",
            }}
          />
          <span
            style={{
              fontSize: 28,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#d5f3ff",
            }}
          >
            Amit Kumar
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 860 }}>
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
            Full Stack Developer
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 74,
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            <span>Building modern web apps with</span>
            <span style={{ color: "#4fe0ff" }}>cinematic UI</span>
            <span>and scalable backend systems.</span>
          </div>

          <div style={{ fontSize: 28, lineHeight: 1.5, color: "rgba(246, 251, 255, 0.85)", maxWidth: 760 }}>
            Next.js, Supabase, Tailwind CSS, Node.js, and production-ready admin workflows.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {[
            ["Portfolio", "Premium + responsive"],
            ["Backend", "Supabase workflows"],
            ["Delivery", "Fast deployment"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "18px 20px",
                borderRadius: 24,
                border: "1px solid rgba(53, 163, 255, 0.22)",
                background: "rgba(15, 24, 50, 0.76)",
                boxShadow: "0 16px 48px rgba(0, 0, 0, 0.28)",
              }}
            >
              <div style={{ fontSize: 18, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8edfff" }}>
                {label}
              </div>
              <div style={{ marginTop: 8, fontSize: 24, fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}