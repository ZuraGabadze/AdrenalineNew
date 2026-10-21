import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { PixelSprite } from './PixelSprite';
import { useRealPngExists, resolveImageSource } from './SmartImage';
import { resolveSpriteFromPathOrName, GAMEMODE_SPRITE_MAP } from '../config/sprites';
import { SITE_CONFIG, GameModeConfig } from '../config/site';
import { TiltCard } from './TiltCard';

interface DroppedItem3DProps {
  src?: string;
  pngSrc?: string;
  spriteName: string;
  size?: number;
  alt: string;
  glowColor?: string;
  grayscale?: boolean;
  className?: string;
}

const EXTRUSION_LAYERS = [0, 1, 2, 3, 4, 5, 6, 7];

export const DroppedItem3D: React.FC<DroppedItem3DProps> = ({
  src,
  pngSrc,
  spriteName,
  size = 128,
  alt,
  glowColor = 'rgba(255, 122, 0, 0.45)',
  grayscale = false,
  className = '',
}) => {
  const effectivePngSrc = resolveImageSource(pngSrc || src);
  const hasRealPng = useRealPngExists(effectivePngSrc);
  const resolvedSprite = resolveSpriteFromPathOrName(spriteName || effectivePngSrc);

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        grayscale ? 'grayscale opacity-75' : ''
      } ${className}`}
      style={{
        width: size,
        height: size + 24,
        perspective: '700px',
      }}
    >
      {/* Soft ambient orange/material glow behind item */}
      <div
        className="pointer-events-none absolute rounded-full blur-2xl transition-opacity duration-500"
        style={{
          width: size * 0.85,
          height: size * 0.85,
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,122,0,0.12) 55%, transparent 75%)`,
        }}
      />

      {/* 3D Extruded 8-layer floating & rotating stack */}
      <div
        className="dropped-item-rotator relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
        }}
      >
        {EXTRUSION_LAYERS.map((layerIndex) => {
          const isFront = layerIndex === EXTRUSION_LAYERS.length - 1;
          const brightness = isFront ? 1 : +(0.52 + (layerIndex / 7) * 0.42).toFixed(2);
          const zOffset = layerIndex - 3.5;

          return (
            <div
              key={layerIndex}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `translateZ(${zOffset}px)`,
                filter: isFront ? 'none' : `brightness(${brightness})`,
                backfaceVisibility: 'visible',
              }}
            >
              {hasRealPng && effectivePngSrc ? (
                <img
                  src={effectivePngSrc}
                  alt={isFront ? alt : ''}
                  aria-hidden={!isFront}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <PixelSprite
                  name={resolvedSprite}
                  size={size}
                  alt={isFront ? alt : ''}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Pixel shadow on the floor */}
      <div
        className="dropped-item-shadow pointer-events-none mt-2"
        style={{
          width: Math.round(size * 0.48),
          height: Math.max(8, Math.round(size * 0.08)),
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          boxShadow: `0 0 12px ${glowColor}`,
          clipPath:
            'polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)',
        }}
      />
    </div>
  );
};

interface GamemodeCardMediaProps {
  pngSrc: string;
  spriteName: 'grass' | 'sword';
  alt: string;
  locked?: boolean;
  scaleOnHover?: boolean;
  topRightRibbon?: React.ReactNode;
  className?: string;
}

export const GamemodeCardMedia: React.FC<GamemodeCardMediaProps> = ({
  pngSrc,
  spriteName,
  alt,
  locked = false,
  scaleOnHover = true,
  topRightRibbon,
  className = '',
}) => {
  // Supports both local paths (/assets/gamemodes/*.png) and full https:// URLs; ignores .svg
  const resolvedImageSrc = resolveImageSource(pngSrc);
  const hasRealImage = useRealPngExists(resolvedImageSrc);
  const aspectRatio = SITE_CONFIG.gameModeImageRatio;

  const hoverScaleClass =
    scaleOnHover && !locked
      ? 'transition-transform duration-500 ease-out md:group-hover:scale-[1.03]'
      : 'transition-transform duration-500 ease-out';

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#090909] select-none ${className}`}
      style={{ width: '100%', aspectRatio }}
    >
      {hasRealImage ? (
        <img
          src={resolvedImageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover block ${hoverScaleClass}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            imageRendering: 'auto',
            filter: locked ? 'grayscale(1) brightness(0.55)' : undefined,
          }}
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center bg-[#090909] relative ${hoverScaleClass}`}
          style={{
            width: '100%',
            height: '100%',
            filter: locked ? 'grayscale(1) brightness(0.55)' : undefined,
          }}
        >
          {/* Soft orange glow behind centered sprite */}
          <div
            className="pointer-events-none absolute rounded-full blur-xl"
            style={{
              height: '65%',
              aspectRatio: '1 / 1',
              background:
                'radial-gradient(circle, rgba(255, 122, 0, 0.42) 0%, rgba(255, 122, 0, 0.12) 55%, transparent 75%)',
            }}
          />

          {/* Centered flat PixelSprite (no rotation or extrusion) */}
          <div
            className="relative z-10 flex items-center justify-center"
            style={{ height: '56%', aspectRatio: '1 / 1' }}
          >
            <PixelSprite name={spriteName} fluid alt={alt} />
          </div>

          {/* Pixel floor shadow under the sprite */}
          <div
            className="pointer-events-none relative z-10 mt-1.5"
            style={{
              height: '5%',
              minHeight: '4px',
              width: '14%',
              minWidth: '32px',
              maxWidth: '64px',
              backgroundColor: 'rgba(0, 0, 0, 0.78)',
              boxShadow: '0 0 10px rgba(255, 122, 0, 0.4)',
              clipPath:
                'polygon(6px 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0 50%)',
            }}
          />
        </div>
      )}

      {locked && topRightRibbon && (
        <div className="absolute top-2.5 right-2.5 z-20">{topRightRibbon}</div>
      )}
    </div>
  );
};

