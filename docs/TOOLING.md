# Araçlar ve MCP

Durum: 2026-10-27 denetimi. Kurulmamış hiçbir şeyi kurulmuş gibi yazma; değişince güncelle.

## Proje içinde olanlar

| Araç | Durum | Not |
|---|---|---|
| Node | Geliştirici makinesinde 24.x | Astro 7, Node 22.23.4+ istiyor. 22.22 ile build açılmıyor. |
| Astro 7.4, @astrojs/check, TypeScript | kurulu | `npm run build`, `npm run check` |
| Playwright (`playwright` 1.63, devDependency) | eklendi | `npm run test:e2e`. Tarayıcı yoksa önce makinedeki Chrome/Edge denenir; olmazsa `npx playwright install chromium`. |
| git | **yok** | Klasör git deposu değil. Bkz. ROADMAP P0. |

## MCP sunucuları

| Sunucu | Claude Code | Codex | Test |
|---|---|---|---|
| Playwright MCP (`@playwright/mcp`, Microsoft, resmî) | `.mcp.json` (proje kapsamı) | aşağıdaki parça, `~/.codex/config.toml` | 2026-10-27: 0.0.83 sürümü stdio üzerinden başladı, 25 araç listeledi (bulut ortamında). Windows'ta henüz denenmedi. |
| Exa, Firecrawl, Context7 | `.claude/settings.json` izin veriyor | yok | Yapılandırmaları kullanıcı düzeyinde olabilir; bu oturumdan görülemedi, doğrulanmadı. |

Eklenmeyenler ve nedenleri:
- **GitHub MCP:** depo yok. Depo açılınca `gh` CLI yeterli; gerekirse resmî `github/github-mcp-server`.
- **Erişilebilirlik MCP'si:** gerek yok. axe-core ile tek seferlik tarama yapıldı (sonuç PROJECT_STATE'te);
  sürekli kullanılacaksa `tests/` içine `axe-core` devDependency olarak eklenebilir.
- **Tasarım/Figma MCP'leri:** projede Figma dosyası yok.

### Claude Code

Proje kökünde `.mcp.json` olmalı; içeriği `docs/mcp.json.example` (uzaktan araçlar `.mcp.json` yazamadığı için örnek olarak bırakıldı, kopyalayıp adını değiştir). İlk açılışta Claude Code onay ister. Windows'ta `npx` doğrudan çağrılamadığı için
`cmd /c` kullanılıyor. macOS/Linux'ta `command: "npx"`, `args: ["-y", "@playwright/mcp@0.0.83"]` yap.
Kontrol: `claude mcp list` → `playwright: ... ✓ Connected`.

### Codex

Codex MCP sunucularını `~/.codex/config.toml` içinde tutar (kullanıcı düzeyi). Şunu ekle:

```toml
[mcp_servers.playwright]
command = "cmd"
args = ["/c", "npx", "-y", "@playwright/mcp@0.0.83"]
```

Kontrol: Codex içinde `/mcp` komutu sunucuyu ve araçlarını listelemeli. İki istemcinin bağlantıları ayrıdır;
birinde çalışması öbüründe çalıştığı anlamına gelmez.

### Kimlik bilgileri

Hiçbir anahtar depoya yazılmaz. Playwright MCP anahtar istemez. Exa / Firecrawl anahtarları kullanıcının
kendi istemci ayarlarında kalır.

## Beceriler (skills)

Kaynak: `.agents/skills/<ad>/SKILL.md` (Codex buradan okur). Claude Code kopyası: `.claude/skills/`.
Düzenle → `npm run skills:sync`. Tutarlılık: `npm run skills:check` (fark varsa hata verir).
Sembolik bağ yerine kopya kullanılıyor çünkü Windows'ta sembolik bağ geliştirici modu ister ve git'te bozulabilir.
