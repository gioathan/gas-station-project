"use client";

interface ContactButtonProps{
    text: string,
    link: string
}

export default function ContactButton({text, link}: ContactButtonProps) {
    return (
        <a href={link || '/contact'}>
            <button style={{
            background: '#FBCE07',
            color: '#1a1a1a',
            padding: '16px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            position: 'relative',
            zIndex: 1
            }}
            onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
            >
            {text}
            </button>
        </a>
    );
}