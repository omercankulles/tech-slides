"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Slide = {
  id: number;
  title: string;
  subtitle?: string;
  bullets?: string[];
};

type TeamMember = {
  name: string;
  role?: string;
  avatar?: string;
};

function getRoleIcon(role?: string): string {
  if (!role) return "👤";
  const r = role.toLowerCase();
  if (r.includes("engineering") && r.includes("manager")) return "🧑‍💻";
  if (r.includes("manager")) return "🧭";
  if (r.includes("frontend") || r.includes("mobile") || r.includes("developer"))
    return "💻";
  if (r.includes("ui") || r.includes("ux")) return "🎨";
  if (r.includes("growth") || r.includes("project")) return "📈";
  return "⚙️";
}

const TODAY = new Date().toLocaleDateString("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const TEAM: TeamMember[] = [
  {
    name: "Ömer Can Kulleş",
    role: "Engineering Manager",
    avatar: "/omercan-kulles.png",
  },
  {
    name: "Hunç Taşçı",
    role: "Frontend Developer",
    avatar: "/img/teams/hunc-tasci.png",
  },
  {
    name: "Hüdaverdi Ural",
    role: "UI/UX Designer",
    avatar: "/img/teams/hüdaverdi-ural.png",
  },
  {
    name: "Baran Nalbantoğlu",
    role: "Project & Growth Manager",
    avatar: "/img/teams/baran-nalbantoglu.png",
  },
];

