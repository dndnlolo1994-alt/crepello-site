import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/aboutus",
  "/branches",
  "/menu-drinks",
  "/menu-drinks-1",
  "/menu-drinks-1-1",
  "/menu-drinks-1-1-1",
  "/cart",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.crepello.co${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
