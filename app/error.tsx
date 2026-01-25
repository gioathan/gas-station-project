'use client';

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px'
      }}>
        <div style={{
          fontSize: 'clamp(80px, 15vw, 120px)',
          fontWeight: 'bold',
          color: '#FBCE07',
          lineHeight: '1',
          marginBottom: '24px'
        }}>
          500
        </div>

        <div style={{ fontSize: '64px', marginBottom: '32px' }}>
          🚧
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '16px'
        }}>
          Engine Trouble
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 3vw, 20px)',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          Something went wrong on our end. We're working to fix it!
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={reset}
            style={{
              background: '#FBCE07',
              color: '#1a1a1a',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
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
            Try Again
          </button>

          <Link href="/">
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
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}