"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_text: string;
  terms: string;
  image: string;
  valid_from: string;
  valid_until: string;
}

interface PromotionCardProps {
  promotion: Promotion;
  locale?: string;
}

export default function PromotionCard({ promotion, locale: localeProp }: PromotionCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const t = useTranslations("promotions");
  const hookLocale = useLocale();
  const locale = localeProp || hookLocale;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dateLocale = locale === "en" ? "en-GB" : "el-GR";
    return date.toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <article
        style={{ background: "#ffffff", border: "1px solid #e2e2e2", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.25s" }}
        onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
        onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ position: "relative", height: "192px", overflow: "hidden", flexShrink: 0 }}>
          {promotion.image ? (
            <Image src={promotion.image} alt={promotion.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} quality={80} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1a1a 0%, #b90014 100%)" }} />
          )}
          {promotion.discount_text && (
            <div style={{ position: "absolute", top: "16px", left: "16px", background: "#fcd400", color: "#5a4a00", padding: "4px 10px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", borderRadius: "2px" }}>
              {t("offer")}
            </div>
          )}
        </div>

        <div style={{ padding: "20px 20px 0", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1a1c1c", fontFamily: "'Oswald', sans-serif", marginBottom: "8px", lineHeight: 1.3 }}>
            {promotion.title}
          </h3>
          {promotion.discount_text && (
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "#b90014", fontFamily: "'Oswald', sans-serif", lineHeight: 1.1 }}>
                {promotion.discount_text}
              </span>
            </div>
          )}
          {promotion.description ? (
            <p style={{ fontSize: "14px", color: "#5d3f3c", lineHeight: 1.6, fontFamily: "'Inter', sans-serif", flex: 1 }}>
              {promotion.description}
            </p>
          ) : (
            <div style={{ flex: 1 }} />
          )}
        </div>

        <div style={{ padding: "12px 20px 16px" }}>
          {(promotion.valid_from || promotion.valid_until) && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#5b5b5a", marginBottom: "12px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>calendar_today</span>
              <span style={{ fontSize: "12px", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                {t("validFrom")} {formatDate(promotion.valid_from)}{promotion.valid_until ? ` – ${formatDate(promotion.valid_until)}` : ""}
              </span>
            </div>
          )}
          {promotion.terms && (
            <div style={{ borderTop: "1px solid #eeeeee", paddingTop: "12px" }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#b90014", fontWeight: 600, fontSize: "13px", fontFamily: "'Inter', sans-serif" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>info</span>
                {t("terms")}
              </button>
            </div>
          )}
        </div>
      </article>

      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#ffffff", borderRadius: "12px", padding: "32px", maxWidth: "480px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", position: "relative" }}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "#f3f3f3", border: "none", cursor: "pointer", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#5b5b5a" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
            </button>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1c1c", fontFamily: "'Oswald', sans-serif", marginBottom: "6px" }}>
              {promotion.title}
            </h3>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#b90014", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "20px" }}>
              {t("terms")}
            </p>
            <p style={{ fontSize: "14px", color: "#5b5b5a", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
              {promotion.terms}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
