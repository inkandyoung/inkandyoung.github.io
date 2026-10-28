# Yol haritası

Öncelik: P0 hemen, P1 sıradaki, P2 sonra. Bir maddeyi bitirince buradan sil ve `PROJECT_STATE.md`'ye "Tamamlananlar" olarak yaz.

## P0: güvenli çalışma zemini

1. **git init + ilk commit** (kullanıcının makinesinde). `.gitignore` hazır. İsteğe bağlı GitHub deposu; kullanıcı açmalı.
2. Prototipleri müşteriye göster, geri bildirim al. Onaylanmadan kalıbı diğer yazılara yayma.

## P1: prototip dilini derginin geri kalanına taşıma (her biri ayrı küçük görev)

3. Her yazı için kendi kompozisyonu: önce içerik türüne göre bir fikir yaz (`editorial-design` becerisi), sonra uygula.
   Sıra önerisi (sayfa sırası): Šapat avlije (şiir, BS), The Blue That Travelled (sanat, galeri ihtiyacı),
   Leylekler Geç Kaldı (öykü), Čuvar ćuprije (öykü), Papir koji pamti vodu (sanat), denemeler.
   Vapur Düdüğü'nü şablon gibi kopyalama; her yazının kendi fikri olmalı.
4. Sanat yazıları için galeri bileşeni (görsel + açıklama + kredi + lisans alanı). Gerçek görsel gelene kadar boş durum.
   İçerik şemasına isteğe bağlı `images` alanı eklemeyi değerlendir.
5. Kapak → içindekiler → yazı → yazı arasında "dergi gibi" geçiş: View Transitions API (`astro:transitions`)
   ile kapak ve başlık eşleştirme. Reduced-motion'da kapalı.
6. Eksik çeviri davranışını güçlendir: yazının başka dillerde çevirisi varsa bağlantı ver (şemaya `translations` alanı).
   Şu an hiçbir yazının çevirisi yok; not doğru çalışıyor.

## P2: yayına hazırlık

7. Build uyarısını gider (kök rota çakışması).
8. Form servisini bağla (`PUBLIC_FORM_ENDPOINT`).
9. Gerçek künye, alan adı, e-postalar (kullanıcıdan; uydurma yok).
10. Sitemap, kapaktan üretilen OG görseli, RSS, yayına alma (Netlify / Vercel / Cloudflare Pages).
11. Karanlık mod (isteğe bağlı; Vapur Düdüğü zaten koyu sahne).
12. Boşnakça metinlerin ana dili Boşnakça biri tarafından okunması.
