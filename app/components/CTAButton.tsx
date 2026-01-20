"use client";

import Link from "next/link";

interface CTAButtonProps {
  text: string;
  link: string;
}

export default function CTAButton({ text, link }: CTAButtonProps) {
  return (
    <>
      <style jsx global>{`
        .cta-button {
          background: #FBCE07;
          color: #1a1a1a;
          padding: 16px 48px;
          font-size: 18px;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .cta-button:hover {
          transform: scale(1.05);
        }
      `}</style>
      
      <Link href={link}>
        <button className="cta-button">
          {text}
        </button>
      </Link>
    </>
  );
}