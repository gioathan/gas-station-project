"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  pages: any[];
}

export default function Navbar({ pages }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const getHref = (slug: string) =>
    slug === "/" || slug === "" || slug.toLowerCase() === "home" ? "/" : `/${slug}`;

  const greekTitles: Record<string, string> = {
    "Home": "Αρχική",
    "Services": "Υπηρεσίες",
    "Promotions": "Προσφορές",
    "About": "Σχετικά",
    "About Us": "Σχετικά",
    "Contact": "Επικοινωνία",
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
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="X Petroleum"
              width={150}
              height={56}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop" style={{ alignItems: "center", gap: "32px" }}>
            {pages.filter(p => p.slug !== "contact").map((page) => {
              const href = getHref(page.slug);
              const isActive = pathname === href;
              return (
                <Link
                  key={page.slug}
                  href={href}
                  className={isActive ? "nav-link nav-link-active" : "nav-link"}
                >
                  {greekTitles[page.title] ?? page.title}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="nav-desktop" style={{ alignItems: "center" }}>
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
                fontFamily: "'Barlow Condensed', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Επικοινωνία
            </Link>
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
            <span style={{
              display: "block", width: "24px", height: "2px",
              background: "#fcd400", transition: "all 0.3s",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: "24px", height: "2px",
              background: "#fcd400", transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "24px", height: "2px",
              background: "#fcd400", transition: "all 0.3s",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 50,
          }}
        />
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
        {/* Nav Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {pages.filter(p => p.slug !== "contact").map((page) => {
            const href = getHref(page.slug);
            const isActive = pathname === href;
            return (
              <Link
                key={page.slug}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive ? "#fcd400" : "#d1d5db",
                  textDecoration: "none",
                  fontWeight: isActive ? 700 : 400,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  display: "block",
                  background: isActive ? "rgba(252,212,0,0.12)" : "transparent",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "15px",
                  borderLeft: isActive ? "3px solid #fcd400" : "3px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {greekTitles[page.title] ?? page.title}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div style={{ marginTop: "32px", paddingBottom: "16px" }}>
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
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.04em",
              display: "block",
            }}
          >
            Επικοινωνία
          </Link>
        </div>
      </div>
    </>
  );
}
