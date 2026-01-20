"use client";

import Link from "next/link";
import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '48px', color: '#1a1a1a' }}>
        Our Services
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
      }}>
        {services?.map((service) => (
          <div key={service.id} style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            {service.image && (
              <Image 
                src={service.image} 
                alt={service.title}
                width={400}
                height={200}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '16px'
                }}
                quality={80}
                loading="lazy"
              />
            )}
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{service.icon}</div>
            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#DD1D21' }}>
              {service.title}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link href="/services">
          <button style={{
            background: '#DD1D21',
            color: 'white',
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            View All Services
          </button>
        </Link>
      </div>
    </section>
  );
}