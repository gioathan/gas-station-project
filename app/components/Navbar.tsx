"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  pages: any[];
}

export default function Navbar({ pages }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        .nav-links {
          display: flex;
          gap: 32px;
        }
        
        .burger-menu {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 1001;
        }
        
        .burger-line {
          width: 25px;
          height: 3px;
          background: #FBCE07;
          transition: all 0.3s;
        }
        
        .mobile-menu {
          display: none;
        }
        
        .mobile-overlay {
          display: none;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .burger-menu {
            display: flex;
          }
          
          .mobile-menu {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: #DD1D21;
            padding: 80px 24px 24px;
            transition: transform 0.3s ease;
            z-index: 1000;
          }
          
          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 999;
          }
        }
      `}</style>

      <nav style={{
        background: "#DD1D21",
        padding: "16px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: 1002
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {/* Burger Menu Icon */}
        <div 
            className="burger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
                marginRight: '8px'
            }}
            >
            <div className="burger-line" style={{
                transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
            }}></div>
            <div className="burger-line" style={{
                opacity: menuOpen ? 0 : 1
            }}></div>
            <div className="burger-line" style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
            }}></div>
        </div>

          <Link href="/" style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#FBCE07",
            textDecoration: "none"
          }}>
            Gas Station
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#FBCE07"}
                onMouseOut={(e) => e.currentTarget.style.color = "white"}
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className="mobile-overlay"
        onClick={() => setMenuOpen(false)}
        style={{
          display: menuOpen ? 'block' : 'none'
        }}
      />

      {/* Mobile Menu */}
      <div 
        className="mobile-menu"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: menuOpen ? '2px 0 8px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "#FBCE07"}
            onMouseOut={(e) => e.currentTarget.style.color = "white"}
          >
            {page.title}
          </Link>
        ))}
      </div>
    </>
  );
}