import { MetadataRoute } from "next";

const baseUrl = "https://www.xpetroleum.gr";

const locales = ["el", "en"] as const;

const routes = [
  { path: "",         priority: 1.0, changeFrequency: "weekly"  },
  { path: "/services",  priority: 0.9, changeFrequency: "monthly" },
  { path: "/promotions",priority: 0.9, changeFrequency: "weekly"  },
  { path: "/about",     priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact",   priority: 0.8, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => {
      const prefix = locale === "el" ? "" : "/en";
      return {
        url: `${baseUrl}${prefix}${path || "/"}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      };
    })
  );
}
