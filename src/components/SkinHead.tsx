import React, { useState, useEffect, useMemo } from 'react';
import { SITE_CONFIG } from '../config/site';
import {
  SkinMode,
  getSkinSources,
  getCachedSkinUrl,
  setCachedSkinUrl,
} from '../lib/skin';

export interface SkinHeadProps {
  minecraftName: string;
  skinFile?: string;
  mode?: SkinMode;
  size?: number;
  interactive?: boolean;
  className?: string;
}

interface FaceCoord {
  name: string;
  transform: (half: number) => string;
  base: [number, number];
  hat: [number, number];
  shade: string;
}

// Standard 64x64 Minecraft skin coordinates for head (8x8 each) and hat overlay (x+32)
const CUBE_FACES: FaceCoord[] = [
  {
    name: 'front',
    transform: (h) => `rotateY(0deg) translateZ(${h}px)`,
    base: [8, 8],
    hat: [40, 8],
    shade: 'brightness(1)',
  },
  {
    name: 'back',
    transform: (h) => `rotateY(180deg) translateZ(${h}px)`,
    base: [24, 8],
    hat: [56, 8],
    shade: 'brightness(0.75)',
  },
  {
    name: 'right',
    transform: (h) => `rotateY(-90deg) translateZ(${h}px)`,
    base: [0, 8],
    hat: [32, 8],
    shade: 'brightness(0.86)',
  },
  {
    name: 'left',
    transform: (h) => `rotateY(90deg) translateZ(${h}px)`,
    base: [16, 8],
    hat: [48, 8],
    shade: 'brightness(0.86)',
  },
  {
    name: 'top',
    transform: (h) => `rotateX(90deg) translateZ(${h}px)`,
    base: [8, 0],
    hat: [40, 0],
    shade: 'brightness(1.08)',
  },
  {
    name: 'bottom',
    transform: (h) => `rotateX(-90deg) translateZ(${h}px)`,
    base: [16, 0],
    hat: [48, 0],
    shade: 'brightness(0.65)',
  },
];

