import React from 'react';
import { SITE_CONFIG } from '../config/site';
import { DiscordButton } from '../components/DiscordIcon';

export const TermsPage: React.FC = () => {
  const { terms } = SITE_CONFIG;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="max-w-3xl space-y-3 pb-6 border-b border-white/10">
        <p className="text-xs font-semibold text-[#FF7A00]">
          {SITE_CONFIG.serverName} · {terms.updatedAt}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] extruded-title">
          {terms.title}
        </h1>
        <p className="text-sm sm:text-base text-[#9A9A9A] leading-relaxed">{terms.intro}</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {terms.sections.map((sec) => (
          <section key={sec.id} className="rounded-2xl voxel-panel p-6 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#F5F5F5]">{sec.title}</h2>
            {sec.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm text-[#9A9A9A] leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="max-w-3xl rounded-2xl voxel-panel p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F5F5]">ოფიციალური Discord თიქეთები</h2>
          <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">
            შეძენასთან დაკავშირებული ნებისმიერი საკითხი განიხილება ჩვენს Discord სერვერზე.
          </p>
        </div>
        <DiscordButton size="md" label="Discord სერვერი" />
      </div>
    </div>
  );
};
