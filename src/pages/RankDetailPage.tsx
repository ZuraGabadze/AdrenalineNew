import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Check,
  Copy,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Terminal,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import {
  RankMode,
  getCumulativeRankData,
  COMMAND_DESCRIPTIONS_KA,
  formatKitChipKa,
} from '../config/ranks';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { SmartImage } from '../components/SmartImage';
import { TiltCard } from '../components/TiltCard';

export const RankDetailPage: React.FC = () => {
  const { mode, rankId } = useParams<{ mode: string; rankId: string }>();
  const { openBuyModal, copyToClipboard, nickname, triggerClickSound } = useApp();
  const [inheritsExpanded, setInheritsExpanded] = useState(true);

  const normalizedMode: RankMode | null =
    mode?.toLowerCase() === 'smp'
      ? 'smp'
      : mode?.toLowerCase() === 'boxpvp'
      ? 'boxpvp'
      : null;

  if (!normalizedMode || !rankId) {
    return <Navigate to="/store/smp" replace />;
  }

  const data = getCumulativeRankData(normalizedMode, rankId);
  if (!data) {
    return <Navigate to={`/store/${normalizedMode}`} replace />;
  }

  const { rank, allCommands, inheritedRanks, previousRank, nextRank, upgradeDiffPrice } = data;
  const modeLabel = rank.mode === 'smp' ? 'SMP' : 'BoxPvp';
  const previewPlayerName = nickname && nickname.trim().length > 0 ? nickname.trim() : 'Steve';

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32 md:pb-16 space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to={`/store/${rank.mode}`}
          onClick={triggerClickSound}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A9A9A] hover:text-[#FF7A00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>უკან {modeLabel} მაღაზიაში</span>
        </Link>
        <div className="text-xs text-[#9A9A9A]">
          {SITE_CONFIG.serverName} · {modeLabel} · {rank.name}
        </div>
      </div>

      {/* Contiguous Hero / Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Large 3D Rotating Rank Icon Showcase */}
        <TiltCard className="lg:col-span-5 rounded-2xl voxel-panel p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
          <div
            className="w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none absolute"
            style={{ backgroundColor: rank.accentColor }}
          />
          <SmartImage
            src={rank.iconPath}
            alt={`${rank.name} 3D ხატულა`}
            materialFallback={rank.material}
            pixelated
            className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 object-contain animate-float-3d drop-shadow-[0_18px_28px_rgba(0,0,0,0.9)]"
          />
          <div className="relative z-10 mt-6 text-center">
            <p className="text-xs text-[#9A9A9A]">
              მასალა: {rank.materialLabelKa} · რეჟიმი: {modeLabel}
            </p>
          </div>
        </TiltCard>

        {/* Right: Contiguous Purchase Details */}
        <div className="lg:col-span-7 rounded-2xl voxel-panel p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs text-[#9A9A9A]">
              {modeLabel} რანკი · მოქმედების ვადა: <strong className="text-[#F5F5F5]">{rank.durationKa}</strong>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-white/10">
              <h1
                className="font-pixel text-3xl sm:text-5xl font-bold tracking-wide bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, #FFFFFF 0%, ${rank.accentColor} 65%, #FF7A00 100%)`,
                }}
              >
                {rank.name}
              </h1>

              <div className="tabular-nums">
                <span className="font-pixel text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
                  {rank.price.toFixed(2)}
                </span>
                <span className="font-georgian text-2xl sm:text-3xl font-bold text-[#FF7A00] ml-1">
                  {SITE_CONFIG.currency}
                </span>
              </div>
            </div>

            {/* Key Mode Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {rank.mode === 'smp' ? (
                <>
                  <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/5">
                    <div className="text-xs text-[#9A9A9A]">სახლები (Homes)</div>
                    <div className="font-pixel text-xl font-bold text-[#FF7A00] mt-1 tabular-nums">
                      {rank.homes} სახლი
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/5">
                    <div className="text-xs text-[#9A9A9A]">სულ ბრძანებები</div>
                    <div className="font-pixel text-xl font-bold text-[#F5F5F5] mt-1 tabular-nums">
                      {allCommands.length}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/5 col-span-2 sm:col-span-1">
                    <div className="text-xs text-[#9A9A9A]">ხელმისაწვდომი კიტები</div>
                    <div className="font-pixel text-xl font-bold text-[#FFA640] mt-1 tabular-nums">
                      {rank.kits.length} კიტი
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/5">
                    <div className="text-xs text-[#9A9A9A]">Gear Key გასაღები</div>
                    <div className="font-pixel text-xl font-bold text-[#FF7A00] mt-1 tabular-nums">
                      x{rank.gearKeys}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/5">
                    <div className="text-xs text-[#9A9A9A]">PlayerVaults (/pv)</div>
                    <div className="font-pixel text-xl font-bold text-[#F5F5F5] mt-1 tabular-nums">
                      +{rank.playerVaults} (/pv 1-{rank.playerVaults})
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/5 col-span-2 sm:col-span-1">
                    <div className="text-xs text-[#9A9A9A]">Donator ზონა</div>
                    <div className="text-base font-bold text-[#FFA640] mt-1">სრული წვდომა</div>
                  </div>
                </>
              )}
            </div>

            {/* Full Privilege Checklist */}
            <div className="pt-2 space-y-2">
              <h2 className="text-sm font-bold text-[#F5F5F5]">პრივილეგიების სია:</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#F5F5F5]/90">
                {rank.extraPerksKa.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kits Section with Cooldowns */}
            <div className="pt-2 space-y-2">
              <h2 className="text-sm font-bold text-[#F5F5F5]">
                რანკის კიტები {rank.mode === 'boxpvp' ? '(Cooldown დროებით)' : ''}:
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#FFA640] font-semibold">
                {rank.kits.map((kit, idx) => (
                  <React.Fragment key={kit.name}>
                    {idx > 0 && <span className="text-white/25">·</span>}
                    <span className="px-3 py-1.5 rounded-lg bg-[#0B0B0D] border border-[#FF7A00]/30">
                      {formatKitChipKa(kit)}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Buy Button */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => openBuyModal(rank)}
              className="voxel-btn flex-1 py-4 px-6 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-base inline-flex items-center justify-center gap-2.5 shadow-[0_0_28px_rgba(255,122,0,0.45)] min-h-[52px]"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>
                ყიდვა — {rank.price.toFixed(2)}
                {SITE_CONFIG.currency}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Minecraft Chat Prefix Preview */}
      <section aria-labelledby="chat-preview-heading" className="rounded-2xl voxel-panel p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="chat-preview-heading" className="text-base font-bold text-[#F5F5F5] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FF7A00]" />
            <span>ჩატის პრეფიქსის ცოცხალი გადახედვა (Minecraft Chat)</span>
          </h2>
          <span className="text-xs text-[#9A9A9A]">სერვერის ჩატის სტილი</span>
        </div>

        <div className="p-4 rounded-xl bg-[#060608] border border-white/10 font-mono text-sm sm:text-base flex flex-wrap items-center gap-2">
          <span
            className="font-pixel font-bold"
            style={{ color: rank.chatPrefixPreview.color }}
          >
            {rank.chatPrefixPreview.prefix}
          </span>
          <span className="text-[#F5F5F5] font-semibold">{previewPlayerName}:</span>
          <span className="font-georgian text-[#F5F5F5]/95">
            {rank.chatPrefixPreview.sampleMessageKa}
          </span>
        </div>
      </section>

      {/* Copyable Commands Grid with Georgian Meanings */}
      <section aria-labelledby="commands-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-[#FF7A00] mb-1">დააჭირე ბრძანებას დასაკოპირებლად</p>
            <h2 id="commands-heading" className="text-2xl font-extrabold text-[#F5F5F5] flex items-center gap-2">
              <Terminal className="w-6 h-6 text-[#FF7A00]" />
              <span>ხელმისაწვდომი ბრძანებები ({allCommands.length})</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCommands.map((cmd) => {
            const isOwn = rank.ownCommands.includes(cmd);
            return (
              <button
                key={cmd}
                type="button"
                onClick={() => copyToClipboard(cmd, `ბრძანება ${cmd} დაკოპირდა!`)}
                className="text-left p-4 rounded-xl voxel-panel hover:border-[#FF7A00] transition-colors flex flex-col justify-between gap-2 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#FF7A00] group-hover:text-[#FFA640]">
                    {cmd}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#9A9A9A]">
                      {isOwn ? 'ამ რანკის' : 'მემკვიდრეობით'}
                    </span>
                    <Copy className="w-3.5 h-3.5 text-[#9A9A9A] group-hover:text-[#FF7A00]" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F5F5]/85 leading-snug">
                  {COMMAND_DESCRIPTIONS_KA[cmd] || 'სპეციალური რანკის ბრძანება'}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Inherits All Lower Ranks Expandable Section */}
      {inheritedRanks.length > 0 && (
        <section aria-labelledby="inherits-heading" className="rounded-2xl voxel-panel overflow-hidden">
          <button
            type="button"
            aria-expanded={inheritsExpanded}
            onClick={() => {
              triggerClickSound();
              setInheritsExpanded((v) => !v);
            }}
            className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left"
          >
            <div>
              <p className="text-xs font-semibold text-[#FF7A00]">კუმულაციური პრივილეგიები</p>
              <h2 id="inherits-heading" className="text-lg sm:text-xl font-bold text-[#F5F5F5] mt-0.5">
                მოიცავს ყველა ქვედა რანკის პრივილეგიას ({inheritedRanks.map((r) => r.name).join(', ')})
              </h2>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[#FF7A00] shrink-0 transition-transform ${
                inheritsExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {inheritsExpanded && (
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {inheritedRanks.map((inh) => (
                <div
                  key={inh.id}
                  className="p-4 rounded-xl bg-[#0B0B0D] border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-pixel text-sm font-bold"
                      style={{ color: inh.accentColor }}
                    >
                      {inh.name}
                    </span>
                    <span className="text-xs text-[#9A9A9A]">შედის სრულად</span>
                  </div>
                  <p className="text-xs text-[#9A9A9A]">
                    ბრძანებები: <span className="font-mono text-[#F5F5F5]">{inh.ownCommands.join(', ')}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Rank-Specific FAQ */}
      <section aria-labelledby="rank-faq-heading" className="space-y-4">
        <h2 id="rank-faq-heading" className="text-xl font-bold text-[#F5F5F5]">
          კითხვები {rank.name} რანკის შესახებ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rank.faq.map((item, idx) => (
            <div key={idx} className="rounded-xl voxel-panel p-5 space-y-2">
              <h3 className="text-sm font-bold text-[#F5F5F5]">{item.q}</h3>
              <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Previous / Next Rank Navigation & Upgrade Hint */}
      <section
        aria-label="სხვა რანკებზე გადასვლა"
        className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
      >
        <div>
          {previousRank ? (
            <Link
              to={`/store/${previousRank.mode}/${previousRank.id}`}
              onClick={triggerClickSound}
              className="p-4 rounded-xl voxel-panel hover:border-[#FF7A00] flex items-center gap-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF7A00] shrink-0" />
              <div>
                <div className="text-xs text-[#9A9A9A]">წინა რანკი</div>
                <div className="font-pixel text-sm font-bold text-[#F5F5F5]">
                  {previousRank.name} ({previousRank.price.toFixed(2)}
                  {SITE_CONFIG.currency})
                </div>
              </div>
            </Link>
          ) : (
            <div className="text-xs text-[#9A9A9A]">ეს არის საწყისი რანკი {modeLabel} რეჟიმში.</div>
          )}
        </div>

        {/* Upgrade Hint */}
        <div className="text-center">
          {nextRank && upgradeDiffPrice ? (
            <div className="p-3.5 rounded-xl bg-[#141414] border border-[#FF7A00]/30 text-xs text-[#F5F5F5]">
              <Sparkles className="w-4 h-4 text-[#FF7A00] inline mr-1.5" />
              <span>
                გსურს მეტი? <strong>{nextRank.name}</strong> რანკზე გადასვლა სულ რაღაც{' '}
                <strong className="text-[#FF7A00]">
                  +{upgradeDiffPrice}
                  {SITE_CONFIG.currency}
                </strong>{' '}
                სხვაობით!
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#141414] border border-[#FF7A00]/30 text-xs text-[#FF7A00] font-semibold">
              უმაღლესი რანკი {modeLabel} რეჟიმში!
            </div>
          )}
        </div>

        <div className="flex justify-end">
          {nextRank && (
            <Link
              to={`/store/${nextRank.mode}/${nextRank.id}`}
              onClick={triggerClickSound}
              className="w-full p-4 rounded-xl voxel-panel hover:border-[#FF7A00] flex items-center justify-between gap-3 transition-colors"
            >
              <div>
                <div className="text-xs text-[#9A9A9A]">შემდეგი რანკი</div>
                <div className="font-pixel text-sm font-bold text-[#FF7A00]">
                  {nextRank.name} ({nextRank.price.toFixed(2)}
                  {SITE_CONFIG.currency})
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#FF7A00] shrink-0" />
            </Link>
          )}
        </div>
      </section>

      {/* Sticky Mobile Buy Bar (above bottom nav bar) */}
      <div className="md:hidden fixed bottom-14 inset-x-0 z-30 bg-[#0D0D0D]/95 backdrop-blur-md border-t border-[#FF7A00]/40 px-4 py-2.5 flex items-center justify-between gap-3">
        <div>
          <div className="font-pixel text-sm font-bold text-[#F5F5F5]">{rank.name}</div>
          <div className="text-xs font-bold text-[#FF7A00]">
            {rank.price.toFixed(2)}
            {SITE_CONFIG.currency} · {rank.durationKa}
          </div>
        </div>
        <button
          type="button"
          onClick={() => openBuyModal(rank)}
          className="voxel-btn px-5 py-2.5 bg-[#FF7A00] text-black font-bold text-xs inline-flex items-center gap-1.5 min-h-[42px]"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>ყიდვა</span>
        </button>
      </div>
    </div>
  );
};
