"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <div className="hero-swiper-wrap">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={slides.length > 1}
        spaceBetween={0}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={{
              backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 60%, transparent 100%), url(${slide.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0 0 0 0",
            }}>
              <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 32px",
                width: "100%",
              }}>
                <div style={{ maxWidth: "560px" }}>
                  <h1 style={{
                    fontSize: "clamp(32px, 5vw, 52px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontFamily: "'Work Sans', sans-serif",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "16px",
                    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}>
                    {slide.title}
                  </h1>
                  <p style={{
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.6,
                    marginBottom: "32px",
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {slide.subtitle}
                  </p>
                  {slide.cta_text && slide.cta_link && (
                    <Link href={slide.cta_link} style={{ textDecoration: "none" }}>
                      <button style={{
                        background: "#fcd400",
                        color: "#5a4a00",
                        padding: "14px 36px",
                        fontSize: "14px",
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(252,212,0,0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      >
                        {slide.cta_text}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
