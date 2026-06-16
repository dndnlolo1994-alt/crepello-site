"use client";

import { Eye, LogOut, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { HomeSection, Locale, Offer, SiteContent } from "@/lib/types";

type Tab = "offers" | "home" | "json";
type OfferTextField = "eyebrow" | "title" | "summary" | "ctaLabel";
type SectionTextField = "title" | "body" | "ctaLabel";

const copy = {
  en: {
    subtitle: "Edit homepage offers and all bilingual site content.",
    viewSite: "View site",
    logout: "Logout",
    offers: "Offers",
    home: "Home",
    json: "Full content",
    save: "Save changes",
    saving: "Saving...",
    saved: "Saved. Public pages are using the latest content.",
    error: "Something went wrong. Check the JSON shape and try again.",
    addOffer: "Add offer",
    remove: "Remove",
    active: "Active",
    english: "English",
    arabic: "Arabic",
    eyebrow: "Eyebrow",
    title: "Title",
    summary: "Summary",
    ctaLabel: "CTA label",
    ctaHref: "CTA link",
    image: "Image URL",
    body: "Body",
    hero: "Hero",
    sections: "Home sections",
    applyJson: "Apply JSON",
    jsonOk: "JSON applied to the editor.",
    jsonBad: "JSON is invalid or missing required site sections.",
  },
  ar: {
    subtitle: "تعديل عروض الرئيسية وكل محتوى الموقع باللغتين.",
    viewSite: "عرض الموقع",
    logout: "خروج",
    offers: "العروض",
    home: "الرئيسية",
    json: "كل المحتوى",
    save: "حفظ التعديلات",
    saving: "جاري الحفظ...",
    saved: "تم الحفظ. الصفحات العامة تستخدم آخر محتوى.",
    error: "حدث خطأ. افحص شكل JSON ثم حاول مرة أخرى.",
    addOffer: "إضافة عرض",
    remove: "حذف",
    active: "فعّال",
    english: "إنجليزي",
    arabic: "عربي",
    eyebrow: "وسم",
    title: "العنوان",
    summary: "الملخص",
    ctaLabel: "نص الزر",
    ctaHref: "رابط الزر",
    image: "رابط الصورة",
    body: "النص",
    hero: "الهيرو",
    sections: "أقسام الرئيسية",
    applyJson: "تطبيق JSON",
    jsonOk: "تم تطبيق JSON في المحرر.",
    jsonBad: "JSON غير صالح أو تنقصه أقسام مطلوبة.",
  },
};

export function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const [language, setLanguage] = useState<Locale>("en");
  const [activeTab, setActiveTab] = useState<Tab>("offers");
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(initialContent, null, 2));
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });
  const [saving, setSaving] = useState(false);
  const labels = copy[language];

  const activeOfferCount = useMemo(() => content.home.offers.filter((offer) => offer.active).length, [content]);

  function commit(next: SiteContent) {
    setContent(next);
    setJsonDraft(JSON.stringify(next, null, 2));
    setStatus({ kind: "idle", message: "" });
  }

  function updateOffer(id: string, update: (offer: Offer) => Offer) {
    commit({
      ...content,
      home: {
        ...content.home,
        offers: content.home.offers.map((offer) => (offer.id === id ? update(offer) : offer)),
      },
    });
  }

  function updateOfferText(id: string, field: OfferTextField, locale: Locale, value: string) {
    updateOffer(id, (offer) => ({
      ...offer,
      [field]: {
        ...offer[field],
        [locale]: value,
      },
    }));
  }

  function addOffer() {
    const nextOffer: Offer = {
      id: `offer-${Date.now()}`,
      active: true,
      eyebrow: { en: "Offer", ar: "عرض" },
      title: { en: "New approved offer", ar: "عرض جديد معتمد" },
      summary: { en: "Add the official offer details here.", ar: "أضف تفاصيل العرض الرسمي هنا." },
      ctaLabel: { en: "See menu", ar: "شاهد المنيو" },
      ctaHref: "/menu-drinks",
    };

    commit({
      ...content,
      home: {
        ...content.home,
        offers: [nextOffer, ...content.home.offers],
      },
    });
  }

  function removeOffer(id: string) {
    commit({
      ...content,
      home: {
        ...content.home,
        offers: content.home.offers.filter((offer) => offer.id !== id),
      },
    });
  }

  function updateHeroText(field: SectionTextField, locale: Locale, value: string) {
    commit({
      ...content,
      home: {
        ...content.home,
        hero: {
          ...content.home.hero,
          [field]: {
            ...content.home.hero[field],
            [locale]: value,
          },
        },
      },
    });
  }

  function updateHeroPlain(field: "ctaHref", value: string) {
    commit({
      ...content,
      home: {
        ...content.home,
        hero: {
          ...content.home.hero,
          [field]: value,
        },
      },
    });
  }

  function updateHeroImage(value: string) {
    commit({
      ...content,
      home: {
        ...content.home,
        hero: {
          ...content.home.hero,
          image: {
            ...content.home.hero.image,
            src: value,
          },
        },
      },
    });
  }

  function updateSection(sectionId: string, update: (section: HomeSection) => HomeSection) {
    commit({
      ...content,
      home: {
        ...content.home,
        sections: content.home.sections.map((section) => (section.id === sectionId ? update(section) : section)),
      },
    });
  }

  function updateSectionText(sectionId: string, field: SectionTextField, locale: Locale, value: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      [field]: {
        ...section[field],
        [locale]: value,
      },
    }));
  }

  function updateSectionPlain(sectionId: string, field: "ctaHref", value: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      [field]: value,
    }));
  }

  function updateSectionImage(sectionId: string, value: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      image: {
        ...section.image,
        src: value,
      },
    }));
  }

  function applyJson() {
    try {
      const parsed: unknown = JSON.parse(jsonDraft);

      if (!isClientSiteContent(parsed)) {
        setStatus({ kind: "error", message: labels.jsonBad });
        return;
      }

      setContent(parsed);
      setJsonDraft(JSON.stringify(parsed, null, 2));
      setStatus({ kind: "success", message: labels.jsonOk });
    } catch {
      setStatus({ kind: "error", message: labels.jsonBad });
    }
  }

  async function saveContent() {
    setSaving(true);
    setStatus({ kind: "idle", message: "" });

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (response.ok) {
      setStatus({ kind: "success", message: labels.saved });
    } else {
      setStatus({ kind: "error", message: labels.error });
    }

    setSaving(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="admin-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-title">
            <h1>{content.admin.title[language]}</h1>
            <span>
              {labels.subtitle} {activeOfferCount ? `(${activeOfferCount})` : ""}
            </span>
          </div>
          <div className="header-tools">
            <span className="lang-toggle">
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} type="button">
                EN
              </button>
              <button className={language === "ar" ? "active" : ""} onClick={() => setLanguage("ar")} type="button">
                AR
              </button>
            </span>
            <Link className="icon-button" href="/" title={labels.viewSite}>
              <Eye size={19} />
            </Link>
            <button className="icon-button" onClick={logout} title={labels.logout} type="button">
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-tabs" style={{ marginBottom: 18 }}>
          {(["offers", "home", "json"] as Tab[]).map((tab) => (
            <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)} type="button">
              {labels[tab]}
            </button>
          ))}
        </div>

        {activeTab === "offers" ? (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>{labels.offers}</h2>
              <button className="primary-button" onClick={addOffer} type="button">
                <Plus size={18} />
                {labels.addOffer}
              </button>
            </div>
            <div className="admin-panel-body">
              {content.home.offers.map((offer) => (
                <article className="offer-editor" key={offer.id}>
                  <label className="checkbox-row">
                    <input
                      checked={offer.active}
                      onChange={(event) => updateOffer(offer.id, (item) => ({ ...item, active: event.target.checked }))}
                      type="checkbox"
                    />
                    {labels.active}
                  </label>
                  <div className="field-grid">
                    <LocalizedInput
                      label={`${labels.eyebrow} / ${labels.english}`}
                      onChange={(value) => updateOfferText(offer.id, "eyebrow", "en", value)}
                      value={offer.eyebrow.en}
                    />
                    <LocalizedInput
                      label={`${labels.eyebrow} / ${labels.arabic}`}
                      onChange={(value) => updateOfferText(offer.id, "eyebrow", "ar", value)}
                      value={offer.eyebrow.ar}
                    />
                    <LocalizedInput
                      label={`${labels.title} / ${labels.english}`}
                      onChange={(value) => updateOfferText(offer.id, "title", "en", value)}
                      value={offer.title.en}
                    />
                    <LocalizedInput
                      label={`${labels.title} / ${labels.arabic}`}
                      onChange={(value) => updateOfferText(offer.id, "title", "ar", value)}
                      value={offer.title.ar}
                    />
                    <LocalizedTextarea
                      label={`${labels.summary} / ${labels.english}`}
                      onChange={(value) => updateOfferText(offer.id, "summary", "en", value)}
                      value={offer.summary.en}
                    />
                    <LocalizedTextarea
                      label={`${labels.summary} / ${labels.arabic}`}
                      onChange={(value) => updateOfferText(offer.id, "summary", "ar", value)}
                      value={offer.summary.ar}
                    />
                    <LocalizedInput
                      label={`${labels.ctaLabel} / ${labels.english}`}
                      onChange={(value) => updateOfferText(offer.id, "ctaLabel", "en", value)}
                      value={offer.ctaLabel.en}
                    />
                    <LocalizedInput
                      label={`${labels.ctaLabel} / ${labels.arabic}`}
                      onChange={(value) => updateOfferText(offer.id, "ctaLabel", "ar", value)}
                      value={offer.ctaLabel.ar}
                    />
                    <LocalizedInput
                      label={labels.ctaHref}
                      onChange={(value) => updateOffer(offer.id, (item) => ({ ...item, ctaHref: value }))}
                      value={offer.ctaHref}
                    />
                  </div>
                  <div className="button-row">
                    <button className="danger-button" onClick={() => removeOffer(offer.id)} type="button">
                      <Trash2 size={17} />
                      {labels.remove}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "home" ? (
          <div className="admin-grid">
            <section className="admin-panel">
              <div className="admin-panel-header">
                <h2>{labels.hero}</h2>
              </div>
              <div className="admin-panel-body">
                <LocalizedInput
                  label={`${labels.title} / ${labels.english}`}
                  onChange={(value) => updateHeroText("title", "en", value)}
                  value={content.home.hero.title.en}
                />
                <LocalizedInput
                  label={`${labels.title} / ${labels.arabic}`}
                  onChange={(value) => updateHeroText("title", "ar", value)}
                  value={content.home.hero.title.ar}
                />
                <LocalizedTextarea
                  label={`${labels.body} / ${labels.english}`}
                  onChange={(value) => updateHeroText("body", "en", value)}
                  value={content.home.hero.body.en}
                />
                <LocalizedTextarea
                  label={`${labels.body} / ${labels.arabic}`}
                  onChange={(value) => updateHeroText("body", "ar", value)}
                  value={content.home.hero.body.ar}
                />
                <LocalizedInput label={labels.ctaHref} onChange={(value) => updateHeroPlain("ctaHref", value)} value={content.home.hero.ctaHref} />
                <LocalizedInput label={labels.image} onChange={updateHeroImage} value={content.home.hero.image.src} />
              </div>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header">
                <h2>{labels.sections}</h2>
              </div>
              <div className="admin-panel-body">
                {content.home.sections.map((section) => (
                  <article className="offer-editor" key={section.id}>
                    <h3 style={{ margin: 0 }}>{section.title[language]}</h3>
                    <div className="field-grid">
                      <LocalizedInput
                        label={`${labels.title} / ${labels.english}`}
                        onChange={(value) => updateSectionText(section.id, "title", "en", value)}
                        value={section.title.en}
                      />
                      <LocalizedInput
                        label={`${labels.title} / ${labels.arabic}`}
                        onChange={(value) => updateSectionText(section.id, "title", "ar", value)}
                        value={section.title.ar}
                      />
                      <LocalizedTextarea
                        label={`${labels.body} / ${labels.english}`}
                        onChange={(value) => updateSectionText(section.id, "body", "en", value)}
                        value={section.body.en}
                      />
                      <LocalizedTextarea
                        label={`${labels.body} / ${labels.arabic}`}
                        onChange={(value) => updateSectionText(section.id, "body", "ar", value)}
                        value={section.body.ar}
                      />
                      <LocalizedInput label={labels.ctaHref} onChange={(value) => updateSectionPlain(section.id, "ctaHref", value)} value={section.ctaHref} />
                      <LocalizedInput label={labels.image} onChange={(value) => updateSectionImage(section.id, value)} value={section.image.src} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "json" ? (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>{labels.json}</h2>
              <button className="dark-button" onClick={applyJson} type="button">
                {labels.applyJson}
              </button>
            </div>
            <div className="admin-panel-body">
              <label className="form-field">
                <span>{labels.json}</span>
                <textarea className="json-editor" onChange={(event) => setJsonDraft(event.target.value)} value={jsonDraft} />
              </label>
            </div>
          </section>
        ) : null}

        <div className="button-row" style={{ marginTop: 18 }}>
          <button className="primary-button" disabled={saving} onClick={saveContent} type="button">
            <Save size={18} />
            {saving ? labels.saving : labels.save}
          </button>
          {status.message ? <span className={`status-line ${status.kind}`}>{status.message}</span> : null}
        </div>
      </main>
    </div>
  );
}

function LocalizedInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function LocalizedTextarea({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="form-field full">
      <span>{label}</span>
      <textarea onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function isClientSiteContent(value: unknown): value is SiteContent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isRecord(value.brand) &&
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
