"use client";

import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ViewAllButton({ href, children }: ViewAllButtonProps) {
  return (
    <Link href={href}>
      <button style={{
        background: '#DD1D21',
        color: 'white',
        padding: '16px 32px',
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