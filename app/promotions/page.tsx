import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromotionCard from "../components/PromotionsCard";
import Link from "next/link";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const revalidate = 3600;

async function getPromotionsData() {
  const [
    { data: pages },
    { data: promotionsPage },
    { data: promotions },
    { data: settingsData },
  ] = await Promise.all([
    supabaseClient.from("pages").select("*").eq("show_in_menu", true).order("menu_order"),
    supabaseClient.from("pages").select("*").eq("slug", "promotions").single(),
    supabaseClient.from("promotions").select("*").eq("is_active", true).order("order_index"),
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

  return { pages: pages || [], promotionsPage, promotions, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const { promotionsPage } = await getPromotionsData();
  return {
    title: promotionsPage?.meta_title || "Current Promotions - X Petroleum",
    description: promotionsPage?.meta_description || "Check out our latest deals",
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
      <StructuredData type="promotions" settings={settings} pageData={{ promotions }} />
      <Navbar pages={pages} />

      {/* ── Page Header ── */}
      <section style={{
        height: "260px",
        background: "#2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}>
        <div style={{ padding: "0 24px", maxWidth: "800px" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "'Work Sans', sans-serif",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            {promotionsPage?.hero_title || "Τρέχουσες Προσφορές"}
          </h1>
          <p style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
          }}>
            {promotionsPage?.hero_subtitle || "Εξοικονόμησε με τις ειδικές μας προσφορές. Σχεδιασμένες για τον σύγχρονο ταξιδιώτη."}
          </p>
        </div>
      </section>

      {/* ── Promotions Grid ── */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}>
        {promotions && promotions.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "80px 24px",
            background: "#f3f3f3",
            borderRadius: "12px",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "#e2e2e2", display: "block", marginBottom: "24px" }}>
              celebration
            </span>
            <h2 style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#1a1c1c",
              fontFamily: "'Work Sans', sans-serif",
              marginBottom: "12px",
            }}>
              Δεν υπάρχουν Ενεργές Προσφορές
            </h2>
            <p style={{ fontSize: "17px", color: "#5b5b5a", fontFamily: "'Inter', sans-serif" }}>
              Επισκέψου μας σύντομα για νέες προσφορές!
            </p>
          </div>
        )}
      </section>

      {/* ── Loyalty Program ── */}
      <section style={{ background: "#f3f3f3", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            background: "#ffffff",
            border: "1px solid #e2e2e2",
            borderRadius: "12px",
            padding: "48px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "40px",
          }}>
            {/* Icon */}
            <div style={{
              width: "88px",
              height: "88px",
              background: "#fcd400",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "44px", color: "#5a4a00" }}>loyalty</span>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: "240px" }}>
              <h2 style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1a1c1c",
                fontFamily: "'Work Sans', sans-serif",
                letterSpacing: "-0.01em",
                marginBottom: "10px",
              }}>
                Μάθε Περισσότερα για Εμάς
              </h2>
              <p style={{
                fontSize: "16px",
                color: "#5b5b5a",
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
              }}>
                Ανακάλυψε την ιστορία μας, τις αξίες μας και γιατί οι πελάτες μας μας εμπιστεύονται χρόνια.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              style={{
                background: "linear-gradient(135deg, #e31b23 0%, #a01518 100%)",
                color: "#ffffff",
                padding: "14px 36px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              Σχετικά με εμάς
            </Link>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}