// Inline Steve-like 64x64 SVG data URI as an ultimate guaranteed fallback if even default.png is deleted
const INLINE_STEVE_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" shape-rendering="crispEdges">
      <rect x="8" y="0" width="8" height="8" fill="#3B2618"/>
      <rect x="16" y="0" width="8" height="8" fill="#A8724C"/>
      <rect x="0" y="8" width="8" height="8" fill="#D69C72"/>
      <rect x="8" y="8" width="8" height="8" fill="#D69C72"/>
      <rect x="16" y="8" width="8" height="8" fill="#D69C72"/>
      <rect x="24" y="8" width="8" height="8" fill="#3B2618"/>
      <rect x="8" y="8" width="8" height="2" fill="#3B2618"/>
      <rect x="0" y="8" width="8" height="3" fill="#3B2618"/>
      <rect x="16" y="8" width="8" height="3" fill="#3B2618"/>
      <rect x="9" y="12" width="1" height="1" fill="#FFFFFF"/>
      <rect x="10" y="12" width="1" height="1" fill="#FF7A00"/>
      <rect x="13" y="12" width="1" height="1" fill="#FF7A00"/>
      <rect x="14" y="12" width="1" height="1" fill="#FFFFFF"/>
      <rect x="11" y="14" width="2" height="1" fill="#A8724C"/>
    </svg>`
  );

/**
 * <SkinHead> component:
 * Walks the skin source list (`getSkinSources`) with an `Image` onload/onerror chain,
 * shows a themed skeleton while loading, caches the working URL per nickname in `sessionStorage` (try/catch),
 * and renders a 3D rotating head cube with CSS 3D from the 64x64 texture using background-image/background-position.
 */
export const SkinHead: React.FC<SkinHeadProps> = ({
  minecraftName,
  skinFile,
  mode = SITE_CONFIG.skinMode,
  size = 64,
  interactive = true,
  className = '',
}) => {
  const sources = useMemo(
    () => getSkinSources(minecraftName, skinFile, mode),
    [minecraftName, skinFile, mode]
  );

  const cacheKey = `${mode}:${(minecraftName || 'default').toLowerCase()}:${skinFile || ''}`;

  const [resolvedUrl, setResolvedUrl] = useState<string | null>(() =>
    getCachedSkinUrl(cacheKey)
  );
  const [isTallLegacy, setIsTallLegacy] = useState(false); // true if 64x32 legacy skin
  const [loading, setLoading] = useState<boolean>(() => !getCachedSkinUrl(cacheKey));

  useEffect(() => {
    let cancelled = false;
    const cached = getCachedSkinUrl(cacheKey);
    if (cached) {
      setResolvedUrl(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    setResolvedUrl(null);

    // Build full candidate chain including .svg local fallbacks before inline Steve URI
    const expandedCandidates: string[] = [];
    for (const src of sources) {
      expandedCandidates.push(src);
      if (src.startsWith('/assets/skins/') && src.endsWith('.png')) {
        expandedCandidates.push(src.replace(/\.png$/i, '.svg'));
      }
    }
    expandedCandidates.push(INLINE_STEVE_DATA_URI);

    let index = 0;

    const tryNext = () => {
      if (cancelled) return;
      if (index >= expandedCandidates.length) {
        setResolvedUrl(INLINE_STEVE_DATA_URI);
        setLoading(false);
        return;
      }

      const candidate = expandedCandidates[index++];
      const img = new Image();
      img.referrerPolicy = 'no-referrer';

      img.onload = () => {
        if (cancelled) return;
        if (img.naturalWidth > 0) {
          setIsTallLegacy(img.naturalWidth === 64 && img.naturalHeight === 32);
          setResolvedUrl(candidate);
          setCachedSkinUrl(cacheKey, candidate);
          setLoading(false);
        } else {
          tryNext();
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        tryNext();
      };

      img.src = candidate;
    };

    tryNext();

    return () => {
      cancelled = true;
    };
  }, [cacheKey, sources]);

  const half = size / 2;
  const hatSize = Math.round(size * 1.1);
  const hatHalf = hatSize / 2;
  const bgScaleW = size * 8; // 64px texture / 8px face = 8x scale
  const bgScaleH = isTallLegacy ? size * 4 : size * 8;
  const hatBgScaleW = hatSize * 8;
  const hatBgScaleH = isTallLegacy ? hatSize * 4 : hatSize * 8;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: `${size * 5}px`,
      }}
      role="img"
      aria-label={`${minecraftName} Minecraft 3D სკინის თავი`}
    >
      {loading || !resolvedUrl ? (
        <div
          aria-label="სკინი იტვირთება..."
          className="w-full h-full rounded-lg bg-[#141414] border border-[#FF7A00]/35 animate-pulse flex items-center justify-center"
        >
          <div className="w-1/2 h-1/2 rounded-sm bg-[#FF7A00]/20" />
        </div>
      ) : (
        <div
          className={`relative w-full h-full preserve-3d ${
            interactive
              ? 'animate-head-3d group-hover:scale-105 transition-transform duration-300'
              : ''
          }`}
          style={{
            transform: interactive ? undefined : 'rotateX(-14deg) rotateY(-25deg)',
          }}
        >
          {/* Inner 6 Head Faces */}
          {CUBE_FACES.map((face) => {
            const [bx, by] = face.base;
            const posX = -(bx / 8) * size;
            const posY = -(by / 8) * size;
            return (
              <div
                key={`base-${face.name}`}
                className="absolute inset-0 pixelated backface-hidden"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: face.transform(half),
                  backgroundImage: `url("${resolvedUrl}")`,
                  backgroundSize: `${bgScaleW}px ${bgScaleH}px`,
                  backgroundPosition: `${posX}px ${posY}px`,
                  backgroundRepeat: 'no-repeat',
                  filter: face.shade,
                }}
              />
            );
          })}

          {/* Outer 6 Hat Overlay Layer Faces (x + 32) */}
          {CUBE_FACES.map((face) => {
            const [hx, hy] = face.hat;
            const posX = -(hx / 8) * hatSize;
            const posY = -(hy / 8) * hatSize;
            const offset = (size - hatSize) / 2;
            return (
              <div
                key={`hat-${face.name}`}
                className="absolute pixelated pointer-events-none"
                style={{
                  width: `${hatSize}px`,
                  height: `${hatSize}px`,
                  left: `${offset}px`,
                  top: `${offset}px`,
                  transform: face.transform(hatHalf),
                  backgroundImage: `url("${resolvedUrl}")`,
                  backgroundSize: `${hatBgScaleW}px ${hatBgScaleH}px`,
                  backgroundPosition: `${posX}px ${posY}px`,
                  backgroundRepeat: 'no-repeat',
                  filter: face.shade,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
