# ink & young

Türkçe, Boşnakça ve İngilizce yayımlanan edebiyat, kültür ve sanat dergisinin web sitesi. Astro 7 ile yapıldı.

## Çalıştırma

```sh
npm install
npm run dev      # http://localhost:4321  →  /tr/
npm run build    # statik site dist/ klasörüne
npm run check    # tip denetimi
npm run test:e2e # tarayıcı testleri (önce build)
```

Node 22.23.4 veya üstü gerekir (Astro 7). AI agent'lar için kurallar `AGENTS.md`, durum `docs/PROJECT_STATE.md`.

## Adresler

Her bölümün adresi dile göre değişir:

| Sayfa      | Türkçe          | Boşnakça         | İngilizce       |
|------------|-----------------|------------------|-----------------|
| Ana sayfa  | `/tr/`          | `/bs/`           | `/en/`          |
| Yazılar    | `/tr/yazilar/`  | `/bs/tekstovi/`  | `/en/writing/`  |
| Yazarlar   | `/tr/yazarlar/` | `/bs/autori/`    | `/en/authors/`  |
| Hakkında   | `/tr/hakkinda/` | `/bs/o-nama/`    | `/en/about/`    |
| Katkı      | `/tr/katki/`    | `/bs/saradnja/`  | `/en/submit/`   |

Bir yazı üç arayüz dilinde de okunabilir; metin kendi dilinde kalır, menüler değişir.

## Yeni yazı eklemek

`src/content/yazilar/<dil>/<kisa-ad>.md` dosyası oluşturun:

```md
---
title: Vapur Düdüğü
lang: tr            # tr | bs | en: yazının yazıldığı dil
category: siir      # siir | oyku | deneme | sanat | kultur
author: isil-guclu  # src/data/authors.json içindeki id
issue: 1            # derginin tek sayısı
date: 2026-10-01
page: 7             # isteğe bağlı: basılı sayıdaki sayfa
featured: true      # isteğe bağlı: ana sayfada öne çıkar
translator: Ad Soyad # isteğe bağlı
excerpt: Bir iki cümlelik özet.
---

Metin…
```

Şiirlerde satır sonları olduğu gibi korunur; kıtaları boş satırla ayırın.

Bir yazıya kendine özgü bir sayfa tasarımı vermek için `src/compositions/` altına bir bileşen yazıp
`src/compositions/index.ts` içinde yazının kısa adıyla kaydedin (örnek: `VapurDudugu.astro`). Metin yine
Markdown dosyasından gelir; kayıt yoksa standart okuma sayfası kullanılır.

## Sayı 1

Dergi tek sayılık; arşiv yok, sayı ana sayfanın kendisi. Sayının adı, tanıtımı ve tarihi `src/data/issues.json` dosyasında. Kapak, `palette` (zemin ve dört boya rengi) ve `seed` değerinden otomatik üretilen bir ebrudur; `seed`'i değiştirerek farklı bir desen elde edersiniz.

## Ayarlar

- `src/site.config.ts`: e-posta adresleri ve form servisi.
- Katkı formu, `PUBLIC_FORM_ENDPOINT` ortam değişkeni tanımlıysa (Formspree, Getform vb.) oraya gönderir. Tanımlı değilse ziyaretçinin e-posta uygulamasını açar.
- Arayüz metinleri: `src/i18n/ui.ts`. Künye ve Hakkında metni: `src/views/About.astro`.

> Örnek içerik: yazarlar, yazılar ve künyedeki isimler örnek olarak yazıldı; yayından önce gerçekleriyle değiştirin.
