# AI devir kaydı

Claude Code ↔ Codex geçişleri için. En yeni kayıt en üstte; en fazla 3 kayıt tut.
Genel durum `PROJECT_STATE.md`, öncelikler `ROADMAP.md` içinde. Buraya yalnızca "nerede kaldık" yazılır.

---

## 2026-10-29 · Claude Code

**Yapılan:** kullanıcının adı linkte görünmesin diye depo `inkandyoung` kuruluşuna taşındı ve `inkandyoung.github.io`
olarak adlandırıldı. Site artık **https://inkandyoung.github.io/** (kökte, `BASE_PATH` boş), panel `/admin/`.
`public/admin/config.yml` yeni depo/adres; panelde metin alanı varsayılan düz yazı (şiir satırları korunur).
Başka editörler için rehber: `docs/EDITOR_REHBERI.md` (sahibin adı geçmez). Canlıda doğrulandı (WebFetch).

**Not:** editörler depoya *collaborator* olarak eklenmeli; kuruluş fine-grained token'ları onay isteyebilir
(Organization settings → Personal access tokens). Eski `mucahitdural-cyber.github.io/dergi` adresi artık çalışmaz.

## 2026-10-28 (3) · Claude Code

**Yapılan:** kullanıcı "kendi yazılarımızı koyabileceğimiz site" istedi. Sveltia CMS paneli eklendi: `public/admin/`
(`index.html` + `config.yml`), adres `/dergi/admin/`, GitHub token ile giriş. Yazarlar `src/data/authors.json` →
`src/content/yazarlar/<id>.json` (glob loader) taşındı ki panelden eklenebilsin. Özgeçmişin BS/EN'i artık isteğe bağlı;
yoksa TR metin `lang="tr"` ile gösteriliyor. `astro.config.mjs` `process` tip hatası giderildi. Kullanım: `docs/YAZI_PANELI.md`.
Panel yerelde yüklendi, config Sveltia şemasına göre 0 hata; GitHub ile gerçek kayıt henüz denenmedi (kullanıcı token alınca).

**Açık:** kısa link için kullanıcıya seçim kartı soruldu (alan adı al / inkandyoung.github.io / böyle kalsın).
Alan adı gelirse: `public/CNAME`, iş akışında `BASE_PATH` boş, `config.yml` `site_url`/`public_folder` güncelle.
Örnek yazılar (uydurma yazarlar) hâlâ "Yazılar" sayfasında; kullanıcı panelden silebilir ya da istenirse topluca kaldırılır.

## 2026-10-28 (2) · Claude Code

**Yapılan:** ana sayfa kullanıcının gönderdiği üç PDF'e (ink_young_turkce/bosnakca/ingilizce.pdf) göre dergi oldu.
- Metinler PDF'lerden birebir alındı: `src/data/magazine/{tr,bs,en}.json` (kapak, içindekiler, 20 yazı: sayfa, tür, başlık, metin, alıntı).
  Fotoğraflar TR PDF'inden: `src/assets/magazine/p01.jpg`, `p03–p22.jpg`.
- `src/views/Magazine.astro`: kapak + içindekiler + 20 sayfa; düzenler sırayla `hero / split / band / verse`;
  sağ altta sayfa çubuğu (içindekiler, ←/→, sayaç, WhatsApp paylaş: `navigator.share`, yoksa `wa.me` + bağlantı kopyalama).
  `src/pages/[lang]/index.astro` artık bunu gösteriyor (eski `Home.astro` + `IssueCover` duruyor, yönlendirilmiyor).
- Paylaşım kartı dile göre: `public/og-{tr,bs,en}.jpg` (`npm run og`, JPEG çünkü WhatsApp ~300 kB üstünü göstermiyor).
- `check` 0 hata, build 44 sayfa, `test:e2e` 303 kontrol geçti.

**Dikkat:** PDF'ler metinleri "editoryal taslak / özgün örnek" diye niteliyor, bu not sitede de duruyor. BS s.7 metni
PDF'te yarım ("...kroz prozor."), olduğu gibi bırakıldı. Bazı BS sayfalarında alıntı yok. Fotoğrafların lisansı bilinmiyor.
`split` sayfalarındaki şiirlerin satır kırılımı PDF'teki sarılmış satırlardan çıkarıldı; şaire doğrulatılmalı.

**Yayın (yeni):** GitHub Pages, depo `mucahitdural-cyber/dergi` (public), adres **https://mucahitdural-cyber.github.io/dergi/**.
`main`'e her push `.github/workflows/deploy.yml` ile yayınlanır; iş akışı `SITE_URL` ve `BASE_PATH` (`/dergi`) verir,
`astro.config.mjs` bunları okur. Yerelde ikisi de boşsa eski davranış (kök `/`). Kökten bağlantı yazarken
`import.meta.env.BASE_URL` ya da `localPath()` kullan, `/tr/` gibi sabit yol yazma. `_headers`/`_redirects` GitHub Pages'te çalışmaz.
