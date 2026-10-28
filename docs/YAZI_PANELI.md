# Yazı paneli

Siteye kod bilmeden yazı ve yazar eklemek için: **https://mucahitdural-cyber.github.io/dergi/admin/**
(alan adı değişirse adres de değişir; `public/admin/config.yml` → `site_url`, `public_folder`).

Panel Sveltia CMS (açık kaynak, ücretsiz). Kaydettiğiniz her şey GitHub deposuna (`mucahitdural-cyber/dergi`)
yazılır, GitHub Actions siteyi 1-2 dakikada yeniden yayınlar.

## İlk giriş (bir kez)

1. GitHub'da https://github.com/settings/personal-access-tokens/new adresini açın.
2. **Token name:** `yazi-paneli`. **Expiration:** istediğiniz süre (ör. 1 yıl).
3. **Repository access:** *Only select repositories* → `mucahitdural-cyber/dergi`.
4. **Permissions → Repository permissions → Contents:** *Read and write*.
5. **Generate token** deyin, çıkan kodu kopyalayın (bir daha gösterilmez).
6. Paneli açın → **Sign In Using Access Token** (Erişim jetonuyla giriş) → kodu yapıştırın.

Kodu kimseyle paylaşmayın, depoya ya da sohbete yazmayın. Tarayıcı hatırlar; başka bir bilgisayarda aynı kod
ya da yeni bir kod kullanılabilir. Birden fazla editör varsa her biri kendi GitHub hesabıyla, depoya
*collaborator* olarak eklendikten sonra kendi kodunu alır.

## Yazı ekleme

1. Önce yazar listede yoksa **Yazarlar → Yeni** ile ekleyin (özgeçmişin Boşnakça/İngilizcesi yoksa boş bırakın;
   site o dilde Türkçesini gösterir, çeviri uydurmaz).
2. Yazının yazıldığı dile göre **Yazılar (Türkçe / Boşnakça / İngilizce) → Yeni**.
3. Başlık, tür, yazar, tarih, kısa tanıtım ve metni doldurun. Şiirde her dize ayrı satırda, kıtalar arasında boş satır.
4. **Kaydet / Yayınla.** 1-2 dakika sonra yazı sitede "Yazılar" sayfasında ve yazarın sayfasında görünür.

Silme ve düzenleme de aynı yerden yapılır. Ana sayfadaki dergi (PDF'ten gelen 20 yazı) ayrıdır:
`src/data/magazine/*.json`, panelden değil koddan güncellenir.

## Teknik not

- Yazılar: `src/content/yazilar/<dil>/<slug>.md`; yazarlar: `src/content/yazarlar/<id>.json` (dosya adı = id).
- Panel ayarı: `public/admin/config.yml` (OAuth sunucusu yok, yalnızca token ile giriş: `auth_methods: [token]`).
- Sveltia CMS sürümü `public/admin/index.html` içinde sabit (`@sveltia/cms@0.245.0`).
