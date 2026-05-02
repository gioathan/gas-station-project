import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactButton from "../components/ContactButton";
import PageHero from "../components/PageHero";
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
      
      <PageHero
        label="Σχετικά"
        title={aboutPage?.hero_title || 'Σχετικά με εμάς'}
        subtitle={aboutPage?.hero_subtitle}
      />

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
              fontWeight: 700,
              color: '#b90014',
              marginBottom: '24px',
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: '-0.01em',
            }}>
              Η Πορεία μας
            </h2>
            <div style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#666',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap'
            }}>
              {aboutPage?.content || 'Είμαστε ένας οικογενειακός σταθμός X Petroleum με δέσμευση στην ποιοτική εξυπηρέτηση της κοινότητάς μας. Η έμπειρη ομάδα μας διασφαλίζει ότι κάθε πελάτης λαμβάνει την ποιότητα και τη φροντίδα που αξίζει.'}
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
              fontWeight: 700,
              color: '#1a1c1c',
              marginBottom: '8px',
              textAlign: 'center',
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: '-0.01em',
            }}>
              Γιατί να μας Επιλέξεις
            </h2>
            <div style={{ width: '48px', height: '3px', background: '#e31b23', margin: '0 auto 40px' }} />
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
            background: '#e31b23',
            borderRadius: '12px',
            padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '12px',
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: '-0.01em',
            }}>
              Επισκέψου μας Σήμερα
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 17px)',
              color: 'rgba(255, 255, 255, 0.88)',
              marginBottom: '28px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.6,
            }}>
              Νιώσε τη διαφορά της ποιοτικής εξυπηρέτησης και των premium καυσίμων
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