const slidesData: Slide[] = [
  {
    id: 1,
    title: "Tech Departments",
    subtitle: `Team Members`,
  },
  {
    id: 2,
    title: "Sunum İçeriği",
    bullets: [
      "Görev ve Sorumluluklar",
      "Yürütülen Başlıca Projeler",
      "Operasyonlara Katkılar",
      "Tool’lar & Entegrasyonlar (1/2)",
      "Tool’lar & Entegrasyonlar (2/2)",
      "Örnek Başarılar / İyileştirmeler",
      "Gelecek Planları",
    ],
  },
  {
    id: 3,
    title: "Görev ve Sorumluluklar",
    bullets: [
      "Şirket içi teknoloji altyapısını yönetmek, ölçeklendirmek ve optimize etmek",
      "Gereksinim analizi, planlama ve SDLC kapsamında uçtan uca proje/yazılım geliştirmek",
      "Sosyal medya, video, marketing, growth ve editorial ekiplere teknik çözümler sunmak",
      "Veri ambarı/BI ve raporlama altyapıları ile analitik çıktılar üretmek",
      "Otomasyon ve script’lerle tekrarlı işleri azaltmak; iş akışlarını standardize etmek",
      "MSN, Yahoo, Apple News vb. yayıncılara iletilen feed/RSS akışlarının doğruluğunu ve sürekliliğini sağlamak",
      "Sitede reklamların doğru görünmesi ve çalışması için ad stack doğrulama, layout ve latency kontrolleri",
      "API, webhook, veritabanı ve 3. parti servis entegrasyonlarını tasarlamak ve işletmek",
      "Uygulama/altyapı güvenliği ve veri bütünlüğünü sağlamak; erişim ve uyumluluk yönetimi",
      "Sürümleme, CI/CD ve gözlemlenebilirlik (log, metric, alert) pratiklerini uygulamak",
      "Yeni teknolojileri araştırmak, PoC’ler hazırlamak ve değer katan çözümleri canlıya almak",
    ],
  },
  {
    id: 4,
    title: "Yürütülen Başlıca Projeler",
    bullets: [
      "IE+ Projesi (kişiselleştirme ve akıllı içerik öneri altyapısı)",
      "Mobile App Projesi (React Native, offline senkronizasyon, push altyapısı)",
      "IE Website Redesign Projesi (Next.js 15, performans ve UX iyileştirmeleri)",
      "Unified Dashboard Projesi (RBAC, operasyon paneli, gerçek zamanlı metrikler)",
      "İçerik ve Trafik Analizleri (publisher bazlı raporlar, veri keşfi)",
      "SEO Uygulamaları (schema, sitemap, Core Web Vitals optimizasyonu)",
      "Yedekleme ve Felaket Kurtarma (otomatik snapshot, off-site replikasyon)",
      "Gözlemlenebilirlik ve uyarı altyapısı (log, metric, alert akışları)",
    ],
  },
  {
    id: 5,
    title: "Operasyonlara Katkılar",
    bullets: [
      "Otomasyon sayesinde tekrar eden işlerin azaltılması (örn. YouTube’dan Connatix’e geçiş süreci)",
      "SEO skorlarının artması için plugin geliştirilmesi (IE Link Fixer)",
      "Subscription açıklarının tespiti ve düzeltilmesi (süresi geçmiş kullanıcılar cronjobs ile iptal)",
      "Marketing, Sosyal Medya, Editorial ekibinin hızlı ve doğru veri alması",
      "İş yükü yönetimi ve önceliklendirme kolaylığı",
      "Süreç şeffaflığı ve raporlamaların düzenlenmesi",
    ],
  },
  {
    id: 6,
    title: "Kullanılan Tool’lar & Entegrasyonlar (1/2)",
    bullets: [
      "WordPress VIP — Enterprise CMS, içerik yönetimi ve REST API",
      "AWS — Barındırma ve altyapı servisleri (S3, CloudFront, Lambda vb.)",
      "Braintree — Ödeme altyapısı, abonelik yönetimi ve iade süreçleri",
      "Connatix — Video monetizasyon, player entegrasyonu ve içerik akışı",
      "Raptive Ads — Display reklam yönetimi ve gelir optimizasyonu",
      "Hubspot — CRM, form toplayıcı ve otomasyon entegrasyonları",
    ],
  },
  {
    id: 7,
    title: "Kullanılan Tool’lar & Entegrasyonlar (2/2)",
    bullets: [
      "Firebase — Auth, Realtime DB/Firestore, push ve analytics",
      "Pushly — Web push bildirim platformu, segmentasyon ve hedefleme",
      "Shopify — E-ticaret entegrasyonu, ürün kataloğu ve sipariş webhooks",
      "JBoard — İş ilanı/başvuru yönetimi ve embed entegrasyonu",
      "Outbrain — Native reklam dağıtımı ve içerik öneri motoru",
      "Semrush — SEO anahtar kelime, site denetimi ve rekabet analizi",
    ],
  },
  {
    id: 8,
    title: "Sitelerimiz",
  },
  {
    id: 9,
    title: "Örnek Başarılar / İyileştirmeler",
    bullets: [
      "Mobil uygulamanın geliştirilip yayına alınması",
      "Web sitesinde yaşanan performans problemlerinin önemli ölçüde azaltılması",
      "SEO skorlarının 42 seviyelerinden 60’a yükseltilmesi",
      "Kredi kartı dolandırıcılık girişimlerine karşı güvenlik önlemlerinin alınarak saldırıların önlenmesi",
      "Newsletter operasyonlarının Beehiive platformundan Hubspot’a başarıyla taşınması",
      "Projedeki karmaşık dosya yapısının yeniden düzenlenerek sürdürülebilir hâle getirilmesi",
      "Subscription özelliğinde tespit edilen güvenlik açıklarının kapatılması",
      "Genel güvenlik önlemlerinin artırılması ve sistemlerin daha güvenli hâle getirilmesi",
      "Cache sisteminin uygulanarak performansın iyileştirilmesi",
      "Görsel optimizasyon sistemlerinin devreye alınması (resimlerin hız ve kalite optimizasyonu)",
      "Editorial ve Sosyal Medya ekiplerinin iş yükünü azaltan pratik pluginlerin geliştirilmesi",
      "Sesli makaleler özelliğinin aktif edilmesi",
      "Subscription ve User flow’larının iyileştirilerek çok iyi noktaya getirilmesi",
    ],
  },
  {
    id: 10,
    title: "Gelecek Planları",
    bullets: [
      "Daha fazla otomasyon ve dashboard",
      "Operasyon ↔ Tech süreç entegrasyonunu artırma",
      "Yeni proje fikirleri ve geliştirmeler",
      "Eğitim ve süreç rehberleri",
      "Subscribe sayısının artırılması",
      "SEO ve Performans skorlarının yükseltilmesi",
      "Mobile App kullanıcı sayısında artış",
      "AI ile daha fazla entegrasyon",
    ],
  },
  {
    id: 11,
    title: "Kapanış ve Teşekkür",
    bullets: undefined,
  },
];

