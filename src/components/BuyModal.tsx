import React, { useEffect, useRef } from 'react';
import { X, Copy, ExternalLink, Ticket } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SITE_CONFIG } from '../config/site';
import { buildTicketMessage, formatPrice } from '../config/ranks';
import { RANK_SPRITE_MAP } from '../config/sprites';
import { SmartImage } from './SmartImage';
import { DiscordSvg } from './DiscordIcon';

export const BuyModal: React.FC = () => {
  const {
    buyModalRank,
    closeBuyModal,
    nickname,
    setNickname,
    copyToClipboard,
  } = useApp();

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!buyModalRank) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBuyModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [buyModalRank, closeBuyModal]);

  if (!buyModalRank) return null;

  const modeLabel = buyModalRank.mode === 'smp' ? 'SMP' : 'BoxPvp';
  const ticketText = buildTicketMessage({
    mode: buyModalRank.mode,
    rankName: buyModalRank.name,
    price: buyModalRank.price,
    nickname,
  });
  const spriteName =
    RANK_SPRITE_MAP[buyModalRank.mode]?.[buyModalRank.id] || buyModalRank.material;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBuyModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-modal-title"
        className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-[#0D0D0D] border-t sm:border border-[#FF7A00]/45 shadow-[0_24px_64px_rgba(0,0,0,0.95)] p-5 sm:p-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#FF7A00]/20">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-[#141414] border border-[#FF7A00]/35 flex items-center justify-center p-2 shrink-0">
              <SmartImage
                src={buyModalRank.iconPath}
                alt={`${buyModalRank.name} რანკის ხატულა`}
                materialFallback={buyModalRank.material}
                spriteFallback={spriteName}
                size={40}
                pixelated
                className="w-10 h-10 object-contain animate-float-3d"
              />
            </div>
            <div>
              <div className="text-xs text-[#9A9A9A] font-medium">
                {modeLabel} რეჟიმი · {buyModalRank.durationKa}
              </div>
              <h2
                id="buy-modal-title"
                className="font-pixel text-xl text-[#F5F5F5] mt-0.5"
              >
                {buyModalRank.name}
              </h2>
              <div className="text-base font-bold text-[#FF7A00] tabular-nums">
                <span className="font-pixel">{buyModalRank.price.toFixed(2)}</span>
                <span className="font-georgian">{SITE_CONFIG.currency}</span>
              </div>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeBuyModal}
            aria-label="ფანჯრის დახურვა"
            className="w-10 h-10 rounded-lg bg-[#141414] hover:bg-[#FF7A00]/15 border border-white/10 hover:border-[#FF7A00] flex items-center justify-center text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Georgian Instruction */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#141414] border border-[#FF7A00]/25 flex items-start gap-3">
          <Ticket className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-[#F5F5F5] leading-relaxed">
            თუ გსურთ რანკის შეძენა, გახსენით თიქეთი ჩვენს Discord სერვერზე.
          </p>
        </div>

        {/* 3 Short Steps */}
        <ol className="mt-4 space-y-2.5 text-sm">
          <li className="flex items-center gap-3 p-2.5 rounded-lg bg-[#141414]/60 border border-white/5">
            <span className="font-pixel text-xs text-black bg-[#FF7A00] w-6 h-6 rounded flex items-center justify-center font-bold shrink-0">
              1
            </span>
            <span className="text-[#F5F5F5]/90">შემოუერთდით ჩვენს Discord სერვერს</span>
          </li>
          <li className="flex items-center gap-3 p-2.5 rounded-lg bg-[#141414]/60 border border-white/5">
            <span className="font-pixel text-xs text-black bg-[#FF7A00] w-6 h-6 rounded flex items-center justify-center font-bold shrink-0">
              2
            </span>
            <span className="text-[#F5F5F5]/90">გახსენით თიქეთი თიქეთების არხში (Tickets)</span>
          </li>
          <li className="flex items-center gap-3 p-2.5 rounded-lg bg-[#141414]/60 border border-white/5">
            <span className="font-pixel text-xs text-black bg-[#FF7A00] w-6 h-6 rounded flex items-center justify-center font-bold shrink-0">
              3
            </span>
            <span className="text-[#F5F5F5]/90">მოგვწერეთ თქვენი ნიკი და სასურველი რანკი</span>
          </li>
        </ol>

        {/* Nickname Input & Ready Ticket Message */}
        <div className="mt-4 space-y-3">
          <div>
            <label
              htmlFor="modal-mc-nickname"
              className="block text-xs font-medium text-[#9A9A9A] mb-1"
            >
              თქვენი Minecraft ნიკი (ავტომატურად ჩაისმება ტექსტში):
            </label>
            <input
              id="modal-mc-nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="მაგ: Steve"
              maxLength={20}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-[#FF7A00]/30 text-sm text-[#F5F5F5] placeholder-[#9A9A9A]/50 focus:border-[#FF7A00] focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-lg bg-[#080808] border border-[#FF7A00]/25">
            <div className="text-[11px] text-[#9A9A9A] mb-1">მზა შეტყობინება თიქეთისთვის:</div>
            <p className="text-xs sm:text-sm text-[#FFA640] font-medium break-words select-all">
              {ticketText}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() =>
              copyToClipboard(ticketText, `შეტყობინება დაკოპირებულია (${formatPrice(buyModalRank.price)})!`)
            }
            className="w-full py-3 px-4 rounded-lg bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/40 hover:border-[#FF7A00] text-sm font-semibold text-[#F5F5F5] inline-flex items-center justify-center gap-2 transition-colors min-h-[46px]"
          >
            <Copy className="w-4 h-4 text-[#FF7A00]" />
            <span>დააკოპირე შეტყობინება</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href={SITE_CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="voxel-btn flex-1 py-3 px-5 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-sm inline-flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,122,0,0.4)] min-h-[46px]"
            >
              <DiscordSvg className="w-4 h-4" />
              <span>Discord-ზე გადასვლა</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={closeBuyModal}
              className="py-3 px-5 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] border border-white/10 text-sm font-medium text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors min-h-[46px]"
            >
              დახურვა
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
