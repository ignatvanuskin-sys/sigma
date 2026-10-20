import type { MetadataRoute } from "next";
import { branches } from "@/lib/data";
import { categoryPages } from "@/lib/category-content";
import { siteUrl } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...categoryPages.map((page) => ({
      url: `${siteUrl}/kategorii/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...branches.map((branch) => ({
      url: `${siteUrl}/branchi/${branch.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
