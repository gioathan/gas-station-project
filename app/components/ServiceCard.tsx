"use client";

import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <>
      <style global jsx>{`
        .service-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
      `}</style>
      
      <div className="service-card">
        {service.image && (
          <div style={{ position: 'relative', width: '100%', height: '250px' }}>
            <Image
              src={service.image}
              alt={service.title}
              width={400}
              height={250}
              sizes="(max-width: 768px) 100vw, 400px"
              quality={80}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#DD1D21',
              color: 'white',
              fontSize: '36px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              zIndex: 1
            }}>
              {service.icon}
            </div>
          </div>
        )}
        
        <div style={{ padding: '32px' }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#DD1D21',
            marginBottom: '16px'
          }}>
            {service.title}
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            {service.description}
          </p>
        </div>
      </div>
    </>
  );
}