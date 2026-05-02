interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="page-hero-section" style={{
      backgroundColor: "#0d0d0d",
      minHeight: "320px",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Diagonal lines overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, #e31b23 40px, #e31b23 41px, transparent 41px, transparent 80px, #fed400 80px, #fed400 81px)",
        opacity: 0.15,
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "rgba(255,255,255,0.5)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
          marginBottom: "28px",
        }}>
          <span style={{
            display: "inline-block",
            width: "3px",
            height: "16px",
            background: "#DD1D21",
            borderRadius: "1px",
            flexShrink: 0,
          }} />
          {label}
        </div>

        <h1 style={{
          fontSize: "clamp(44px, 8vw, 96px)",
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Work Sans', sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          textTransform: "uppercase",
          margin: "0 0 28px",
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            fontFamily: "'Inter', sans-serif",
            maxWidth: "560px",
            margin: 0,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
