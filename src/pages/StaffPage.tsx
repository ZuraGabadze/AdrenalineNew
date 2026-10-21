import React from 'react';
import { Copy, ExternalLink, MessageSquarePlus } from 'lucide-react';
import { STAFF_MEMBERS, STAFF_GROUPS_KA } from '../config/staff';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { SkinHead } from '../components/SkinHead';
import { TiltCard } from '../components/TiltCard';
import { DiscordButton, DiscordSvg } from '../components/DiscordIcon';

export const StaffPage: React.FC = () => {
  const { copyToClipboard, triggerClickSound } = useApp();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
      {/* Page Header */}
      <div className="space-y-2 pb-6 border-b border-white/10">
        <p className="text-xs font-semibold text-[#FF7A00]">
          {SITE_CONFIG.serverName} · ოფიციალური გუნდი
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] extruded-title">
          სერვერის სტაფი
        </h1>
        <p className="text-sm text-[#9A9A9A] max-w-2xl">
          გაიცანით ADRENALINEE-ს მფლობელები და დეველოპერები. დააჭირეთ Discord-ის სახელს მის დასაკოპირებლად ან გადადით NameMC პროფილზე.
        </p>
      </div>

      {/* Staff Groups: Owners & Developers */}
      {STAFF_GROUPS_KA.map((group) => {
        const members = STAFF_MEMBERS.filter((m) => m.role === group.id);
        return (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="space-y-6">
            <div>
              <h2 id={`group-${group.id}`} className="text-2xl font-extrabold text-[#F5F5F5]">
                {group.titleKa}
              </h2>
              <p className="text-sm text-[#9A9A9A] mt-1">{group.subtitleKa}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <TiltCard
                  key={member.id}
                  className="rounded-2xl voxel-panel p-6 flex flex-col justify-between gap-6 group hover:border-[#FF7A00] transition-colors"
                >
                  <div className="flex items-start gap-5">
                    {/* 3D Rotating Minecraft Head Cube */}
                    <div className="w-24 h-24 rounded-2xl bg-[#09090B] border border-[#FF7A00]/30 flex items-center justify-center shrink-0">
                      <SkinHead
                        minecraftName={member.minecraftName}
                        skinFile={member.skinFile}
                        size={56}
                      />
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="text-xs font-semibold text-[#FF7A00]">
                        {member.roleTitleKa}
                      </div>
                      <h3 className="font-pixel text-lg sm:text-xl font-bold text-[#F5F5F5] truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#9A9A9A] leading-relaxed">{member.bioKa}</p>
                    </div>
                  </div>

                  {/* Copyable Discord Username & NameMC Link */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#9A9A9A] min-w-0">
                      <DiscordSvg className="w-4 h-4 text-[#FF7A00] shrink-0" />
                      <span className="truncate font-mono text-[#F5F5F5]">
                        {member.discord}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {member.namemcUrl && (
                        <a
                          href={member.namemcUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={triggerClickSound}
                          aria-label={`${member.name} NameMC პროფილი`}
                          className="px-2.5 py-2 rounded-lg bg-[#141414] hover:bg-[#FF7A00]/15 text-xs font-semibold text-[#F5F5F5] hover:text-[#FFA640] border border-[#FF7A00]/30 hover:border-[#FF7A00] inline-flex items-center gap-1.5 transition-colors min-h-[38px]"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#FF7A00]" />
                          <span className="font-pixel text-[11px]">NameMC</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            member.discord,
                            `Discord დაკოპირდა: ${member.discord}`
                          )
                        }
                        aria-label={`დააკოპირე ${member.name}-ის Discord: ${member.discord}`}
                        className="px-3 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#FF7A00] text-xs font-semibold text-[#F5F5F5] hover:text-black border border-white/10 hover:border-[#FF7A00] inline-flex items-center gap-1.5 transition-colors shrink-0 min-h-[38px]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>დაკოპირება</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        );
      })}

      {/* "დაგვიკავშირდი" Box pointing to Discord Ticket */}
      <section aria-labelledby="contact-staff-heading">
        <div className="rounded-2xl bg-gradient-to-r from-[#170B00] via-[#100904] to-[#1A0C00] border border-[#FF7A00]/45 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF7A00]">
              <MessageSquarePlus className="w-4 h-4" />
              <span>დახმარება და მხარდაჭერა</span>
            </div>
            <h2 id="contact-staff-heading" className="text-2xl font-extrabold text-[#F5F5F5]">
              დაგვიკავშირდი Discord თიქეთით
            </h2>
            <p className="text-sm text-[#9A9A9A] leading-relaxed">
              თუ გსურთ რანკის შეძენა, აღმოაჩინეთ ხარვეზი ან გჭირდებათ ადმინისტრაციის დახმარება, გახსენით თიქეთი ჩვენს ოფიციალურ Discord სერვერზე.
            </p>
          </div>
          <DiscordButton size="lg" label="თიქეთის გახსნა Discord-ზე" />
        </div>
      </section>
    </div>
  );
};
