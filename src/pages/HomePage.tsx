import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Signal,
  ShoppingBag,
  Lock,
  ArrowRight,
  ChevronDown,
  Users,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { SMP_RANKS, BOXPVP_RANKS, RankMode } from '../config/ranks';
import { STAFF_MEMBERS } from '../config/staff';
import { FAQ_ITEMS } from '../config/faq';
import { useApp } from '../context/AppContext';
import { SmartImage } from '../components/SmartImage';
import { TiltCard } from '../components/TiltCard';
import { RankCard } from '../components/RankCard';
import { MinecraftHead3D } from '../components/MinecraftHead3D';
import { DiscordButton } from '../components/DiscordIcon';

export const HomePage: React.FC = () => {
  const { copyToClipboard, triggerClickSound, onlinePlayers } = useApp();
  const [featuredMode, setFeaturedMode] = useState<RankMode>('smp');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const featuredRanks = featuredMode === 'smp' ? SMP_RANKS : BOXPVP_RANKS;

  return (
    <div className="space-y-16 md:space-y-24 pb-10">
      {/* 1. LONG & LOW THUMBNAIL BANNER DIRECTLY UNDER NAVBAR */}
      <section aria-label="სერვერის მთავარი ბანერი" className="pt-4 sm:pt-6">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard
            maxTilt={3}
            className="relative w-full h-[clamp(170px,20vw,300px)] rounded-2xl overflow-hidden border border-[#FF7A00]/45 shadow-[0_0_36px_rgba(255,122,0,0.22)]"
          >
            <SmartImage
              src={SITE_CONFIG.assets.bannerThumbnail}
              alt="ADRENALINEE სერვერის ბანერი"
              className="w-full h-full object-cover"
            />

            {/* Measured Dark Gradient Scrim for 4.5:1 Contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/85"
              aria-hidden="true"
            />

            {/* Overlay Content: Server IP, Ping 60-90ms, Discord Button */}
            <div className="absolute inset-0 z-20 px-4 sm:px-8 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
              {/* Left: Clickable Server IP + Ping 60-90ms */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
                <button
                  type="button"
                  onClick={() => copyToClipboard(SITE_CONFIG.ip, 'IP დაკოპირებულია!')}
                  aria-label="დააკოპირე სერვერის IP: adrenalinee.run"
                  className="group inline-flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-[#0D0D0D]/90 hover:bg-[#141414] border border-[#FF7A00]/50 hover:border-[#FF7A00] shadow-[0_0_24px_rgba(255,122,0,0.25)] transition-all"
                >
                  <span className="font-pixel text-lg sm:text-2xl lg:text-3xl font-bold text-[#FF7A00] group-hover:text-[#FFA640] tracking-wider">
                    {SITE_CONFIG.ip}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#F5F5F5]/85 bg-[#FF7A00]/15 px-2.5 py-1 rounded border border-[#FF7A00]/30">
                    <Copy className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span className="hidden sm:inline">დაკოპირება</span>
                  </span>
                </button>

                {/* Signal Bars + Ping 60-90ms */}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#F5F5F5]">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/65 border border-white/10">
                    <Signal className="w-4 h-4 text-[#FF7A00] animate-pulse" />
                    <span className="font-pixel text-xs sm:text-sm text-[#F5F5F5]">
                      Ping {SITE_CONFIG.ping.min}-{SITE_CONFIG.ping.max}ms
                    </span>
                  </span>

                  {onlinePlayers !== null && (
                    <span className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#9A9A9A]">
                      <span>·</span>
                      <span>ონლაინ: {onlinePlayers}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Block-style Discord Button */}
              <div className="shrink-0">
                <DiscordButton size="md" label="Discord" />
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 2. SHORT HERO HEADLINE + CTA BUTTONS */}
      <section aria-labelledby="hero-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#FF7A00]">
            {SITE_CONFIG.hero.kicker} · {SITE_CONFIG.ip}
          </p>
          <h1
            id="hero-heading"
            className="text-[clamp(1.85rem,4vw,3.35rem)] font-black text-[#F5F5F5] leading-[1.15] extruded-title"
            style={{ textWrap: 'balance' }}
          >
            {SITE_CONFIG.hero.headline}
          </h1>
          <p className="text-sm sm:text-base text-[#9A9A9A] max-w-2xl mx-auto leading-relaxed">
            {SITE_CONFIG.hero.subtitle}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/store/smp"
              onClick={triggerClickSound}
              className="voxel-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-base shadow-[0_0_28px_rgba(255,122,0,0.45)] min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{SITE_CONFIG.hero.primaryCta}</span>
            </Link>
            <DiscordButton
              size="lg"
              variant="outline"
              label={SITE_CONFIG.hero.secondaryCta}
            />
          </div>
        </div>
      </section>

      {/* 3. GAME MODE CARDS (SMP, BoxPvp, OneBlock) */}
      <section aria-labelledby="gamemodes-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#FF7A00] mb-1">სერვერის რეჟიმები</p>
            <h2 id="gamemodes-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              გეიმ მოუდები
            </h2>
          </div>
          <Link
            to="/gamemodes"
            onClick={triggerClickSound}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A00] hover:text-[#FFA640] transition-colors"
          >
            <span>ყველა რეჟიმის ნახვა</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.gamemodes.map((gm) => (
            <TiltCard
              key={gm.id}
              className={`rounded-2xl voxel-panel overflow-hidden flex flex-col justify-between ${
                gm.locked ? 'opacity-75 grayscale-[30%]' : 'hover:border-[#FF7A00]/60'
              }`}
            >
              <div>
                <div className="relative h-44 bg-[#09090B] overflow-hidden border-b border-white/10">
                  <SmartImage
                    src={gm.image}
                    alt={gm.titleKa}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/40" />

                  {gm.locked && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#FF7A00] text-black font-pixel text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{gm.badgeKa}</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-xs text-[#9A9A9A] mb-1">
                    {gm.name} · {gm.badgeKa}
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{gm.titleKa}</h3>
                  <p className="text-sm text-[#9A9A9A] leading-relaxed">{gm.shortDescKa}</p>
                </div>
              </div>

              <div className="px-6 pb-6">
                {gm.locked ? (
                  <Link
                    to="/gamemodes"
                    onClick={triggerClickSound}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#1A1A1A] border border-white/10 text-xs font-semibold text-[#9A9A9A] inline-flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>SOON / მალე — თიზერის ნახვა</span>
                  </Link>
                ) : (
                  <Link
                    to={gm.storePath || '/store/smp'}
                    onClick={triggerClickSound}
                    className="voxel-btn w-full py-2.5 px-4 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span>რანკების ნახვა</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. FEATURED RANKS PREVIEW WITH TABS FOR SMP / BOXPVP */}
      <section aria-labelledby="featured-ranks-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#FF7A00] mb-1">პრივილეგიების კატალოგი</p>
            <h2 id="featured-ranks-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              პოპულარული რანკები
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0D0D0D] border border-[#FF7A00]/30 self-start">
            <button
              type="button"
              onClick={() => {
                triggerClickSound();
                setFeaturedMode('smp');
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                featuredMode === 'smp'
                  ? 'bg-[#FF7A00] text-black shadow-[0_0_16px_rgba(255,122,0,0.4)]'
                  : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
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
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                featuredMode === 'boxpvp'
                  ? 'bg-[#FF7A00] text-black shadow-[0_0_16px_rgba(255,122,0,0.4)]'
                  : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
              }`}
            >
              BoxPvp რანკები
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Snap Carousel / Desktop Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {featuredRanks.map((rank) => (
            <div
              key={`${rank.mode}-${rank.id}`}
              className="min-w-[278px] sm:min-w-[300px] md:min-w-0 snap-center shrink-0"
            >
              <RankCard rank={rank} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to={`/store/${featuredMode}`}
            onClick={triggerClickSound}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF7A00] hover:text-[#FFA640]"
          >
            <span>სრული შედარების ცხრილის ნახვა ({featuredMode.toUpperCase()})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. "როგორ ვიყიდო რანკი?" STEP-BY-STEP */}
      <section aria-labelledby="how-to-buy-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#FF7A00] mb-1">მარტივი 3 ნაბიჯი</p>
          <h2 id="how-to-buy-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
            როგორ ვიყიდო რანკი?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.howToBuySteps.map((step) => (
            <div key={step.number} className="rounded-2xl voxel-panel p-6 space-y-3">
              <div className="font-pixel text-2xl font-bold text-[#FF7A00]">{step.number}.</div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">{step.title}</h3>
              <p className="text-sm text-[#9A9A9A] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "როგორ შემოვიდე სერვერზე?" STEPS */}
      <section aria-labelledby="how-to-join-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#FF7A00] mb-1">სწრაფი გზამკვლევი</p>
            <h2 id="how-to-join-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              როგორ შემოვიდე სერვერზე?
            </h2>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(SITE_CONFIG.ip, 'IP დაკოპირებულია!')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-xs font-semibold text-[#F5F5F5] self-start min-h-[42px]"
          >
            <span>IP-ის დაკოპირება:</span>
            <span className="font-pixel text-[#FF7A00]">{SITE_CONFIG.ip}</span>
            <Copy className="w-3.5 h-3.5 text-[#FF7A00]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.howToJoinSteps.map((step) => (
            <div key={step.number} className="rounded-2xl voxel-panel p-6 space-y-3">
              <div className="font-pixel text-2xl font-bold text-[#FFA640]">{step.number}.</div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">{step.title}</h3>
              <p className="text-sm text-[#9A9A9A] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STAFF STRIP WITH 3D HEADS, LINKING TO /staff */}
      <section aria-labelledby="staff-strip-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#FF7A00] mb-1">ადმინისტრაცია და დეველოპერები</p>
            <h2 id="staff-strip-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              ჩვენი სტაფი
            </h2>
          </div>
          <Link
            to="/staff"
            onClick={triggerClickSound}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A00] hover:text-[#FFA640]"
          >
            <Users className="w-4 h-4" />
            <span>სტაფის გვერდზე გადასვლა</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {STAFF_MEMBERS.map((member) => (
            <Link
              key={member.id}
              to="/staff"
              onClick={triggerClickSound}
              className="group rounded-2xl voxel-panel p-5 flex flex-col items-center text-center hover:border-[#FF7A00] transition-colors"
            >
              <div className="my-3">
                <MinecraftHead3D
                  name={member.name}
                  minecraftName={member.minecraftName}
                  skinFile={member.skinFile}
                  size={56}
                />
              </div>
              <h3 className="font-pixel text-sm font-bold text-[#F5F5F5] group-hover:text-[#FF7A00] transition-colors mt-2">
                {member.name}
              </h3>
              <p className="text-xs text-[#9A9A9A] mt-1">{member.roleTitleKa}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. BIG DISCORD CALL-TO-ACTION BANNER */}
      <section aria-labelledby="discord-cta-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#170B00] via-[#120902] to-[#1F0E00] border border-[#FF7A00]/45 p-8 sm:p-10 lg:p-12 shadow-[0_0_48px_rgba(255,122,0,0.18)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-[#FF7A00]">ოფიციალური საზოგადოება</p>
            <h2 id="discord-cta-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              შემოუერთდი ADRENALINEE-ს Discord სერვერს
            </h2>
            <p className="text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
              რანკის შესაძენად, სიახლეების გასაგებად, გათამაშებებში მონაწილეობისთვის ან სტაფთან დასაკავშირებლად გახსენი თიქეთი ჩვენს Discord-ზე.
            </p>
          </div>
          <DiscordButton size="lg" label="Discord-ზე გადასვლა" />
        </div>
      </section>

      {/* 9. FAQ PREVIEW */}
      <section aria-labelledby="faq-preview-heading" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#FF7A00] mb-1">კითხვები და პასუხები</p>
            <h2 id="faq-preview-heading" className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
              ხშირად დასმული კითხვები
            </h2>
          </div>
          <Link
            to="/faq"
            onClick={triggerClickSound}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A00] hover:text-[#FFA640]"
          >
            <span>ყველა კითხვის ნახვა</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3 max-w-4xl">
          {FAQ_ITEMS.slice(0, 4).map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div key={item.id} className="rounded-xl voxel-panel overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    triggerClickSound();
                    setOpenFaqId(isOpen ? null : item.id);
                  }}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-[#F5F5F5] hover:text-[#FFA640] transition-colors min-h-[52px]"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF7A00] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-[#9A9A9A] leading-relaxed border-t border-white/5 pt-3">
                    {item.answer}
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
