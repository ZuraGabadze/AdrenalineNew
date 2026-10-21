import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../config/faq';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { DiscordButton } from '../components/DiscordIcon';

export const FaqPage: React.FC = () => {
  const { triggerClickSound } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'store' | 'ranks' | 'server'>('all');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const filteredItems = FAQ_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#FF7A00]">
            {SITE_CONFIG.serverName} · დახმარების ცენტრი
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] extruded-title">
            ხშირად დასმული კითხვები (FAQ)
          </h1>
          <p className="text-sm text-[#9A9A9A] max-w-2xl">
            პასუხები რანკების შეძენის, მოქმედების ვადის, ბრძანებებისა და სერვერზე შემოსვლის შესახებ.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0D0D0D] border border-[#FF7A00]/30 self-start">
          {[
            { id: 'all', label: 'ყველა' },
            { id: 'store', label: 'მაღაზია' },
            { id: 'ranks', label: 'რანკები' },
            { id: 'server', label: 'სერვერი' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                triggerClickSound();
                setSelectedCategory(tab.id as 'all' | 'store' | 'ranks' | 'server');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                selectedCategory === tab.id
                  ? 'bg-[#FF7A00] text-black'
                  : 'text-[#9A9A9A] hover:text-[#F5F5F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5 max-w-4xl">
        {filteredItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="rounded-2xl voxel-panel overflow-hidden">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  triggerClickSound();
                  setOpenId(isOpen ? null : item.id);
                }}
                className="w-full p-5 text-left flex items-center justify-between gap-4 min-h-[56px]"
              >
                <div>
                  <div className="text-xs text-[#FF7A00] mb-1">{item.categoryLabelKa}</div>
                  <h2 className="text-base sm:text-lg font-bold text-[#F5F5F5]">{item.question}</h2>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#FF7A00] shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-3 border-t border-white/5 text-sm text-[#9A9A9A] leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions box */}
      <div className="rounded-2xl voxel-panel p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl">
        <div>
          <h2 className="text-lg font-bold text-[#F5F5F5]">ვერ იპოვე სასურველი პასუხი?</h2>
          <p className="text-sm text-[#9A9A9A] mt-1">
            გახსენი თიქეთი ჩვენს Discord სერვერზე და სტაფი მყისიერად დაგეხმარება.
          </p>
        </div>
        <DiscordButton size="md" label="Discord-ზე მიწერა" />
      </div>
    </div>
  );
};
