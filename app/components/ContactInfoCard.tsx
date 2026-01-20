"use client";

interface ContactInfoCardProps {
  icon: string;
  title: string;
  value: string;
  href: string;
}

export default function ContactInfoCard({ icon, title, value, href }: ContactInfoCardProps) {
  return (
    <a href={href} style={{
      background: 'white',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '32px',
      textAlign: 'center',
      textDecoration: 'none',
      transition: 'all 0.3s',
      cursor: 'pointer',
      display: 'block'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = '#DD1D21';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = '#e0e0e0';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        background: '#DD1D21',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: '28px'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '18px', color: '#DD1D21', fontWeight: '600' }}>
        {value}
      </p>
    </a>
  );
}