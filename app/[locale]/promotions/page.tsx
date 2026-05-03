import { supabaseClient } from "@/lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PromotionCard from "../../components/PromotionsCard";
import PageHero from "../../components/PageHero";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import StructuredData from "../../components/StructuredData";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

function loc(row: any, field: string, locale: string) {
  return (locale === "en" && row?.[`${field}_en`]) ? row[`${field}_en`] : row?.[field];
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { promotionsPage } = await getPromotionsData();
  return {
    title: loc(promotionsPage, "meta_title", locale) || "Current Promotions - X Petroleum",
    description: loc(promotionsPage, "meta_description", locale) || "Check out our latest deals",
    keywords: promotionsPage?.meta_keywords,
    openGraph: {
      title: loc(promotionsPage, "og_title", locale) || loc(promotionsPage, "meta_title", locale),
      description: loc(promotionsPage, "og_description", locale) || loc(promotionsPage, "meta_description", locale),
      images: promotionsPage?.og_image ? [promotionsPage.og_image] : [],
    },
  };
}

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "promotions" });
  const { pages, promotionsPage, promotions, settings } = await getPromotionsData();

  const localizedPromotions = promotions?.map((p: any) => ({
    ...p,
    title: loc(p, "title", locale),
    description: loc(p, "description", locale),
    discount_text: loc(p, "discount_text", locale),
    terms: loc(p, "terms", locale),
  }));

  return (
    <>
      <StructuredData type="promotions" settings={settings} pageData={{ promotions }} />
      <Navbar pages={pages} />

      <PageHero
        label={t("label")}
        title={loc(promotionsPage, "hero_title", locale) || t("heroTitle")}
        subtitle={loc(promotionsPage, "hero_subtitle", locale)}
      />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        {localizedPromotions && localizedPromotions.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {localizedPromotions.map((promotion: any) => (
              <PromotionCard key={promotion.id} promotion={promotion} locale={locale} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px", background: "#f3f3f3", borderRadius: "12px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "#e2e2e2", display: "block", marginBottom: "24px" }}>celebration</span>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1c1c", fontFamily: "'Oswald', sans-serif", marginBottom: "12px" }}>
              {t("noPromotions")}
            </h2>
            <p style={{ fontSize: "17px", color: "#5b5b5a", fontFamily: "'Inter', sans-serif" }}>
              {t("noPromotionsDesc")}
            </p>
          </div>
        )}
      </section>

      <section style={{ background: "#f3f3f3", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e2e2", borderRadius: "12px", padding: "48px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
            <div style={{ width: "88px", height: "88px", background: "#fcd400", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "44px", color: "#5a4a00" }}>loyalty</span>
            </div>
            <div style={{ flex: 1, minWidth: "240px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1c1c", fontFamily: "'Oswald', sans-serif", letterSpacing: "-0.01em", marginBottom: "10px" }}>
                {t("learnMoreTitle")}
              </h2>
              <p style={{ fontSize: "16px", color: "#5b5b5a", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                {t("learnMoreDesc")}
              </p>
            </div>
            <Link
              href="/about"
              style={{ background: "linear-gradient(135deg, #e31b23 0%, #a01518 100%)", color: "#ffffff", padding: "14px 36px", borderRadius: "6px", fontWeight: 700, fontSize: "13px", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", flexShrink: 0, whiteSpace: "nowrap" }}
            >
              {t("aboutUs")}
            </Link>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}
