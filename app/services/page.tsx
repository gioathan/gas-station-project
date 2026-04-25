import { supabaseClient } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import Link from "next/link";
import { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const revalidate = 3600;

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

export async function generateMetadata(): Promise<Metadata> {
  const { servicesPage, settings } = await getServicesData();
  return {
    title: servicesPage?.meta_title || "Our Services - X Petroleum",
    description: servicesPage?.meta_description || "Premium fuel, car wash, and convenience store services",
    keywords: servicesPage?.meta_keywords || "gas station, X Petroleum, fuel, car wash",
    openGraph: {
      title: servicesPage?.og_title || servicesPage?.meta_title || "Our Services",
      description: servicesPage?.og_description || servicesPage?.meta_description || "Premium services",
      images: servicesPage?.og_image ? [servicesPage.og_image] : [],
      type: "website",
      siteName: settings.site_name || "X Petroleum",
    },
    twitter: {
      card: "summary_large_image",
      title: servicesPage?.og_title || servicesPage?.meta_title,
      description: servicesPage?.og_description || servicesPage?.meta_description,
      images: servicesPage?.og_image ? [servicesPage.og_image] : [],
    },
  };
}

export default async function ServicesPage() {
  const { pages, servicesPage, services, settings } = await getServicesData();

  return (
    <>
      <StructuredData type="services" settings={settings} pageData={{ services }} />
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
            {servicesPage?.hero_title || "Υπηρεσίες μας"}
          </h1>
          <p style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
          }}>
            {servicesPage?.hero_subtitle || "Ό,τι χρειάζεσαι σε μία στάση. Υψηλής απόδοσης καύσιμα και υπηρεσίες για τον σύγχρονο οδηγό."}
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "#e31b23",
        padding: "80px 24px",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
        }}>
          <div style={{ maxWidth: "560px" }}>
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "'Work Sans', sans-serif",
              letterSpacing: "-0.01em",
              marginBottom: "12px",
            }}>
              {"Έτοιμος να δοκιμάσεις τις υπηρεσίες μας;"}
            </h2>
            <p style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
            }}>
              Επισκέψου μας ή επικοινώνησε με την ομάδα μας για εταιρικές υπηρεσίες και προγράμματα επιβράβευσης.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <Link
              href={servicesPage?.cta_link || "/contact"}
              style={{
                background: "#ffffff",
                color: "#b90014",
                padding: "14px 32px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Επικοινωνία
            </Link>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  );
}
