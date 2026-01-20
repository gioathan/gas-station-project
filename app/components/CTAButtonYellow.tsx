"use client";

import Link from "next/link";

interface CTAButtonYellowProps {
  href: string;
  children: React.ReactNode;
}

export default function CTAButtonYellow({ href, children }: CTAButtonYellowProps) {
  return (
    <Link href={href}>
      <button style={{
        background: '#FBCE07',
        color: '#1a1a1a',
        padding: '16px 48px',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {children}
      </button>
    </Link>
  );
}