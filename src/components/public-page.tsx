"use client";

import {
  Armchair,
  ArrowUpRight,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
  Search,
  Plus,
  Minus,
  Trash2,
  Truck,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, type MotionValue, type Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { HomeSection, ImageAsset, Locale, LocalizedString, MenuGroup, MenuItem, SiteContent } from "@/lib/types";
import { ORDER_MODE } from "@/lib/config";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CartItem {
  id: string;
  name: LocalizedString;
  quantity: number;
  groupTitle: LocalizedString;
}

// ----------------------------------------------------
// Premium Micro-Interaction Components
// ----------------------------------------------------

function Magnetic({ children, range = 40, strength = 0.3 }: { children: React.ReactElement; range?: number; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className, dataCursor }: { children: React.ReactNode; className?: string; dataCursor?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={className}
      data-cursor={dataCursor}
    >
      {children}
    </motion.div>
  );
}

function ScrollHighlightParagraph({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 75%"]
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="section-copy mb-10 text-lg flex flex-wrap gap-x-2 gap-y-1">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <motion.span style={{ opacity }} className="text-[var(--ink)] font-light">
      {children}
    </motion.span>
  );
}

function RevealHeading({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.trim().split(/\s+/);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.h2
      className={cn("flex flex-wrap gap-x-3 gap-y-1 overflow-hidden py-1", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.h2>
  );
}

// ----------------------------------------------------
// PublicPage Controller
// ----------------------------------------------------

type PublicPageProps = {
  content: SiteContent;
  view: "home" | "about" | "branches" | "order" | "contact" | "menu";
  locale: Locale;
  menuId?: string;
};

export function PublicPage(props: PublicPageProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("crepello_cart");
    if (saved) {
      try {
        return JSON.parse(saved) as CartItem[];
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("crepello_cart", JSON.stringify(newCart));
  };

  const addToCart = (menuItem: MenuItem, groupTitle: LocalizedString) => {
    const existing = cart.find((i) => i.id === menuItem.id);
    if (existing) {
      const updated = cart.map((i) =>
        i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: menuItem.id,
        name: menuItem.name,
        quantity: 1,
        groupTitle,
      };
      saveCart([...cart, newItem]);
    }
  };

  const activePath = getActivePath(props);
  const menuId = props.view === "menu" ? (props.menuId ?? "drinks") : null;

  return (
    <SiteChrome content={props.content} activePath={activePath} language={props.locale} cartCount={cart.reduce((s, i) => s + i.quantity, 0)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={props.view + (menuId || "")}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {props.view === "home" && <HomeView content={props.content} language={props.locale} />}
          {props.view === "about" && <AboutView content={props.content} language={props.locale} />}
          {props.view === "branches" && <BranchesView content={props.content} language={props.locale} />}
          {props.view === "order" && <OrderView content={props.content} language={props.locale} cart={cart} saveCart={saveCart} />}
          {props.view === "contact" && <ContactView content={props.content} language={props.locale} />}
          {props.view === "menu" && menuId && (
            <MenuView
              content={props.content}
              language={props.locale}
              menuId={menuId}
              addToCart={addToCart}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </SiteChrome>
  );
}

function getActivePath(props: PublicPageProps): string {
  switch (props.view) {
    case "home": return "/";
    case "about": return "/about";
    case "branches": return "/branches";
    case "order": return "/order";
    case "contact": return "/contact";
    case "menu":
      return props.content.menu.find((c) => c.id === props.menuId)?.slug ?? "/menu/drinks";
  }
}

// ----------------------------------------------------
// Global Layout (SiteChrome)
// ----------------------------------------------------

function SiteChrome({
  content,
  activePath,
  language,
  cartCount,
  children,
}: {
  content: SiteContent;
  activePath: string;
  language: Locale;
  cartCount: number;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [cursorHovered, setCursorHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  // Custom Cursor variables
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const cursorX = useSpring(mouseX, { damping: 26, stiffness: 180, mass: 0.3 });
  const cursorY = useSpring(mouseY, { damping: 26, stiffness: 180, mass: 0.3 });

  const followerX = useSpring(mouseX, { damping: 32, stiffness: 90, mass: 0.9 });
  const followerY = useSpring(mouseY, { damping: 32, stiffness: 90, mass: 0.9 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 1024px)").matches ||
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isMobile, mouseX, mouseY]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor], a, button, [role="button"]');
      if (interactive) {
        const cursorType = (interactive as HTMLElement).getAttribute('data-cursor') || 'hover';
        setCursorHovered(cursorType);
      } else {
        setCursorHovered(null);
      }
    };
    
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  useEffect(() => {
    let lastY = 0;
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
      if (latest > lastY && latest > 150) {
        setHiddenHeader(true);
      } else {
        setHiddenHeader(false);
      }
      lastY = latest;
    });
  }, [scrollY]);

  // Lock scroll when mobile menu is open (WCAG / UX)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLanguageSwitch = (newLocale: Locale) => {
    if (newLocale === language) return;
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    // Set NEXT_LOCALE cookie for locale negotiation
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.push(segments.join("/"));
  };

  const localizedHref = (href: string) => {
    if (href.startsWith("http")) return href;
    return `/${language}${href === "/" ? "" : href}`;
  };

  return (
    <div className="site-shell bg-[var(--background)] text-[var(--ink)] font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="grain-overlay" />

      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <motion.div
            className="custom-cursor"
            style={{ x: cursorX, y: cursorY }}
          />
          <motion.div
            className="custom-cursor-follower"
            style={{ x: followerX, y: followerY }}
            animate={{
              width: cursorHovered ? (cursorHovered === 'explore' || cursorHovered === 'view' ? 80 : 50) : 36,
              height: cursorHovered ? (cursorHovered === 'explore' || cursorHovered === 'view' ? 80 : 50) : 36,
              backgroundColor: cursorHovered ? "rgba(197, 168, 128, 0.12)" : "rgba(197, 168, 128, 0)",
              borderColor: cursorHovered ? "var(--gold)" : "rgba(198, 138, 78, 0.35)",
              color: cursorHovered ? "rgb(197, 168, 128)" : "rgba(197, 168, 128, 0)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            {cursorHovered === 'explore' && (language === 'ar' ? 'استكشف' : 'Explore')}
            {cursorHovered === 'view' && (language === 'ar' ? 'عرض' : 'View')}
            {cursorHovered === 'order' && (language === 'ar' ? 'اطلب' : 'Order')}
          </motion.div>
        </>
      )}

      <header className={cn(
        "site-header",
        isScrolled ? "scrolled" : "",
        hiddenHeader ? "hidden-header" : "",
        mobileOpen ? "mobile-open" : ""
      )}>
        <div className="site-header-inner">
          <Magnetic>
            <Link className="brand-mark" href={localizedHref("/")} aria-label={content.brand.name} data-cursor="hover">
              <span className="brand-logo">
                <Image src={content.brand.logo.src} alt={text(content.brand.logo.alt, language)} fill sizes="44px" />
              </span>
              <span className="font-serif-luxury tracking-wide">{language === "ar" ? content.brand.nameAr : content.brand.name}</span>
            </Link>
          </Magnetic>

          <nav className="desktop-nav" aria-label="Main navigation">
            {content.nav
              .filter((link) => ORDER_MODE !== "disabled" || link.href !== "/order")
              .map((link) => (
                <Magnetic key={link.href}>
                  <Link
                    href={localizedHref(link.href)}
                    className={cn("nav-link relative py-2 px-1 block", activePath === link.href && "active")}
                    data-cursor="hover"
                  >
                    {text(link.label, language)}
                    {activePath === link.href && (
                      <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]" />
                    )}
                  </Link>
                </Magnetic>
              ))}
          </nav>

          <div className="header-tools">
            <span className="lang-toggle flex items-center gap-2" aria-label="Language">
              <Magnetic>
                <button className={cn(language === "en" && "active")} onClick={() => handleLanguageSwitch("en")} type="button" data-cursor="hover">EN</button>
              </Magnetic>
              <span className="text-[var(--line)]">|</span>
              <Magnetic>
                <button className={cn(language === "ar" && "active")} onClick={() => handleLanguageSwitch("ar")} type="button" data-cursor="hover">AR</button>
              </Magnetic>
            </span>

            {ORDER_MODE !== "disabled" && (
              <Magnetic>
                <Link className="header-order-link relative" href={localizedHref("/order")} data-cursor="order">
                  <ShoppingBag size={16} />
                  <span>{language === "ar" ? "الطلب" : "Order"}</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Magnetic>
            )}

            <button
              className="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[var(--line)] bg-[var(--surface)] overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-4">
                {content.nav
                  .filter((link) => ORDER_MODE !== "disabled" || link.href !== "/order")
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={localizedHref(link.href)}
                      className={cn(
                        "text-lg uppercase tracking-wider block py-2",
                        activePath === link.href ? "text-[var(--gold)] font-semibold" : "text-[var(--muted)] hover:text-[var(--gold)]"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {text(link.label, language)}
                    </Link>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex-1">
        {children}
      </div>

      <Footer content={content} language={language} />
    </div>
  );
}

// ----------------------------------------------------
// Home View
// ----------------------------------------------------

function HomeView({ content, language }: { content: SiteContent; language: Locale }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const localizedHref = (href: string) => `/${language}${href === "/" ? "" : href}`;

  return (
    <main>
      <section className="relative min-h-[92svh] overflow-hidden bg-black flex items-center justify-center pt-28 pb-24">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 18, ease: "easeOut" }}
          style={{ y: y1 }}
        >
          <Image src={content.home.hero.image.src} alt={text(content.home.hero.image.alt, language)} fill className="object-cover opacity-60" priority loading="eager" sizes="100vw" />
          <div className="absolute inset-0 bg-[var(--img-overlay)]" />
          <div className="absolute inset-0 bg-[var(--img-duotone)] mix-blend-multiply" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[var(--content-wide)] px-[var(--gutter)] flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" className="flex max-w-5xl flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="section-kicker mb-6"
            >
              {language === "ar" ? "01 — كريبيلو أتيليه" : "01 — Crepello Atelier"}
            </motion.span>
            
            <RevealHeading 
              text={text(content.home.hero.title, language)} 
              className="font-serif-luxury text-5xl md:text-7xl lg:text-7xl xl:text-8xl text-white mb-8 max-w-5xl leading-[1.08] justify-center font-normal" 
              delay={0.2}
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-white/90 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]"
            >
              {text(content.home.hero.body, language)}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-5"
            >
              <Magnetic>
                <Link href={localizedHref("/menu")} className="primary-button group" data-cursor="hover">
                  {text(content.home.hero.ctaLabel, language)}
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={localizedHref("/branches")} className="secondary-button text-white border-white/20 hover:border-white hover:text-white" data-cursor="hover">
                  {language === "ar" ? "الفروع" : "Branches"}
                  <MapPin size={18} />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-8 right-[var(--gutter)] z-10 hidden md:flex flex-col items-center gap-3">
          <div className="scroll-indicator-mouse">
            <div className="scroll-indicator-wheel" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/45">
            {language === "ar" ? "اسحب لأسفل" : "Scroll"}
          </span>
        </div>
      </section>

      <section className="relative z-20 border-y border-[var(--line)] bg-[var(--background)] px-[var(--gutter)] py-8">
        <div className="mx-auto grid max-w-[var(--content-wide)] gap-4 md:grid-cols-4">
          {content.home.features.map((feature) => {
            const Icon =
              feature.id === "delivery"
                ? Truck
                : feature.id === "place"
                  ? Armchair
                  : feature.id === "service"
                    ? Sparkles
                    : Utensils;

            return (
              <div
                key={feature.id}
                className="flex items-center gap-4 border border-[var(--line)] bg-[var(--surface)] p-5 rounded-[var(--radius-md)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--line-strong)] text-[var(--gold)]">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold text-white">
                  {text(feature.label, language)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modern Magazine Style Menu Preview */}
      <section className="section bg-[var(--bg-sunken)] relative z-20 border-y border-[var(--line)]">
        <div className="section-inner">
          <div>
            <span className="section-kicker">{language === "ar" ? "تجربة كريبيلو" : "The Crepello Mood"}</span>
            
            <RevealHeading 
              text={language === "ar" ? "مشروبات، مخبوزات، حلويات وبرنش في مسار واحد." : "Drinks, bakery, dessert and brunch in one polished ritual."}
              className="section-heading text-[var(--ink)] font-serif-luxury font-light max-w-4xl"
            />
            
            <div className="magazine-grid">
              {content.menu.slice(0, 4).map((category, index) => (
                <TiltCard 
                  key={category.id} 
                  dataCursor="explore"
                  className={cn(
                    "group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] transition-all duration-700 hover:border-[rgba(198,138,78,0.45)] shadow-gold-subtle",
                    index === 0 ? "col-span-12 md:col-span-8 h-[450px]" : 
                    index === 1 ? "col-span-12 md:col-span-4 h-[450px]" : 
                    index === 2 ? "col-span-12 md:col-span-5 h-[340px]" : 
                    "col-span-12 md:col-span-7 h-[340px]"
                  )}
                >
                  <Link href={localizedHref(category.slug)} className="relative block w-full h-full">
                    <Image 
                      src={category.heroImage.src} 
                      alt={text(category.heroImage.alt, language)} 
                      fill 
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-65 group-hover:opacity-45 transition-all duration-1000 group-hover:scale-105 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-10 flex justify-between items-end">
                      <div className="transform translate-z-20">
                        <span className="text-[var(--gold)] text-xs tracking-[0.25em] mb-3 block font-bold font-sans">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-serif-luxury text-3xl md:text-4xl text-white m-0 group-hover:text-[var(--gold)] transition-colors duration-500 font-light">
                          {text(category.navLabel, language)}
                        </h3>
                      </div>
                      <div className="w-14 h-14 rounded-[var(--radius-md)] border border-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-[var(--gold)] group-hover:border-transparent group-hover:text-black transition-all duration-500 shadow-lg">
                        <ArrowUpRight size={22} />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {content.home.sections.slice(0, 2).map((section, index) => (
        <StoryBand key={section.id} language={language} section={section} reversed={index % 2 !== 0} />
      ))}
      
      {/* Atelier Callout Section */}
      <section className="relative overflow-hidden py-24 px-[var(--gutter)] border-b border-[var(--line)] bg-[var(--background)] text-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg-sunken),rgba(5,5,5,.86))]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase block mb-4 font-semibold">
            {language === "ar" ? "كريبيلو أتيليه" : "Crepello Atelier"}
          </span>
          <h2 className="font-serif-luxury text-4xl md:text-5xl text-white mb-6 font-light">
            {language === "ar" ? "تفاصيل مصنوعة لمذاق كريبيلو" : "Crafted for the Crepello Mood"}
          </h2>
          <p className="text-[var(--muted)] text-base mb-10 max-w-xl mx-auto font-light leading-relaxed">
            {language === "ar" 
              ? "من القهوة الهادئة إلى الكريب والحلويات، كل تفصيل في كريبيلو مصمم ليشبه العلامة نفسها: دافئ، داكن، ومترف بهدوء."
              : "From slow coffee to crepes and desserts, every detail is shaped around Crepello: warm, dark, polished, and quietly indulgent."}
          </p>
          <Magnetic>
            <Link href={localizedHref("/menu")} className="primary-button inline-flex items-center gap-3">
              {language === "ar" ? "استكشف منيو كريبيلو" : "Explore the Menu"}
              <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Story Band
// ----------------------------------------------------

function StoryBand({ section, language, reversed }: { section: HomeSection; language: Locale; reversed: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const localizedHref = (href: string) => `/${language}${href === "/" ? "" : href}`;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <section ref={containerRef} className="py-[var(--section-y-sm)] px-[var(--gutter)] overflow-hidden relative border-b border-[var(--line)]">
      <div className="max-w-[1400px] mx-auto">
        <div className={cn("flex flex-col lg:flex-row gap-20 lg:gap-32 items-center", reversed && "lg:flex-row-reverse")}>
          
          {/* Image Container with Parallax scroll */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/5] w-full rounded-[var(--radius-md)] overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-2xl">
              <motion.div style={{ y: yImage, scale: 1.12 }} className="absolute inset-0 w-full h-full">
                <Image src={section.image.src} alt={text(section.image.alt, language)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text Container */}
          <div className="flex-1 flex flex-col justify-center">
            <span className="section-kicker">{language === "ar" ? "توقيع كريبيلو" : "Crepello signature"}</span>
            
            <RevealHeading 
              text={text(section.title, language)} 
              className="section-heading mb-8 font-serif-luxury font-light"
            />
            
            {/* Scroll highlight reading animation */}
            <ScrollHighlightParagraph text={text(section.body, language)} />
            
            <div className="mt-4">
              <Magnetic>
                <Link href={localizedHref(section.ctaHref)} className="secondary-button group" data-cursor="hover">
                  {text(section.ctaLabel, language)}
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// About View
// ----------------------------------------------------

function AboutView({ content, language }: { content: SiteContent; language: Locale }) {
  const timelineContent = [
    {
      year: "2012",
      en: "We officially started Crepello. We worked hard for six months, testing, and tweaking our recipes to create the best crepes and waffles.",
      ar: "بدأنا كريبيلو رسمياً. عملنا لستة أشهر على اختبار الوصفات وتطويرها لصناعة أفضل كريب ووافل."
    },
    {
      year: "2014",
      en: "We moved from our small beginning to something bigger and more organized, marking the start of our big journey.",
      ar: "انتقلنا من بدايتنا الصغيرة إلى شكل أكبر وأكثر تنظيمًا، وهي بداية رحلتنا الكبيرة."
    },
    {
      year: "2017",
      en: "We opened our second location and started working on making our brand even better, aiming for global reach.",
      ar: "افتتحنا فرعنا الثاني وبدأنا العمل على تطوير علامتنا التجارية أكثر لنصل للعالمية."
    },
    {
      year: "2018",
      en: "We upgraded and reopened our main shop, making it bigger and better to match our global dreams.",
      ar: "طورنا وأعدنا افتتاح فرعنا الرئيسي ليصبح أكبر وأفضل لمواكبة طموحاتنا العالمية."
    },
    {
      year: "2019",
      en: "We expanded the Crepello experience into new markets, opening our first international branch and growing the brand presence.",
      ar: "وسّعنا تجربة كريبيلو إلى أسواق جديدة، وافتتحنا أول فرع دولي مع نمو حضور العلامة."
    },
    {
      year: "2022",
      en: "Global expansion continued with new branches in Palestine and preparatory steps for Chicago and Istanbul.",
      ar: "استمر التوسع العالمي بفرع آخر في فلسطين، وخطوات تأسيسية جديدة في شيكاغو وإسطنبول."
    }
  ];

  return (
    <main className="pt-20">
      <PageHero image={content.about.image} intro={content.about.intro} kicker={language === "ar" ? content.brand.nameAr : content.brand.name} language={language} title={content.about.title} />
      
      <section className="section bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="section-inner max-w-5xl mx-auto">
          <div className="text-center mb-24">
             <span className="section-kicker">{text(content.about.conceptTitle, language)}</span>
             <RevealHeading 
               text={language === "ar" ? "وصفة بدأت من الجامعة وصارت لغة ضيافة." : "A university idea refined into a hospitality language."}
               className="font-serif-luxury text-4xl md:text-5xl leading-tight mb-8 justify-center font-light"
             />
          </div>
          
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div className="space-y-8 text-lg text-[var(--muted)] leading-relaxed">
              {content.about.paragraphs.map((paragraph, index) => (
                <ScrollHighlightParagraph key={index} text={text(paragraph, language)} />
              ))}
            </div>
            
            <div className="bg-[var(--background)] border border-[var(--line)] p-10 rounded-[var(--radius-md)] shadow-xl space-y-8">
              <h3 className="font-serif-luxury text-2xl text-[var(--gold)] mb-6 font-light">
                {language === "ar" ? "مسيرتنا التاريخية" : "Our Historical Journey"}
              </h3>
              <div className="space-y-6 border-l border-[var(--line)] pl-6 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6 relative">
                {timelineContent.map((item) => (
                  <div key={item.year} className="relative group">
                    <span className="absolute -left-[31px] rtl:-right-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--gold)] border border-[var(--background)] group-hover:scale-125 transition-transform" />
                    <h4 className="font-serif-luxury text-lg text-white font-semibold mb-1">{item.year}</h4>
                    <p className="text-xs text-[var(--muted)] leading-relaxed font-light">{language === "ar" ? item.ar : item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Branches View
// ----------------------------------------------------

function BranchesView({ content, language }: { content: SiteContent; language: Locale }) {
  // Confirm branches data structure is strictly checked to hide empty values
  return (
    <main className="pt-20">
      <PageHero image={content.branches.countries[0]?.image ?? content.about.image} intro={content.branches.intro} kicker={language === "ar" ? "الفروع" : "Branches"} language={language} title={content.branches.title} />
      
      <section className="section bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="section-inner max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <span className="section-kicker">{language === "ar" ? "الرحلة" : "The journey"}</span>
             <RevealHeading 
               text={language === "ar" ? "من أول فرع إلى مدن جديدة، بنفس روح كريبيلو." : "From the first room to new cities, with the same Crepello spirit."}
               className="font-serif-luxury text-4xl md:text-5xl leading-tight mb-8 justify-center font-light"
             />
             <ScrollHighlightParagraph text={text(content.branches.journey, language)} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-20">
            {content.branches.branches.map((branch) => (
              <TiltCard 
                key={branch.id} 
                className="bg-[var(--background)] border border-[var(--line)] rounded-[var(--radius-md)] p-10 group hover:border-[rgba(198,138,78,0.45)] transition-all duration-500 shadow-lg relative overflow-hidden flex flex-col justify-between"
                dataCursor="view"
              >
                <div>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  
                  <div className="flex items-center gap-2 text-[var(--gold)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    <MapPin size={14} />
                    <span>{text(branch.city, language)}, {text(branch.country, language)}</span>
                  </div>
                  
                  <h3 className="font-serif-luxury text-2xl mb-3 font-light text-white group-hover:text-[var(--gold)] transition-colors duration-300">
                    {text(branch.name, language)}
                  </h3>
                  
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-8 font-light">
                    {text(branch.address, language)}
                  </p>
                </div>
                
                <div className="border-t border-[var(--line)] pt-8 flex flex-col gap-4">
                  {branch.phone && (
                    <div className="flex items-center gap-3 text-xs text-[var(--ink)]">
                      <Phone size={14} className="text-[var(--muted)]" />
                      <span className="font-light">{branch.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 mt-2">
                    {branch.phone && (
                      <Magnetic>
                        <a href={`tel:${branch.phone}`} className="px-4 py-2 border border-[var(--line)] text-[var(--gold)] rounded-full text-xs font-bold hover:bg-[var(--gold)] hover:text-black transition-all">
                          {language === "ar" ? "اتصال" : "Call"}
                        </a>
                      </Magnetic>
                    )}
                    
                    <Magnetic>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text(branch.name, language) + ", " + text(branch.city, language))}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-4 py-2 bg-[var(--surface-hover)] border border-[var(--line)] text-white rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all"
                      >
                        {language === "ar" ? "الاتجاهات" : "Directions"}
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Fallback Image Resolver for Menu Items
// ----------------------------------------------------

function getItemImageSrc(item: MenuItem, group: MenuGroup) {
  if (item.image && item.image.src) {
    return item.image.src;
  }
  switch (group.id) {
    case "hot-coffee":
      return "/images/americano.png";
    case "cold-coffee":
      return "/images/iced-latte.png";
    case "frappe-and-fresh":
      return "/images/mojito.png";
    case "crepe":
      return "/images/crepe-fallback.png";
    case "waffle":
      return "/images/cheesecake-waffle.png";
    case "pancake-french-toast":
      return "/images/pancake-stack.png";
    case "croissants":
      return "/images/croissant-fallback.png";
    case "cake":
      return "/images/cake-fallback.png";
    case "pastries":
      return "/images/pastry-selection.png";
    case "sandwiches":
    case "protein-pizza-crepe":
    default:
      return "/images/savory-hero.png";
  }
}

// ----------------------------------------------------
// Menu View
// ----------------------------------------------------

interface MenuViewProps {
  content: SiteContent;
  language: Locale;
  menuId: string;
  addToCart: (item: MenuItem, groupTitle: LocalizedString) => void;
}

function MenuView({ content, language, menuId, addToCart }: MenuViewProps) {
  const category = useMemo(() => content.menu.find((entry) => entry.id === menuId) ?? content.menu[0], [content.menu, menuId]);
  
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubcat, setActiveSubcat] = useState<string>("all");

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const localizedHref = (href: string) => `/${language}${href === "/" ? "" : href}`;

  if (!category) return null;

  // Filtered menu items
  const filteredGroups = category.groups
    .map((group) => {
      // Filter items within group
      const matchingItems = group.items.filter((item) =>
        text(item.name, language).toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...group, items: matchingItems };
    })
    .filter((group) => {
      // Filter groups by subcategory pill AND make sure group has matching items
      if (activeSubcat !== "all" && group.id !== activeSubcat) return false;
      return group.items.length > 0;
    });

  return (
    <main className="pt-20" onMouseMove={handleMouseMove}>
      <PageHero image={category.heroImage} intro={category.intro} kicker={text(category.sourceNote, language)} language={language} title={category.title} />
      
      {/* Floating Category Preview Bubble */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{
              position: "fixed",
              top: mousePos.y + 20,
              left: mousePos.x + 20,
              pointerEvents: "none",
              zIndex: 99,
              width: 130,
              height: 130,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--gold)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <Image src={hoveredImage} alt="Preview" fill sizes="130px" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="section-inner max-w-7xl mx-auto">
          
          {/* Category Tabs */}
          <nav className="flex flex-wrap justify-center gap-4 mb-16">
            {content.menu.map((cat) => (
              <Magnetic key={cat.id}>
                <Link 
                  href={localizedHref(cat.slug)} 
                  className={cn(
                    "px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                    cat.id === menuId ? "bg-[var(--gold)] text-[var(--background)]" : "bg-[var(--background)] border border-[var(--line)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  )}
                  onMouseEnter={() => setHoveredImage(cat.heroImage.src)}
                  onMouseLeave={() => setHoveredImage(null)}
                  data-cursor="hover"
                >
                  {text(cat.navLabel, language)}
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Search & Subcategory Filters Grid */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16 pb-8 border-b border-[var(--line)]">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <button 
                onClick={() => setActiveSubcat("all")}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold border transition-all",
                  activeSubcat === "all" ? "bg-white text-black border-white" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--gold)]"
                )}
              >
                {language === "ar" ? "الكل" : "All"}
              </button>
              {category.groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveSubcat(group.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold border transition-all",
                    activeSubcat === group.id ? "bg-white text-black border-white" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--gold)]"
                  )}
                >
                  {text(group.title, language)}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
              <input
                type="text"
                placeholder={language === "ar" ? "ابحث عن صنف..." : "Search menu..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--line)] pl-12 pr-4 py-3 rounded-full text-xs text-white focus:outline-none focus:border-[var(--gold)]"
              />
            </div>
          </div>
 
          <div className="space-y-32">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <motion.div 
                  key={group.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-serif-luxury text-4xl mb-12 pb-6 border-b border-[var(--line)] text-center text-[var(--gold)] font-light">
                    {text(group.title, language)}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {group.items.map((item) => {
                      // Subtly check if some items can be marked as signature/featured
                      const isFeatured = item.id.includes("signature") || item.id === "fettuccini-crepe" || item.id === "cheesecake-waffle" || item.id === "turkish-coffee";
                      
                      return (
                        <TiltCard 
                          key={item.id} 
                          className="group bg-[var(--background)] border border-[var(--line)] rounded-[var(--radius-md)] overflow-hidden hover:border-[rgba(198,138,78,0.45)] transition-all duration-500 shadow-md flex flex-col justify-between h-full relative"
                          dataCursor="view"
                        >
                          <div>
                            <div className="relative h-56 bg-[#171513] flex items-center justify-center overflow-hidden">
                              <Image 
                                src={getItemImageSrc(item, group)} 
                                alt={item.image ? text(item.image.alt, language) : text(item.name, language)} 
                                fill 
                                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              {isFeatured && (
                                <span className="absolute top-4 right-4 bg-[var(--gold)] text-[var(--background)] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                  {language === "ar" ? "توقيع كريبيلو" : "Signature"}
                                </span>
                              )}
                            </div>
                            
                            <div className="p-8">
                              <h3 className="font-serif-luxury text-xl font-light text-white group-hover:text-[var(--gold)] transition-colors duration-300">
                                {text(item.name, language)}
                              </h3>
                              {/* Price field hidden completely (Phase 5) */}
                            </div>
                          </div>

                          {ORDER_MODE === "whatsapp" && (
                            <div className="px-8 pb-8 pt-0">
                              <button
                                onClick={() => addToCart(item, group.title)}
                                className="w-full py-2.5 border border-[var(--gold)] text-[var(--gold)] rounded-full text-xs font-semibold hover:bg-[var(--gold)] hover:text-black transition-all flex items-center justify-center gap-2"
                              >
                                <Plus size={14} />
                                {language === "ar" ? "إضافة للطلب" : "Add to Order"}
                              </button>
                            </div>
                          )}
                        </TiltCard>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 text-[var(--muted)] font-light">
                {language === "ar" ? "لم يتم العثور على أصناف مطابقة." : "No menu items found."}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Order / WhatsApp View
// ----------------------------------------------------

interface OrderViewProps {
  content: SiteContent;
  language: Locale;
  cart: CartItem[];
  saveCart: (cart: CartItem[]) => void;
}

function OrderView({ content, language, cart, saveCart }: OrderViewProps) {
  const [customerName, setCustomerName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const updateQty = (id: string, delta: number) => {
    const updated = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    if (!customerName.trim()) {
      setErrorMsg(language === "ar" ? "يرجى إدخال الاسم." : "Please enter your name.");
      return;
    }
    if (!selectedBranch) {
      setErrorMsg(language === "ar" ? "يرجى اختيار الفرع." : "Please select a branch.");
      return;
    }

    const branch = content.branches.branches.find((b) => b.id === selectedBranch);
    const targetPhone = branch?.phone || content.contact.mainPhone;

    // Build WhatsApp Order String
    let msg = language === "ar" ? "مرحباً كريبيلو، أود تقديم طلب جديد:\n\n" : "Hello Crepello, I would like to place a new order:\n\n";
    cart.forEach((item) => {
      msg += `• ${item.quantity}x ${text(item.name, language)} (${text(item.groupTitle, language)})\n`;
    });
    msg += `\n👤 ${language === "ar" ? "الاسم" : "Name"}: ${customerName}`;
    msg += `\n📍 ${language === "ar" ? "الفرع" : "Branch"}: ${branch ? text(branch.name, language) : ""}`;
    if (orderNotes.trim()) {
      msg += `\n📝 ${language === "ar" ? "ملاحظات" : "Notes"}: ${orderNotes}`;
    }
    msg += `\n\n*${
      language === "ar" 
        ? "تنبيه: الطلب غير مؤكد حتى يتم قبوله من الفرع." 
        : "Disclaimer: This order is not confirmed until accepted by the branch."
    }*`;

    const waUrl = `https://wa.me/${targetPhone.replace(/[\s+]/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (ORDER_MODE === "disabled") {
    return (
      <main className="pt-20 min-h-screen bg-[var(--surface)] flex items-center justify-center text-center px-8">
        <div className="max-w-md">
          <ShoppingBag size={48} className="text-[var(--gold)] mx-auto mb-6 opacity-65" />
          <h2 className="font-serif-luxury text-3xl mb-4 text-white font-light">
            {language === "ar" ? "الطلب الإلكتروني غير متوفر" : "Ordering is Offline"}
          </h2>
          <p className="text-[var(--muted)] font-light leading-relaxed mb-8">
            {text(content.cart.body, language)}
          </p>
          <Link href={`/${language}/menu/drinks`} className="primary-button inline-flex">
            {language === "ar" ? "تصفح القائمة" : "Browse Menu"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-[var(--surface)] pb-24">
      <PageHero 
        image={content.home.sections[0]?.image ?? content.home.hero.image} 
        intro={content.cart.body} 
        kicker={language === "ar" ? "الطلب أونلاين" : "Order Online"} 
        language={language} 
        title={content.cart.title} 
      />
      
      <section className="section border-t border-[var(--line)]">
        <div className="section-inner max-w-6xl mx-auto">
          {cart.length === 0 ? (
            <div className="text-center py-24 max-w-md mx-auto">
              <ShoppingBag size={48} className="text-[var(--muted)] mx-auto mb-6 opacity-35" />
              <h3 className="font-serif-luxury text-2xl text-white font-light mb-4">
                {language === "ar" ? "قائمة طلباتك فارغة" : "Your order list is empty"}
              </h3>
              <p className="text-[var(--muted)] text-sm mb-8 font-light">
                {language === "ar" ? "تصفح منيو كريبيلو الشهي وأضف الأصناف المفضلة لديك." : "Browse our delicious menu and add your favorite items to order."}
              </p>
              <Link href={`/${language}/menu/drinks`} className="primary-button inline-flex">
                {language === "ar" ? "تصفح المنيو" : "Browse Menu"}
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* Cart Items List */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif-luxury text-2xl text-white font-light pb-4 border-b border-[var(--line)] flex justify-between items-center">
                  <span>{language === "ar" ? "الأصناف المختارة" : "Selected Items"}</span>
                  <span className="text-xs text-[var(--gold)] font-sans font-bold">({totalItems} {language === "ar" ? "أصناف" : "items"})</span>
                </h3>
                
                <div className="divide-y divide-[var(--line)]">
                  {cart.map((item) => (
                    <div key={item.id} className="py-6 flex justify-between items-center gap-6">
                      <div>
                        <h4 className="font-serif-luxury text-lg text-white font-light mb-1">
                          {text(item.name, language)}
                        </h4>
                        <span className="text-[var(--muted)] text-[10px] uppercase tracking-wider">
                          {text(item.groupTitle, language)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[var(--line)] rounded-full px-2 py-1 bg-[var(--background)]">
                          <button 
                            onClick={() => updateQty(item.id, -1)} 
                            className="p-1.5 text-[var(--muted)] hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1)} 
                            className="p-1.5 text-[var(--muted)] hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => updateQty(item.id, -item.quantity)} 
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form Card */}
              <div className="lg:col-span-5 bg-[var(--background)] border border-[var(--line)] rounded-[var(--radius-md)] p-10 shadow-xl">
                <h3 className="font-serif-luxury text-2xl text-white font-light mb-6">
                  {language === "ar" ? "تفاصيل الطلب" : "Order Details"}
                </h3>
                
                <form onSubmit={handleSendOrder} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold" htmlFor="cust-name">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                    </label>
                    <input 
                      id="cust-name"
                      type="text" 
                      required
                      value={customerName}
                      onChange={(e) => { setCustomerName(e.target.value); setErrorMsg(""); }}
                      placeholder={language === "ar" ? "اسمك الكريم" : "Enter your name"}
                      className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold" htmlFor="branch-select">
                      {language === "ar" ? "اختر فرع الاستلام" : "Select Pickup Branch"} *
                    </label>
                    <select
                      id="branch-select"
                      required
                      value={selectedBranch}
                      onChange={(e) => { setSelectedBranch(e.target.value); setErrorMsg(""); }}
                      className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    >
                      <option value="">{language === "ar" ? "-- اختر الفرع --" : "-- Choose Branch --"}</option>
                      {content.branches.branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {text(b.name, language)} ({text(b.city, language)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold" htmlFor="order-notes">
                      {language === "ar" ? "ملاحظات إضافية" : "Order Notes"}
                    </label>
                    <textarea
                      id="order-notes"
                      rows={3}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder={language === "ar" ? "مثال: إكسترا شوكولاتة، كريب مقرمش..." : "Example: Extra chocolate, crispy..."}
                      className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--gold)] resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>
                  )}

                  <p className="text-[10px] text-[var(--muted)] leading-relaxed italic border-t border-[var(--line)] pt-4 font-light">
                    {language === "ar"
                      ? "* تنبيه: سيتم توجيهك إلى تطبيق واتساب لإرسال الطلب. الطلب لا يعتبر مؤكداً حتى يستلمه الموظف ويرد عليك بالقبول."
                      : "* Notice: You will be redirected to WhatsApp to send this message. Your order is not confirmed until the branch responds to accept it."}
                  </p>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-[var(--gold)] text-[var(--background)] rounded-full text-xs font-bold hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg"
                  >
                    <span>{language === "ar" ? "إرسال عبر الواتساب" : "Send Order via WhatsApp"}</span>
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Contact View
// ----------------------------------------------------

function ContactView({ content, language }: { content: SiteContent; language: Locale }) {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulate API submit validation
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryMsg("");
    }, 1200);
  };

  return (
    <main className="pt-20 min-h-screen bg-[var(--surface)] pb-24">
      <PageHero 
        image={content.about.image} 
        intro={content.contact.phoneNote} 
        kicker={language === "ar" ? "تواصل معنا" : "Contact Us"} 
        language={language} 
        title={{ en: "Get In Touch", ar: "ابقَ على تواصل" }} 
      />

      <section className="section border-t border-[var(--line)]">
        <div className="section-inner max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          
          {/* General Contact Info */}
          <div className="space-y-10">
            <div>
              <span className="text-[var(--gold)] text-xs tracking-[0.25em] uppercase block mb-3 font-semibold">
                {language === "ar" ? "الفرع الرئيسي" : "Headquarters"}
              </span>
              <h3 className="font-serif-luxury text-3xl text-white mb-6 font-light">
                {language === "ar" ? "معلومات الاتصال المعتمدة" : "Verified Credentials"}
              </h3>
              
              <div className="space-y-4 text-sm font-light text-[var(--muted)]">
                <p className="flex items-center gap-3 text-white">
                  <Mail size={16} className="text-[var(--gold)]" />
                  <a href={`mailto:${content.contact.email}`} className="hover:underline">{content.contact.email}</a>
                </p>
                <p className="flex items-center gap-3 text-white">
                  <Phone size={16} className="text-[var(--gold)]" />
                  <span>{content.contact.mainPhone}</span>
                </p>
              </div>
            </div>

            <div className="p-8 border border-[var(--line)] rounded-[var(--radius-md)] bg-[var(--background)]">
              <span className="text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase block mb-2 font-bold">
                {language === "ar" ? "قناة كريبيلو الرسمية" : "Crepello Official Channel"}
              </span>
              <h4 className="font-serif-luxury text-lg text-white mb-3 font-light">
                {language === "ar" ? "استفسارات العلامة والضيافة" : "Brand and Hospitality Inquiries"}
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed font-light mb-6">
                {language === "ar" 
                  ? "لأي استفسار عن كريبيلو، يرجى التواصل عبر البريد الإلكتروني الرسمي للعلامة."
                  : "For Crepello inquiries, please contact the brand through the official email channel."}
              </p>
              <a href={`mailto:${content.contact.email}`} className="text-xs font-bold text-[var(--gold)] hover:underline flex items-center gap-2">
                <span>{content.contact.email}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[var(--background)] border border-[var(--line)] rounded-[var(--radius-md)] p-10 shadow-xl">
            <h3 className="font-serif-luxury text-2xl text-white font-light mb-6">
              {language === "ar" ? "أرسل لنا استفسارك" : "Submit Inquiries"}
            </h3>

            {formSuccess ? (
              <div className="text-center py-10">
                <Sparkles className="text-[var(--gold)] mx-auto mb-4" size={36} />
                <h4 className="font-serif-luxury text-xl text-white font-light mb-2">
                  {language === "ar" ? "تم الإرسال بنجاح!" : "Submitted Successfully!"}
                </h4>
                <p className="text-xs text-[var(--muted)] font-light leading-relaxed">
                  {language === "ar" 
                    ? "شكراً لتواصلك مع كريبيلو. سنقوم بمراجعة طلبك والرد عليك في أقرب وقت."
                    : "Thank you for contacting Crepello. Our team will review your inquiry and get back to you shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold" htmlFor="inq-name">
                    {language === "ar" ? "الاسم" : "Name"} *
                  </label>
                  <input 
                    id="inq-name"
                    type="text" 
                    required 
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder={language === "ar" ? "اسمك الكريم" : "Enter your name"}
                    className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold" htmlFor="inq-email">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                  </label>
                  <input 
                    id="inq-email"
                    type="email" 
                    required 
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold" htmlFor="inq-msg">
                    {language === "ar" ? "رسالتك" : "Message"} *
                  </label>
                  <textarea 
                    id="inq-msg"
                    required 
                    rows={4}
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    placeholder={language === "ar" ? "اكتب استفسارك هنا..." : "Type your message..."}
                    className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--gold)] resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="w-full py-4 bg-[var(--gold)] text-[var(--background)] rounded-full text-xs font-bold hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                >
                  <span>{formLoading ? (language === "ar" ? "جاري الإرسال..." : "Sending...") : (language === "ar" ? "إرسال الرسالة" : "Send Message")}</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Page Hero Layout
// ----------------------------------------------------

function PageHero({ image, kicker, title, intro, language }: { image: ImageAsset; kicker: string; title: LocalizedString; intro: LocalizedString; language: Locale; }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], [0, 150]);

  return (
    <section className="relative h-[60vh] min-h-[480px] flex items-end justify-center pb-24 overflow-hidden bg-black border-b border-[var(--line)]">
      <motion.div 
        initial={{ scale: 1.12 }} 
        animate={{ scale: 1.02 }} 
        transition={{ duration: 5, ease: "easeOut" }} 
        style={{ y: yHero }}
        className="absolute inset-0 z-0"
      >
        <Image src={image.src} alt={text(image.alt, language)} fill priority loading="eager" sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/75 to-transparent" />
      </motion.div>
      
      <div className="relative z-10 max-w-4xl px-8 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.1 }}
          className="block text-[var(--gold)] text-xs uppercase tracking-[0.25em] font-bold mb-6 font-sans"
        >
          {kicker}
        </motion.span>
        
        <RevealHeading 
          text={text(title, language)} 
          className="font-serif-luxury text-5xl md:text-7xl text-white mb-6 justify-center font-light leading-tight" 
          delay={0.2}
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-white/85 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {text(intro, language)}
        </motion.p>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Global Footer
// ----------------------------------------------------

function Footer({
  content,
  language,
}: {
  content: SiteContent;
  language: Locale;
}) {
  return (
    <footer className="site-footer bg-[#070605]">
      <div className="footer-inner">
        <div className="space-y-6">
          <h2 className="font-serif-luxury text-4xl text-white font-light">{language === "ar" ? content.brand.nameAr : content.brand.name}</h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-sm font-light text-sm">{text(content.brand.tagline, language)}</p>
        </div>
        <div>
          <h3>{language === "ar" ? "تواصل" : "Contact"}</h3>
          <div className="footer-list">
            <Magnetic>
              <a href={`mailto:${content.contact.email}`} className="flex items-center gap-2 hover:text-[var(--gold)]" data-cursor="hover">
                <Mail size={14} /> {content.contact.email}
              </a>
            </Magnetic>
            <span className="flex items-center gap-2"><Phone size={14} /> {content.contact.mainPhone}</span>
          </div>
        </div>
        <div>
          <h3>{language === "ar" ? "اجتماعي" : "Social"}</h3>
          <div className="footer-list">
            {content.socials.map((social) => (
              <div key={social.id}>
                <Magnetic>
                  <a href={social.href} rel="noreferrer" target="_blank" className="flex items-center gap-2 hover:text-[var(--gold)]" data-cursor="hover">
                    <Globe2 size={14} /> {social.label} <ExternalLink size={12} className="opacity-65" />
                  </a>
                </Magnetic>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 mt-16 pt-8 border-t border-[var(--line)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--muted)] font-light">
        <div>
          &copy; {new Date().getFullYear()} {content.brand.name}. All rights reserved.
        </div>
        
        {/* Allergen disclaimer & legal page stubs */}
        <div className="flex flex-wrap gap-6 justify-center">
          <span className="hover:text-[var(--gold)] transition-colors italic cursor-help" title="Crepello products contain milk, eggs, wheat, soy, and nuts.">
            {language === "ar" ? "تنبيه الحساسية" : "Allergen Warning"}
          </span>
          <span className="hover:text-[var(--gold)] transition-colors italic cursor-help" title="Product availability varies by branch.">
            {language === "ar" ? "توفر المنتجات" : "Product Availability"}
          </span>
        </div>
      </div>
    </footer>
  );
}

function text(value: LocalizedString, language: Locale): string {
  return value[language] || value.en;
}
