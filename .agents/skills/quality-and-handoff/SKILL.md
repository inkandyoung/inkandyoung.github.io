---
name: quality-and-handoff
description: Use at the end of every task on the ink & young project (and before stopping early) to run the checks, review the change and leave a handoff record the next agent, Claude Code or Codex, can continue from.
---

# Kalite ve devir

Her görevin sonunda, ya da limit/engel yüzünden durmadan önce.

## Ne zaman

- Bir görev bitti ya da yarıda kalacak.
- Başka agent'tan devralınan işi doğrulamadan önce (önce testleri çalıştır, durumu gör).

## Adımlar

1. **Kontroller** (sırayla, çıktıyı oku):
   - `npm run check` → 0 hata.
   - `npm run build` → hata yok; bilinen tek uyarı PROJECT_STATE'te yazılı, yenisi varsa incele.
   - `npm run test:e2e` → hepsi geçmeli. Yeni davranış eklediysen ona test ekle (`tests/smoke.mjs`).
   - Arayüz değiştiyse `.playwright-mcp/smoke/` altındaki ekran görüntülerine bak (390 / 820 / 1440 px).
2. **Kendi farkını incele:** metin değişti mi (değişmemeli)? Çalışan bir özellik bozuldu mu (standart okuma sayfası,
   filtreler, form, dil değiştirici)? Gereksiz bağımlılık, gizli bilgi, kullanılmayan kod var mı?
3. **Regresyon:** dokunduğun bileşeni kullanan başka sayfalar (ör. `EbruCover` hem yazı sayfasında hem başka yerde).
4. **Durumu yaz** `docs/PROJECT_STATE.md`: Tamamlananlar (tarih + dosyalar), Testler, Bilinen hatalar.
   Biten ROADMAP maddesini sil.
5. **Devir kaydı** `docs/AI_HANDOFF.md`: en üste yeni kayıt (tarih, agent, ne yapıldı, değişen dosyalar,
   çalışan testler ve sonuçları, yarım kalan iş, **sıradaki tek somut görev** ve kabul ölçütü).
   Eski kayıtları kısalt; en fazla son 3 kayıt kalsın.
6. **Beceri değiştiyse** `npm run skills:sync` ve `npm run skills:check`.

## Yarıda kalırken

Çalışmayan kodu yarım bırakma: ya geri al ya da derlenen bir noktaya getir. Neyin denenip neyin kaldığını
devir kaydına yaz. "Çalışıyor" demek için test sonucu göster.

## Başarı ölçütleri

- Üç komut geçiyor ve sonuçları devir kaydında sayılarıyla yazılı.
- Sonraki agent geçmiş konuşmayı bilmeden devir kaydındaki görevi başlatabiliyor.
