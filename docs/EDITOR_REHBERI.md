# ink & young · Yazı ekleme rehberi

Bu rehber, dergiye kendi yazılarını eklemek isteyen editörler ve yazarlar içindir.
Kod bilmenize gerek yok; her şey tarayıcıdan yapılır.

- **Dergi:** __SITE__
- **Yazı paneli:** __SITE__admin/

---

## 1. Hazırlık (yalnızca bir kez)

### a) GitHub hesabı

Panel, yazıları GitHub'da saklar. Hesabınız yoksa ücretsiz açın: https://github.com/signup
Kullanıcı adınızı dergi yönetimine iletin.

### b) Daveti kabul edin

Dergi yönetimi sizi davet edince e-postanıza "invited you to collaborate" konulu bir ileti gelir.
İçindeki **View invitation → Accept invitation** düğmesine basın.
(E-posta gelmezse: __REPO__ adresini açın, üstte daveti görürsünüz.)

### c) Giriş kodu (token) oluşturun

1. https://github.com/settings/personal-access-tokens/new adresini açın.
2. **Token name:** `ink-and-young`
3. **Resource owner:** listeden **__ORG__**'u seçin (kendi adınızı değil).
4. **Expiration:** 1 yıl ya da istediğiniz süre.
5. **Repository access:** *Only select repositories* → **__REPONAME__**
6. **Permissions → Repository permissions → Add permissions → Contents → Read and write.**
7. En altta **Generate token** deyin. `github_pat_` ile başlayan kodu kopyalayıp güvenli bir yere kaydedin.
   Kod bir daha gösterilmez.

Bazen kodun dergi yönetimince onaylanması gerekir ("pending approval"). Öyle görünürse yönetime haber verin.

**Bu kodu kimseyle paylaşmayın, e-postaya ya da sohbete yazmayın.** Kod, dergiye yazı ekleme yetkisidir.

### d) Panele giriş

__SITE__admin/ adresini açın → **Sign In Using Access Token** → kodu yapıştırın.
Tarayıcınız sizi hatırlar; bir dahaki sefere doğrudan girersiniz.

---

## 2. Kendinizi yazar olarak ekleyin (bir kez)

1. Soldan **Yazarlar → New (Yeni)**.
2. **Ad Soyad**, **Şehir**, **Yazdığı diller**.
3. **Kısa özgeçmiş:** Türkçesi zorunlu. Boşnakça ya da İngilizcesi yoksa boş bırakın; site o dillerde
   Türkçesini gösterir. Çeviri uydurmayın.
4. Sağ üstte **Save (Kaydet)**.

---

## 3. Yazı ekleme

1. Yazınız hangi dilde yazıldıysa soldan onu seçin: **Yazılar (Türkçe)**, **Yazılar (Boşnakça)** ya da **Yazılar (İngilizce)**.
2. **New (Yeni)** deyin ve doldurun:

| Alan | Ne yazılır |
|---|---|
| Başlık | Yazının başlığı |
| Tür | Şiir, Öykü, Deneme, Sanat ya da Kültür |
| Yazar | Listeden kendinizi seçin (yoksa önce 2. adım) |
| Çevirmen | Çeviriyse çevirmenin adı, değilse boş |
| Sayı | Derginin hangi sayısı (şu an 1) |
| Tarih | Yayın tarihi |
| Kısa tanıtım | Bir iki cümle; listelerde başlığın altında görünür |
| Öne çıkar | Genelde kapalı bırakın |
| Basılı sayfa no | Basılı dergide sayfa numarası varsa, yoksa boş |
| Metin | Yazının kendisi |

3. **Metni yazarken:**
   - **Düzyazı:** paragraflar arasında bir boş satır bırakın.
   - **Şiir:** her dize ayrı satıra (Enter). Kıtalar arasında bir boş satır.
   - Word'den kopyalarken biçim bozulursa metni önce Not Defteri'ne yapıştırıp oradan alın.
   - *İtalik* için kelimeyi `*yıldız*` arasına, **kalın** için `**iki yıldız**` arasına alın.
4. Sağ üstte **Save (Kaydet)**.

Yazı 1-2 dakika içinde dergide görünür: __SITE__tr/yazilar/ (Boşnakça yazılar `bs/tekstovi/`,
İngilizce yazılar `en/writing/` altında).

---

## 4. Düzeltme ve silme

Panelde yazıyı listeden açın, değiştirip **Save** deyin. Silmek için yazıyı açıp sağ üstteki menüden
**Delete** seçin. Her değişiklik birkaç dakikada sitede görünür.

---

## Sorun çıkarsa

- **Giriş olmuyor:** kodun süresi dolmuş, kod yanlış kopyalanmış ya da onay bekliyor olabilir. Yeni kod oluşturun
  ya da yönetime yazın.
- **Kaydettim ama sitede yok:** 2-3 dakika bekleyip sayfayı yenileyin. Yine yoksa yönetime yazın.
- **Yazar listede yok:** önce 2. adımdaki gibi yazarı ekleyin.

Yazıların ve özgeçmişlerin sorumluluğu yazarlarına aittir. Başkasının eserini izinsiz eklemeyin.
