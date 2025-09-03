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
    role: "UI/UX",
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
    subtitle: `Interesting Engineering – Operasyon Ekibine Sunum — ${TODAY}`,
  },
  {
    id: 2,
    title: "Sunum İçeriği",
    bullets: [
      "Tech Ekibinin Rolü",
      "Yürütülen Başlıca Projeler",
      "Operasyonlara Katkılar",
      "Süreçler ve Otomasyonlar",
      "Örnek Başarılar / İyileştirmeler",
      "Kullanılan Teknolojiler",
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
      "Operasyon ekibinin hızlı ve doğru veri alması",
      "İş yükü yönetimi ve önceliklendirme kolaylığı",
      "Süreç şeffaflığı ve raporlamaların düzenlenmesi",
    ],
  },
  {
    id: 6,
    title: "Süreçler ve Otomasyonlar",
    bullets: [
      "API/Script tabanlı veri çekme",
      "Video ve içerik yükleme kontrolü",
      "Veritabanı yönetimi ve raporlama",
      "Operasyon ekibine özel dashboard/panel",
    ],
  },
  {
    id: 7,
    title: "Örnek Başarılar / İyileştirmeler",
    bullets: [
      "%100 tekrar yükleme hatası önleme",
      "Günlük raporlama süresini 2 saat → 10 dakikaya indirme",
      "Manuel kontrol ihtiyacını azaltma",
      "Örnek grafik/tablo ile süreç iyileştirme",
    ],
  },
  {
    id: 8,
    title: "Gelecek Planları",
    bullets: [
      "Daha fazla otomasyon ve dashboard",
      "Operasyon ↔ Tech süreç entegrasyonunu artırma",
      "Yeni proje fikirleri ve geliştirmeler",
      "Eğitim ve süreç rehberleri",
    ],
  },
  {
    id: 9,
    title: "Kapanış ve Teşekkür",
    bullets: [
      "Sunum özeti",
      "Tech × Operasyon iş birliği vurgusu",
      "Sorular ve geri bildirimler",
    ],
  },
];

function SlideSection({
  slide,
  onGoToId,
}: {
  slide: Slide;
  onGoToId?: (id: number) => void;
}) {
  const isToc = slide.id === 2;
  const tocItems = isToc
    ? [
        { label: "Görev ve Sorumluluklar", id: 3 },
        { label: "Yürütülen Başlıca Projeler", id: 4 },
        { label: "Operasyonlara Katkılar", id: 5 },
        { label: "Süreçler ve Otomasyonlar", id: 6 },
        { label: "Örnek Başarılar / İyileştirmeler", id: 7 },
        { label: "Kullanılan Teknolojiler", id: 1 },
        { label: "Gelecek Planları", id: 8 },
      ]
    : [];

  return (
    <section
      className="h-[100svh] w-full snap-start flex items-center justify-center px-6"
      aria-label={`Slide ${slide.id}`}
    >
      <div className="max-w-5xl w-full text-center">
        {slide.id === 1 ? (
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="relative h-20 md:h-24 lg:h-28 w-[640px] md:w-[780px] lg:w-[920px] float">
              <Image
                src="/img/teams/ie-logo.svg"
                alt="Interesting Engineering"
                fill
                sizes="(min-width: 1024px) 920px, (min-width: 768px) 780px, 640px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        ) : null}

        <h1 className="h1 mb-2 gradient-title">{slide.title}</h1>
        {slide.subtitle ? (
          <p className="p-lg opacity-80">{slide.subtitle}</p>
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
                  <div className="text-left">
                    <div className="team-title">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                  </div>
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
                  <div className="text-left">
                    <div className="team-title">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                  </div>
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
        <div className="mt-10 text-xs opacity-60">{`Slide ${slide.id}/9`}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const sections = useMemo(() => slidesData, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    function onWheel(e: WheelEvent) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (e.deltaY > 8) setIndex((p) => Math.min(p + 1, sections.length - 1));
        if (e.deltaY < -8) setIndex((p) => Math.max(p - 1, 0));
        setTimeout(() => (ticking = false), 450);
      });
    }

    function onKey(e: KeyboardEvent) {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        setIndex((p) => Math.min(p + 1, sections.length - 1));
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        setIndex((p) => Math.max(p - 1, 0));
      }
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(sections.length - 1);
    }

    el.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [sections.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.children[index] as HTMLElement | undefined;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [index]);

  const goToId = (id: number) => {
    const targetIndex = sections.findIndex((s) => s.id === id);
    if (targetIndex >= 0) setIndex(targetIndex);
  };

  return (
    <div
      className="min-h-screen w-full overflow-y-auto snap-y"
      ref={containerRef}
    >
      {sections.map((s) => (
        <SlideSection key={s.id} slide={s} onGoToId={goToId} />
      ))}

      <nav className="dots">
        {sections.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${s.id}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            title={`Slide ${s.id}`}
          />
        ))}
      </nav>
    </div>
  );
}
