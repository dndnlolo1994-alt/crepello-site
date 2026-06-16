"use client";

import {
  Armchair,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Locale, LocalizedString, MenuCategory, SiteContent } from "@/lib/types";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    offset: ["start 90%", "end 60%"]
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

function Word({ children, progress, range }: { children: React.ReactNode; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="text-[var(--ink)] font-light">
      {children}
    </motion.span>
  );
}

function RevealHeading({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
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
        </span>
      ))}
    </motion.h2>
  );
}

// ----------------------------------------------------
// PublicPage Controller
// ----------------------------------------------------

type PublicPageProps =
  | { content: SiteContent; view: "home" | "about" | "branches" | "cart"; }
  | { content: SiteContent; view: "menu"; menuId: string; };

export function PublicPage(props: PublicPageProps) {
  const activePath = getActivePath(props);
  const menuId = props.view === "menu" ? props.menuId : null;

  return (
    <SiteChrome content={props.content} activePath={activePath}>
      {(language) => {
        if (props.view === "home") return <HomeView content={props.content} language={language} />;
        if (props.view === "about") return <AboutView content={props.content} language={language} />;
        if (props.view === "branches") return <BranchesView content={props.content} language={language} />;
        if (props.view === "cart") return <CartView content={props.content} language={language} />;
        if (menuId) return <MenuView content={props.content} language={language} menuId={menuId} />;
        return null;
      }}
    </SiteChrome>
  );
}

function getActivePath(props: PublicPageProps): string {
  switch (props.view) {
    case "home": return "/";
    case "about": return "/aboutus";
    case "branches": return "/branches";
    case "cart": return "/cart";
    case "menu": return props.content.menu.find((c) => c.id === props.menuId)?.slug ?? "/menu-drinks";
  }
}

// ----------------------------------------------------
// Global Layout (SiteChrome)
// ----------------------------------------------------

