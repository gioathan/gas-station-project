"use client";

import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e2e2",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "box-shadow 0.25s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      {service.image ? (
        <div style={{ position: "relative", width: "100%", height: "192px", overflow: "hidden" }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: "cover" }}
            quality={80}
          />
        </div>
      ) : (
        <div style={{
          height: "192px",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: "56px" }}>{service.icon}</span>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ fontSize: "22px", lineHeight: 1 }}>{service.icon}</span>
          <span style={{
            fontWeight: 700,
            fontSize: "12px",
            color: "#b90014",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}>
            {service.title}
          </span>
        </div>

        <h3 style={{
          fontSize: "22px",
          fontWeight: 600,
          color: "#1a1c1c",
          fontFamily: "'Oswald', sans-serif",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}>
          {service.title}
        </h3>

        <p style={{
          fontSize: "15px",
          color: "#5d3f3c",
          lineHeight: 1.6,
          fontFamily: "'Inter', sans-serif",
        }}>
          {service.description}
        </p>
      </div>
    </div>
  );
}
