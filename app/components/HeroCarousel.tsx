"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HeroSlide {
  image_url: string;
  title: string;
  subtitle: string;
  cta_text?: string;
  cta_link?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  if (!slides || slides.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        .hero-swiper {
          padding: 40px 24px;
          background: #f5f5f5;
        }
        
        .hero-swiper .swiper {
          max-width: 1400px;
          margin: 0 auto;
          height: 550px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          background: transparent;
          border: none;
          width: 56px !important;
          height: 56px !important;
          color: #FBCE07 !important;
          font-weight: bold;
          transition: all 0.3s;
        }
        
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 32px;
          font-weight: bold;
        }
        
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          color: #FFF !important;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: transparent;
          border: 2px solid #FBCE07;
          opacity: 1;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          background: #FBCE07;
        }
        
        .hero-slide-cta {
          background: #FBCE07;
          color: #1a1a1a;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .hero-slide-cta:hover {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none !important;
          }
          
          .hero-swiper .swiper {
            height: 500px;
          }
          
          .hero-slide-title {
            font-size: 28px !important;
          }
          
          .hero-slide-subtitle {
            font-size: 16px !important;
            margin-bottom: 100px !important;
          }
          
          .hero-slide-cta {
            font-size: 16px !important;
            padding: 12px 24px !important;
          }
        }
      `}</style>
      
      <div className="hero-swiper">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 24px'
              }}>
                <div>
                  <h1 className="hero-slide-title" style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {slide.title}
                  </h1>
                  <p className="hero-slide-subtitle" style={{
                    fontSize: '24px',
                    marginBottom: '32px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {slide.subtitle}
                  </p>
                  {slide.cta_text && slide.cta_link && (
                    <Link href={slide.cta_link}>
                      <button className="hero-slide-cta">
                        {slide.cta_text}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}