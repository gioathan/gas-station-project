"use client";

interface QuickContactCardProps {
  icon: string;
  title: string;
  content: string | React.ReactNode;
  href?: string;
}

export default function QuickContactCard({ icon, title, content, href }: QuickContactCardProps) {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    transition: 'all 0.3s',
    cursor: href ? 'pointer' : 'default',
    display: 'block'
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    if (href) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    if (href) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  const CardContent = () => (
    <>
      <div style={{ fontSize: '36px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
        {title}
      </h3>
      <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
        {content}
      </div>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        style={cardStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div style={cardStyle}>
      <CardContent />
    </div>
  );
}