"use client";

import Link from "next/link";

export default function NotFoundClient() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #DD1D21 0%, #A01518 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(251, 206, 7, 0.1)',
        filter: 'blur(80px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(251, 206, 7, 0.15)',
        filter: 'blur(100px)'
      }} />

      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px'
      }}>
        {/* 404 Number */}
        <div style={{
          fontSize: 'clamp(120px, 20vw, 200px)',
          fontWeight: 'bold',
          color: '#FBCE07',
          lineHeight: '1',
          marginBottom: '24px',
          textShadow: '0 8px 24px rgba(0,0,0,0.3)',
          letterSpacing: '-0.05em'
        }}>
          404
        </div>

        {/* Icon */}
        <div style={{
          fontSize: '64px',
          marginBottom: '32px',
          animation: 'float 3s ease-in-out infinite'
        }}>
          ⛽
        </div>

        {/* Message */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '16px',
          textShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          Oops! Wrong Turn
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 3vw, 20px)',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          Looks like you've run out of road. This page doesn't exist, but we can help you get back on track!
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/">
            <button style={{
              background: '#FBCE07',
              color: '#1a1a1a',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            >
              Go Home
            </button>
          </Link>

          <Link href="/services">
            <button style={{
              background: 'transparent',
              color: 'white',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              View Services
            </button>
          </Link>
        </div>

        {/* Quick Links */}
        <div style={{
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Quick Links
          </p>
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/about" style={{
              color: '#FBCE07',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'opacity 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              About Us
            </Link>
            <Link href="/promotions" style={{
              color: '#FBCE07',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'opacity 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Promotions
            </Link>
            <Link href="/contact" style={{
              color: '#FBCE07',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'opacity 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}