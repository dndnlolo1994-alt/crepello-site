import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultSiteContent } from "@/lib/default-content";
import type { SiteContent } from "@/lib/types";

const contentPath = path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(contentPath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (isSiteContent(parsed)) {
      return parsed;
    }
  } catch {
    return defaultSiteContent;
  }

  return defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await mkdir(path.dirname(contentPath), { recursive: true });
  await writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export function isSiteContent(value: unknown): value is SiteContent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isRecord(value.brand) &&
    typeof value.brand.name === "string" &&
    isRecord(value.home) &&
    Array.isArray(value.home.offers) &&
    Array.isArray(value.home.sections) &&
    Array.isArray(value.menu) &&
    isRecord(value.about) &&
    isRecord(value.branches) &&
    isRecord(value.contact) &&
    Array.isArray(value.socials)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
