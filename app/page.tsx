import { supabaseClient } from "@/lib/supabase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
import ServicesSection from "./components/ServicesSection";
import PromotionCard from "./components/PromotionsCard";
import ViewAllButton from "./components/ViewAllButton";
import QuickContactCard from "./components/QuickContactCard";
import CTAButtonYellow from "./components/CTAButtonYellow";
import { Metadata } from "next";
import StructuredData from "./components/StructuredData";

async function getHomeData() {
  // Get pages for nav
  const { data: pages } = await supabaseClient
    .from("pages")
    .select("*")
    .eq("show_in_menu", true)
    .order("menu_order");

  // Get homepage
  const { data: homePage } = await supabaseClient
    .from("pages")
    .select("*")
    .eq("slug", "/")
    .single();

  // Get hero slides for homepage (only if homepage exists)
  let heroSlides = null;
  if (homePage?.id) {
    const { data } = await supabaseClient
      .from("hero_slides")
      .select("*")
      .eq("page_id", homePage.id)
      .eq("is_active", true)
      .order("order_index");
    heroSlides = data;
  }

  // Get services
  const { data: services } = await supabaseClient
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("order_index")
    .limit(6);

  // Get featured promotions (top 3)
  const { data: promotions } = await supabaseClient
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .order("order_index")
    .limit(3);

  // Get settings
  const { data: settingsData } = await supabaseClient
    .from("settings")
    .select("*");

  const settings: any = {};
  settingsData?.forEach((setting: any) => {
    try {
      settings[setting.key] = JSON.parse(setting.value);
    } catch {
      settings[setting.key] = setting.value;
    }
  });

  return { pages, homePage, heroSlides, services, promotions, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { homePage, settings } = await getHomeData();
  
  return {
    title: homePage?.meta_title || 'Welcome - Shell Gas Station',
    description: homePage?.meta_description || 'Premium fuel and services',
    keywords: homePage?.meta_keywords,
    openGraph: {
      title: homePage?.og_title || homePage?.meta_title,
      description: homePage?.og_description || homePage?.meta_description,
      images: homePage?.og_image ? [homePage.og_image] : [],
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const { pages, homePage, heroSlides, services, promotions, settings } = await getHomeData();

  return (
    <>
      <StructuredData type="home" settings={settings} />
      <Navbar pages={pages || []} />
      
      {/* Hero Carousel */}
      {heroSlides && heroSlides.length > 0 ? (
        <HeroCarousel slides={heroSlides} />
      ) : homePage?.hero_image ? (
        <div style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${homePage.hero_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
              {homePage.hero_title}
            </h1>
            <p style={{ fontSize: '24px' }}>
              {homePage.hero_subtitle}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ height: '600px', background: '#DD1D21', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <div>
            <h1 style={{ fontSize: '48px' }}>Welcome to Our Gas Station</h1>
            <p style={{ fontSize: '24px' }}>Quality fuel and service</p>
          </div>
        </div>
      )}

      {/* Services Preview */}
      {services && services.length > 0 && (
        <ServicesSection services={services} />
      )}

      {/* Featured Promotions */}
      {promotions && promotions.length > 0 && (
        <section style={{
          background: '#f5f5f5',
          padding: '80px 24px'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#DD1D21', marginBottom: '16px' }}>
                Current Promotions
              </h2>
              <p style={{ fontSize: '18px', color: '#666' }}>
                Don't miss out on our special offers
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px',
              marginBottom: '48px'
            }}>
              {promotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <ViewAllButton href="/promotions">
                View All Promotions
              </ViewAllButton>
            </div>
          </div>
        </section>
      )}

      {/* Quick Contact Section */}
      <section style={{
        background: 'linear-gradient(135deg, #DD1D21 0%, #A01518 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(251, 206, 7, 0.1)',
          filter: 'blur(40px)'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
              Visit Us Today
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}>
              We're here to serve you
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {/* Phone */}
            <QuickContactCard
              icon="📞"
              title="Call Us"
              content={<p style={{ fontSize: '20px', color: '#FBCE07', fontWeight: '600', margin: 0 }}>{settings.contact_phone}</p>}
              href={`tel:${settings.contact_phone?.replace(/\s/g, '')}`}
            />

            {/* Address */}
            <QuickContactCard
              icon="📍"
              title="Location"
              content={settings.address}
            />

            {/* Hours */}
            <QuickContactCard
              icon="🕐"
              title="Hours"
              content={
                <>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '4px', margin: 0 }}>
                    Weekdays: {settings.hours_weekday}
                  </p>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                    Weekend: {settings.hours_weekend}
                  </p>
                </>
              }
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <CTAButtonYellow href="/contact">
              Get Directions
            </CTAButtonYellow>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}