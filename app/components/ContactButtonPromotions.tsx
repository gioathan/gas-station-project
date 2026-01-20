"use client";

interface ContactButtonPromotionsProps{
    link: string
}

export default function ContactButtonPromotions({link}: ContactButtonPromotionsProps) {
    return (
        <a href={link}>
            <button style={{
            background: '#DD1D21',
            color: 'white',
            padding: '16px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
            }}
            onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
            >
            Learn More
            </button>
        </a>
    )
}