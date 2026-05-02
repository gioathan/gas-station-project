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
      <section style={{
        height: '260px',
        background: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{ padding: '0 24px', maxWidth: '800px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: "'Work Sans', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            {contactPage?.hero_title || 'Επικοινωνία'}
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
          }}>
            {contactPage?.hero_subtitle || 'Είμαστε εδώ για εσάς'}
          </p>
        </div>
      </section>

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
            title="Τηλεφωνήστε μας"
            value={settings.contact_phone}
            href={`tel:${settings.contact_phone?.replace(/\s/g, '')}`}
          />

          {/* Email */}
          <ContactInfoCard
            icon="✉️"
            title="Email"
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
              Επισκεφτείτε μας
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
            Ώρες Λειτουργίας
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
                Καθημερινές
              </p>
              <p style={{ fontSize: '18px', color: '#666' }}>
                {settings.hours_weekday}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                Σαββατοκύριακο
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