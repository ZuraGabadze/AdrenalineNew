import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, Minus, ChevronDown, ShoppingCart, ArrowRight } from 'lucide-react';
import {
  RankMode,
  getRanksByMode,
  getCumulativeRankData,
  formatKitChipKa,
} from '../config/ranks';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { RankCard } from '../components/RankCard';
import { SmartImage } from '../components/SmartImage';

export const StorePage: React.FC = () => {
  const { mode } = useParams<{ mode?: string }>();
  const navigate = useNavigate();
  const { openBuyModal, triggerClickSound } = useApp();

  const activeMode: RankMode = mode?.toLowerCase() === 'boxpvp' ? 'boxpvp' : 'smp';
  const ranks = getRanksByMode(activeMode);

  // Mobile accordion open state for comparison
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(ranks[0]?.id ?? null);

  // Collect all unique commands in this mode for the comparison matrix
  const allModeCommands = Array.from(
    new Set(ranks.flatMap((r) => getCumulativeRankData(activeMode, r.id)?.allCommands ?? []))
  );

  const handleSwitchMode = (nextMode: RankMode) => {
    triggerClickSound();
    navigate(`/store/${nextMode}`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
      {/* Store Header & Mode Switcher Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#FF7A00]">
            {SITE_CONFIG.serverName} · ოფიციალური მაღაზია
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] extruded-title">
            {activeMode === 'smp' ? 'SMP რეჟიმის რანკები' : 'BoxPvp რეჟიმის რანკები'}
          </h1>
          <p className="text-sm text-[#9A9A9A] max-w-2xl">
            ყველა რანკის მოქმედების ვადაა 4 კვირა (1 თვე). ყოველი მომდევნო რანკი სრულად მოიცავს ყველა ქვედა რანკის პრივილეგიებსა და კიტებს.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div
          role="tablist"
          aria-label="გეიმ მოუდის არჩევა"
          className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-[#0D0D0D] border border-[#FF7A00]/35 self-start"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'smp'}
            onClick={() => handleSwitchMode('smp')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeMode === 'smp'
                ? 'bg-[#FF7A00] text-black shadow-[0_0_20px_rgba(255,122,0,0.45)]'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            SMP რანკები
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'boxpvp'}
            onClick={() => handleSwitchMode('boxpvp')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeMode === 'boxpvp'
                ? 'bg-[#FF7A00] text-black shadow-[0_0_20px_rgba(255,122,0,0.45)]'
                : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
            }`}
          >
            BoxPvp რანკები
          </button>
        </div>
      </div>

      {/* Rank Cards Grid (Horizontal snap carousel on mobile, grid on md+) */}
      <section aria-label="რანკების სია">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {ranks.map((rank) => (
            <div
              key={rank.id}
              className="min-w-[280px] sm:min-w-[305px] md:min-w-0 snap-center shrink-0"
            >
              <RankCard rank={rank} />
            </div>
          ))}
        </div>
      </section>

      {/* Rank Comparison Section: Table on Desktop (md+), Collapsible Accordions on Mobile (<md) */}
      <section aria-labelledby="comparison-heading" className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#FF7A00] mb-1">სრული მახასიათებლები</p>
          <h2 id="comparison-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
            რანკების შედარება ({activeMode === 'smp' ? 'SMP' : 'BoxPvp'})
          </h2>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block rounded-2xl voxel-panel overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#0A0A0C]">
                <th className="sticky left-0 z-20 bg-[#0A0A0C] p-4 text-xs font-bold text-[#9A9A9A] uppercase tracking-wider w-56 border-r border-white/10">
                  პრივილეგია / ბრძანება
                </th>
                {ranks.map((r) => (
                  <th key={r.id} className="p-4 text-center min-w-[140px]">
                    <div className="flex flex-col items-center gap-1.5">
                      <SmartImage
                        src={r.iconPath}
                        alt={r.name}
                        materialFallback={r.material}
                        pixelated
                        className="w-9 h-9 object-contain"
                      />
                      <span
                        className="font-pixel text-sm font-bold"
                        style={{ color: r.accentColor }}
                      >
                        {r.name}
                      </span>
                      <span className="text-xs font-bold text-[#F5F5F5] tabular-nums">
                        <span className="font-pixel">{r.price.toFixed(2)}</span>
                        <span className="font-georgian text-[#FF7A00]">{SITE_CONFIG.currency}</span>
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {/* Duration Row */}
              <tr>
                <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                  მოქმედების ვადა
                </td>
                {ranks.map((r) => (
                  <td key={r.id} className="p-3.5 text-center text-xs text-[#9A9A9A]">
                    {r.durationKa}
                  </td>
                ))}
              </tr>

              {/* Mode-Specific Numeric Rows */}
              {activeMode === 'smp' ? (
                <tr>
                  <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                    სახლების რაოდენობა (Homes)
                  </td>
                  {ranks.map((r) => (
                    <td
                      key={r.id}
                      className="p-3.5 text-center font-pixel text-sm font-bold text-[#FF7A00] tabular-nums"
                    >
                      {r.homes}
                    </td>
                  ))}
                </tr>
              ) : (
                <>
                  <tr>
                    <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                      Gear Key გასაღებები
                    </td>
                    {ranks.map((r) => (
                      <td
                        key={r.id}
                        className="p-3.5 text-center font-pixel text-sm font-bold text-[#FF7A00] tabular-nums"
                      >
                        x{r.gearKeys}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                      PlayerVaults (/pv)
                    </td>
                    {ranks.map((r) => (
                      <td
                        key={r.id}
                        className="p-3.5 text-center font-pixel text-sm font-bold text-[#F5F5F5] tabular-nums"
                      >
                        +{r.playerVaults} (/pv 1-{r.playerVaults})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                      Donator ზონაში წვდომა
                    </td>
                    {ranks.map((r) => (
                      <td key={r.id} className="p-3.5 text-center">
                        <Check className="w-4 h-4 text-[#FF7A00] mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                      სპეციალური Discord როლი
                    </td>
                    {ranks.map((r) => (
                      <td key={r.id} className="p-3.5 text-center">
                        {r.id === 'sponsor' ? (
                          <Check className="w-4 h-4 text-[#FF7A00] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-white/20 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Kits Row */}
              <tr>
                <td className="sticky left-0 z-10 bg-[#121212] p-3.5 font-semibold text-[#F5F5F5] border-r border-white/10">
                  ხელმისაწვდომი კიტები
                </td>
                {ranks.map((r) => (
                  <td key={r.id} className="p-3.5 text-center text-xs text-[#F5F5F5]/90">
                    {r.kits.map((k) => k.name).join(', ')}
                  </td>
                ))}
              </tr>

              {/* Cumulative Commands Rows */}
              {allModeCommands.map((cmd) => (
                <tr key={cmd}>
                  <td className="sticky left-0 z-10 bg-[#121212] p-3 font-mono text-xs text-[#FFA640] border-r border-white/10">
                    {cmd}
                  </td>
                  {ranks.map((r) => {
                    const cum = getCumulativeRankData(activeMode, r.id);
                    const hasCmd = cum?.allCommands.includes(cmd);
                    return (
                      <td key={r.id} className="p-3 text-center">
                        {hasCmd ? (
                          <Check
                            className="w-4 h-4 text-[#FF7A00] mx-auto"
                            aria-label={`${r.name} მოიცავს ${cmd}`}
                          />
                        ) : (
                          <Minus
                            className="w-4 h-4 text-white/20 mx-auto"
                            aria-label={`${r.name} არ მოიცავს ${cmd}`}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Action Row */}
              <tr className="bg-[#0A0A0C]">
                <td className="sticky left-0 z-10 bg-[#0A0A0C] p-4 font-bold text-xs text-[#9A9A9A] border-r border-white/10">
                  არჩევა
                </td>
                {ranks.map((r) => (
                  <td key={r.id} className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => openBuyModal(r)}
                      className="voxel-btn w-full py-2 px-3 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-xs inline-flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>ყიდვა</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Collapsible Rank Accordions (<md) */}
        <div className="md:hidden space-y-3">
          {ranks.map((r) => {
            const cum = getCumulativeRankData(activeMode, r.id);
            const isOpen = openAccordionId === r.id;
            return (
              <div key={r.id} className="rounded-xl voxel-panel overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    triggerClickSound();
                    setOpenAccordionId(isOpen ? null : r.id);
                  }}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left min-h-[56px]"
                >
                  <div className="flex items-center gap-3">
                    <SmartImage
                      src={r.iconPath}
                      alt={r.name}
                      materialFallback={r.material}
                      pixelated
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <span
                        className="font-pixel text-base font-bold block"
                        style={{ color: r.accentColor }}
                      >
                        {r.name}
                      </span>
                      <span className="text-xs text-[#9A9A9A]">
                        {r.price.toFixed(2)}
                        {SITE_CONFIG.currency} · {r.durationKa}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF7A00] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && cum && (
                  <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-3 text-xs">
                    <div className="space-y-1.5">
                      <p className="font-bold text-[#F5F5F5]">ძირითადი პრივილეგიები:</p>
                      <ul className="space-y-1 text-[#9A9A9A]">
                        {r.extraPerksKa.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-[#F5F5F5] mb-1">კიტები:</p>
                      <p className="text-[#FFA640]">
                        {r.kits.map((k) => formatKitChipKa(k)).join('  ·  ')}
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-[#F5F5F5] mb-1">
                        ყველა ბრძანება ({cum.allCommands.length}):
                      </p>
                      <p className="font-mono text-[#9A9A9A] leading-relaxed">
                        {cum.allCommands.join(', ')}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        to={`/store/${r.mode}/${r.id}`}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[#1A1A1A] border border-white/10 text-center font-semibold text-[#F5F5F5] inline-flex items-center justify-center gap-1 min-h-[44px]"
                      >
                        <span>სრულად</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF7A00]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openBuyModal(r)}
                        className="voxel-btn flex-1 py-2.5 px-3 bg-[#FF7A00] text-black font-bold inline-flex items-center justify-center gap-1.5 min-h-[44px]"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>ყიდვა</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
