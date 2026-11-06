# AI devir kaydı

Claude Code ↔ Codex geçişleri için. En yeni kayıt en üstte; en fazla 3 kayıt tut.
Genel durum `PROJECT_STATE.md`, öncelikler `ROADMAP.md` içinde. Buraya yalnızca "nerede kaldık" yazılır.

---

## 2026-11-06 · Claude Code

**Yapılan:** GitHub dışı ikinci adres: **https://inkandyoung.netlify.app** (Netlify projesi `inkandyoung`, herkese açık,
`main`'e her push'ta `netlify.toml` ile kendiliğinden derlenir). `astro.config.mjs` `site` için Netlify'ın `URL`
değişkenini kullanır. `/admin/` Netlify'da `https://inkandyoung.github.io/admin/`'e yönlenir (`_redirects`).
Canlıda /tr/ ve /en/ açıldı (web-fetch), adın geçmiyor. Paylaşım görselinin WhatsApp'ta çıktığı henüz doğrulanmadı.

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
