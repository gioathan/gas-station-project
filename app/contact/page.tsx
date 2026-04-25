import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactInfoCard from "../components/ContactInfoCard";
import ContactForm from "../components/ContactForm";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const revalidate = 3600;

async function getContactData() {
  const [
    { data: pages },
    { data: contactPage },
    { data: settingsData },
  ] = await Promise.all([
    supabaseClient.from("pages").select("*").eq("show_in_menu", true).order("menu_order"),
    supabaseClient.from("pages").select("*").eq("slug", "contact").single(),
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

  return { pages: pages || [], contactPage, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { contactPage } = await getContactData();
  
  return {
    title: contactPage?.meta_title || 'Contact Us - X Petroleum',
    description: contactPage?.meta_description || 'Get in touch with us',
    keywords: contactPage?.meta_keywords,
    openGraph: {
      title: contactPage?.og_title || contactPage?.meta_title,
      description: contactPage?.og_description || contactPage?.meta_description,
      images: contactPage?.og_image ? [contactPage.og_image] : [],
    },
  };
}

export default async function ContactPage() {
  const { pages, contactPage, settings } = await getContactData();

  return (
    <>
      <StructuredData type="contact" settings={settings} />
      <Navbar pages={pages} />
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #DD1D21 0%, #A01518 100%)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
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
              Get In Touch
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
            {contactPage?.hero_title || 'Contact Us'}
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
            {contactPage?.hero_subtitle || 'We\'re here to help'}
          </p>
        </div>
      </div>

      {/* Contact Info & Map Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '80px auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {/* Phone */}
          <ContactInfoCard
            icon="📞"
            title="Call Us"
            value={settings.contact_phone}
            href={`tel:${settings.contact_phone?.replace(/\s/g, '')}`}
          />

          {/* Email */}
          <ContactInfoCard
            icon="✉️"
            title="Email Us"
            value={settings.contact_email}
            href={`mailto:${settings.contact_email}`}
          />

          {/* Address */}
          <div style={{
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center'
          }}>
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
              📍
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' }}>
              Visit Us
            </h3>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
              {settings.address}
            </p>
          </div>
        </div>

        {/* Hours */}
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '80px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#DD1D21', marginBottom: '24px' }}>
            Opening Hours
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                Weekdays
              </p>
              <p style={{ fontSize: '18px', color: '#666' }}>
                {settings.hours_weekday}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                Weekend
              </p>
              <p style={{ fontSize: '18px', color: '#666' }}>
                {settings.hours_weekend}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Google Maps */}
        {settings.google_maps_embed && (
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}>
            <iframe
              src={settings.google_maps_embed}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </section>

      <Footer settings={settings} />
    </>
  );
}