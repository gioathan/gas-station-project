import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/", "/auth/"],
    },
    sitemap: "https://www.xpetroleum.gr/sitemap.xml",
  };
}
