import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromotionCard from "../components/PromotionsCard";
import ContactButtonPromotions from "../components/ContactButtonPromotions";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

async function getPromotionsData() {
  // Get pages for nav
  const { data: pages } = await supabaseClient
    .from("pages")
    .select("*")
    .eq("show_in_menu", true)
    .order("menu_order");

  // Get promotions page
  const { data: promotionsPage } = await supabaseClient
    .from("pages")
    .select("*")
    .eq("slug", "promotions")
    .single();

  // Get active promotions
  const { data: promotions } = await supabaseClient
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

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

  return { pages: pages || [], promotionsPage, promotions, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { promotionsPage } = await getPromotionsData();
  
  return {
    title: promotionsPage?.meta_title || 'Current Promotions - Shell Gas Station',
    description: promotionsPage?.meta_description || 'Check out our latest deals',
    keywords: promotionsPage?.meta_keywords,
    openGraph: {
      title: promotionsPage?.og_title || promotionsPage?.meta_title,
      description: promotionsPage?.og_description || promotionsPage?.meta_description,
      images: promotionsPage?.og_image ? [promotionsPage.og_image] : [],
    },
  };
}

export default async function PromotionsPage() {
  const { pages, promotionsPage, promotions, settings } = await getPromotionsData();

  return (
    <>
      <StructuredData 
        type="promotions" 
        settings={settings} 
        pageData={{ promotions }} 
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
              Limited Time Offers
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
            {promotionsPage?.hero_title || 'Current Promotions'}
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
            {promotionsPage?.hero_subtitle || 'Save more with our special offers'}
          </p>
        </div>
      </div>

      {/* Promotions Grid */}
      <section style={{
        maxWidth: '1400px',
        margin: '80px auto',
        padding: '0 24px'
      }}>
        {promotions && promotions.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: '#f5f5f5',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
              No Active Promotions
            </h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Check back soon for exciting offers and deals!
            </p>
          </div>
        )}
      </section>

      {/* Shell Rewards Section */}
      <section style={{
        background: '#f5f5f5',
        padding: '80px 24px',
        marginTop: '80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
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
            🎁
          </div>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#DD1D21',
            marginBottom: '16px'
          }}>
            Join Shell Rewards
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#666',
            marginBottom: '32px',
            maxWidth: '700px',
            margin: '0 auto 32px'
          }}>
            Earn points on every purchase and unlock exclusive rewards. Sign up today and start saving!
          </p>
          
          <ContactButtonPromotions
            link="/contact"
          />
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}