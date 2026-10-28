---
name: multilingual-publishing
description: Use when adding or changing content or interface text in Turkish, Bosnian or English on the ink & young site, handling missing translations, or touching language routing.
---

# Çok dilli yayın

TR / BS / EN içerik ve arayüz metni, eksik çeviri davranışı ve özgün metin bütünlüğü.

## Ne zaman

- Yeni yazı, yazar ya da sayı bilgisi eklerken.
- `src/i18n/ui.ts`'ye anahtar eklerken ya da metin değiştirirken.
- Rota, dil değiştirici, `lang`/hreflang/canonical ile ilgili her işte.

## Temel model

- **Arayüz dili** URL'den gelir (`/tr/`, `/bs/`, `/en/`). Menüler, etiketler, düğmeler bu dilde.
- **İçerik dili** yazının kendi dilidir (`src/content/yazilar/<dil>/`, frontmatter `lang`). Metin bu dilde kalır.
- Her yazı üç arayüzde de açılır; canonical yazının kendi dilindeki adrestir. Arayüz dili farklıysa
  "Bu yazı X yazıldı" notu (`post.lang.note`) gösterilir.

## Adımlar

1. **Yazı eklerken** README'deki frontmatter'ı kullan. Şiirde satır sonları ve boş satırlar korunur.
   Metni sen yazmıyorsan bir karakterini bile değiştirme (yazım "hatası" gibi görünse de sor).
2. **Arayüz metni eklerken** anahtarı üç dilin bloğuna da ekle (`tr` tip kaynağıdır; eksik anahtar TR'ye düşer).
   Boşnakça metni "ana dili Boşnakça biri okumalı" diye PROJECT_STATE'e not et.
3. **Çeviri yoksa** uydurma; makine çevirisi koyma. Not göster. Çeviri gelirse ayrı dosya olarak ekle ve
   çevirmeni `translator` alanına yaz.
4. **`lang` öznitelikleri:** yazı kapsayıcısında yazının dili, içindeki arayüz parçalarında arayüz dili.
   Başlık listelerinde (içindekiler, kapak satırları) başlığa yazının dilini ver.
5. **Özel karakterler:** ş ğ ı İ č ć đ š ž Fontsource latin-ext ile geliyor; yeni font eklersen kontrol et.
   Windows'ta Türkçe/Boşnakça düzenlerken heredoc kullanma (AGENTS.md).
6. **Künye ve yazar bilgisi** uydurulmaz: eksikse `[DOLDURULACAK]`.

## Başarı ölçütleri

- `npm run check` 0 hata (eksik anahtar tip hatası verir).
- Üç arayüzde sayfa açılıyor; dil notu yalnızca dil farklıyken çıkıyor; `<html lang>` ve hreflang doğru.
- Yazı metni kaynakla birebir aynı.
