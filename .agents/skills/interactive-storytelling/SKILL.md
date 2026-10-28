---
name: interactive-storytelling
description: Use when adding scroll-driven storytelling, page or section transitions, or any animation to the ink & young site, to keep motion meaningful, fast and accessible.
---

# Etkileşimli anlatım

Kaydırmayla ilerleyen sahneler, kıta/bölüm gezginleri, sayfa geçişleri ve animasyonlar için.
Hangi efektin kullanılacağını söylemez; hareketin içeriğe nasıl bağlanacağını ve nasıl güvenli yapılacağını anlatır.

## Ne zaman

- Bir kompozisyona sahne, aşama (stage) ya da kaydırma etkisi eklerken.
- Kapak → içerik geçişi, önceki/sonraki gezinme, sayfa geçişi yaparken.
- Var olan bir animasyon yavaş, rahatsız edici ya da erişilemez olduğunda.

## Adımlar

1. **Hareketin anlamını yaz.** Hangi metin parçası hangi değişimi tetikliyor? (Vapur Düdüğü: kıta N → sahne aşaması N.)
   Anlamı olmayan hareketi çıkar.
2. **Durumu tek yerde tut.** Kök öğede `data-stage` gibi tek bir öznitelik; görünüm CSS seçicileriyle değişir.
   Durumu IntersectionObserver belirler (ör. `rootMargin: '-50% 0px -50% 0px'`: ekranın ortasından geçen bölüm).
   `scroll` olayını dinleme.
3. **CSS ile canlandır.** Yalnızca `transform` ve `opacity`. Kaydırmaya bağlı etkiler için
   `animation-timeline: view()` + `@supports`. Kütüphane ekleme.
4. **Sabit sahne deseni.** Sahne arkada kalacaksa: `position:absolute; inset:0` iz + içinde `position:sticky; height:100svh`.
   Negatif margin'li sticky kullanma; sahne yazı sonunu örter (bu hatayı bir kez yaşadık).
5. **Gezinme.** Kaydırmaya ek olarak açık önceki/sonraki düğmeleri ve doğrudan bağlantılar; tıklayınca hedefe odak taşı
   (`tabIndex=-1`, `focus({ preventScroll: true })`), `aria-current` güncelle, uçlarda düğmeyi `disabled` yap.
6. **Azaltılmış hareket.** `@media (prefers-reduced-motion: no-preference)` içine geçişleri koy; reduce'da durumlar
   aynen değişir, yalnızca hareket olmaz. JS'te `scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })`.
7. **JS yokken.** İçerik tam okunur, etkileşim denetimleri `hidden` başlar ve JS ile açılır.
8. **Ses.** Yalnızca kullanıcı eylemiyle. Kaynağı belirt (kayıt mı, sentez mi).

## Başarı ölçütleri

- Her hareket bir metin anına bağlı ve PROJECT_STATE'te tarif edildi.
- Testler: aşamalar kaydırmayla ve düğmeyle değişiyor, klavye ile gezinme ve odak çalışıyor, reduced-motion'da hata yok.
- Konsol hatası yok, yatay taşma yok, sahne yazı sonunu örtmüyor.
- Sürekli dönen animasyon sayısı az; düşük güçlü telefonda takılma yok (mümkünse gerçek cihazda bak).
