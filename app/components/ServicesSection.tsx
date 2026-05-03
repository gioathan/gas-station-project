"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const t = useTranslations("services");

  return (
    <section style={{ background: "#ffffff", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "80px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#1a1c1c",
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginBottom: "8px",
          }}>
            {t("sectionTitle")}
          </h2>
          <div style={{ height: "4px", width: "96px", background: "#e31b23" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{ border: "1px solid #e2e2e2", background: "#ffffff", padding: "48px", display: "flex", flexDirection: "column", alignItems: "flex-start", transition: "box-shadow 0.3s" }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ background: "rgba(185,0,20,0.05)", padding: "16px", marginBottom: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#b90014" }}>
                <span style={{ fontSize: "36px", lineHeight: 1 }}>{service.icon}</span>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#1a1c1c", fontFamily: "'Oswald', sans-serif", lineHeight: 1.3, marginBottom: "16px" }}>
                {service.title}
              </h3>
              <p style={{ fontSize: "16px", color: "#5b5b5a", lineHeight: 1.5, marginBottom: "24px", flex: 1, fontFamily: "'Inter', sans-serif" }}>
                {service.description}
              </p>
              <Link
                href="/services"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#b90014", fontWeight: 700, fontSize: "14px", textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginTop: "auto" }}
              >
                {t("learnMore")}
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
