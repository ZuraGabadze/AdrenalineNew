import React, { useState, useEffect } from 'react';
import { MaterialType } from '../config/ranks';

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  materialFallback?: MaterialType;
  pixelated?: boolean;
}

const MATERIAL_COLORS: Record<MaterialType, { primary: string; secondary: string; highlight: string }> = {
  coal: { primary: '#282A33', secondary: '#1B1C22', highlight: '#5A6075' },
  iron: { primary: '#A9B2C3', secondary: '#7E8694', highlight: '#FFFFFF' },
  gold: { primary: '#FFD03B', secondary: '#B86E00', highlight: '#FFF3A1' },
  diamond: { primary: '#2CC5DB', secondary: '#19899E', highlight: '#D8FFFF' },
  emerald: { primary: '#17C95B', secondary: '#0E8F3E', highlight: '#C9FFDA' },
  netherite: { primary: '#473B49', secondary: '#2D242E', highlight: '#FF7A00' },
};

/**
 * Reusable <SmartImage> component:
 * 1. Tries the `.png` path first.
 * 2. If `.png` fails, automatically tries the `.svg` placeholder with the same base name.
 * 3. If both fail, renders an in-code generated crisp pixel-art SVG placeholder.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  materialFallback = 'gold',
  pixelated = false,
  className = '',
  ...rest
}) => {
  const baseNoExt = src.replace(/\.(png|svg|jpg|jpeg|webp)$/i, '');
  const pngSrc = `${baseNoExt}.png`;
  const svgSrc = `${baseNoExt}.svg`;

  const [stage, setStage] = useState<'png' | 'svg' | 'inline'>('png');

  useEffect(() => {
    setStage('png');
  }, [src]);

  if (stage === 'inline') {
    const pal = MATERIAL_COLORS[materialFallback] || MATERIAL_COLORS.gold;
    return (
      <svg
        viewBox="0 0 16 16"
        role="img"
        aria-label={alt}
        className={`${pixelated ? 'pixelated' : ''} ${className}`}
        shapeRendering="crispEdges"
      >
        <rect x="3" y="3" width="10" height="10" fill={pal.secondary} />
        <rect x="4" y="4" width="8" height="8" fill={pal.primary} />
        <rect x="5" y="5" width="4" height="3" fill={pal.highlight} />
      </svg>
    );
  }

  const activeSrc = stage === 'png' ? pngSrc : svgSrc;

  return (
    <img
      src={activeSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (stage === 'png') {
          setStage('svg');
        } else {
          setStage('inline');
        }
      }}
      className={`${pixelated ? 'pixelated' : ''} ${className}`}
      {...rest}
    />
  );
};
