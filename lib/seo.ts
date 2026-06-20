export const siteUrl = "https://www.xpetroleum.gr";
export const siteName = "X Petroleum";

export function pageUrl(locale: string, path: string = "") {
  const prefix = locale === "el" ? "" : "/en";
  return `${siteUrl}${prefix}${path || "/"}`;
}

export function buildAlternates(locale: string, path: string = "") {
  return {
    canonical: pageUrl(locale, path),
    languages: {
      "el": `${siteUrl}${path || "/"}`,
      "en": `${siteUrl}/en${path || ""}`,
      "x-default": `${siteUrl}${path || "/"}`,
    },
  };
}

export function buildTwitter(title?: string, description?: string, image?: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    ...(image ? { images: [image] } : {}),
  };
}
