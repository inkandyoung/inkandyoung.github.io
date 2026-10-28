---
name: editorial-design
description: Use when designing or redesigning a page of the ink & young magazine (cover, contents, or a single piece) so its layout, type and imagery grow out of that piece's own content instead of a shared template.
---

# Editoryal tasarım

Bir sayfaya sanat yönetimi uygularken kullan: kapak, içindekiler ya da tek bir yazının kompozisyonu.
Yöntem verir; renk, düzen ya da efekt dayatmaz. Önce `docs/DESIGN_PRINCIPLES.md`'yi oku.

## Ne zaman

- Yeni bir yazıya kendi kompozisyonunu yaparken (`src/compositions/`).
- Kapağı, içindekileri ya da standart okuma sayfasını değiştirirken.
- Müşteri referansı (başka dergi) verildiğinde: niteliğini anla, düzenini kopyalama.

## Adımlar

1. **Metni oku.** Yazının tamamını, yazar notunu, kategorisini, dilini oku. Çevirme, özetleme yetmez.
2. **Fikri yaz.** Yazının içinden tek cümlelik bir görsel fikir çıkar ve hangi kelimelere dayandığını not et.
   Fikir yazıda yoksa başka fikir ara. En az iki seçenek düşün, birini seç, gerekçesini yaz.
3. **Hiyerarşiyi kur.** Sayfadaki en büyük tek şey ne? Başlık mı, görsel mi, ilk dize mi? Okuma sırası nasıl?
4. **İçerik türüne göre karar ver.** Şiir: dize ve kıta korunur. Öykü: okuma rahatlığı önce. Deneme: başlık
   ve alıntı düzeni. Sanat: görsel, açıklama, kredi. Ayrıntı: DESIGN_PRINCIPLES §3.
5. **Görsel kaynağını belirle.** Gerçek görsel var mı, lisansı ne? Yoksa yazıdan türeyen SVG/tipografi.
   Stok fotoğraf ya da sahte görsel yok.
6. **Kimlikle bağla.** Gloock + Literata, kâğıt/mürekkep, ebru. Bunların üstüne yazıya özel kararlar ekle.
   Komşu yazıların kompozisyonuna bak; aynısını yapma.
7. **Uygula.** Yazıya özel sayfa: `src/compositions/<Ad>.astro` + `index.ts` kaydı. Metin `<slot />` ile gelir.
   Yazı sonu `slot="end"` ile gelir (bio, önceki/sonraki, içindekiler). Arayüz metni `src/i18n/ui.ts`'ye, üç dilde.
8. **Bak.** 390, 820, 1440 px ekran görüntüsü al; fikir okunuyor mu, metin okunuyor mu?

## Başarı ölçütleri

- Fikir tek cümle, yazıdan alıntılanan kelimelere dayanıyor ve `docs/PROJECT_STATE.md`'ye yazıldı.
- Metin, başlık, yazar adı kaynakla birebir aynı (test ile).
- Kontrast AA, gövde metni rahat okunuyor, yatay taşma yok.
- Sayfa başka bir yazının sayfasıyla karıştırılmıyor.
