import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import CTAButton from "../components/CTAButton";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const revalidate = 3600;

async function getServicesData() {
  const [
    { data: pages },
    { data: servicesPage },
    { data: services },
    { data: settingsData },
  ] = await Promise.all([
    supabaseClient.from("pages").select("*").eq("show_in_menu", true).order("menu_order"),
    supabaseClient.from("pages").select("*").eq("slug", "services").single(),
    supabaseClient.from("services").select("*").eq("is_active", true).order("order_index"),
    supabaseClient.from("settings").select("*"),
  ]);

  const settings: any = {};
  settingsData?.forEach((setting: any) => {
    try {
      settings[setting.key] = JSON.parse(setting.value);
    } catch {
      settings[setting.key] = setting.value;
    }
  });

  return { pages: pages || [], servicesPage, services, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { servicesPage, settings } = await getServicesData();
  
  return {
    title: servicesPage?.meta_title || 'Our Services - X Petroleum',
    description: servicesPage?.meta_description || 'Premium fuel, car wash, and convenience store services',
    keywords: servicesPage?.meta_keywords || 'gas station, X Petroleum, fuel, car wash',
    openGraph: {
      title: servicesPage?.og_title || servicesPage?.meta_title || 'Our Services',
      description: servicesPage?.og_description || servicesPage?.meta_description || 'Premium services',
      images: servicesPage?.og_image ? [servicesPage.og_image] : [],
      type: 'website',
      siteName: settings.site_name || 'X Petroleum',
    },
    twitter: {
      card: 'summary_large_image',
      title: servicesPage?.og_title || servicesPage?.meta_title,
      description: servicesPage?.og_description || servicesPage?.meta_description,
      images: servicesPage?.og_image ? [servicesPage.og_image] : [],
    }
  };
}


export default async function ServicesPage() {
  const { pages, servicesPage, services, settings } = await getServicesData();

  return (
    <>
      <StructuredData 
        type="services" 
        settings={settings} 
        pageData={{ services }} 
      />
      <Navbar pages={pages} />
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #DD1D21 0%, #A01518 100%)',
        padding: '100px 24px',
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
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(251, 206, 7, 0.15)',
          filter: 'blur(60px)'
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(251, 206, 7, 0.2)',
            padding: '8px 24px',
            borderRadius: '50px',
            marginBottom: '24px',
            border: '2px solid rgba(251, 206, 7, 0.3)'
          }}>
            <span style={{
              color: '#FBCE07',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              What We Offer
            </span>
          </div>
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            {servicesPage?.hero_title || 'Our Services'}
          </h1>
          
          <div style={{
            width: '80px',
            height: '4px',
            background: '#FBCE07',
            margin: '0 auto 32px',
            borderRadius: '2px'
          }} />
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {servicesPage?.hero_subtitle || 'Everything you need in one stop'}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section style={{
        maxWidth: '1400px',
        margin: '80px auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {servicesPage?.cta_text && (
        <section style={{
          background: '#DD1D21',
          padding: '80px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px'
            }}>
              Ready to experience our services?
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'white',
              marginBottom: '32px',
              opacity: 0.9
            }}>
              Visit us today or contact us for more information
            </p>
            <CTAButton 
              text={servicesPage.cta_text} 
              link={servicesPage.cta_link || '/contact'} 
            />
          </div>
        </section>
      )}

      <Footer settings={settings} />
    </>
  );
}