interface GameModeCardProps {
  mode: GameModeConfig;
  onNavigate?: () => void;
}

export const GameModeCard: React.FC<GameModeCardProps> = ({ mode, onNavigate }) => {
  const isLocked = mode.locked;
  const spriteName = GAMEMODE_SPRITE_MAP[mode.id];
  const showDetails = SITE_CONFIG.showCardDetails;

  return (
    <TiltCard disabled={isLocked} className="h-full flex flex-col">
      <div
        className={`group rounded-2xl glass-panel overflow-hidden border transition-all ${
          isLocked
            ? 'border-white/10 opacity-85'
            : 'border-white/10 hover:border-[#FF7A00]/50 active:scale-[0.99] md:active:scale-100'
        }`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Top Image Area flush with card edges, clipped by card's top rounded corners */}
        <GamemodeCardMedia
          pngSrc={mode.image}
          spriteName={spriteName}
          alt={mode.title}
          locked={isLocked}
          scaleOnHover={!isLocked}
          className="rounded-t-2xl shrink-0"
          topRightRibbon={
            isLocked ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF7A00] text-black font-pixel text-[11px] font-bold shadow-[0_0_15px_rgba(255,122,0,0.5)]">
                <Lock className="w-3 h-3" />
                <span>{mode.badgeKa}</span>
              </span>
            ) : undefined
          }
        />

        {/* Card Body: flex: 1; display: flex; flex-direction: column; gap: 16px; padding: 20px 22px 22px */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '20px 22px 22px',
          }}
        >
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide m-0">
            {mode.title}
          </h3>

          {showDetails && (
            <div className="space-y-3">
              <p className="text-sm text-[#9A9A9A] leading-relaxed m-0">
                {mode.shortDescKa}
              </p>
              <ul className="space-y-2 m-0 p-0 list-none">
                {mode.highlightsKa.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#D8D8D8]">
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-[#9A9A9A] shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A00] shrink-0 mt-0.5" />
                    )}
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isLocked ? (
            <button
              type="button"
              disabled
              className="w-full py-3.5 px-5 rounded-xl bg-white/[0.04] border border-white/10 text-center text-sm font-bold text-[#9A9A9A] flex items-center justify-center gap-2 cursor-not-allowed"
              style={{ marginTop: 'auto' }}
            >
              <Lock className="w-4 h-4 text-[#FF7A00]" />
              <span>მალე დაემატება (SOON)</span>
            </button>
          ) : (
            <Link
              to={mode.storePath || `/store/${mode.id}`}
              onClick={onNavigate}
              className="w-full pixel-corners-sm py-3.5 px-5 border border-transparent bg-[#FF7A00] hover:bg-[#FFA640] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,122,0,0.35)]"
              style={{ marginTop: 'auto' }}
            >
              <span>რანკების არჩევა</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </TiltCard>
  );
};
