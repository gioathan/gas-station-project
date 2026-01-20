"use client";

import Image from 'next/image';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_text: string;
  terms: string;
  image: string;
  valid_from: string;
  valid_until: string;
}

interface PromotionCardProps {
  promotion: Promotion;
}

export default function PromotionCard({ promotion }: PromotionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <style jsx global>{`
        .promotion-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        
        .promotion-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        
        .discount-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #DD1D21;
          color: #FBCE07;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 3px solid #FBCE07;
          z-index: 1;
        }
      `}</style>
      
      <div className="promotion-card">
        {promotion.image && (
          <div style={{ position: 'relative', width: '100%', height: '250px' }}>
            <Image
              src={promotion.image}
              alt={promotion.title}
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
            {promotion.discount_text && (
              <div className="discount-badge">
                {promotion.discount_text}
              </div>
            )}
          </div>
        )}
        
        <div style={{ padding: '32px' }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#DD1D21',
            marginBottom: '16px'
          }}>
            {promotion.title}
          </h3>
          
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            {promotion.description}
          </p>
          
          {/* Valid Dates */}
          <div style={{
            background: '#f5f5f5',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#888',
              margin: 0
            }}>
              Valid: {formatDate(promotion.valid_from)} - {formatDate(promotion.valid_until)}
            </p>
          </div>
          
          {/* Terms */}
          {promotion.terms && (
            <details style={{ marginTop: '16px' }}>
              <summary style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#DD1D21',
                cursor: 'pointer',
                marginBottom: '8px'
              }}>
                Terms & Conditions
              </summary>
              <p style={{
                fontSize: '13px',
                color: '#888',
                lineHeight: '1.6',
                marginTop: '8px'
              }}>
                {promotion.terms}
              </p>
            </details>
          )}
        </div>
      </div>
    </>
  );
}