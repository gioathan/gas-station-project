import { supabaseClient } from "@/lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";
import PageHero from "../../components/PageHero";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import StructuredData from "../../components/StructuredData";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

function loc(row: any, field: string, locale: string) {
  return (locale === "en" && row?.[`${field}_en`]) ? row[`${field}_en`] : row?.[field];
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { servicesPage, settings } = await getServicesData();
  return {
    title: loc(servicesPage, "meta_title", locale) || (locale === "el" ? "Υπηρεσίες – X Petroleum Shell Σπάτα" : "Services – X Petroleum Shell Station Spata Athens"),
    description: loc(servicesPage, "meta_description", locale) || (locale === "el" ? "Καύσιμα Shell V-Power, πλυντήριο, mini market και 24ωρη εξυπηρέτηση στη Σπάτα Αττικής." : "Shell V-Power fuels, car wash, mini market and 24-hour service at our Shell station in Spata, Attica."),
    keywords: servicesPage?.meta_keywords,
    openGraph: {
      title: loc(servicesPage, "og_title", locale) || loc(servicesPage, "meta_title", locale),
      description: loc(servicesPage, "og_description", locale) || loc(servicesPage, "meta_description", locale),
      images: servicesPage?.og_image ? [servicesPage.og_image] : [],
      type: "website",
      siteName: settings.site_name || "X Petroleum",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const { pages, servicesPage, services, settings } = await getServicesData();

  const localizedServices = services?.map((s: any) => ({
    ...s,
    title: loc(s, "title", locale),
    description: loc(s, "description", locale),
  }));

  return (
    <>
      <StructuredData type="services" settings={settings} pageData={{ services }} />
      <Navbar pages={pages} />

      <PageHero
        label={t("label")}
        title={loc(servicesPage, "hero_title", locale) || t("heroTitle")}
        subtitle={loc(servicesPage, "hero_subtitle", locale)}
      />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {localizedServices?.map((service: any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section style={{ background: "#e31b23", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "40px" }}>
          <div style={{ maxWidth: "560px" }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#ffffff", fontFamily: "'Oswald', sans-serif", letterSpacing: "-0.01em", marginBottom: "12px" }}>
              {t("ctaTitle")}
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.88)", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
              {t("ctaDesc")}
            </p>
          </div>
          <Link
            href={servicesPage?.cta_link || "/contact"}
            style={{ background: "#ffffff", color: "#b90014", padding: "14px 32px", borderRadius: "6px", fontWeight: 700, fontSize: "13px", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}
          >
            {t("contact")}
          </Link>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}
