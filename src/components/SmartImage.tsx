import React, { useState, useEffect } from 'react';
import { PixelSprite } from './PixelSprite';
import { resolveSpriteFromPathOrName } from '../config/sprites';

export type FallbackType =
  | 'coal'
  | 'iron'
  | 'gold'
  | 'diamond'
  | 'emerald'
  | 'netherite'
  | 'grass'
  | 'sword'
  | 'logo'
  | 'banner'
  | 'gamemode'
  | 'skin';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackType?: FallbackType;
  materialFallback?: string;
  spriteFallback?: string;
  spriteName?: string;
  pixelated?: boolean;
  size?: number;
  className?: string;
  imgClassName?: string;
}

const imageCheckCache = new Map<string, boolean>();

export function resolveImageSource(rawSrc?: string): string {
  if (!rawSrc) return '';
  const trimmed = rawSrc.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  if (/\.svg$/i.test(trimmed)) {
    return trimmed.replace(/\.svg$/i, '.png');
  }
  return trimmed;
}

export function useRealPngExists(rawSrc?: string): boolean {
  const normalized = resolveImageSource(rawSrc);
  const [exists, setExists] = useState<boolean>(() => {
    if (!normalized) return false;
    return imageCheckCache.get(normalized) ?? false;
  });

  useEffect(() => {
    if (!normalized) {
      setExists(false);
      return;
    }
    if (imageCheckCache.has(normalized)) {
      setExists(imageCheckCache.get(normalized)!);
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (!cancelled) {
        const valid = img.naturalWidth > 0;
        imageCheckCache.set(normalized, valid);
        setExists(valid);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        imageCheckCache.set(normalized, false);
        setExists(false);
      }
    };
    img.src = normalized;

    return () => {
      cancelled = true;
    };
  }, [normalized]);

  return exists;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackType,
  materialFallback,
  spriteFallback,
  spriteName,
  pixelated = false,
  size = 128,
  className = '',
  imgClassName = '',
}) => {
  const isBannerOrLogo =
    fallbackType === 'banner' ||
    fallbackType === 'logo' ||
    src.includes('/logo/') ||
    src.includes('/banner/');

  const resolvedSrc = resolveImageSource(src);
  const hasRealImage = useRealPngExists(resolvedSrc);

  // Banner & logo support standard image loading with inline branded fallback
  const [bannerStage, setBannerStage] = useState<'png' | 'svg' | 'inline'>('png');

  useEffect(() => {
    setBannerStage('png');
  }, [src]);

  if (isBannerOrLogo) {
    const baseSrc = src.replace(/\.(png|svg|jpg|webp)$/i, '');
    if (bannerStage === 'inline') {
      if (fallbackType === 'logo' || src.includes('/logo/')) {
        return (
          <div className={`inline-flex items-center justify-center ${className}`} role="img" aria-label={alt}>
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <rect x="6" y="6" width="52" height="52" rx="10" fill="#0D0D0D" stroke="#FF7A00" strokeWidth="4" />
              <path d="M20 46L32 16L44 46H36.5L34 39H30L27.5 46H20ZM30.8 32H33.2L32 27.5L30.8 32Z" fill="#FF7A00" />
            </svg>
          </div>
        );
      }
      return (
        <div
          className={`relative overflow-hidden bg-[#080808] flex items-center justify-center ${className}`}
          role="img"
          aria-label={alt}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,122,0,0.28),transparent_70%)]" />
        </div>
      );
    }

    const currentBannerSrc = bannerStage === 'png' ? `${baseSrc}.png` : `${baseSrc}.svg`;
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={currentBannerSrc}
          alt={alt}
          onError={() => {
            if (bannerStage === 'png') setBannerStage('svg');
            else setBannerStage('inline');
          }}
          className={`w-full h-full object-contain transition-opacity duration-300 opacity-100 ${
            pixelated ? 'pixelated' : ''
          } ${imgClassName}`}
        />
      </div>
    );
  }

  // Rank icons strictly follow: real .png -> <PixelSprite> (No .svg step)
  if (hasRealImage) {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ width: size, height: size, imageRendering: 'pixelated' }}
          className={`object-contain pixelated ${imgClassName}`}
        />
      </div>
    );
  }

  const resolvedSprite = resolveSpriteFromPathOrName(
    spriteName || spriteFallback || materialFallback || src || fallbackType
  );

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <PixelSprite name={resolvedSprite} size={size} alt={alt} />
    </div>
  );
};
