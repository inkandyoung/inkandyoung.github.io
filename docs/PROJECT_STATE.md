# Proje durumu

Son güncelleme: 2026-10-27, Claude Code. Tek güncel durum kaynağı budur (eski `red.txt` buraya taşındı).

## Özet

Astro 7.4 ile üç dilli (TR / BS / EN), tek sayılık dergi sitesi. 44 sayfa üretiliyor; `npm run check` 0 hata,
`npm run test:e2e` 303 kontrol geçiyor. Ana sayfa (2026-10-28) kullanıcının PDF'lerinden kurulan dergi:
`src/views/Magazine.astro` + `src/data/magazine/*.json` (kapak, içindekiler, 20 sayfa, WhatsApp paylaş düğmesi).
Önceki prototipler (ebru kapak, Vapur Düdüğü okuma sayfası) duruyor; kapak artık ana sayfada değil.

**Yayın:** hedef Cloudflare Pages, proje adı `inkandyoung`, adres `https://inkandyoung.pages.dev/tr/`
(`astro.config.mjs` → `site`). Kullanıcı örnek içerikle önizleme yayınını onayladı (2026-10-27).
Paylaşım kartı (WhatsApp vb.): dile göre `public/og-{tr,bs,en}.jpg` (1200×630, dergi kapağından `npm run og`),
etiketler `src/layouts/Base.astro` içinde. **pages.dev Türkiye'de erişime kapalı** (Kasım 2025); Türkiye'den açılan
link için başka adres gerekiyor (bkz. AI_HANDOFF). Yayınlama:
`npx wrangler login` (bir kez) → `npm run build` → `npx wrangler pages deploy dist --project-name inkandyoung --branch main`.
**Güvenlik başlıkları** (2026-10-28): `public/_headers` (CSP, HSTS, nosniff, X-Frame-Options, Referrer/Permissions-Policy)
ve `public/_redirects` (`/` → `/tr/`). CSP'de `'unsafe-inline'` var çünkü Astro satır içi script/stil üretiyor; fontlar için
`data:` gerekli (Astro küçük fontları gömüyor). Gönderim formuna dış bir uç nokta eklenirse onu `connect-src`'e ekle.
Yerelde denemek: `npx wrangler pages dev dist --port 8788` → `BASE_URL=http://127.0.0.1:8788 npm run test:e2e`.

## Yerleşik kararlar (geri alma)

