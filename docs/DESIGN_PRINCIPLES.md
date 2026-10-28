# Tasarım ilkeleri

Bu belge bir yöntem anlatır, bir görünüm dayatmaz. Aşağıdaki hiçbir örnek kopyalanacak şablon değildir.

## 1. Fikir yazıdan çıkar

Her kompozisyon, yazının içinden alınmış bir fikre dayanır. Önce metni oku, sonra bir cümleyle fikri yaz.

- Vapur Düdüğü: "Akşam körfezi; her kıta sahneyi bir adım ileri taşır, ışıklar suya sarı bir alfabe olarak düşer."
  Sahne öğelerinin hepsi şiirde geçer (19.45 vapuru, martılar, düdük, Alsancak'ın ışıkları, ğ ş ı, bank, iskele).
- Kapak: "Sınır ve Su": başlığın iki yarısı ekranın iki kenarına ayrılır, araları sınırdır; altta su (ebru).

Fikir yazının dışından geliyorsa (moda bir efekt, başka bir derginin düzeni) vazgeç.

## 2. Yerleşik kimlik, değişken kompozisyon

Sabit olanlar: kâğıt + mürekkep zemini, Gloock + Literata, ebru kapak, İznik renkleri, üç dil.
Serbest olanlar: düzen, ölçek, renk vurgusu, hareket, görsel dil, sütun sayısı. Bir yazının koyu sahnesi
öbürünün beyaz sayfa olmasını engellemez. İki komşu yazı aynı kompozisyonu kullanmamalı.

## 3. İçerik türüne göre olanaklar (zorunluluk değil)

- **Şiir:** dizeler ve kıtalar olduğu gibi kalır (`white-space: pre-line` ya da satır başına blok).
  Dar ekranda kırılan dize asılı girintiyle gösterilir ki yeni dize sanılmasın. Kıta numarası, kıta gezgini,
  ses, sahne değişimi olabilir. Tipografi şiirin ritmine uyar.
- **Öykü:** güçlü açılış (ilk paragraf, büyük harf, açılış görseli), sonra rahat okuma: 34em sütun, 1.6–1.75 satır aralığı.
  Okumayı bölen efekt yok.
- **Deneme:** başlık hiyerarşisi (h2/h3), çekme alıntı, dipnot ya da kenar notu, gerekirse iki sütunlu açılış.
- **Sanat yazısı:** galeri, görsel açıklaması, kredi ve lisans, büyütme. Görsel yoksa boş yer bırakma, uydurma da.

## 4. Görsel hiyerarşi

Sayfada tek bir en büyük şey olsun. Başlık ölçeği cesur (kapakta ekran genişliğinin %15'ine kadar),
ama metin her zaman okunur: kontrast WCAG AA, gövde 17–18 px, sahne üstündeki metin kâğıt zemin üzerinde.

## 5. Hareket

- Hareket anlam taşır (vapurun yaklaşması, ışıkların yanması), süs değildir.
- CSS geçişleri ve scroll-driven animation; JS yalnızca durum için (IntersectionObserver). Kütüphane yok.
- `prefers-reduced-motion: reduce` → geçişler ve sürekli animasyonlar kapanır, içerik ve durumlar aynen kalır.
- JS kapalıyken metin tam okunur; etkileşim katmanları (gezgin, ses düğmesi) gizlenir.
- Sürekli animasyon sayısı az; `transform` ve `opacity` dışında özellik canlandırma.

## 6. Görseller ve ses

- Rastgele stok fotoğraf yok. Gerçek görsel yoksa: kodla üretilmiş, yazıdan türeyen çizim (SVG) ya da tipografi.
- Fotoğraf eklenirse: kaynak, fotoğrafçı, lisans; `alt` metni anlamlı.
- Ses yalnızca kullanıcı düğmeye basınca çalar; sentez ise "kayıt değildir" diye yazılır.

## 7. Erişilebilirlik ve dil

- Dekoratif sahne `aria-hidden`, kapsayıcısında tek cümlelik `role="img"` açıklaması (arayüz dilinde).
- Yazının metni kendi `lang` değerinde, arayüz öğeleri arayüz dilinde.
- Her denetim klavyeyle erişilebilir, en az 44 × 44 px, görünür odak.

## 8. Kontrol listesi (her kompozisyon için)

- [ ] Fikir tek cümleyle yazıldı ve yazıdan geliyor.
- [ ] Metin Markdown'dan geliyor, hiçbir kelimesi değişmedi.
- [ ] 390 / 820 / 1440 px ekran görüntüsü alındı, yatay taşma yok.
- [ ] Reduced-motion ve JS kapalı durumda okunuyor.
- [ ] TR/BS/EN arayüzde etiketler doğru, dil notu doğru.
- [ ] `npm run test:e2e` geçiyor; yeni kompozisyon için test eklendi.
