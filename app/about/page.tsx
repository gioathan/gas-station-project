import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactButton from "../components/ContactButton";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const revalidate = 3600;

async function getAboutData() {
  const [
    { data: pages },
    { data: aboutPage },
    { data: values },
    { data: settingsData },
  ] = await Promise.all([
    supabaseClient.from("pages").select("*").eq("show_in_menu", true).order("menu_order"),
    supabaseClient.from("pages").select("*").eq("slug", "about").single(),
    supabaseClient.from("values").select("*").eq("is_active", true).order("order_index"),
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

  return { pages: pages || [], aboutPage, values: values || [], settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { aboutPage } = await getAboutData();
  
  return {
    title: aboutPage?.meta_title || 'About Us - X Petroleum',
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
  const { pages, aboutPage, values, settings } = await getAboutData();

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
        padding: '60px 24px',
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
            padding: '6px 20px',
            borderRadius: '50px',
            marginBottom: '16px',
            border: '2px solid rgba(251, 206, 7, 0.3)'
          }}>
            <span style={{
              color: '#FBCE07',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Our Story
            </span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            {aboutPage?.hero_title || 'About Us'}
          </h1>
          
          <div style={{
            width: '80px',
            height: '4px',
            background: '#FBCE07',
            margin: '0 auto 24px',
            borderRadius: '2px'
          }} />
          
          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            padding: '0 16px'
          }}>
            {aboutPage?.hero_subtitle || 'Serving the community since 2010'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 24px'
      }}>
        {/* Story Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: aboutPage?.hero_image ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          marginBottom: '60px'
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
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 'bold',
              color: '#DD1D21',
              marginBottom: '24px'
            }}>
              Our Journey
            </h2>
            <div style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#666',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap'
            }}>
              {aboutPage?.content || 'We are a family-owned X Petroleum gas station committed to providing exceptional service to our community. Our experienced team ensures every customer receives the quality and care they deserve.'}
            </div>
          </div>
        </div>

        {/* Values Section - Now Dynamic */}
        {values.length > 0 && (
          <div style={{
            background: '#f5f5f5',
            borderRadius: '12px',
            padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
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
              {values.map((value) => (
                <div key={value.id} style={{ textAlign: 'center' }}>
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
                    {value.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: 'clamp(20px, 3vw, 24px)', 
                    fontWeight: 'bold', 
                    color: '#1a1a1a', 
                    marginBottom: '12px' 
                  }}>
                    {value.title}
                  </h3>
                  <p style={{ 
                    fontSize: 'clamp(14px, 2vw, 16px)', 
                    color: '#666', 
                    lineHeight: '1.6',
                    padding: '0 8px'
                  }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {aboutPage?.cta_text && (
          <div style={{
            background: 'linear-gradient(135deg, #DD1D21 0%, #A01518 100%)',
            borderRadius: '12px',
            padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)',
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
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              position: 'relative',
              zIndex: 1
            }}>
              Visit Us Today
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '24px',
              position: 'relative',
              zIndex: 1,
              padding: '0 16px'
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