function SlideSection({
  slide,
  onGoToId,
  total,
  displayIndex,
}: {
  slide: Slide;
  onGoToId?: (id: number) => void;
  total: number;
  displayIndex: number;
}) {
  const isToc = slide.id === 2;
  const isSites = slide.id === 8;
  const tocItems = isToc
    ? [
        { label: "Görev ve Sorumluluklar", id: 3 },
        { label: "Yürütülen Başlıca Projeler", id: 4 },
        { label: "Operasyonlara Katkılar", id: 5 },
        { label: "Tool’lar & Entegrasyonlar (1/2)", id: 6 },
        { label: "Tool’lar & Entegrasyonlar (2/2)", id: 7 },
        { label: "Sitelerimiz", id: 8 },
        { label: "Örnek Başarılar / İyileştirmeler", id: 9 },
        { label: "Gelecek Planları", id: 10 },
      ]
    : [];

  return (
    <section
      className="min-h-[100svh] w-full snap-start flex items-center justify-center px-6 py-10 sm:py-12"
      aria-label={`Slide ${slide.id}`}
    >
      <div className="max-w-5xl w-full text-center">
        {slide.id === 1 ? (
          <div className="mb-6 flex items-center justify-center gap-4 hero">
            <div className="hero-orb" />
            <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 w-[90vw] max-w-[640px] sm:max-w-[780px] lg:max-w-[920px] float glow-ring logo-cool">
              <Image
                src="/img/teams/ie-logo.svg"
                alt="Interesting Engineering"
                fill
                sizes="(min-width: 1024px) 920px, (min-width: 640px) 780px, 90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        ) : null}

        {slide.id !== 11 ? (
          <h1 className="h1 mb-2 gradient-title fade-up">{slide.title}</h1>
        ) : null}
        {slide.subtitle ? (
          <p
            className="p-lg opacity-80 fade-up"
            style={{ animationDelay: "60ms" }}
          >
            {slide.subtitle}
          </p>
        ) : null}

        {isToc ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {tocItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => onGoToId?.(item.id)}
                className="toc-item group text-left"
                aria-label={`${item.label} slaydına git`}
              >
                <span className="toc-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="toc-label">{item.label}</span>
                <span className="toc-arrow" aria-hidden>
                  →
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {isSites ? (
          <div className="mt-8 mx-auto max-w-3xl text-left">
            <pre className="font-mono text-sm bg-white/5 border border-white/10 rounded-xl p-4 overflow-auto">
              {`IE Properties
├─ interestingengineering.com
├─ shop.interestingengineering.com
├─ jobs.interestingengineering.com
└─ ie.media`}
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                {
                  href: "https://interestingengineering.com",
                  label: "interestingengineering.com",
                },
                {
                  href: "https://shop.interestingengineering.com",
                  label: "shop.interestingengineering.com",
                },
                {
                  href: "https://jobs.interestingengineering.com",
                  label: "jobs.interestingengineering.com",
                },
                { href: "https://ie.media", label: "ie.media" },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-full px-3 py-1 text-xs opacity-90 border border-white/15"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {!isToc && slide.id === 1 ? (
          <>
            {/* Managers row */}
            <div className="mt-6 team-row">
              {TEAM.filter((m) =>
                (m.role || "").toLowerCase().includes("manager")
              ).map((m) => (
                <div key={m.name} className="team-card">
                  {m.avatar ? (
                    <Image
                      src={m.avatar}
                      alt={m.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : null}
                  <div className="text-left flex-1">
                    <div className="team-title">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                  </div>
                  <span
                    aria-hidden
                    title={m.role}
                    className="role-ico text-lg sm:text-xl"
                  >
                    {getRoleIcon(m.role)}
                  </span>
                </div>
              ))}
            </div>

            {/* Others row */}
            <div className="mt-3 team-row">
              {TEAM.filter(
                (m) => !(m.role || "").toLowerCase().includes("manager")
              ).map((m) => (
                <div key={m.name} className="team-card">
                  {m.avatar ? (
                    <Image
                      src={m.avatar}
                      alt={m.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : null}
                  <div className="text-left flex-1">
                    <div className="team-title">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                  </div>
                  <span
                    aria-hidden
                    title={m.role}
                    className="role-ico text-lg sm:text-xl"
                  >
                    {getRoleIcon(m.role)}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech marquee */}
            <div className="mt-8 marquee">
              <div className="marquee__inner">
                {[
                  "Wordpress",
                  "AWS",
                  "Connatix",
                  "Hubspot",
                  "Braintree",
                  "Beehive",
                  "Next.js",
                  "React.js",
                  "Php",
                  "React Native",
                  "Tailwind CSS",
                  "Cloudflare",
                ]
                  .concat([
                    "Wordpress",
                    "AWS",
                    "Connatix",
                    "Hubspot",
                    "Braintree",
                    "Beehive",
                    "Next.js",
                    "React.js",
                    "Php",
                    "React Native",
                    "Tailwind CSS",
                    "Cloudflare",
                  ])
                  .map((t, idx) => (
                    <span
                      key={idx}
                      className="glass rounded-full px-3 py-1 text-xs opacity-90"
                    >
                      {t}
                    </span>
                  ))}
              </div>
            </div>
            <div className="scroll-indicator" />
          </>
        ) : null}

        {!isToc && slide.bullets ? (
          <ul className="mt-8 grid gap-3 text-left mx-auto max-w-3xl">
            {slide.bullets.map((b, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3"
              >
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        {!isToc && slide.id === 11 ? (
          <div className="mt-6 sm:mt-8 thank-wrap">
            <div className="thank-title">Katılımınız için teşekkürler!</div>
            <div className="thank-sub">
              Birlikte daha iyisini inşa etmeye devam edelim.
            </div>
            <div className="rocket-big">🚀</div>
          </div>
        ) : null}
        <div className="mt-10 text-xs opacity-60">{`Slide ${displayIndex}/${total}`}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const sections = useMemo(() => slidesData, []);
  const programmaticRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onKey(e: KeyboardEvent) {
      function goTo(i: number) {
        programmaticRef.current = true;
        setIndex(i);
      }
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(Math.min(index + 1, sections.length - 1));
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(Math.max(index - 1, 0));
      }
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(sections.length - 1);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [index, sections.length]);

  // Aktif slaytı scroll konumuna göre belirle
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sectionEls = Array.from(el.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const newIndex = sectionEls.indexOf(visible.target as HTMLElement);
        if (newIndex !== -1 && newIndex !== index) {
          setIndex(newIndex);
        }
      },
      { root: el, threshold: [0.55, 0.75] }
    );

    sectionEls.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [index]);

  // Programatik geçişlerde yumuşak kaydırma
  useEffect(() => {
    if (!programmaticRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const target = el.children[index] as HTMLElement | undefined;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    programmaticRef.current = false;
  }, [index]);

  const goToId = (id: number) => {
    const targetIndex = sections.findIndex((s) => s.id === id);
    if (targetIndex >= 0) {
      programmaticRef.current = true;
      setIndex(targetIndex);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto snap-y" ref={containerRef}>
      {sections.map((s, i) => (
        <SlideSection
          key={s.id}
          slide={s}
          onGoToId={goToId}
          total={sections.length}
          displayIndex={i + 1}
        />
      ))}

      <nav className="dots">
        {sections.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${s.id}`}
            aria-current={i === index}
            onClick={() => {
              programmaticRef.current = true;
              setIndex(i);
            }}
            title={`Slide ${s.id}`}
          />
        ))}
      </nav>
    </div>
  );
}
