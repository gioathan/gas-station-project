import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import ServicesSection from "../components/ServicesSection";
import PromotionCard from "../components/PromotionsCard";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

function loc(row: any, field: string, locale: string) {
  return (locale === "en" && row?.[`${field}_en`]) ? row[`${field}_en`] : row?.[field];
}

async function getHomeData() {
  const [
    { data: pages },
    { data: homePage },
    { data: services },
    { data: promotions },
    { data: settingsData },
  ] = await Promise.all([
    supabaseClient.from("pages").select("*").eq("show_in_menu", true).order("menu_order"),
    supabaseClient.from("pages").select("*").eq("slug", "/").single(),
    supabaseClient.from("services").select("*").eq("is_active", true).order("order_index").limit(6),
    supabaseClient.from("promotions").select("*").eq("is_active", true).order("order_index").limit(3),
    supabaseClient.from("settings").select("*"),
  ]);

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { homePage } = await getHomeData();
  return {
    title: loc(homePage, "meta_title", locale) || "Welcome - X Petroleum",
    description: loc(homePage, "meta_description", locale) || "Premium fuel and services",
    keywords: homePage?.meta_keywords,
    openGraph: {
      title: loc(homePage, "og_title", locale) || loc(homePage, "meta_title", locale),
      description: loc(homePage, "og_description", locale) || loc(homePage, "meta_description", locale),
      images: homePage?.og_image ? [homePage.og_image] : [],
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const { pages, homePage, heroSlides, services, promotions, settings } = await getHomeData();

  const heroTitle = loc(homePage, "hero_title", locale) || t("heroTitle");
  const heroSubtitle = loc(homePage, "hero_subtitle", locale) || t("heroSubtitle");

  const localizedSlides = heroSlides?.map((s: any) => ({
    ...s,
    title: loc(s, "title", locale),
    subtitle: loc(s, "subtitle", locale),
    cta_text: loc(s, "cta_text", locale),
  }));

  const localizedServices = services?.map((s: any) => ({
    ...s,
    title: loc(s, "title", locale),
    description: loc(s, "description", locale),
  }));

  const localizedPromotions = promotions?.map((p: any) => ({
    ...p,
    title: loc(p, "title", locale),
    description: loc(p, "description", locale),
    discount_text: loc(p, "discount_text", locale),
  }));

  return (
    <>
      <StructuredData type="home" settings={settings} />
      <Navbar pages={pages || []} />

      {/* ── Hero ── */}
      {localizedSlides && localizedSlides.length > 0 ? (
        <HeroCarousel slides={localizedSlides} />
      ) : homePage?.hero_image ? (
        <section style={{
          position: "relative",
          height: "600px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 60%, transparent 100%), url(${homePage.hero_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1, width: "100%" }}>
            <div style={{ maxWidth: "560px" }}>
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}>
                {heroTitle}
              </h1>
              <p style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.6,
                marginBottom: "32px",
                fontFamily: "'Inter', sans-serif",
              }}>
                {heroSubtitle}
              </p>
              <Link href="/services" style={{
                display: "inline-block",
                background: "#fcd400",
                color: "#5a4a00",
                padding: "14px 36px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}>
                {t("allServices")}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section style={{
          height: "600px",
          background: "linear-gradient(135deg, #111111 0%, #1c1c1c 100%)",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <div style={{ maxWidth: "560px" }}>
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}>
                {t("heroTitle")}
              </h1>
              <p style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                marginBottom: "32px",
                fontFamily: "'Inter', sans-serif",
              }}>
                {t("heroSubtitle")}
              </p>
              <Link href="/services" style={{
                display: "inline-block",
                background: "#fcd400",
                color: "#5a4a00",
                padding: "14px 36px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}>
                {t("allServices")}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Services Preview ── */}
      {localizedServices && localizedServices.length > 0 && (
        <ServicesSection services={localizedServices.slice(0, 3)} />
      )}

      {/* ── Promotions Bento Grid ── */}
      {localizedPromotions && localizedPromotions.length > 0 && (
        <section style={{ background: "#f9f9f9", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "80px",
              flexWrap: "wrap",
              gap: "12px",
            }}>
              <h2 style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#1a1c1c",
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: "-0.01em",
              }}>
                {t("currentPromotions")}
              </h2>
              <Link href="/promotions" style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#b90014",
                textDecoration: "none",
                borderBottom: "1px solid #b90014",
                paddingBottom: "1px",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                {t("allPromotions")}
              </Link>
            </div>

            <div className="promo-bento-grid">
              {localizedPromotions[0] && (
                <div className="promo-bento-large" style={{ position: "relative", overflow: "hidden", border: "1px solid #e2e2e2", borderRadius: "4px" }}>
                  {localizedPromotions[0].image ? (
                    <Image src={localizedPromotions[0].image} alt={localizedPromotions[0].title} fill sizes="(max-width: 768px) 100vw, 66vw" style={{ objectFit: "cover", transition: "transform 0.5s" }} quality={80} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a1a 0%, #b90014 100%)" }} />
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px" }}>
                    {localizedPromotions[0].discount_text && (
                      <span style={{ display: "inline-block", background: "#fcd400", color: "#5a4a00", padding: "4px 10px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", width: "fit-content", marginBottom: "10px", borderRadius: "2px" }}>
                        {t("limitedTime")}
                      </span>
                    )}
                    <h3 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, color: "#ffffff", fontFamily: "'Oswald', sans-serif", letterSpacing: "-0.01em", marginBottom: "8px" }}>
                      {localizedPromotions[0].title}
                    </h3>
                    {localizedPromotions[0].discount_text && (
                      <p style={{ fontSize: "20px", fontWeight: 700, color: "#fcd400", fontFamily: "'Oswald', sans-serif", marginBottom: "6px" }}>
                        {localizedPromotions[0].discount_text}
                      </p>
                    )}
                    {localizedPromotions[0].description && (
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                        {localizedPromotions[0].description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {localizedPromotions[1] && (
                <div className="promo-bento-small-1" style={{ position: "relative", overflow: "hidden", border: "1px solid #e2e2e2", borderRadius: "4px" }}>
                  {localizedPromotions[1].image ? (
                    <Image src={localizedPromotions[1].image} alt={localizedPromotions[1].title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} quality={80} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)" }} />
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px" }}>
                    {localizedPromotions[1].discount_text && (
                      <span style={{ display: "inline-block", background: "#e31b23", color: "#fff9f8", padding: "3px 8px", fontWeight: 700, fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", width: "fit-content", marginBottom: "6px", borderRadius: "2px" }}>
                        {t("dailyDeal")}
                      </span>
                    )}
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", fontFamily: "'Oswald', sans-serif" }}>
                      {localizedPromotions[1].title}
                    </h3>
                    {localizedPromotions[1].discount_text && (
                      <p style={{ fontSize: "14px", color: "#fcd400", fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
                        {localizedPromotions[1].discount_text}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {localizedPromotions[2] ? (
                <div className="promo-bento-small-2" style={{ position: "relative", overflow: "hidden", border: "1px solid #e2e2e2", borderRadius: "4px" }}>
                  {localizedPromotions[2].image ? (
                    <Image src={localizedPromotions[2].image} alt={localizedPromotions[2].title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} quality={80} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: "#b90014" }} />
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#fcd400", marginBottom: "8px" }}>loyalty</span>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", fontFamily: "'Oswald', sans-serif", marginBottom: "4px" }}>
                      {localizedPromotions[2].title}
                    </h3>
                    {localizedPromotions[2].discount_text && (
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif" }}>
                        {localizedPromotions[2].discount_text}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="promo-bento-small-2" style={{ position: "relative", overflow: "hidden", border: "1px solid #e2e2e2", borderRadius: "4px", background: "#b90014", display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "44px", color: "#fcd400", marginBottom: "12px" }}>loyalty</span>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", fontFamily: "'Oswald', sans-serif", marginBottom: "8px" }}>
                    {t("loyaltyProgram")}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                    {t("loyaltyDesc")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Visit Us ── */}
      <section style={{ background: "#ffffff", padding: "80px 24px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="visit-us-inner">
            <div className="visit-us-info">
              <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1c1c", fontFamily: "'Oswald', sans-serif", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "32px" }}>
                {t("visitUs")}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "48px", marginBottom: "80px" }}>
                {settings.contact_phone && (
                  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <span className="material-symbols-outlined" style={{ color: "#b90014", marginTop: "2px", flexShrink: 0 }}>phone</span>
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "#5b5b5a", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px", fontFamily: "'Inter', sans-serif" }}>{t("phone")}</p>
                      <p style={{ fontSize: "18px", color: "#1a1c1c", fontFamily: "'Inter', sans-serif" }}>{settings.contact_phone}</p>
                    </div>
                  </div>
                )}
                {settings.address && (
                  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <span className="material-symbols-outlined" style={{ color: "#b90014", marginTop: "2px", flexShrink: 0 }}>location_on</span>
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "#5b5b5a", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px", fontFamily: "'Inter', sans-serif" }}>{t("location")}</p>
                      <p style={{ fontSize: "18px", color: "#1a1c1c", fontFamily: "'Inter', sans-serif" }}>{settings.address}</p>
                    </div>
                  </div>
                )}
                {(settings.hours_weekday || settings.hours_weekend) && (
                  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <span className="material-symbols-outlined" style={{ color: "#b90014", marginTop: "2px", flexShrink: 0 }}>schedule</span>
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "#5b5b5a", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px", fontFamily: "'Inter', sans-serif" }}>{t("hours")}</p>
                      {settings.hours_weekday && <p style={{ fontSize: "18px", color: "#1a1c1c", fontFamily: "'Inter', sans-serif" }}>{settings.hours_weekday}</p>}
                      {settings.hours_weekend && <p style={{ fontSize: "15px", color: "#5b5b5a", fontFamily: "'Inter', sans-serif" }}>{settings.hours_weekend}</p>}
                    </div>
                  </div>
                )}
              </div>

              <a
                href={`https://maps.google.com?q=${encodeURIComponent(settings.address || "X Petroleum")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fcd400", color: "#5a4a00", padding: "12px 32px", borderRadius: "6px", fontWeight: 700, fontSize: "13px", textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>directions</span>
                {t("directions")}
              </a>
            </div>

            <div className="visit-us-map" style={{ height: "400px", border: "1px solid #e2e2e2", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
              <iframe
                src={settings.google_maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapTitle")}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}
