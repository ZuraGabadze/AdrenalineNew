================================================================================
ADRENALINEE (adrenalinee.run) — ASSET & SKIN SYSTEM GUIDE
================================================================================

All visual assets on the ADRENALINEE website are managed via this folder
(`public/assets/`) and central config files (`src/config/`). There is NO admin
upload panel in the UI.

--------------------------------------------------------------------------------
1. BRANDING & LOGO (`public/assets/logo/`)
--------------------------------------------------------------------------------
- `public/assets/logo/logo.png`
  Recommended size: 512x512 px (transparent PNG, square or emblem icon)
  Used in: Navbar brand lockup, loading splash, footer, Buy Modal header.

- `public/assets/logo/favicon.png`
  Recommended size: 64x64 px or 128x128 px (transparent PNG)
  Used in: Browser tab icon.

--------------------------------------------------------------------------------
2. HOME THUMBNAIL BANNER (`public/assets/banner/`)
--------------------------------------------------------------------------------
- `public/assets/banner/thumbnail.png`
  Recommended size: 2400x600 px (4:1 ultra-wide aspect ratio, long & low)
  Used in: Directly under the navbar on the Home page (`clamp(170px, 20vw, 300px)`
  height, `object-fit: cover`), with the `adrenalinee.run` IP, Ping 60-90ms
  status, and Discord CTA overlaid.

--------------------------------------------------------------------------------
3. OPTIONAL BACKGROUNDS (`public/assets/backgrounds/`)
--------------------------------------------------------------------------------
- `public/assets/backgrounds/ender-pearl.png`
  backgrounds/ender-pearl.png = optional 16x16 (or 256x256) pearl image.
  Fallback chain: `.png` -> `<PixelSprite name="ender_pearl" />` (rendered at exact
  multiples of 16px: 48, 64, 80, 96, 128, 160 px with `image-rendering: pixelated`).

- `public/assets/backgrounds/hero-bg.png` (optional, 1920x1080 px)
  Optional subtle ambient texture behind sections.