function SiteChrome({ content, activePath, children }: { content: SiteContent; activePath: string; children: (l: Locale) => React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [cursorHovered, setCursorHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Custom Cursor variables
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const cursorX = useSpring(mouseX, { damping: 26, stiffness: 180, mass: 0.3 });
  const cursorY = useSpring(mouseY, { damping: 26, stiffness: 180, mass: 0.3 });

  const followerX = useSpring(mouseX, { damping: 32, stiffness: 90, mass: 0.9 });
  const followerY = useSpring(mouseY, { damping: 32, stiffness: 90, mass: 0.9 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches || ('ontouchstart' in window));
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

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const navLinks = [
    ...content.nav.filter((link) => link.href !== "/menu-drinks"),
    ...content.menu.map((category) => ({ href: category.slug, label: category.navLabel })),
  ];

  return (
    <div className="site-shell bg-[var(--background)] text-[var(--ink)] font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Cinematic Overlays */}
      <div className="grain-overlay" />
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

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
              borderColor: cursorHovered ? "var(--gold)" : "rgba(197, 168, 128, 0.3)",
              color: cursorHovered ? "var(--gold)" : "transparent",
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
            <Link className="brand-mark" href="/" aria-label={content.brand.name} data-cursor="hover">
              <span className="brand-logo">
                <Image src={content.brand.logo.src} alt={text(content.brand.logo.alt, language)} fill sizes="44px" />
              </span>
              <span className="font-serif-luxury tracking-wide">{language === "ar" ? content.brand.nameAr : content.brand.name}</span>
            </Link>
          </Magnetic>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Magnetic key={link.href}>
                <Link
                  href={link.href}
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
                <button className={cn(language === "en" && "active")} onClick={() => setLanguage("en")} type="button" data-cursor="hover">EN</button>
              </Magnetic>
              <span className="text-[var(--line)]">|</span>
              <Magnetic>
                <button className={cn(language === "ar" && "active")} onClick={() => setLanguage("ar")} type="button" data-cursor="hover">AR</button>
              </Magnetic>
            </span>
            <Magnetic>
              <Link className="header-order-link" href="/cart" data-cursor="order">
                <ShoppingBag size={16} />
                <span>{language === "ar" ? "اطلب" : "Order"}</span>
              </Link>
            </Magnetic>
            <button className="mobile-menu-button lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} type="button">
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
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg uppercase tracking-wider text-[var(--muted)] hover:text-[var(--gold)]" onClick={() => setMobileOpen(false)}>
                    {text(link.label, language)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex-1">
        {children(language)}
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

  return (
    <main>
      <section className="relative h-[100svh] overflow-hidden bg-black flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 18, ease: "easeOut" }}
          style={{ y: y1 }}
        >
          <Image src={content.home.hero.image.src} alt={text(content.home.hero.image.alt, language)} fill className="object-cover opacity-50" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-black/40" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] px-8 flex flex-col items-center text-center mt-20">
          <motion.div initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-6 font-semibold font-serif-luxury italic"
            >
              {language === "ar" ? "كريبيلو أتيليه" : "Crepello Atelier"}
            </motion.span>
            
            <RevealHeading 
              text={text(content.home.hero.title, language)} 
              className="font-serif-luxury text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-4xl leading-[1.05] justify-center font-light" 
              delay={0.2}
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-white/80 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed"
            >
              {text(content.home.hero.body, language)}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Magnetic>
                <Link href={content.home.hero.ctaHref} className="primary-button group" data-cursor="hover">
                  {text(content.home.hero.ctaLabel, language)}
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/branches" className="secondary-button text-white border-white/20 hover:border-white hover:text-white" data-cursor="hover">
                  {language === "ar" ? "الفروع" : "Branches"}
                  <MapPin size={18} />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <div className="scroll-indicator-mouse">
            <div className="scroll-indicator-wheel" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/45">
            {language === "ar" ? "اسحب لأسفل" : "Scroll"}
          </span>
        </div>
      </section>

      {/* Modern Magazine Style Menu Preview */}
      <section className="section bg-[var(--surface)] relative z-20 border-y border-[var(--line)]">
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
                    "group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--background)] transition-all duration-700 hover:border-var(--gold)/30 shadow-gold-subtle",
                    index === 0 ? "col-span-12 md:col-span-8 h-[450px]" : 
                    index === 1 ? "col-span-12 md:col-span-4 h-[450px]" : 
                    index === 2 ? "col-span-12 md:col-span-5 h-[340px]" : 
                    "col-span-12 md:col-span-7 h-[340px]"
                  )}
                >
                  <Link href={category.slug} className="block w-full h-full">
                    <Image 
                      src={category.heroImage.src} 
                      alt={text(category.heroImage.alt, language)} 
                      fill 
                      className="object-cover opacity-50 group-hover:opacity-30 transition-all duration-1000 group-hover:scale-105 ease-out" 
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
                      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-[var(--gold)] group-hover:border-transparent group-hover:text-black transition-all duration-500 shadow-lg">
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
    </main>
  );
}

// ----------------------------------------------------
// Story Band
// ----------------------------------------------------

// ----------------------------------------------------
// Story Band
// ----------------------------------------------------

function StoryBand({ section, language, reversed }: { section: SiteContent["home"]["sections"][number]; language: Locale; reversed: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <section ref={containerRef} className="py-32 px-8 overflow-hidden relative border-b border-[var(--line)]">
      <div className="max-w-[1400px] mx-auto">
        <div className={cn("flex flex-col lg:flex-row gap-20 lg:gap-32 items-center", reversed && "lg:flex-row-reverse")}>
          
          {/* Image Container with Parallax scroll */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-2xl">
              <motion.div style={{ y: yImage, scale: 1.12 }} className="absolute inset-0 w-full h-full">
                <Image src={section.image.src} alt={text(section.image.alt, language)} fill className="object-cover" />
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
                <Link href={section.ctaHref} className="secondary-button group" data-cursor="hover">
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
            
            <div className="grid grid-cols-2 gap-6">
              {content.about.stats.map((stat, i) => (
                <TiltCard 
                  key={stat.label.en} 
                  className="bg-[var(--background)] border border-[var(--line)] p-10 rounded-2xl flex flex-col justify-center items-center text-center hover:border-[var(--gold)]/30 transition-colors shadow-lg"
                  dataCursor="hover"
                >
                  <motion.span 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="font-serif-luxury text-5xl md:text-6xl text-[var(--gold)] mb-3 font-light"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-[var(--muted)] text-xs uppercase tracking-[0.2em] font-semibold">{text(stat.label, language)}</span>
                </TiltCard>
              ))}
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
  return (
    <main className="pt-20">
      <PageHero image={content.branches.countries[0]?.image ?? content.about.image} intro={content.branches.intro} kicker={language === "ar" ? "الفروع" : "Branches"} language={language} title={content.branches.title} />
      
      <section className="section bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="section-inner max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <span className="section-kicker">{language === "ar" ? "الرحلة" : "The journey"}</span>
             <RevealHeading 
               text={language === "ar" ? "من الأردن إلى العالم، دون فقدان روح المكان." : "From Jordan to the world, without losing the room."}
               className="font-serif-luxury text-4xl md:text-5xl leading-tight mb-8 justify-center font-light"
             />
             <ScrollHighlightParagraph text={text(content.branches.journey, language)} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {content.branches.branches.map((branch, i) => (
              <TiltCard 
                key={branch.id} 
                className="bg-[var(--background)] border border-[var(--line)] rounded-2xl p-10 group hover:border-[var(--gold)]/30 transition-all duration-500 shadow-lg relative overflow-hidden"
                dataCursor="view"
              >
                {/* Visual Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                
                <div className="flex items-center gap-2 text-[var(--gold)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  <MapPin size={14} />
                  <span>{text(branch.city, language)}, {text(branch.country, language)}</span>
                </div>
                
                <h3 className="font-serif-luxury text-2xl mb-3 font-light text-white group-hover:text-[var(--gold)] transition-colors duration-300">
                  {text(branch.name, language)}
                </h3>
                
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-8 min-h-[48px] font-light">
                  {text(branch.address, language)}
                </p>
                
                <div className="flex flex-col gap-4 text-xs border-t border-[var(--line)] pt-8 font-sans">
                  <div className="flex items-center gap-3 text-[var(--ink)]">
                    <Phone size={14} className="text-[var(--muted)]" />
                    <span className="font-light">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--ink)]">
                    <div className="w-4 h-4 flex items-center justify-center">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse" />
                    </div>
                    <span className="font-semibold text-emerald-400">{text(branch.status, language)}</span>
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

function getItemImageSrc(item: any, group: any, category: any) {
  if (item.image && item.image.src) {
    return item.image.src;
  }
  // Fallbacks based on group or category
  switch (group.id) {
    case "hot-coffee":
      return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/46421929-0055-48db-8e78-23df6f700c09/Americano.jpg";
    case "cold-coffee":
      return "/images/iced-latte.png";
    case "frappe-and-fresh":
      return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/39bee899-245b-459e-bd7e-c0943b855c78/Blue+ocean.jpg";
    case "crepe":
      return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/6b5f4244-f62f-4b20-8909-bdabeeceecdc/Thumbnail+-+Sweets-01.jpg";
    case "waffle":
      return "/images/cheesecake-waffle.png";
    case "pancake-french-toast":
      return "/images/pancake-stack.png";
    case "croissants":
      if (category.id === "brunch") {
        return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/70ca02d4-fc19-4ce0-bd1a-7eda57f386bc/Thumbnail_Turkey+croissant.jpg";
      }
      return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/19a5089a-e210-4b2a-a782-32bf5a663c7e/Thumbnail_Mixed+cheese+croissant.jpg";
    case "cake":
      return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/1e44a3ad-1b07-405f-a92f-45a72e838573/Thumbnail+-+Sweets-02.jpg";
    case "pastries":
      return "/images/pastry-selection.png";
    case "sandwiches":
    case "protein-pizza-crepe":
    default:
      return "https://images.squarespace-cdn.com/content/v1/64202f0cd5c9b743cab340ba/c15bd9a4-3f3c-40a5-a44d-5531fe735cc5/Website+Banners-0b.jpg";
  }
}

// ----------------------------------------------------
// Menu View
// ----------------------------------------------------

function MenuView({ content, language, menuId }: { content: SiteContent; language: Locale; menuId: string }) {
  const category = useMemo(() => content.menu.find((entry) => entry.id === menuId) ?? content.menu[0], [content.menu, menuId]);
  
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (!category) return null;

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
            <Image src={hoveredImage} alt="Preview" fill className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="section-inner max-w-7xl mx-auto">
          
          {/* Category Tabs */}
          <nav className="flex flex-wrap justify-center gap-4 mb-24">
            {content.menu.map((cat) => (
              <Magnetic key={cat.id}>
                <Link 
                  href={cat.slug} 
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
 
          <div className="space-y-32">
            {category.groups.map((group) => (
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
                  {group.items.map((item) => (
                    <TiltCard 
                      key={item.id} 
                      className="group bg-[var(--background)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--gold)]/30 transition-all duration-500 shadow-md flex flex-col h-full"
                      dataCursor="view"
                    >
                      <div className="relative h-56 bg-[#171513] flex items-center justify-center overflow-hidden">
                        <Image 
                          src={getItemImageSrc(item, group, category)} 
                          alt={item.image ? text(item.image.alt, language) : text(item.name, language)} 
                          fill 
                          className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="p-8 flex flex-col justify-between flex-1">
                        <h3 className="font-serif-luxury text-xl mb-3 font-light text-white group-hover:text-[var(--gold)] transition-colors duration-300">
                          {text(item.name, language)}
                        </h3>
                        <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.1em] uppercase">
                          {language === "ar" ? "السعر: يحدد لاحقاً" : "Price: TBD"}
                        </p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Cart View
// ----------------------------------------------------

function CartView({ content, language }: { content: SiteContent; language: Locale }) {
  return (
    <main className="pt-20 min-h-screen bg-[var(--surface)]">
      <PageHero image={content.home.sections[1]?.image ?? content.home.hero.image} intro={content.cart.body} kicker={language === "ar" ? "الطلبات" : "Ordering"} language={language} title={content.cart.title} />
      
      <section className="section flex justify-center border-t border-[var(--line)]">
        <div className="flex flex-col sm:flex-row gap-6 max-w-md w-full justify-center">
          <Magnetic>
            <a className="primary-button w-full sm:w-auto" href={content.cart.ctaHref} data-cursor="hover">
              {text(content.cart.ctaLabel, language)} <Mail size={16} />
            </a>
          </Magnetic>
          <Magnetic>
            <Link className="secondary-button w-full sm:w-auto" href="/menu-drinks" data-cursor="hover">
              {language === "ar" ? "تصفح المنيو" : "Browse menu"} <ShoppingBag size={16} />
            </Link>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}

// ----------------------------------------------------
// Page Hero Layout
// ----------------------------------------------------

function PageHero({ image, kicker, title, intro, language }: { image: MenuCategory["heroImage"]; kicker: string; title: LocalizedString; intro: LocalizedString; language: Locale; }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], [0, 150]);

  return (
    <section className="relative h-[65vh] min-h-[520px] flex items-end justify-center pb-24 overflow-hidden bg-black border-b border-[var(--line)]">
      <motion.div 
        initial={{ scale: 1.12 }} 
        animate={{ scale: 1.02 }} 
        transition={{ duration: 5, ease: "easeOut" }} 
        style={{ y: yHero }}
        className="absolute inset-0 z-0"
      >
        <Image src={image.src} alt={text(image.alt, language)} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/75 to-transparent" />
      </motion.div>
      
      <div className="relative z-10 max-w-4xl px-8 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.1 }}
          className="block text-[var(--gold)] text-xs uppercase tracking-[0.25em] font-bold mb-6"
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

function Footer({ content, language }: { content: SiteContent; language: Locale }) {
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
      <div className="max-w-[1400px] mx-auto px-8 mt-20 pt-8 border-t border-[var(--line)] text-center text-xs text-[var(--muted)] font-light">
        &copy; {new Date().getFullYear()} {content.brand.name}. All rights reserved.
      </div>
    </footer>
  );
}

function text(value: LocalizedString, language: Locale): string {
  return value[language] || value.en;
}
