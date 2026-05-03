"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

interface NavbarProps {
  pages: any[];
}

export default function Navbar({ pages }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("nav");

  const getHref = (slug: string): string =>
    slug === "/" || slug === "" || slug.toLowerCase() === "home" ? "/" : `/${slug}`;

  const navKeyMap: Record<string, string> = {
    "/": t("home"),
    "": t("home"),
    "services": t("services"),
    "promotions": t("promotions"),
    "about": t("about"),
    "contact": t("contact"),
  };

  const getNavLabel = (slug: string) => navKeyMap[slug] ?? slug;

  const switchLocale = (newLocale: string) => {
    router.replace(pathname ?? "/", { locale: newLocale });
  };

  return (
    <>
      <header style={{
        background: "#111111",
        borderBottom: "1px solid #252525",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.4)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
        }}>
          {/* Logo + Shell badge */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: 0 }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <Image
                src="/logo.png"
                alt="X Petroleum"
                width={150}
                height={56}
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>
            <span style={{
              fontSize: "9px",
              fontWeight: 700,
              color: "#fcd400",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1,
              paddingLeft: "2px",
            }}>
              {t("shellBadge")}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="nav-desktop" style={{ alignItems: "center", gap: "32px" }}>
            {pages.filter(p => p.slug !== "contact").map((page) => {
              const href = getHref(page.slug);
              const isActive = pathname === href;
              return (
                <Link
                  key={page.slug}
                  href={href as any}
                  className={isActive ? "nav-link nav-link-active" : "nav-link"}
                >
                  {getNavLabel(page.slug)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right side: contact CTA + locale switcher */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: "12px" }}>
            <Link
              href="/contact"
              style={{
                background: pathname === "/contact" ? "#fcd400" : "#e31b23",
                color: pathname === "/contact" ? "#5a4a00" : "#ffffff",
                padding: "8px 20px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                fontFamily: "'Oswald', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {t("contact")}
            </Link>

            {/* Language switcher */}
            <div style={{ display: "flex", gap: "4px" }}>
              {(["el", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  style={{
                    background: locale === l ? "#fcd400" : "transparent",
                    color: locale === l ? "#5a4a00" : "#9ca3af",
                    border: "1px solid",
                    borderColor: locale === l ? "#fcd400" : "#3a3a3a",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Burger Button */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              gap: "5px",
              overflow: "visible",
            }}
          >
            <span style={{ display: "block", width: "24px", height: "2px", background: "#fcd400", transition: "all 0.3s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "24px", height: "2px", background: "#fcd400", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "24px", height: "2px", background: "#fcd400", transition: "all 0.3s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50 }} />
      )}

      {/* Mobile Slide-in Menu */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "280px",
        height: "100dvh",
        background: "#111111",
        borderRight: "1px solid #252525",
        padding: "24px 20px",
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        zIndex: 55,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {pages.filter(p => p.slug !== "contact").map((page) => {
            const href = getHref(page.slug);
            const isActive = pathname === href;
            return (
              <Link
                key={page.slug}
                href={href as any}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive ? "#fcd400" : "#d1d5db",
                  textDecoration: "none",
                  fontWeight: isActive ? 700 : 400,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  display: "block",
                  background: isActive ? "rgba(252,212,0,0.12)" : "transparent",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "15px",
                  borderLeft: isActive ? "3px solid #fcd400" : "3px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {getNavLabel(page.slug)}
              </Link>
            );
          })}
        </nav>

        {/* Mobile locale switcher */}
        <div style={{ display: "flex", gap: "8px", padding: "16px 16px 8px" }}>
          {(["el", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => { switchLocale(l); setMenuOpen(false); }}
              style={{
                background: locale === l ? "#fcd400" : "#252525",
                color: locale === l ? "#5a4a00" : "#9ca3af",
                border: "1px solid",
                borderColor: locale === l ? "#fcd400" : "#3a3a3a",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={{ paddingBottom: "16px" }}>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              background: pathname === "/contact" ? "#fcd400" : "#e31b23",
              color: pathname === "/contact" ? "#5a4a00" : "#ffffff",
              padding: "12px 20px",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              textAlign: "center",
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.04em",
              display: "block",
            }}
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </>
  );
}