--------------------------------------------------------------------------------
4. GAME MODES (`public/assets/gamemodes/`)
--------------------------------------------------------------------------------
gamemodes/*.png recommended 1983x793 (or any size, if the ratio in site.ts matches).
Configure the aspect ratio in `src/config/site.ts -> gameModeImageRatio: "1983 / 793"`,
and set local paths or full https URLs in `src/config/site.ts -> gameModes[].image`.

- `public/assets/gamemodes/smp.png`
  Recommended size: 1983x793 px (ratio `1983 / 793` from `site.ts -> gameModeImageRatio`).
  Rendered full-bleed (`width: 100%; height: 100%; object-fit: cover; display: block;
  image-rendering: auto`) alone in the top area of the card and header strips.
- `public/assets/gamemodes/boxpvp.png`
  Recommended size: 1983x793 px (ratio `1983 / 793` from `site.ts -> gameModeImageRatio`).
  Rendered full-bleed (`width: 100%; height: 100%; object-fit: cover; display: block;
  image-rendering: auto`) alone in the top area of the card and header strips.
- `public/assets/gamemodes/oneblock.png`
  Recommended size: 1983x793 px (ratio `1983 / 793` from `site.ts -> gameModeImageRatio`).
  Rendered with `filter: grayscale(1) brightness(.55)` and the "SOON / მალე"
  ribbon in the top-right corner while locked.

Fallback: only if the image fails to load (missing file or bad URL), the same
`gameModeImageRatio` area silently renders `<PixelSprite>` (grass / sword / grass)
centered. No `.svg` files are used for game-mode images.

--------------------------------------------------------------------------------
5. SMP RANKS (`public/assets/ranks/smp/`)
--------------------------------------------------------------------------------
Recommended size: 128x128 px or 256x256 px (crisp pixel art, transparent PNG;
rendered with `image-rendering: pixelated`)

- `public/assets/ranks/smp/vip.png`        (Material theme: Coal)
- `public/assets/ranks/smp/vip-plus.png`   (Material theme: Iron Ingot)
- `public/assets/ranks/smp/mvp.png`        (Material theme: Gold Ingot)
- `public/assets/ranks/smp/mvp-plus.png`   (Material theme: Diamond)
- `public/assets/ranks/smp/sponsor.png`    (Material theme: Netherite Ingot)

--------------------------------------------------------------------------------
6. BOXPVP RANKS (`public/assets/ranks/boxpvp/`)
--------------------------------------------------------------------------------
Recommended size: 128x128 px or 256x256 px (crisp pixel art, transparent PNG;
rendered with `image-rendering: pixelated`)

- `public/assets/ranks/boxpvp/nile.png`     (Material theme: Coal)
- `public/assets/ranks/boxpvp/obelisk.png`  (Material theme: Iron Ingot)
- `public/assets/ranks/boxpvp/osiris.png`   (Material theme: Gold Ingot)
- `public/assets/ranks/boxpvp/anubis.png`   (Material theme: Diamond)
- `public/assets/ranks/boxpvp/sponsor.png`  (Material theme: Emerald)

--------------------------------------------------------------------------------
7. STAFF & PLAYER SKINS (`public/assets/skins/` & `src/lib/skin.ts`)
--------------------------------------------------------------------------------
Skins load automatically by Minecraft nickname (`minecraftName` in `src/config/staff.ts`)
from online skin services (`mc-heads.net/skin/{name}` -> `minotar.net/skin/{name}`),
with local files in `public/assets/skins/` as override and fallback!

How `skinMode` in `src/config/site.ts` works:
- `'online-first'` (default):
  `mc-heads.net/skin/{name}` -> `minotar.net/skin/{name}` -> `assets/skins/{skinFile}` -> `assets/skins/default.png`
- `'file-first'`:
  `assets/skins/{skinFile}` -> `mc-heads.net/skin/{name}` -> `minotar.net/skin/{name}` -> `assets/skins/default.png`
- `'files-only'`:
  `assets/skins/{skinFile}` -> `assets/skins/default.png`

How to override any skin with a local file:
1. Drop a 64x64 PNG skin texture into `public/assets/skins/` (e.g. `public/assets/skins/chabskeyyy.png`).
2. Set `skinFile: 'skins/chabskeyyy.png'` on that member in `src/config/staff.ts`.
3. Set `skinMode: 'file-first'` (or `'files-only'`) in `src/config/site.ts` to prefer local files over online lookup.

The `<SkinHead>` component slices the 6 cube faces directly from standard 64x64
Minecraft skin coordinates via CSS `background-position`:
  - Front:  (8, 8)   size 8x8  | Hat layer: (40, 8)
  - Right:  (0, 8)   size 8x8  | Hat layer: (32, 8)
  - Left:   (16, 8)  size 8x8  | Hat layer: (48, 8)
  - Back:   (24, 8)  size 8x8  | Hat layer: (56, 8)
  - Top:    (8, 0)   size 8x8  | Hat layer: (40, 0)
  - Bottom: (16, 0)  size 8x8  | Hat layer: (48, 0)

Local fallback files:
- `public/assets/skins/chabskeyyy.png`     (Owner: CHABSKEYYY)
- `public/assets/skins/saito.png`          (Owner: SAITO)
- `public/assets/skins/jajo_1121.png`      (Developer: Jajo_1121)
- `public/assets/skins/mchedlishvili.png`  (Developer: Mchedlishvili)
- `public/assets/skins/kaulmc.png`         (Developer: KaulMc)
- `public/assets/skins/default.png`        (Generated Steve-like placeholder skin)

--------------------------------------------------------------------------------
8. OPTIONAL UI SOUNDS (`public/assets/sounds/`)
--------------------------------------------------------------------------------
- `public/assets/sounds/click.ogg`
  Optional short UI click sound (muted by default; toggled via navbar button).
