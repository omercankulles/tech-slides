# Tech Slides — Interesting Engineering

Bu depo, Tech departmanının Operasyon ekibine sunduğu içerikleri modern ve minimalist bir slayt sitesi olarak göstermeyi amaçlayan Next.js + Tailwind projesidir.

## Özellikler

- Tam ekran scroll-snap ile slayt geçişleri (klavye ve wheel desteği)
- Kapak: IE logosu, tarih, ekip kartları, teknoloji rozetleri
- “Sunum İçeriği” slaydında tıklanabilir içerik (ilgili slayda kaydırır)
- 9 slayt için örnek içerik (yer yer placeholder)
- Tailwind tabanlı tema, cam/glass efektleri ve animasyonlar

## Kurulum

```bash
npm install
npm run dev
# Varsayılan: http://localhost:3000 (port doluysa Next.js alternatif bir port seçer)
```

## Düzenleme

- Slayt içerikleri: `src/app/page.tsx` dosyasındaki `slidesData` dizisi.
- Kapak logo: `public/img/teams/ie-logo.svg` (dosyayı değiştirerek güncelleyebilirsiniz).
- Ekip bilgileri ve avatarlar: `TEAM` dizisi ve `public/omercan-kulles.png`, `public/img/teams/*`.
- Tema/stiller: `src/app/globals.css`.

## Kısayollar

- Klavye: Aşağı/Yukarı ok, PageDown/PageUp, Space, Home/End.
- Dots navigasyonu: Sağ kenardaki noktalar ile slayt atlama.
- “Sunum İçeriği” slaydındaki kartlara tıklayarak ilgili slayda gidin.

## Dağıtım (Deploy)

1. Üretim derlemesi:
   ```bash
   npm run build
   npm start
   ```
2. Vercel ile tek tık deploy önerilir.

## Yapılandırma

- Next.js sürümü: 15.x (App Router)
- Tailwind: `@tailwindcss/postcss` ile PostCSS üzerinden etkin
- Alias: `@/*`

## Notlar

- İçerikler örnek/placeholder değerler içerir; kendi metinlerinizi kolayca `slidesData` ve `TEAM` üzerinden düzenleyin.
- Tasarım minimaldir; gradient başlık, cam efektli kartlar ve marquee rozetler kapakta kullanılır.

## Lisans

Bu proje kurum içi sunum amaçlıdır. Dışa açık kullanım gerektiriyorsa lisans bilgisi ekleyin.
