export type Locale = "en" | "ar";

export type LocalizedString = Record<Locale, string>;

export type ImageAsset = {
  src: string;
  alt: LocalizedString;
};

export type LinkItem = {
  label: LocalizedString;
  href: string;
};

export type HomeSection = {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
  ctaLabel: LocalizedString;
  ctaHref: string;
  image: ImageAsset;
};

export type Feature = {
  id: string;
  label: LocalizedString;
};

export type Offer = {
  id: string;
  active: boolean;
  eyebrow: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  ctaLabel: LocalizedString;
  ctaHref: string;
};

export type MenuItem = {
  id: string;
  name: LocalizedString;
  image?: ImageAsset;
};

export type MenuGroup = {
  id: string;
  title: LocalizedString;
  items: MenuItem[];
};

export type MenuCategory = {
  id: string;
  slug: string;
  navLabel: LocalizedString;
  title: LocalizedString;
  intro: LocalizedString;
  heroImage: ImageAsset;
  sourceNote: LocalizedString;
  groups: MenuGroup[];
};

export type AboutContent = {
  title: LocalizedString;
  intro: LocalizedString;
  paragraphs: LocalizedString[];
  conceptTitle: LocalizedString;
  stats: {
    value: string;
    label: LocalizedString;
  }[];
  image: ImageAsset;
};

export type Branch = {
  id: string;
  country: LocalizedString;
  city: LocalizedString;
  name: LocalizedString;
  address: LocalizedString;
  phone: string;
  hours: LocalizedString;
  status: LocalizedString;
};

export type BranchesContent = {
  title: LocalizedString;
  intro: LocalizedString;
  menuIntro: LocalizedString;
  journey: LocalizedString;
  stats: {
    value: string;
    label: LocalizedString;
  }[];
  countries: {
    id: string;
    title: LocalizedString;
    body: LocalizedString;
    image: ImageAsset;
  }[];
  branches: Branch[];
};

export type ContactContent = {
  email: string;
  mainPhone: string;
  deliveryPhone: string;
  phoneNote: LocalizedString;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type SiteContent = {
  brand: {
    name: string;
    nameAr: string;
    tagline: LocalizedString;
    logo: ImageAsset;
  };
  seo: {
    title: string;
    description: LocalizedString;
    canonical: string;
  };
  nav: LinkItem[];
  admin: {
    title: LocalizedString;
  };
  home: {
    hero: HomeSection;
    features: Feature[];
    offersTitle: LocalizedString;
    offersIntro: LocalizedString;
    offersEmpty: LocalizedString;
    offers: Offer[];
    sections: HomeSection[];
    menuTitle: LocalizedString;
    menuIntro: LocalizedString;
  };
  about: AboutContent;
  branches: BranchesContent;
  menu: MenuCategory[];
  cart: {
    title: LocalizedString;
    body: LocalizedString;
    ctaLabel: LocalizedString;
    ctaHref: string;
  };
  contact: ContactContent;
  socials: SocialLink[];
};
