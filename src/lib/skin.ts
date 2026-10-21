export type SkinMode = 'online-first' | 'file-first' | 'files-only';

const SESSION_CACHE_PREFIX = 'adrenalinee_skin_cache_v1:';

/**
 * Normalizes a skinFile string (e.g. "skins/chabskeyyy.png", "/assets/skins/chabskeyyy.png", or "chabskeyyy.png")
 * into a clean "/assets/skins/..." path.
 */
export function normalizeLocalSkinPath(skinFile: string): string {
  const trimmed = skinFile.trim().replace(/^\/+/, '');
  if (trimmed.startsWith('assets/skins/')) {
    return `/${trimmed}`;
  }
  if (trimmed.startsWith('skins/')) {
    return `/assets/${trimmed}`;
  }
  return `/assets/skins/${trimmed}`;
}

/**
 * Returns an ordered list of 64x64 skin texture URLs to try based on `mode`:
 * - online-first: mc-heads.net/skin/{name} -> minotar.net/skin/{name} -> assets/skins/{skinFile} -> assets/skins/default.png
 * - file-first:   assets/skins/{skinFile} -> mc-heads.net/skin/{name} -> minotar.net/skin/{name} -> assets/skins/default.png
 * - files-only:   assets/skins/{skinFile} -> assets/skins/default.png
 */
export function getSkinSources(
  minecraftName?: string,
  skinFile?: string,
  mode: SkinMode = 'online-first'
): string[] {
  const cleanName = (minecraftName || '').trim();
  const encodedName = encodeURIComponent(cleanName);

  const onlineUrls = cleanName
    ? [
        `https://mc-heads.net/skin/${encodedName}`,
        `https://minotar.net/skin/${encodedName}`,
      ]
    : [];

  const localFileUrls: string[] = [];
  if (skinFile && skinFile.trim().length > 0) {
    const normalized = normalizeLocalSkinPath(skinFile);
    localFileUrls.push(normalized);
  } else if (cleanName) {
    localFileUrls.push(`/assets/skins/${cleanName.toLowerCase()}.png`);
  }

  const defaultUrl = '/assets/skins/default.png';

  let ordered: string[];
  if (mode === 'file-first') {
    ordered = [...localFileUrls, ...onlineUrls, defaultUrl];
  } else if (mode === 'files-only') {
    ordered = [...localFileUrls, defaultUrl];
  } else {
    // 'online-first' (default)
    ordered = [...onlineUrls, ...localFileUrls, defaultUrl];
  }

  // Deduplicate while preserving exact order
  return Array.from(new Set(ordered));
}

export function getCachedSkinUrl(cacheKey: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem(`${SESSION_CACHE_PREFIX}${cacheKey}`);
    }
  } catch {
    // Ignore sessionStorage read errors
  }
  return null;
}

export function setCachedSkinUrl(cacheKey: string, url: string): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(`${SESSION_CACHE_PREFIX}${cacheKey}`, url);
    }
  } catch {
    // Ignore sessionStorage write errors
  }
}