- Tasarım yönü "A: Ebru" onaylandı. "B: Dizgi" reddedildi, geri getirme.
- Kapak: `issues.json` içindeki `palette` (5 renk) ve `seed` değerinden üretilen SVG ebru. Aynı sayı her zaman aynı deseni verir.
- Renkler (İznik): kâğıt `#EEF0EA`, mürekkep `#1C2340`, kırmızı `#A3302A`, firuze `#22706E`. Kapak paleti `issues.json` içinde.
- Fontlar: Gloock (başlık) + Literata Variable (metin), Fontsource, latin-ext dahil (ş ğ ı İ č ć đ š ž test edildi).
- Okuma sütunu 34em (satır başı 64–71 karakter).
- i18n: `prefixDefaultLocale: true`, varsayılan `tr`. Bölüm adresleri yerelleştirilmiş (README'deki tablo).
  Her yazı her arayüz dilinde okunur; yazı kendi `lang`'ını korur, canonical yazının kendi dilini gösterir.
- Kök `/` tarayıcı diline göre `/tr`, `/bs`, `/en`'e yönlendirir.

## Tamamlananlar

- Ana sayfa, yazılar (kategori + dil filtresi, `?kategori=` `?dil=`), okuma sayfası, yazarlar (#id çapaları),
  hakkında ve künye, katkı formu (doğrulamalı; `PUBLIC_FORM_ENDPOINT` yoksa e-posta uygulamasını açar), 404.
- 2026-10-24/25: 1.609 iç bağlantı kırık değil; `<html lang>` ve hreflang tam.
- **2026-10-27 Prototip 1, kapak** (`IssueCover.astro`): ekranı dolduran ebru, kâğıt şeritte poster boyu başlık
  (bağlaç küçük italik, son kelime karşı kenara itilmiş: başlık kendi "sınırını" çiziyor), dalgalı kâğıt kenarı,
  kâğıt dokusu, kapak satırları (öne çıkan yazılar), "Sayıyı aç" düğmesi. Kelimeler şeritten yükselir,
  kaydırınca kapak geri çekilir (CSS scroll-driven animation; desteklemeyen tarayıcıda sabit kalır).
  Ebru üretimi `src/lib/ebru.ts` + `EbruField.astro`'ya ayrıldı; küçük kapak (`EbruCover`) aynı kodu kullanıyor.
- **2026-10-27 Prototip 2, Vapur Düdüğü** (`src/compositions/VapurDudugu.astro`): şiirden türetilmiş SVG körfez sahnesi
  (iskele, bank, karşı kıyı, vapur, martılar). Her kıta sahneyi bir adım ilerletir: vapur yaklaşır → düdük halkaları,
  körfez kararır → Alsancak'ın ışıkları yanar, suda "sarı alfabe" (ğ ş ı …) titrer → gece, vapur iskelede.
  Kıta gezgini (↑ I II III IV ↓), tarayıcıda sentezlenen düdük sesi (yalnızca düğmeyle, kayıt değil ve öyle yazıyor),
  dar ekranda kırılan dize asılı girintiyle gösteriliyor. Metin Markdown'dan geliyor; test kaynakla karşılaştırıyor.
- **2026-10-27 Gezinme:** her yazının sonunda sayfa sırasına göre önceki/sonraki yazı bağlantısı (`PostPager`).
  Yazı sonu bölümü `PostEnd.astro`'ya ayrıldı.
- **2026-10-27 Hata düzeltmesi:** standart okuma sayfasında masaüstü yan sütundaki küçük kapak tarihin üstüne biniyordu
  (kapak yüksekliği ölçülemiyordu). Sabit yükseklik verildi; test eklendi.
- **2026-10-27 Altyapı:** `AGENTS.md`, `CLAUDE.md`, `docs/*`, ortak beceriler (`.agents/skills`, `.claude/skills`),
  `tests/smoke.mjs`, `.mcp.json` (Playwright MCP).

## Testler

- `npm run check`: 0 hata, 0 uyarı.
- `npm run build`: 44 sayfa. Bir uyarı var (aşağıda), önceden de vardı.
- `npm run test:e2e`: 390 / 820 / 1440 px, normal ve reduced-motion; TR/BS/EN kapak başlığı, yatay taşma,
  içindekiler bağlantıları (HTTP 200), "Sayıyı aç", şiir metni = kaynak, yazar, `lang`, dil notu, kıta gezgini
  (fare + klavye + odak), düdük düğmesi, önceki/sonraki, sahnenin yazı sonunu örtmemesi, konsol hatası yok.
- 2026-10-27'de axe-core (WCAG 2.1 AA + best-practice) ile `/tr/`, `/en/`, iki dilde Vapur Düdüğü ve bir standart
  yazı, 1440 ve 390 px: ihlal yok. axe projeye bağımlılık olarak eklenmedi (tek seferlik tarama).

## Bilinen hatalar ve teknik borç

- Build uyarısı: "Could not render `` from route `/` as it conflicts with higher priority route `/`".
  `src/pages/index.astro` ile i18n `redirectToDefaultLocale` çakışıyor. Zararsız ama temizlenmeli.
- Proje klasörü henüz git deposu değil. Agent'lar arası geçiş için en büyük risk bu (bkz. ROADMAP P0).
- Vapur Düdüğü sahnesi mobilde yatay olarak ortadan kırpılıyor; iskele dar ekranda görünmüyor.
- Kapak, başlık 3+ uzun kelime olursa (ör. EN "Border and Water") masaüstünde iki satıra inmeden tek satıra sığıyor, ama daha uzun başlıklar için test yok.
- Kompozisyon kaydı slug'a bağlı (`src/compositions/index.ts`). Yazının slug'ı değişirse kompozisyon düşer, standart sayfa açılır.
- Formun Windows'ta uzun metinlerde `mailto` ile kesilme riski var; form servisi bağlanmalı.
- Boşnakça arayüz metinleri (yeni eklenenler dahil: `cover.*`, `poem.*`, `post.prev/next/page/pager`) ana dili Boşnakça olan biri tarafından okunmalı.

## Açık görevler

Öncelik sırası `docs/ROADMAP.md` içinde. Sıradaki somut görev `docs/AI_HANDOFF.md` içinde.

## Örnek içerik uyarısı

Yazarlar, yazılar ve künyedeki isimler örnek olarak yazıldı; yayından önce gerçekleriyle değiştirilecek.
Alan adı (`astro.config.mjs` → `site`) ve e-postalar (`src/site.config.ts`) da geçici.
