import React from 'react';
import { SkinHead } from './SkinHead';

interface MinecraftHead3DProps {
  skinPath?: string;
  name: string;
  minecraftName?: string;
  skinFile?: string;
  size?: number;
  interactive?: boolean;
  className?: string;
}

export const MinecraftHead3D: React.FC<MinecraftHead3DProps> = ({
  skinPath,
  name,
  minecraftName,
  skinFile,
  size = 64,
  interactive = true,
  className = '',
}) => {
  return (
    <SkinHead
      minecraftName={minecraftName || name}
      skinFile={skinFile || skinPath}
      size={size}
      interactive={interactive}
      className={className}
    />
  );
};
