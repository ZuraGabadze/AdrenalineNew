import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  Award,
  Copy,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { SMP_RANKS, BOXPVP_RANKS } from '../config/ranks';
import { useApp } from '../context/AppContext';
import { SmartImage } from '../components/SmartImage';
import { GameModeCard } from '../components/DroppedItem3D';
import { RankCard } from '../components/RankCard';
import { DiscordButton } from '../components/DiscordIcon';

export const HomePage: React.FC = () => {
  const { copyToClipboard, triggerClickSound, onlinePlayers } = useApp();
  const [featuredMode, setFeaturedMode] = useState<'smp' | 'boxpvp'>('smp');

  const featuredRanks = featuredMode === 'smp' ? SMP_RANKS : BOXPVP_RANKS;

  return (
    <div className="space-y-20 pb-16">
      {/* FULL-WIDTH THUMBNAIL BANNER DIRECTLY UNDER NAVBAR */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#FF7A00]/35 shadow-[0_18px_60px_rgba(0,0,0,0.85)] bg-[#0A0A0A]"
          style={{ height: 'clamp(170px, 20vw, 300px)' }}
        >
          <SmartImage
            src={SITE_CONFIG.assets.bannerThumbnail}
            alt="ADRENALINEE ბანერი"
            fallbackType="banner"
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/92 via-[#050505]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent" />

          <div className="absolute inset-0 px-5 sm:px-10 py-5 flex flex-col justify-between">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-[#FF7A00]/45 text-xs font-semibold text-[#F5F5F5]">
                <span className="w-2 h-2 rounded-full bg-[#36F27A] animate-pulse" />
                <span>
                  Ping: {SITE_CONFIG.ping.min}–{SITE_CONFIG.ping.max}ms
                  {onlinePlayers !== null ? ` · ონლაინ: ${onlinePlayers}` : ''}
                </span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FFA640]">
                  {SITE_CONFIG.hero.kicker}
                </p>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white extruded-title mt-1">
                  {SITE_CONFIG.hero.headline}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      SITE_CONFIG.ip,
                      `სერვერის IP დაკოპირდა: ${SITE_CONFIG.ip}`
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-black/80 hover:bg-[#141414] border border-[#FF7A00]/45 hover:border-[#FF7A00] text-xs sm:text-sm font-bold text-[#F5F5F5] inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="font-pixel text-[#FF7A00]">{SITE_CONFIG.ip}</span>
                  <Copy className="w-3.5 h-3.5 text-[#FFA640]" />
                </button>

                <DiscordButton href={SITE_CONFIG.discordUrl} label="Discord" size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO INTRO & QUICK ACTIONS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ოფიციალური კატალოგი · {SITE_CONFIG.ip}</span>
            </div>
            <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
              {SITE_CONFIG.hero.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/store/smp"
              onClick={triggerClickSound}
              className="pixel-corners-sm inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-extrabold text-sm transition-all shadow-[0_0_24px_rgba(255,122,0,0.4)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SMP მაღაზია</span>
            </Link>
            <Link
              to="/store/boxpvp"
              onClick={triggerClickSound}
              className="px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#FF7A00]/40 text-white font-extrabold text-sm inline-flex items-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF7A00]" />
              <span>BoxPvp მაღაზია</span>
            </Link>
          </div>
        </div>
      </section>

      {/* GAMEMODES PREVIEW SECTION (Photo-Only GameModeCards) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
              სათამაშო რეჟიმები
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              აირჩიე შენი გეიმ მოუდი
            </h2>
          </div>
          <Link
            to="/gamemodes"
            onClick={triggerClickSound}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FFA640] hover:text-[#FF7A00] transition-colors"
          >
            <span>ყველა რეჟიმის ნახვა</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          style={{ alignItems: 'stretch' }}
        >
          {SITE_CONFIG.gameModes.map((gm) => (
            <GameModeCard key={gm.id} mode={gm} onNavigate={triggerClickSound} />
          ))}
        </div>
      </section>

      {/* FEATURED RANKS SHOWCASE */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
              პოპულარული პაკეტები
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              სერვერის რანკების კატალოგი
            </h2>
          </div>

          {/* Mode Switch Tabs */}
          <div className="inline-flex p-1.5 rounded-xl bg-[#111111] border border-white/10 self-start">
            <button
              type="button"
              onClick={() => {
                triggerClickSound();
                setFeaturedMode('smp');
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-extrabold transition-all cursor-pointer ${
                featuredMode === 'smp'
                  ? 'bg-[#FF7A00] text-black shadow-[0_0_20px_rgba(255,122,0,0.45)]'
                  : 'text-[#9A9A9A] hover:text-white'
              }`}
            >
              SMP რანკები
            </button>
            <button
              type="button"
              onClick={() => {
                triggerClickSound();
                setFeaturedMode('boxpvp');
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-extrabold transition-all cursor-pointer ${
                featuredMode === 'boxpvp'
                  ? 'bg-[#FF7A00] text-black shadow-[0_0_20px_rgba(255,122,0,0.45)]'
                  : 'text-[#9A9A9A] hover:text-white'
              }`}
            >
              BoxPvp რანკები
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {featuredRanks.map((rank) => (
            <RankCard key={rank.id} rank={rank} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to={`/store/${featuredMode}`}
            onClick={triggerClickSound}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-[#FF7A00]/15 border border-white/10 hover:border-[#FF7A00]/45 text-sm font-bold text-white transition-all"
          >
            <Award className="w-4 h-4 text-[#FF7A00]" />
            <span>სრული შედარების ცხრილისა და დეტალების ნახვა</span>
            <ArrowRight className="w-4 h-4 text-[#FF7A00]" />
          </Link>
        </div>
      </section>

      {/* HOW TO BUY / JOIN */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl glass-panel p-6 border border-white/10 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/35 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">სწრაფი გააქტიურება</h3>
            <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
              ყველა შენაძენი სრულდება ჩვენს ოფიციალურ Discord სერვერზე თიქეთის გახსნით.
            </p>
          </div>
        </div>

        <div className="rounded-2xl glass-panel p-6 border border-white/10 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/35 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">სრული იერარქია</h3>
            <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
              ყოველი ზედა რანკი სრულად მოიცავს ყველა ქვედა რანკის ბრძანებებსა და კიტებს.
            </p>
          </div>
        </div>

        <div className="rounded-2xl glass-panel p-6 border border-white/10 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/35 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">4 კვირიანი ვადა</h3>
            <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
              ყველა რანკის მოქმედების სტანდარტული ვადაა 4 კვირა (1 თვე).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
