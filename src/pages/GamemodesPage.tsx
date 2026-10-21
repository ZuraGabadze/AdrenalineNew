import React from 'react';
import { Sparkles, Copy } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { GAMEMODE_SPRITE_MAP } from '../config/sprites';
import { useApp } from '../context/AppContext';
import { GameModeCard, GamemodeCardMedia } from '../components/DroppedItem3D';

export const GamemodesPage: React.FC = () => {
  const { copyToClipboard, triggerClickSound } = useApp();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner Strip at top of /gamemodes (uses SITE_CONFIG.gameModeImageRatio, no overlay text) */}
      <div className="rounded-2xl overflow-hidden border border-[#FF7A00]/45 shadow-[0_0_28px_rgba(255,122,0,0.22)]">
        <GamemodeCardMedia
          pngSrc={SITE_CONFIG.gameModes[0].image}
          spriteName={GAMEMODE_SPRITE_MAP[SITE_CONFIG.gameModes[0].id]}
          alt={SITE_CONFIG.gameModes[0].title}
          scaleOnHover={false}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF7A00] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.serverName} · {SITE_CONFIG.ip}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white extruded-title">
            სერვერის გეიმ მოუდები
          </h1>
          <p className="text-sm sm:text-base text-[#9A9A9A] mt-2 max-w-2xl">
            აირჩიე შენთვის სასურველი სათამაშო რეჟიმი. SMP და BoxPvp სრულად აქტიურია, ხოლო OneBlock მალე დაემატება.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            copyToClipboard(SITE_CONFIG.ip, `სერვერის IP დაკოპირდა: ${SITE_CONFIG.ip}`)
          }
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#191919] border border-[#FF7A00]/40 hover:border-[#FF7A00] text-xs sm:text-sm font-bold text-[#F5F5F5] inline-flex items-center gap-2.5 transition-colors cursor-pointer"
        >
          <span>სერვერის IP:</span>
          <span className="font-pixel text-[#FF7A00]">{SITE_CONFIG.ip}</span>
          <Copy className="w-4 h-4 text-[#FFA640]" />
        </button>
      </div>

      {/* Gamemodes Cards Grid (Photo-Only GameModeCards, even layout) */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch"
        style={{ alignItems: 'stretch' }}
      >
        {SITE_CONFIG.gameModes.map((gm) => (
          <GameModeCard key={gm.id} mode={gm} onNavigate={triggerClickSound} />
        ))}
      </div>
    </div>
  );
};
