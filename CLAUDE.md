@AGENTS.md

# Claude Code'a özel

- Ortak kurallar yukarıda içe aktarılan `AGENTS.md` dosyasında. Kural eklerken oraya ekle, buraya değil.
- Beceriler `.claude/skills/` altında; bunlar `.agents/skills/` kaynağının kopyasıdır.
  Düzenlemeyi `.agents/skills/` içinde yap, sonra `npm run skills:sync`.
- MCP: proje kapsamındaki sunucular `.mcp.json` içinde (Playwright). Ayrıntı: `docs/TOOLING.md`.
- Web araştırmasında Exa ve Firecrawl bağlıysa onları kullan (izinler `.claude/settings.json`).
- Kullanım limiti kısıtlı: alt agent'ları yalnızca gerçekten bağımsız ve büyük işler için kullan,
  kısa rapor yaz, işi yarıda bırakmak zorunda kalırsan önce `docs/AI_HANDOFF.md`'yi güncelle.
