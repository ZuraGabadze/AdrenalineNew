import React, { useMemo } from 'react';
import { SPRITES, resolveSpriteFromPathOrName } from '../config/sprites';

interface PixelSpriteProps {
  name: string;
  size?: number;
  fluid?: boolean;
  className?: string;
  alt?: string;
}

export const PixelSprite: React.FC<PixelSpriteProps> = ({
  name,
  size = 128,
  fluid = false,
  className = '',
  alt,
}) => {
  const spriteKey = resolveSpriteFromPathOrName(name);
  const sprite = SPRITES[spriteKey] || SPRITES.coal;

  const rects = useMemo(() => {
    const elements: Array<{ x: number; y: number; fill: string; key: string }> = [];
    sprite.rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch !== '.' && sprite.palette[ch]) {
          elements.push({
            x,
            y,
            fill: sprite.palette[ch],
            key: `${x}-${y}`,
          });
        }
      }
    });
    return elements;
  }, [sprite]);

  return (
    <svg
      width={fluid ? undefined : size}
      height={fluid ? undefined : size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      role="img"
      aria-label={alt || spriteKey}
      className={`select-none pointer-events-none ${className}`}
      style={
        fluid
          ? {
              imageRendering: 'pixelated',
              height: '100%',
              width: 'auto',
              aspectRatio: '1 / 1',
            }
          : {
              imageRendering: 'pixelated',
              width: size,
              height: size,
            }
      }
    >
      {rects.map((r) => (
        <rect key={r.key} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  );
};
