import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShoppingCart } from 'lucide-react';
import { RankConfig } from '../config/ranks';
import { SITE_CONFIG } from '../config/site';
import { RANK_SPRITE_MAP } from '../config/sprites';
import { useApp } from '../context/AppContext';
import { DroppedItem3D } from './DroppedItem3D';
import { TiltCard } from './TiltCard';

interface RankCardProps {
  rank: RankConfig;
}

export const RankCard: React.FC<RankCardProps> = ({ rank }) => {
  const { openBuyModal, triggerClickSound } = useApp();
  const spriteName = RANK_SPRITE_MAP[rank.mode]?.[rank.id] || rank.material;

  return (
    <TiltCard className="h-full rounded-2xl voxel-panel p-6 flex flex-col justify-between group hover:border-[#FF7A00]/55 transition-colors">
      <div>
        {/* Top Metadata Line (unboxed clean single-line text with · separator) */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#9A9A9A] mb-4 whitespace-nowrap">
          <span className="truncate">{rank.materialLabelKa.split(' ')[0]}</span>
          <span className="text-[#F5F5F5]/75 shrink-0">{rank.durationKa}</span>
        </div>

        {/* 3D Dropped Item Stage (size 128px within 120-140px spec) */}
        <div className="relative h-44 rounded-xl bg-[#09090B] border border-white/5 flex items-center justify-center mb-5 overflow-hidden">
          <DroppedItem3D
            src={rank.iconPath}
            spriteName={spriteName}
            alt={`${rank.name} რანკის 3D ხატულა`}
            size={128}
            glowColor={rank.accentColor}
          />
        </div>

        {/* Rank Title & Price */}
        <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-white/10">
          <h3
            className="font-pixel text-xl font-bold tracking-wide"
            style={{ color: rank.accentColor }}
          >
            {rank.name}
          </h3>
          <div className="text-right tabular-nums">
            <span className="font-pixel text-xl font-bold text-[#F5F5F5]">
              {rank.price.toFixed(2)}
            </span>
            <span className="font-georgian text-lg font-bold text-[#FF7A00] ml-0.5">
              {SITE_CONFIG.currency}
            </span>
          </div>
        </div>

        {/* Top 3 Perks */}
        <ul className="mt-4 space-y-2.5 text-sm text-[#F5F5F5]/90">
          {rank.topPerksKa.map((perk, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
              <span className="leading-snug">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-2.5">
        <Link
          to={`/store/${rank.mode}/${rank.id}`}
          onClick={triggerClickSound}
          className="px-3.5 py-2.5 rounded-lg bg-[#1A1A1A] hover:bg-[#242424] border border-white/10 hover:border-[#FF7A00]/45 text-xs sm:text-sm font-semibold text-[#F5F5F5] inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
        >
          <span>დეტალები</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF7A00]" />
        </Link>

        <button
          type="button"
          onClick={() => openBuyModal(rank)}
          aria-label={`ყიდვა ${rank.name} (${rank.price.toFixed(2)}₾)`}
          className="voxel-btn px-3.5 py-2.5 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,122,0,0.3)] whitespace-nowrap shrink-0 min-h-[44px]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>ყიდვა</span>
        </button>
      </div>
    </TiltCard>
  );
};
