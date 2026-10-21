import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Check,
  Minus,
  ShoppingCart,
  Sparkles,
  Table,
  Info,
  Lock,
} from 'lucide-react';
import {
  getRanksByMode,
  getCumulativeRankData,
  RankMode,
  COMMAND_DESCRIPTIONS_KA,
  formatKitChipKa,
} from '../config/ranks';
import { SITE_CONFIG } from '../config/site';
import { RANK_SPRITE_MAP, GAMEMODE_SPRITE_MAP } from '../config/sprites';
import { useApp } from '../context/AppContext';
import { RankCard } from '../components/RankCard';
import { DroppedItem3D, GamemodeCardMedia } from '../components/DroppedItem3D';

export const StorePage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const { openBuyModal, triggerClickSound } = useApp();

  if (mode === 'oneblock') {
    const oneblockInfo = SITE_CONFIG.gameModes.find((gm) => gm.id === 'oneblock');
    return (
      <div className="max-w-5xl mx-auto px-4 py-14 space-y-8">
        {/* Header Banner Strip (uses SITE_CONFIG.gameModeImageRatio, rounded, orange glowing border) */}
        <div className="rounded-2xl overflow-hidden border border-[#FF7A00]/45 shadow-[0_0_28px_rgba(255,122,0,0.22)]">
          <GamemodeCardMedia
            pngSrc={oneblockInfo?.image || '/assets/gamemodes/oneblock.png'}
            spriteName="grass"
            alt="OneBlock"
            locked
            scaleOnHover={false}
            topRightRibbon={
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF7A00] text-black font-pixel text-xs font-bold shadow-[0_0_20px_rgba(255,122,0,0.65)]">
                <Lock className="w-3.5 h-3.5" />
                <span>SOON / მალე</span>
              </div>
            }
          />
        </div>

        <div className="rounded-3xl glass-panel p-10 border border-[#FF7A00]/30 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-[#FF7A00]" />
          </div>
          <span className="font-pixel text-xs text-[#FF7A00] uppercase">SOON • მალე</span>
          <h1 className="text-3xl font-black text-white mt-2">
            OneBlock მაღაზია მალე გაიხსნება
          </h1>
          <p className="text-sm text-[#9A9A9A] mt-3 max-w-lg mx-auto">
            ამჟამად ხელმისაწვდომია SMP და BoxPvp რეჟიმების რანკები. გადადი აქტიურ მაღაზიაში:
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/store/smp"
              onClick={triggerClickSound}
              className="pixel-corners-sm px-6 py-3 bg-[#FF7A00] text-black font-extrabold text-sm"
            >
              SMP მაღაზია
            </Link>
            <Link
              to="/store/boxpvp"
              onClick={triggerClickSound}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm hover:border-[#FF7A00]/40"
            >
              BoxPvp მაღაზია
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeMode: RankMode | null =
    mode === 'smp' || mode === 'boxpvp' ? mode : null;

  if (!activeMode) {
    return <Navigate to="/store/smp" replace />;
  }

  const ranks = getRanksByMode(activeMode);
  const currentGamemode = SITE_CONFIG.gameModes.find((gm) => gm.id === activeMode);
  const modeSprite = GAMEMODE_SPRITE_MAP[activeMode];

  // Collect all unique commands across the mode for the comparison matrix
  const allModeCommands = Array.from(
    new Set(ranks.flatMap((r) => r.ownCommands))
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner Strip (uses SITE_CONFIG.gameModeImageRatio, rounded, orange glowing border, no overlay text) */}
      <div className="rounded-2xl overflow-hidden border border-[#FF7A00]/45 shadow-[0_0_28px_rgba(255,122,0,0.22)]">
        <GamemodeCardMedia
          pngSrc={currentGamemode?.image || `/assets/gamemodes/${activeMode}.png`}
          spriteName={modeSprite}
          alt={currentGamemode?.title || activeMode}
          scaleOnHover={false}
        />
      </div>

      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF7A00] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.serverName} • ოფიციალური მაღაზია</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white extruded-title">
            {activeMode === 'smp' ? 'SMP რეჟიმის რანკები' : 'BoxPvp რეჟიმის რანკები'}
          </h1>
          <p className="text-sm sm:text-base text-[#9A9A9A] mt-2 max-w-2xl">
            ყველა რანკის მოქმედების ვადაა 4 კვირა (1 თვე). ყოველი მომდევნო რანკი სრულად მოიცავს ყველა ქვედა რანკის პრივილეგიებსა და კიტებს.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#111111] border border-[#FF7A00]/30 self-start">
          <Link
            to="/store/smp"
            onClick={triggerClickSound}
            className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
              activeMode === 'smp'
                ? 'bg-[#FF7A00] text-black shadow-[0_0_25px_rgba(255,122,0,0.45)]'
                : 'text-[#9A9A9A] hover:text-white'
            }`}
          >
            SMP რანკები
          </Link>
          <Link
            to="/store/boxpvp"
            onClick={triggerClickSound}
            className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
              activeMode === 'boxpvp'
                ? 'bg-[#FF7A00] text-black shadow-[0_0_25px_rgba(255,122,0,0.45)]'
                : 'text-[#9A9A9A] hover:text-white'
            }`}
          >
            BoxPvp რანკები
          </Link>
        </div>
      </div>

      {/* 5 Rank Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {ranks.map((rank) => (
          <RankCard key={rank.id} rank={rank} />
        ))}
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FF7A00]/12 via-[#141414] to-[#141414] border border-[#FF7A00]/30 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              როგორ მუშაობს რანკის შეძენა?
            </h3>
            <p className="text-xs sm:text-sm text-[#9A9A9A] mt-0.5">
              დააჭირე ღილაკს „ყიდვა“, შეიყვანე შენი Minecraft ნიკნეიმი, დააკოპირე მზა შეტყობინება და გახსენი თიქეთი ჩვენს Discord სერვერზე.
            </p>
          </div>
        </div>
      </div>

      {/* Full Comparison Matrix Table */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center">
            <Table className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              რანკების სრული შედარების ცხრილი
            </h2>
            <p className="text-xs sm:text-sm text-[#9A9A9A]">
              დეტალური შედარება ყველა ბრძანებისა და პრივილეგიის მიხედვით
            </p>
          </div>
        </div>

        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b border-white/10 bg-[#0A0A0A]">
                  <th className="py-5 px-5 text-xs font-extrabold uppercase tracking-wider text-[#9A9A9A] w-64">
                    პრივილეგია / ბრძანება
                  </th>
                  {ranks.map((rank) => {
                    const spriteName =
                      RANK_SPRITE_MAP[rank.mode]?.[rank.id] || rank.material;
                    return (
                      <th
                        key={rank.id}
                        className="py-5 px-4 text-center border-l border-white/5"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <DroppedItem3D
                            src={rank.iconPath}
                            spriteName={spriteName}
                            size={44}
                            alt={rank.name}
                            glowColor={rank.accentColor}
                          />
                          <span
                            className="font-pixel text-sm"
                            style={{ color: rank.accentColor }}
                          >
                            {rank.name}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {rank.price.toFixed(2)}
                            {SITE_CONFIG.currency}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {/* Duration Row */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-5 font-medium text-[#E0E0E0]">
                    მოქმედების ვადა
                  </td>
                  {ranks.map((r) => (
                    <td
                      key={r.id}
                      className="py-3.5 px-4 text-center border-l border-white/5 font-bold text-white text-xs sm:text-sm"
                    >
                      {r.durationKa}
                    </td>
                  ))}
                </tr>

                {/* Mode-specific stats */}
                {activeMode === 'smp' ? (
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-medium text-[#E0E0E0]">
                      სახლების რაოდენობა (Homes)
                    </td>
                    {ranks.map((r) => (
                      <td
                        key={r.id}
                        className="py-3.5 px-4 text-center border-l border-white/5 font-pixel text-[#FF7A00] text-sm"
                      >
                        {r.homes} სახლი
                      </td>
                    ))}
                  </tr>
                ) : (
                  <>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5 font-medium text-[#E0E0E0]">
                        Gear Key გასაღებები
                      </td>
                      {ranks.map((r) => (
                        <td
                          key={r.id}
                          className="py-3.5 px-4 text-center border-l border-white/5 font-pixel text-[#FF7A00] text-sm"
                        >
                          x{r.gearKeys}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5 font-medium text-[#E0E0E0]">
                        PlayerVaults (/pv)
                      </td>
                      {ranks.map((r) => (
                        <td
                          key={r.id}
                          className="py-3.5 px-4 text-center border-l border-white/5 font-pixel text-white text-xs sm:text-sm"
                        >
                          +{r.playerVaults} (/pv 1-{r.playerVaults})
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* Kits Row */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-5 font-medium text-[#E0E0E0]">
                    ხელმისაწვდომი კიტები
                  </td>
                  {ranks.map((r) => (
                    <td
                      key={r.id}
                      className="py-3.5 px-4 text-center border-l border-white/5 text-xs text-[#FFA640] font-semibold"
                    >
                      {r.kits.map((k) => formatKitChipKa(k)).join(', ')}
                    </td>
                  ))}
                </tr>

                {/* Cumulative Commands Rows */}
                {allModeCommands.map((cmd) => (
                  <tr key={cmd} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-5">
                      <div className="font-mono text-xs sm:text-sm font-bold text-[#FF7A00]">
                        {cmd}
                      </div>
                      <div className="text-[11px] text-[#9A9A9A]">
                        {COMMAND_DESCRIPTIONS_KA[cmd]}
                      </div>
                    </td>
                    {ranks.map((r) => {
                      const cum = getCumulativeRankData(activeMode, r.id);
                      const hasCmd = cum?.allCommands.includes(cmd) ?? false;
                      return (
                        <td
                          key={r.id}
                          className="py-3 px-4 text-center border-l border-white/5"
                        >
                          {hasCmd ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FF7A00]/20 text-[#FF7A00]">
                              <Check className="w-4 h-4" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 text-white/20">
                              <Minus className="w-4 h-4" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/10 bg-[#0A0A0A]/90">
                  <td className="py-4 px-5 text-xs font-bold text-[#9A9A9A]">
                    სწრაფი შეძენა:
                  </td>
                  {ranks.map((rank) => (
                    <td
                      key={rank.id}
                      className="py-4 px-3 text-center border-l border-white/5"
                    >
                      <button
                        type="button"
                        onClick={() => openBuyModal(rank)}
                        className="pixel-corners-sm w-full py-2 px-3 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-extrabold text-xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>ყიდვა</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
