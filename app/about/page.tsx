import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactButton from "../components/ContactButton";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

async function getAboutData() {
  // Get pages for nav
  const { data: pages } = await supabaseClient
    .from("pages")
    .select("*")
    .eq("show_in_menu", true)
    .order("menu_order");

  // Get about page
  const { data: aboutPage } = await supabaseClient
    .from("pages")
    .select("*")
    .eq("slug", "about")
    .single();

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

  return { pages: pages || [], aboutPage, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { aboutPage } = await getAboutData();
  
  return {
    title: aboutPage?.meta_title || 'About Us - Shell Gas Station',
    description: aboutPage?.meta_description || 'Our story and values',
    keywords: aboutPage?.meta_keywords,
    openGraph: {
      title: aboutPage?.og_title || aboutPage?.meta_title,
      description: aboutPage?.og_description || aboutPage?.meta_description,
      images: aboutPage?.og_image ? [aboutPage.og_image] : [],
    },
  };
}

export default async function AboutPage() {
  const { pages, aboutPage, settings } = await getAboutData();

  return (
    <>
      <StructuredData 
        type="about" 
        settings={settings} 
        pageData={{ content: aboutPage?.content }} 
      />
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
              Our Story
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
            {aboutPage?.hero_title || 'About Us'}
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
            {aboutPage?.hero_subtitle || 'Serving the community since 2010'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section style={{
        maxWidth: '1200px',
        margin: '80px auto',
        padding: '0 24px'
      }}>
        {/* Story Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '64px',
          alignItems: 'center',
          marginBottom: '80px'
        }}>
          {aboutPage?.hero_image && (
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={aboutPage.hero_image} 
                alt="About us" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
          <div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#DD1D21',
              marginBottom: '24px'
            }}>
              Our Journey
            </h2>
            <div style={{
              fontSize: '18px',
              color: '#666',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap'
            }}>
              {aboutPage?.content || 'We are a family-owned Shell gas station committed to providing exceptional service to our community. Our experienced team ensures every customer receives the quality and care they deserve.'}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div style={{
          background: '#f5f5f5',
          borderRadius: '12px',
          padding: '64px 48px',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#DD1D21',
            marginBottom: '48px',
            textAlign: 'center'
          }}>
            Why Choose Us
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#DD1D21',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '36px'
              }}>
                ⭐
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '12px' }}>
                Quality First
              </h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                Premium Shell fuel and products you can trust
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#DD1D21',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '36px'
              }}>
                🤝
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '12px' }}>
                Customer Care
              </h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                Friendly service and support every time
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#DD1D21',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '36px'
              }}>
                🏆
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '12px' }}>
                Local Expertise
              </h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                Serving our community with pride since 2010
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {aboutPage?.cta_text && (
          <div style={{
            background: 'linear-gradient(135deg, #DD1D21 0%, #A01518 100%)',
            borderRadius: '12px',
            padding: '64px 48px',
            textAlign: 'center',
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
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              position: 'relative',
              zIndex: 1
            }}>
              Visit Us Today
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '32px',
              position: 'relative',
              zIndex: 1
            }}>
              Experience the difference of quality service and premium fuel
            </p>
            <ContactButton
              text={aboutPage.cta_text}
              link={aboutPage.cta_link || '/contact'}
            />
          </div>
        )}
      </section>

      <Footer settings={settings} />
    </>
  );
}