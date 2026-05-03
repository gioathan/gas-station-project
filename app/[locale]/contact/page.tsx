import { supabaseClient } from "@/lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactInfoCard from "../../components/ContactInfoCard";
import ContactForm from "../../components/ContactForm";
import PageHero from "../../components/PageHero";
import { Metadata } from "next";
import StructuredData from "../../components/StructuredData";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

function loc(row: any, field: string, locale: string) {
  return (locale === "en" && row?.[`${field}_en`]) ? row[`${field}_en`] : row?.[field];
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { contactPage } = await getContactData();
  return {
    title: loc(contactPage, "meta_title", locale) || (locale === "el" ? "Επικοινωνία – X Petroleum Shell Σπάτα" : "Contact – X Petroleum Shell Station Spata Athens"),
    description: loc(contactPage, "meta_description", locale) || (locale === "el" ? "Επικοινωνήστε με τον σταθμό Shell X Petroleum στη Σπάτα. Οδηγίες, τηλέφωνο και ώρες λειτουργίας." : "Contact X Petroleum Shell station in Spata, Attica. Directions, phone and opening hours."),
    keywords: contactPage?.meta_keywords,
    openGraph: {
      title: loc(contactPage, "og_title", locale) || loc(contactPage, "meta_title", locale),
      description: loc(contactPage, "og_description", locale) || loc(contactPage, "meta_description", locale),
      images: contactPage?.og_image ? [contactPage.og_image] : [],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const { pages, contactPage, settings } = await getContactData();

  return (
    <>
      <StructuredData type="contact" settings={settings} />
      <Navbar pages={pages} />

      <PageHero
        label={t("label")}
        title={loc(contactPage, "hero_title", locale) || t("heroTitle")}
        subtitle={loc(contactPage, "hero_subtitle", locale)}
      />

      <section style={{ maxWidth: "1400px", margin: "80px auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginBottom: "80px" }}>
          <ContactInfoCard
            icon="📞"
            title={t("callUs")}
            value={settings.contact_phone}
            href={`tel:${settings.contact_phone?.replace(/\s/g, "")}`}
          />
          <ContactInfoCard
            icon="✉️"
            title="Email"
            value={settings.contact_email}
            href={`mailto:${settings.contact_email}`}
          />
          <div style={{ background: "white", border: "2px solid #e0e0e0", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", background: "#DD1D21", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>📍</div>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1a1a1a", marginBottom: "8px" }}>
              {t("visitUs")}
            </h3>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>{settings.address}</p>
          </div>
        </div>

        <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "32px", marginBottom: "80px", textAlign: "center" }}>
          <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#DD1D21", marginBottom: "24px" }}>
            {t("hours")}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            <div>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }}>{t("weekdays")}</p>
              <p style={{ fontSize: "18px", color: "#666" }}>{settings.hours_weekday}</p>
            </div>
            <div>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }}>{t("weekends")}</p>
              <p style={{ fontSize: "18px", color: "#666" }}>{settings.hours_weekend}</p>
            </div>
          </div>
        </div>

        <ContactForm />

        {settings.google_maps_embed && (
          <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
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
