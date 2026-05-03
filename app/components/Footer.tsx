import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface FooterProps {
  settings: any;
}

export default function Footer({ settings }: FooterProps) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const siteName = settings?.site_name || "X Petroleum";

  return (
    <footer style={{
      background: "#111111",
      borderTop: "1px solid #252525",
      fontFamily: "'Oswald', sans-serif",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "40px" }}>
          <div style={{ maxWidth: "280px" }}>
            <div style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "12px" }}>
              {siteName}
            </div>
            {settings?.address && (
              <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", marginBottom: "8px" }}>
                {settings.address}
              </p>
            )}
            {settings?.contact_phone && (
              <a href={`tel:${settings.contact_phone?.replace(/\s/g, "")}`} className="footer-link" style={{ display: "block", marginBottom: "4px", color: "#fcd400" }}>
                {settings.contact_phone}
              </a>
            )}
            {settings?.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="footer-link">
                {settings.contact_email}
              </a>
            )}
          </div>

          <div>
            <span style={{ display: "block", color: "#ffffff", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
              {t("company")}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/about" className="footer-link">{t("about")}</Link>
              <Link href="/services" className="footer-link">{t("services")}</Link>
              <Link href="/promotions" className="footer-link">{t("promotions")}</Link>
              <Link href="/contact" className="footer-link">{t("contact")}</Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #252525", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px" }}>
              © {year} {siteName}. {t("rights")}
            </p>
            {(settings?.hours_weekday || settings?.hours_weekend) && (
              <p style={{ color: "#6b7280", fontSize: "13px" }}>
                {settings.hours_weekday}
                {settings.hours_weekday && settings.hours_weekend ? " · " : ""}
                {settings.hours_weekend}
              </p>
            )}
          </div>
          <p style={{ color: "#4b5563", fontSize: "11px", lineHeight: "1.5" }}>
            {t("shellDisclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
