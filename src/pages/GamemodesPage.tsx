import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Check, ArrowRight, Copy, Bell } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { SmartImage } from '../components/SmartImage';
import { TiltCard } from '../components/TiltCard';
import { DiscordButton } from '../components/DiscordIcon';

export const GamemodesPage: React.FC = () => {
  const { copyToClipboard, triggerClickSound } = useApp();
  const [oneblockTeaserOpen, setOneblockTeaserOpen] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#FF7A00]">
            {SITE_CONFIG.serverName} · {SITE_CONFIG.ip}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] extruded-title">
            სერვერის გეიმ მოუდები
          </h1>
          <p className="text-sm text-[#9A9A9A] max-w-2xl">
            აირჩიე შენთვის სასურველი სათამაშო რეჟიმი. SMP და BoxPvp სრულად აქტიურია, ხოლო OneBlock მალე დაემატება.
          </p>
        </div>

        <button
          type="button"
          onClick={() => copyToClipboard(SITE_CONFIG.ip, 'IP დაკოპირებულია!')}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-xs font-semibold text-[#F5F5F5] self-start min-h-[44px]"
        >
          <span>სერვერის IP:</span>
          <span className="font-pixel text-[#FF7A00]">{SITE_CONFIG.ip}</span>
          <Copy className="w-4 h-4 text-[#FF7A00]" />
        </button>
      </div>

      {/* Gamemode Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {SITE_CONFIG.gamemodes.map((gm) => (
          <TiltCard
            key={gm.id}
            className={`rounded-2xl voxel-panel overflow-hidden flex flex-col justify-between ${
              gm.locked ? 'opacity-80 border-white/15' : 'hover:border-[#FF7A00]'
            }`}
          >
            <div>
              {/* Artwork */}
              <div className="relative h-52 bg-[#09090B] overflow-hidden border-b border-white/10">
                <SmartImage
                  src={gm.image}
                  alt={gm.titleKa}
                  className={`w-full h-full object-cover ${gm.locked ? 'grayscale-[45%]' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/45" />

                {gm.locked && (
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded bg-[#FF7A00] text-black font-pixel text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{gm.badgeKa}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="text-xs text-[#9A9A9A]">
                  რეჟიმი: <span className="font-pixel text-[#F5F5F5]">{gm.name}</span> · სტატუსი:{' '}
                  <span className={gm.locked ? 'text-[#FFA640]' : 'text-[#FF7A00]'}>
                    {gm.badgeKa}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#F5F5F5]">{gm.titleKa}</h2>
                <p className="text-sm text-[#9A9A9A] leading-relaxed">{gm.fullDescKa}</p>

                <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#F5F5F5]/90">
                  {gm.highlightsKa.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      {gm.locked ? (
                        <Lock className="w-4 h-4 text-[#9A9A9A] shrink-0 mt-0.5" />
                      ) : (
                        <Check className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                      )}
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 pt-0">
              {gm.locked ? (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      triggerClickSound();
                      setOneblockTeaserOpen((v) => !v);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-white/10 text-xs sm:text-sm font-semibold text-[#9A9A9A] hover:text-[#F5F5F5] inline-flex items-center justify-center gap-2 transition-colors min-h-[46px]"
                  >
                    <Lock className="w-4 h-4 text-[#FF7A00]" />
                    <span>SOON / მალე — დამატებითი ინფორმაცია</span>
                  </button>

                  {oneblockTeaserOpen && (
                    <div className="p-3.5 rounded-xl bg-[#09090B] border border-[#FF7A00]/30 text-xs text-[#9A9A9A] space-y-2">
                      <p className="text-[#F5F5F5] font-semibold flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-[#FF7A00]" />
                        <span>OneBlock რეჟიმი დამუშავების პროცესშია</span>
                      </p>
                      <p>
                        OneBlock-ის რანკების შეძენა ამჟამად დაბლოკილია. გახსნის ზუსტი თარიღი და განახლებები გამოქვეყნდება ჩვენს Discord სერვერზე.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={gm.storePath || '/store/smp'}
                  onClick={triggerClickSound}
                  className="voxel-btn w-full py-3 px-5 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-sm inline-flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,122,0,0.35)] min-h-[46px]"
                >
                  <span>{gm.name} მაღაზიაში გადასვლა</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Bottom Discord Notice */}
      <div className="rounded-2xl voxel-panel p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#F5F5F5]">
            გაქვს იდეა ან შეკითხვა რეჟიმებთან დაკავშირებით?
          </h2>
          <p className="text-sm text-[#9A9A9A] mt-1">
            შემოუერთდი ჩვენს Discord სერვერს და გაგვიზიარე შენი მოსაზრება.
          </p>
        </div>
        <DiscordButton size="md" label="Discord-ზე გადასვლა" />
      </div>
    </div>
  );
};
