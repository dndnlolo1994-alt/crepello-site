import type { SiteContent } from "@/lib/types";

const img = (src: string, en: string, ar: string) => ({
  src,
  alt: { en, ar },
});

const officialImage = {
  coffeeHero:
    "/images/coffee-hero.png",
  dessertHero:
    "/images/dessert-hero.png",
  savoryHero:
    "/images/savory-hero.png",
  bakeryHero:
    "/images/bakery-hero.png",
  about:
    "/images/about-hero.png",
  branches:
    "/images/branches-hero.png",
  logo:
    "/images/logo.png",
  americano:
    "/images/americano.png",
  latte:
    "/images/hot-latte.png",
  frappe:
    "/images/caramel-frappe.png",
  mojito:
    "/images/mojito.png",
  crepe:
    "/images/crepe-fallback.png",
  cake:
    "/images/cake-fallback.png",
  croissant:
    "/images/croissant-fallback.png",
  brunch:
    "/images/croissant-fallback.png",
};

const item = (id: string, en: string, ar: string, image?: string) => ({
  id,
  name: { en, ar },
  ...(image ? { image: img(image, en, ar) } : {}),
});

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "Crepello",
    nameAr: "كريبيلو",
    tagline: {
      en: "Restaurant-cafe for crepes, waffles, bakery, coffee, and desserts.",
      ar: "مطعم وكافيه للكريب والوافل والمخبوزات والقهوة والحلويات.",
    },
    logo: img(officialImage.logo, "Crepello logo", "شعار كريبيلو"),
  },
  seo: {
    title: "Crepello",
    canonical: "https://www.crepello.co",
    description: {
      en: "Crepello is a restaurant-cafe serving thin crepes, crisp waffles, fresh bakery items, brewed coffee, desserts, and brunch favorites.",
      ar: "كريبيلو مطعم وكافيه يقدم الكريب الرقيق والوافل والمخبوزات الطازجة والقهوة والحلويات وخيارات البرنش.",
    },
  },
  nav: [
    { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
    { label: { en: "About Us", ar: "من نحن" }, href: "/about" },
    { label: { en: "Branches", ar: "الفروع" }, href: "/branches" },
    { label: { en: "Menu", ar: "المنيو" }, href: "/menu" },
    { label: { en: "Order Online", ar: "الطلب أونلاين" }, href: "/order" },
  ],
  admin: {
    title: { en: "Crepello Admin", ar: "لوحة إدارة كريبيلو" },
  },
  home: {
    hero: {
      id: "hero-coffee",
      title: { en: "Crepello Cafe Restaurant", ar: "كريبيلو كافيه ومطعم" },
      body: {
        en: "A dark-luxury restaurant-cafe for thin crepes, crisp waffles, fresh bakery, slow coffee, desserts, and savory brunch.",
        ar: "مطعم وكافيه بطابع فاخر داكن للكريب الرقيق والوافل والمخبوزات الطازجة والقهوة الهادئة والحلويات والبرنش.",
      },
      ctaLabel: { en: "View Menu", ar: "عرض المنيو" },
      ctaHref: "/menu/drinks",
      image: img(officialImage.coffeeHero, "Crepello coffee and drinks", "قهوة ومشروبات كريبيلو"),
    },
    features: [
      { id: "delivery", label: { en: "Food Delivery", ar: "توصيل الطعام" } },
      { id: "place", label: { en: "Comfortable Place", ar: "مكان مريح" } },
      { id: "service", label: { en: "Best Service", ar: "أفضل خدمة" } },
      { id: "menu", label: { en: "Tasty Menu", ar: "منيو شهي" } },
    ],
    offersTitle: { en: "Featured Offers", ar: "العروض المميزة" },
    offersIntro: {
      en: "A live offer board for approved Crepello highlights.",
      ar: "لوحة عروض مباشرة لعروض كريبيلو المعتمدة.",
    },
    offersEmpty: {
      en: "Fresh offers are being prepared.",
      ar: "يتم تجهيز عروض جديدة قريبًا.",
    },
    offers: [
      {
        id: "menu-highlights",
        active: true,
        eyebrow: { en: "Featured", ar: "مميز" },
        title: { en: "Crepe, Waffle, Cake, Pancake", ar: "كريب، وافل، كيك، بان كيك" },
        summary: {
          en: "A rotating board for Crepello menu highlights, ready to update from admin when official promotions are approved.",
          ar: "لوحة متغيرة لأبرز أصناف كريبيلو، جاهزة للتحديث من لوحة الإدارة عند اعتماد أي عرض رسمي.",
        },
        ctaLabel: { en: "Explore desserts", ar: "تصفح الحلويات" },
        ctaHref: "/menu/desserts",
      },
    ],
    sections: [
      {
        id: "delight",
        title: { en: "Delight in Every Bite", ar: "متعة في كل لقمة" },
        body: {
          en: "Satisfy your cravings with our delectable array of desserts and sweets. From classic favorites to unique creations, each treat is crafted to perfection and designed to delight. Elevate your dining experience and end on a sweet note at Crepello.",
          ar: "أرضِ شهيتك مع تشكيلة الحلويات والسكاكر الشهية لدينا. من الكلاسيكيات المحبوبة إلى الابتكارات الخاصة، كل قطعة مصنوعة بإتقان لتمنحك متعة حقيقية. ارتقِ بتجربتك واختمها بمذاق حلو في كريبيلو.",
        },
        ctaLabel: { en: "See more", ar: "شاهد المزيد" },
        ctaHref: "/menu/desserts",
        image: img(officialImage.dessertHero, "Crepello desserts", "حلويات كريبيلو"),
      },
      {
        id: "savor",
        title: { en: "Savor the Flavor", ar: "استمتع بالنكهة" },
        body: {
          en: "Dive into a world of rich flavors and hearty fare with our carefully curated savory menu. From delectable sandwiches to exquisite salads, each dish promises a satisfying and flavorful experience that complements our beverage offerings perfectly.",
          ar: "ادخل عالمًا من النكهات الغنية والأطباق المشبعة مع منيو السافوري المختار بعناية. من الساندويشات اللذيذة إلى السلطات المتقنة، كل طبق يمنحك تجربة مشبعة ومليئة بالنكهة بجانب مشروباتنا.",
        },
        ctaLabel: { en: "Check it Out", ar: "جرّبه الآن" },
        ctaHref: "/menu/brunch",
        image: img(officialImage.savoryHero, "Crepello savory brunch", "برنش كريبيلو السافوري"),
      },
      {
        id: "bakery",
        title: { en: "Freshly Baked, Always Delightful", ar: "مخبوز طازج ولذيذ دائمًا" },
        body: {
          en: "Experience the heavenly aroma and unbeatable taste of our freshly baked goods. From artisanal breads to mouthwatering pastries, each item is crafted to perfection, offering you a slice of joy with every bite.",
          ar: "استمتع برائحة المخبوزات الطازجة ومذاقها الذي لا يقاوم. من الخبز الحرفي إلى المعجنات الشهية، كل صنف مصنوع بإتقان ليمنحك لحظة فرح مع كل لقمة.",
        },
        ctaLabel: { en: "Find Out", ar: "اعرف المزيد" },
        ctaHref: "/menu/bakery",
        image: img(officialImage.bakeryHero, "Fresh bakery at Crepello", "مخبوزات كريبيلو الطازجة"),
      },
    ],
    menuTitle: { en: "Our Menu", ar: "منيو كريبيلو" },
    menuIntro: {
      en: "At Crepello, we aim to delight you with a diverse menu and an exceptional dining experience featuring delicious food and beverages.",
      ar: "في كريبيلو نسعى لإسعادك بمنيو متنوع وتجربة استثنائية تجمع الطعام والمشروبات اللذيذة.",
    },
  },
  about: {
    title: { en: "Our Story", ar: "قصتنا" },
    intro: {
      en: "Our story began back in our university days, filled with exams and study sessions in the Pharmacy department. That's where we came up with the idea for Crepello.",
      ar: "بدأت قصتنا أيام الجامعة، بين الامتحانات وجلسات الدراسة في كلية الصيدلة. هناك ظهرت فكرة كريبيلو.",
    },
    paragraphs: [
      {
        en: "In 2012, we officially started Crepello. We worked hard for six months, testing, and tweaking our recipes to create the best crepes and waffles. The result was something special, a unique Crepello blend.",
        ar: "في عام 2012 بدأنا كريبيلو رسميًا. عملنا لستة أشهر على اختبار الوصفات وتطويرها لصناعة أفضل كريب ووافل، وكانت النتيجة مزيج كريبيلو الخاص.",
      },
      {
        en: "After opening, people really loved what we were doing. So, in 2014, we moved from our small beginning to something bigger and more organized, marking the start of our big journey.",
        ar: "بعد الافتتاح أحب الناس ما نقدمه، لذلك انتقلنا عام 2014 من بدايتنا الصغيرة إلى شكل أكبر وأكثر تنظيمًا، وكانت تلك بداية رحلتنا الكبيرة.",
      },
      {
        en: "In 2017, we opened our second location and started working on making our brand even better, always aiming to make Crepello known worldwide.",
        ar: "في عام 2017 افتتحنا موقعنا الثاني وبدأنا العمل على تطوير العلامة أكثر، مع طموح أن يصبح كريبيلو معروفًا عالميًا.",
      },
      {
        en: "By 2018, the Crepello we know today was finally here. We upgraded and reopened our main shop, making it bigger and better to serve our customers and to match our global dreams.",
        ar: "بحلول عام 2018 ظهر كريبيلو بالشكل الذي نعرفه اليوم. طورنا وأعدنا افتتاح الفرع الرئيسي ليصبح أكبر وأفضل لخدمة زبائننا ومواكبة طموحنا العالمي.",
      },
      {
        en: "2019 was a big year for us. We opened our first shop outside of Jordan in Palestine, after receiving lots of requests to do so. We also opened more shops in Jordan, especially at local universities. By 2022, we were expanding even more globally. We opened another shop in Palestine and started new ones in Chicago and Istanbul. Looking ahead, we're excited about growing Crepello even more, reaching out to our fans and chocolate lovers around the world. We hope to be a part of their daily lives, wherever they might be.",
        ar: "كان عام 2019 عامًا كبيرًا لنا. افتتحنا أول فرع خارج الأردن في فلسطين بعد طلبات كثيرة، وافتتحنا المزيد من الفروع في الأردن، خاصة قرب الجامعات المحلية. وبحلول 2022 توسعنا عالميًا أكثر، فافتتحنا فرعًا آخر في فلسطين وبدأنا فروعًا جديدة في شيكاغو وإسطنبول. نتطلع إلى نمو كريبيلو أكثر والوصول إلى محبي العلامة والشوكولاتة حول العالم، ونأمل أن نكون جزءًا من يومهم أينما كانوا.",
      },
      {
        en: "\"Crepello\" is a renowned restaurant-café distinguished for its mastery in creating scrumptious delicacies. As our name suggests, we are acclaimed for our deliciously thin and delicately cooked crepes, offering a blend of traditional and innovative fillings that will indulge your senses. But our expertise doesn't stop at crepes. We invite you to sample our crispy, light waffles, fresh-from-the-oven bakery items, and richly brewed coffee.",
        ar: "كريبيلو مطعم وكافيه معروف بتميّزه في صناعة الأطباق الشهية. كما يوحي الاسم، نتميز بالكريب الرقيق والمطهو بعناية مع حشوات تقليدية ومبتكرة، ولا يتوقف شغفنا عند الكريب؛ ندعوك لتجربة الوافل الخفيف والمقرمش، والمخبوزات الخارجة من الفرن، والقهوة الغنية.",
      },
      {
        en: "At Crepello, we fuse the cozy ambiance of a café with the tantalizing experience of a high-quality restaurant, creating an unparalleled culinary journey for every customer. We welcome you to Crepello - where every bite is a celebration of flavor.",
        ar: "في كريبيلو نمزج أجواء الكافيه الدافئة مع تجربة مطعم عالي الجودة لنخلق رحلة مذاق مميزة لكل زبون. نرحب بك في كريبيلو، حيث كل لقمة احتفال بالنكهة.",
      },
    ],
    conceptTitle: { en: "Our Concept", ar: "مفهومنا" },
    stats: [
      { value: "+1500", label: { en: "Happy Clients Every day", ar: "زبون سعيد يوميًا" } },
      { value: "+50", label: { en: "Tasty Dishes", ar: "طبق شهي" } },
      { value: "+35", label: { en: "Delicious Drinks", ar: "مشروب لذيذ" } },
    ],
    image: img(officialImage.about, "Crepello team and cafe story", "قصة وفريق كريبيلو"),
  },
  branches: {
    title: { en: "Our Branches", ar: "فروعنا" },
    intro: {
      en: "Crepello is a renowned restaurant-café distinguished for its mastery in creating scrumptious delicacies.",
      ar: "كريبيلو مطعم وكافيه معروف بإتقانه لصناعة الأطباق الشهية.",
    },
    menuIntro: {
      en: "Crepello stands out by offering fresh desserts, unique dishes, and special drinks. We focus on fresh choices.",
      ar: "يتميز كريبيلو بتقديم حلويات طازجة وأطباق فريدة ومشروبات خاصة، مع تركيز دائم على الخيارات الطازجة.",
    },
    journey: {
      en: "Our journey began in the heart of the Middle East, in the vibrant country of Jordan, where we first opened our doors to dessert lovers. As we honed our craft, the passion we put into every crepe, waffle, and cake soon made our shop a beloved local haunt. Our success in Jordan spurred us to dream bigger and reach further.",
      ar: "بدأت رحلتنا في قلب الشرق الأوسط، في الأردن، حيث فتحنا أبوابنا لأول مرة لمحبي الحلويات. ومع تطوير حرفتنا، جعل الشغف في كل كريب ووافل وكيك متجرنا مكانًا محبوبًا محليًا، ودفعنا نجاحنا في الأردن للحلم بشكل أكبر والوصول أبعد.",
    },
    stats: [
      { value: "+200", label: { en: "Branches", ar: "فرع" } },
      { value: "4", label: { en: "Countries", ar: "دول" } },
      { value: "6", label: { en: "Employees", ar: "موظفين" } },
    ],
    countries: [
      {
        id: "jordan",
        title: { en: "Jordan", ar: "الأردن" },
        body: {
          en: "In Jordan, we established our brand's strong foundations, where we embraced the tastes and preferences of our local customers.",
          ar: "في الأردن أسسنا قواعد العلامة القوية واحتضنا أذواق زبائننا المحليين وتفضيلاتهم.",
        },
        image: img(officialImage.branches, "Crepello Jordan branch", "فرع كريبيلو في الأردن"),
      },
      {
        id: "palestine",
        title: { en: "Palestine", ar: "فلسطين" },
        body: {
          en: "Inspired by our success in Jordan, we took our dreams across the border into Palestine.",
          ar: "بدافع نجاحنا في الأردن، أخذنا حلمنا إلى فلسطين.",
        },
        image: img(officialImage.dessertHero, "Crepello Palestine expansion", "توسع كريبيلو في فلسطين"),
      },
      {
        id: "united-states",
        title: { en: "United States", ar: "الولايات المتحدة" },
        body: {
          en: "Venturing further afield, we expanded our horizon to the bustling city of Chicago in the United States.",
          ar: "توسعنا أبعد إلى مدينة شيكاغو النابضة بالحياة في الولايات المتحدة.",
        },
        image: img(officialImage.coffeeHero, "Crepello United States expansion", "توسع كريبيلو في الولايات المتحدة"),
      },
      {
        id: "turkey",
        title: { en: "Turkey", ar: "تركيا" },
        body: {
          en: "Our latest adventure has taken us to the enchanting landscapes of Turkey, a country renowned for its rich food culture.",
          ar: "أخذتنا مغامرتنا الأحدث إلى تركيا، البلد المعروف بثقافته الغذائية الغنية.",
        },
        image: img(officialImage.savoryHero, "Crepello Turkey expansion", "توسع كريبيلو في تركيا"),
      },
    ],
    branches: [
      {
        id: "irbid-university-street",
        country: { en: "Jordan", ar: "الأردن" },
        city: { en: "Irbid", ar: "إربد" },
        name: { en: "University Street", ar: "شارع الجامعة" },
        address: {
          en: "Yarmouk University Street, Irbid",
          ar: "شارع جامعة اليرموك، إربد",
        },
        phone: "+962 7 9836 0007",
        hours: { en: "", ar: "" },
        status: { en: "", ar: "" },
      },
      {
        id: "irbid-new-amman-complex",
        country: { en: "Jordan", ar: "الأردن" },
        city: { en: "Irbid", ar: "إربد" },
        name: { en: "New Amman Complex", ar: "مجمع عمّان الجديد" },
        address: {
          en: "New Amman Complex, Irbid",
          ar: "مجمع عمّان الجديد، إربد",
        },
        phone: "",
        hours: { en: "", ar: "" },
        status: { en: "", ar: "" },
      },
      {
        id: "ramallah-masyoun",
        country: { en: "Palestine", ar: "فلسطين" },
        city: { en: "Ramallah", ar: "رام الله" },
        name: { en: "Al-Masyoon", ar: "الماصيون" },
        address: {
          en: "Samih Farsoun St., Al-Masyoon, Ramallah",
          ar: "شارع سميح فرسون، الماصيون، رام الله",
        },
        phone: "+970 2 298 9999",
        hours: { en: "", ar: "" },
        status: { en: "", ar: "" },
      },
      {
        id: "chicago-orland-park",
        country: { en: "United States", ar: "الولايات المتحدة" },
        city: { en: "Chicago", ar: "شيكاغو" },
        name: { en: "Orland Park", ar: "أورلاند بارك" },
        address: {
          en: "15845 South Harlem Avenue, Orland Park, IL 60462",
          ar: "15845 شارع هارلم الجنوبي، أورلاند بارك، إلينوي 60462",
        },
        phone: "+1 708 428 9088",
        hours: { en: "", ar: "" },
        status: { en: "", ar: "" },
      },
    ],
  },
  menu: [
    {
      id: "drinks",
      slug: "/menu/drinks",
      navLabel: { en: "Drinks", ar: "مشروبات" },
      title: { en: "Drinks", ar: "المشروبات" },
      intro: {
        en: "Official drink categories from Crepello's live menu page. Prices are intentionally omitted until confirmed.",
        ar: "تصنيفات المشروبات كما ظهرت في صفحة المنيو الرسمية لكريبيلو. الأسعار غير مضافة حتى يتم تأكيدها.",
      },
      heroImage: img(officialImage.coffeeHero, "Crepello drinks menu", "منيو مشروبات كريبيلو"),
      sourceNote: { en: "Source: official /menu/drinks page.", ar: "المصدر: صفحة /menu/drinks الرسمية." },
      groups: [
        {
          id: "hot-coffee",
          title: { en: "Hot Coffee", ar: "قهوة ساخنة" },
          items: [
            item("americano", "Americano", "أمريكانو", officialImage.americano),
            item("house-coffee", "House Coffee", "هاوس كوفي"),
            item("espresso", "Espresso", "إسبريسو"),
            item("turkish-coffee", "Turkish Coffee", "قهوة تركية", "/images/turkish-coffee.png"),
            item("cappuccino", "Cappuccino", "كابتشينو"),
            item("caffe-latte", "Caffè Latte", "كافيه لاتيه", officialImage.latte),
            item("arabian-latte", "Arabian Latte", "لاتيه عربي"),
            item("saudi-latte", "Saudi Latte", "لاتيه سعودي"),
            item("caramel-macchiato", "Caramel Macchiato", "كراميل ماكياتو"),
            item("cortado-honey-bee", "Cortado Honey Bee", "كورتادو هاني بي"),
            item("flat-white", "Flat White", "فلات وايت"),
            item("pistachio-latte", "Pistachio Latte", "بيستاشيو لاتيه"),
            item("spanish-latte", "Spanish Latte", "سبانش لاتيه"),
            item("tiramisu-latte", "Tiramisu Latte", "تيراميسو لاتيه"),
            item("turkish-latte", "Turkish Latte", "تركيش لاتيه"),
            item("vanilla-beans-latte", "Vanilla Beans Latte", "فانيلا بينز لاتيه"),
          ],
        },
        {
          id: "cold-coffee",
          title: { en: "Cold Coffee", ar: "قهوة باردة" },
          items: [
            item("affogato-freddo", "Affogato Freddo", "أفوجاتو فريدو"),
            item("cold-brew", "Cold Brew", "كولد برو"),
            item("dalgona-latte", "Dalgona Latte", "دالغونا لاتيه"),
            item("iced-americano", "Iced Americano", "آيس أمريكانو"),
            item("iced-arabian-latte", "Iced Arabian Latte", "آيس لاتيه عربي"),
            item("iced-caramel-macchiato", "Iced Caramel Macchiato", "آيس كراميل ماكياتو"),
            item("iced-cortado-honey-bee", "Iced Cortado Honey Bee", "آيس كورتادو هاني بي"),
            item("iced-mocklake-latte", "Iced Mocklake Latte", "آيس موكليك لاتيه"),
            item("iced-pistachio-latte", "Iced Pistachio Latte", "آيس بيستاشيو لاتيه"),
            item("iced-saudi-latte", "Iced Saudi Latte", "آيس لاتيه سعودي"),
            item("iced-spanish-latte", "Iced Spanish Latte", "آيس سبانش لاتيه"),
            item("iced-tiramisu-latte", "Iced Tiramisu Latte", "آيس تيراميسو لاتيه"),
            item("iced-turkish-latte", "Iced Turkish Latte", "آيس تركيش لاتيه"),
            item("iced-vanilla-beans-latte", "Iced Vanilla Beans Latte", "آيس فانيلا بينز لاتيه"),
          ],
        },
        {
          id: "frappe-and-fresh",
          title: { en: "Frappe, Mojito, Juices & Smoothies", ar: "فرابيه وموهيتو وعصائر وسموذي" },
          items: [
            item("caramel-frappe", "Caramel Frappé", "كراميل فرابيه", officialImage.frappe),
            item("pistachio-frappe", "Pistachio Frappé", "بيستاشيو فرابيه"),
            item("speculoos-frappe", "Speculoos Frappé", "سبيكولوس فرابيه"),
            item("blue-ocean", "Blue Ocean", "بلو أوشن", officialImage.mojito),
            item("orange-passion", "Orange Passion", "أورنج باشن"),
            item("wild-berries", "Wild Berries", "وايلد بيريز"),
            item("lemon-mint", "Lemon & Mint", "ليمون ونعنع"),
            item("orange", "Orange", "برتقال"),
            item("strawberry", "Strawberry", "فراولة"),
            item("kiwi", "Kiwi", "كيوي"),
            item("mango-passion", "Mango Passion", "مانجو باشن"),
            item("fresh-me", "Fresh Me", "فريش مي"),
            item("black-forest", "Black Forest", "بلاك فورست"),
            item("peach", "Peach", "خوخ"),
            item("strawberry-kiwi", "Strawberry & Kiwi", "فراولة وكيوي"),
          ],
        },
      ],
    },
    {
      id: "dessert",
      slug: "/menu/desserts",
      navLabel: { en: "Dessert", ar: "حلويات" },
      title: { en: "Dessert", ar: "الحلويات" },
      intro: {
        en: "Official dessert names from Crepello's live menu page. Prices are intentionally omitted until confirmed.",
        ar: "أسماء الحلويات الرسمية كما ظهرت في صفحة المنيو. الأسعار غير مضافة حتى يتم تأكيدها.",
      },
      heroImage: img(officialImage.dessertHero, "Crepello dessert menu", "منيو حلويات كريبيلو"),
      sourceNote: { en: "Source: official /menu/desserts page.", ar: "المصدر: صفحة /menu/desserts الرسمية." },
      groups: [
        {
          id: "crepe",
          title: { en: "Crepe", ar: "كريب" },
          items: [
            item("plain-crepe", "Plain Crepe", "كريب سادة", officialImage.crepe),
            item("choco-fruit-crepe", "Choco Fruit Crepe", "كريب شوكو فروت"),
            item("arabian-crepe", "Arabian Crepe", "كريب عربي"),
            item("fettuccini-crepe", "Fettuccini Crepe", "فيتوتشيني كريب", "/images/fettuccini-crepe.png"),
          ],
        },
        {
          id: "waffle",
          title: { en: "Waffle", ar: "وافل" },
          items: [
            item("plain-waffle", "Plain Waffle", "وافل سادة"),
            item("choco-fruit-waffle", "Choco Fruit Waffle", "وافل شوكو فروت"),
            item("heart-waffle", "Heart Waffle", "هارت وافل"),
            item("cheesecake-waffle", "Cheesecake Waffle", "تشيز كيك وافل", "/images/cheesecake-waffle.png"),
            item("toffee-waffle", "Toffee Waffle", "توفي وافل"),
          ],
        },
        {
          id: "pancake-french-toast",
          title: { en: "Pancake & French Toast", ar: "بان كيك وفرنش توست" },
          items: [
            item("plain-pancake", "Plain Pancake", "بان كيك سادة"),
            item("choco-fruit-pancake", "Choco Fruit Pancake", "بان كيك شوكو فروت"),
            item("red-velvet-pancake", "Red Velvet Pancake", "ريد فيلفت بان كيك"),
            item("mini-pancake", "Mini Pancake", "ميني بان كيك"),
            item("choco-fruit-french-toast", "Choco Fruit French Toast", "فرنش توست شوكو فروت"),
            item("banana-caramel-french-toast", "Banana Caramel French Toast", "فرنش توست موز وكراميل"),
          ],
        },
      ],
    },
    {
      id: "bakery",
      slug: "/menu/bakery",
      navLabel: { en: "Bakery", ar: "مخبوزات" },
      title: { en: "Bakery", ar: "المخبوزات" },
      intro: {
        en: "Official bakery and pastry names from Crepello's live menu page. Prices are intentionally omitted until confirmed.",
        ar: "أسماء المخبوزات والحلويات كما ظهرت في صفحة المنيو الرسمية. الأسعار غير مضافة حتى يتم تأكيدها.",
      },
      heroImage: img(officialImage.bakeryHero, "Crepello bakery menu", "منيو مخبوزات كريبيلو"),
      sourceNote: { en: "Source: official /menu/bakery page.", ar: "المصدر: صفحة /menu/bakery الرسمية." },
      groups: [
        {
          id: "croissants",
          title: { en: "Croissants", ar: "كرواسون" },
          items: [
            item("plain-croissant", "Plain Croissant", "كرواسون سادة", officialImage.croissant),
            item("choco-fruit-croissant", "Choco Fruit Croissant", "كرواسون شوكو فروت"),
            item("pain-au-chocolat", "Pain Au Chocolat", "بان أو شوكولا"),
            item("almond-croissant", "Almond Croissant", "كرواسون لوز"),
          ],
        },
        {
          id: "cake",
          title: { en: "Cake", ar: "كيك" },
          items: [
            item("san-sebastian-cake", "San Sebastian Cake", "سان سيباستيان كيك", officialImage.cake),
            item("chocolate-cake", "Chocolate Cake", "شوكولاتة كيك"),
            item("carrot-cake", "Carrot Cake", "كاروت كيك"),
            item("red-velvet-cake", "Red Velvet Cake", "ريد فيلفت كيك"),
            item("pistachio-cake", "Pistachio Cake", "بيستاشيو كيك"),
          ],
        },
        {
          id: "pastries",
          title: { en: "Pastries", ar: "معجنات وحلويات" },
          items: [
            item("pate-a-choux", "Pâte à choux", "بات آ شو"),
            item("brownies", "Brownies", "براونيز"),
            item("choco-jar", "Choco Jar", "شوكو جار"),
            item("cookies", "Cookies", "كوكيز"),
            item("tiramisu", "Tiramisu", "تيراميسو"),
          ],
        },
      ],
    },
    {
      id: "brunch",
      slug: "/menu/brunch",
      navLabel: { en: "Brunch", ar: "برنش" },
      title: { en: "Brunch", ar: "البرنش" },
      intro: {
        en: "Official brunch names from Crepello's live menu page. Prices are intentionally omitted until confirmed.",
        ar: "أسماء البرنش الرسمية كما ظهرت في صفحة المنيو. الأسعار غير مضافة حتى يتم تأكيدها.",
      },
      heroImage: img(officialImage.savoryHero, "Crepello brunch menu", "منيو برنش كريبيلو"),
      sourceNote: { en: "Source: official /menu/brunch page.", ar: "المصدر: صفحة /menu/brunch الرسمية." },
      groups: [
        {
          id: "croissants",
          title: { en: "Croissants", ar: "كرواسون" },
          items: [
            item("halloumi-croissant", "Halloumi Croissant", "كرواسون حلومي", officialImage.brunch),
            item("omelette-croissant", "Omelette Croissant", "كرواسون أومليت", "/images/omelette-croissant.png"),
            item("turkey-croissant", "Turkey Croissant", "كرواسون تركي"),
          ],
        },
        {
          id: "sandwiches",
          title: { en: "Club & Roll Sandwiches", ar: "كلوب ورول ساندويش" },
          items: [
            item("halloumi-club", "Halloumi Club", "حلومي كلوب"),
            item("omelette-club", "Omelette Club", "أومليت كلوب"),
            item("turkey-club", "Turkey Club", "تركي كلوب"),
            item("halloumi-roll", "Halloumi Roll", "حلومي رول"),
            item("omelette-roll", "Omelette Roll", "أومليت رول"),
          ],
        },
        {
          id: "protein-pizza-crepe",
          title: { en: "Protein Meals & Pizza Crepe", ar: "وجبات بروتين وبيتزا كريب" },
          items: [
            item("pello-toast", "Pello Toast", "بيلو توست"),
            item("marinello-toast", "Marinello Toast", "مارينيلو توست"),
            item("truffello-toast", "Truffello Toast", "ترافيلو توست"),
            item("grilled-cheesy", "Grilled Cheesy", "جريلد تشيزي"),
            item("quesadilla", "Quesadilla", "كاساديا"),
            item("skillet", "Skillet", "سكيلت"),
            item("margherita-pizza", "Margherita Pizza", "مارغريتا بيتزا"),
            item("pepperoni-pizza", "Pepperoni Pizza", "بيبروني بيتزا"),
            item("veggie-pizza", "Veggie Pizza", "فيجي بيتزا"),
            item("truffle-pizza", "Truffle Pizza", "ترافل بيتزا"),
            item("bbq-pizza", "BBQ Pizza", "باربكيو بيتزا"),
          ],
        },
      ],
    },
  ],
  cart: {
    title: { en: "Cart & Ordering", ar: "السلة والطلبات" },
    body: {
      en: "Select your favorite items from our menu and send your order directly to our team via WhatsApp.",
      ar: "اختر أصنافك المفضلة من المنيو وأرسل طلبك مباشرة إلى فريقنا عبر الواتساب.",
    },
    ctaLabel: { en: "Browse Menu", ar: "تصفح المنيو" },
    ctaHref: "/menu/drinks",
  },
  contact: {
    email: "info@crepello.co",
    mainPhone: "+962 7 9836 0007",
    deliveryPhone: "+962 7 9836 0008",
    phoneNote: {
      en: "For reservations, orders, and inquiries, please reach out to our active branch phone lines.",
      ar: "للحجوزات والطلبات والاستفسارات، يرجى التواصل عبر أرقام هواتف فروعنا الفعالة.",
    },
  },
  socials: [
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/crepello" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com/crepello.jo" },
    { id: "twitter", label: "Twitter/X", href: "https://twitter.com/Crepello_Global" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/crepello/" },
  ],
};
