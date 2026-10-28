# ink & young: ortak proje kuralları

Bu dosya Claude Code, Codex ve diğer bütün AI agent'lar için tek kural kaynağıdır.
`CLAUDE.md` yalnızca buraya yönlendirir. Çelişki olursa bu dosya geçerlidir.

## Önce oku

1. `docs/PROJECT_STATE.md`: şu anki durum, bilinen hatalar, açık görevler.
2. `docs/AI_HANDOFF.md`: son oturum ne bıraktı, sıradaki görev ne.
3. Tasarım işi yapacaksan `docs/DESIGN_PRINCIPLES.md`.
4. İşine uyan beceri (skill): `.agents/skills/*/SKILL.md`.

Geçmiş konuşmaları bildiğini varsayma; bilgi bu dosyalarda yoksa yoktur.

## Proje

Üç dilli (TR / BS / EN) edebiyat, kültür ve sanat dergisi. Tek sayı: Sayı 1, "Sınır ve Su", Ekim 2026.
Astro 7 statik site; bağımlılıklar: `astro`, Fontsource ile Gloock + Literata. Başka framework yok.

| Ne | Nerede |
|---|---|
| Yazılar (Markdown) | `src/content/yazilar/<yazının dili>/<slug>.md` |
| Şema | `src/content.config.ts` |
| Sayı | `src/data/issues.json` |
| Yazarlar (yazar başına bir dosya) | `src/content/yazarlar/<id>.json` |
| Ana sayfa dergisi (PDF'ten) | `src/views/Magazine.astro`, `src/data/magazine/*.json` |
| Yazı paneli (CMS) | `public/admin/` → `docs/YAZI_PANELI.md` |
| Arayüz metinleri (3 dil) | `src/i18n/ui.ts`, yardımcılar `src/i18n/utils.ts` |
| Tüm iç sayfaların rotası | `src/pages/[lang]/[...path].astro` → `src/views/*.astro` |
| Tam ekran kapak | `src/components/IssueCover.astro` (+ `EbruField.astro`, `src/lib/ebru.ts`) |
| Standart okuma sayfası | `src/views/Post.astro` (+ `PostEnd`, `PostPager`) |
| Yazıya özel sanat yönetimi | `src/compositions/` (kayıt: `index.ts`) |
| Global stil ve renkler | `src/styles/global.css` |
| Testler | `tests/smoke.mjs` |

## Komutlar

```sh
npm install
npm run dev         # http://localhost:4321/tr/
npm run build       # dist/
npm run check       # tip denetimi, 0 hata olmalı
npm run test:e2e    # build sonrası tarayıcı testleri (Playwright)
npm run skills:sync # .agents/skills → .claude/skills kopyası
```

Node 22.23.4 veya üstü (Astro 7 bunu istiyor; geliştirici makinesinde Node 24 var).
`npm run test:e2e` önce Playwright'ın Chromium'unu, yoksa makinedeki Chrome ya da Edge'i kullanır.

## Değişmez kurallar

- **Metin bütünlüğü.** Yazıların metnini, şiir dizelerini, başlıkları, yazar adlarını ve biyografileri
  izinsiz değiştirme, düzeltme, kısaltma. Kompozisyonlar metni Markdown'dan `<Content />` ile alır,
  asla elle yeniden yazmaz. Testler Vapur Düdüğü'nün dizelerini kaynakla karşılaştırır.
- **Çeviri uydurma.** Bir yazının çevirisi yoksa yazı kendi dilinde gösterilir ve arayüz dilinde
  "Bu yazı X yazıldı" notu çıkar. Arayüz dili ile içerik dili ayrıdır (`lang` öznitelikleri).
- **Künye bilgisi uydurma.** Eksikse `[DOLDURULACAK]` yaz ve kullanıcıya sor.
- **Telif.** Telifli metin kopyalama. Yalnızca ölümünün üzerinden 70+ yıl geçmiş yazarlardan,
  kaynak belirterek alıntı yap. Biyografi ve tanıtımları kendi cümlelerinle yaz.
- **Görseller.** Rastgele stok fotoğraf, sahte içerik ya da kaynağı belirsiz görsel ekleme. Projede şu an
  hiç fotoğraf yok; görseller kodla üretilir (ebru, SVG sahneler). Gerçek fotoğraf gelirse lisansını
  `docs/PROJECT_STATE.md` içine yaz.
- **Fontlar.** Gloock ve Literata (SIL OFL), Fontsource ile kendi sunucumuzdan. Harici font CDN'i ekleme.
- **Bağımlılık.** Yeni kütüphane eklemeden önce mevcut araçla (CSS, SVG, küçük vanilla JS) çözülebilir mi bak.
  Animasyon için GSAP vb. yok; CSS ve IntersectionObserver yetiyor.
- **Erişilebilirlik.** Klavye ile her şey kullanılabilir, `prefers-reduced-motion` desteklenir,
  dekoratif SVG `aria-hidden`, JS kapalıyken metin okunabilir kalır.
- **Gizli bilgi** (API anahtarı, token) depoya yazılmaz. `.env` gitignore'da.
- **Araştırma.** Önce `research/` klasörüne bak. Yeni bulguyu kaynak URL'siyle `research/` altına `.md` olarak kaydet.

## Çalışma biçimi

- Mevcut kodu koru; sıfırdan yazma. Büyük değişikliği küçük, geri alınabilir adımlara böl.
- Kod yorumları İngilizce, mevcut kodun yoğunluğunda. Belgeler Türkçe.
- **Windows dikkat:** Git Bash heredoc'ları Türkçe/Boşnakça karakterleri ve regex geri referanslarını bozabiliyor.
  Bu dillerde metin düzenlerken editör aracını ya da `\u` kaçışlı Python kullan.
- Her görevden sonra: `npm run check`, `npm run build`, `npm run test:e2e`. Arayüz değiştiyse
  390 px ve masaüstü ekran görüntülerine bak (`.playwright-mcp/smoke/`).
- Gerçek test yapmadan "çalışıyor" deme. Kurulamayan aracı kurulmuş gibi raporlama.
- **Görev sonunda** `docs/PROJECT_STATE.md` ve `docs/AI_HANDOFF.md` güncellenir. Sonraki agent başka
  bir araç olabilir (Claude Code ↔ Codex); devir kaydı ona yazılır.
