import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { RULE_CATEGORIES } from '../config/rules';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';

export const RulesPage: React.FC = () => {
  const { triggerClickSound } = useApp();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(RULE_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(RULE_CATEGORIES.map((c) => [c.id, true]))
  );

  const toggleCategory = (id: string) => {
    triggerClickSound();
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToCategory = (id: string) => {
    triggerClickSound();
    setActiveCategoryId(id);
    setOpenCategories((prev) => ({ ...prev, [id]: true }));
    const el = document.getElementById(`rule-cat-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalRulesCount = RULE_CATEGORIES.reduce((sum, c) => sum + c.rules.length, 0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#FF7A00]">
            {SITE_CONFIG.serverName} · {totalRulesCount} ოფიციალური წესი
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] extruded-title">
            სერვერის წესები
          </h1>
          <p className="text-sm text-[#9A9A9A] max-w-2xl">
            გთხოვთ დაიცვათ სერვერის წესები სამართლიანი და სასიამოვნო გარემოს შესანარჩუნებლად.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="წესის ძებნა..."
            aria-label="წესის ძებნა"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#FF7A00]/30 text-sm text-[#F5F5F5] placeholder-[#9A9A9A]/60 focus:border-[#FF7A00] focus:outline-none"
          />
        </div>
      </div>

      {/* Layout: Sticky Category Nav + Accordion Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Category Sidebar / Horizontal Strip on Mobile */}
        <aside
          aria-label="წესების კატეგორიები"
          className="lg:col-span-4 lg:sticky lg:top-24 rounded-2xl voxel-panel p-4 space-y-1.5"
        >
          <div className="px-3 py-1.5 text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">
            კატეგორიები ({RULE_CATEGORIES.length})
          </div>
          {RULE_CATEGORIES.map((cat, idx) => {
            const isSelected = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 transition-colors min-h-[44px] ${
                  isSelected
                    ? 'bg-[#FF7A00] text-black font-bold'
                    : 'text-[#F5F5F5]/85 hover:bg-white/5 hover:text-[#FFA640]'
                }`}
              >
                <span className="truncate">
                  {idx + 1}. {cat.titleKa}
                </span>
                <span
                  className={`font-pixel text-xs shrink-0 ${
                    isSelected ? 'text-black' : 'text-[#FF7A00]'
                  }`}
                >
                  {cat.rules.length}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Rules Accordion Content */}
        <div className="lg:col-span-8 space-y-6">
          {RULE_CATEGORIES.map((cat) => {
            const filteredRules = cat.rules.filter((r) => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              return (
                r.number.toLowerCase().includes(q) ||
                r.title.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                r.punishmentKa.toLowerCase().includes(q)
              );
            });

            if (filteredRules.length === 0) return null;
            const isOpen = openCategories[cat.id] ?? true;

            return (
              <section
                key={cat.id}
                id={`rule-cat-${cat.id}`}
                className="rounded-2xl voxel-panel overflow-hidden scroll-mt-24"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-[#121214] border-b border-white/5"
                >
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#F5F5F5]">
                      {cat.titleKa}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#9A9A9A] mt-0.5">{cat.subtitleKa}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF7A00] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="divide-y divide-white/5">
                    {filteredRules.map((rule) => (
                      <div key={rule.number} className="p-5 sm:p-6 space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-base font-bold text-[#F5F5F5] flex items-center gap-2.5">
                            <span className="font-pixel text-sm text-[#FF7A00]">
                              §{rule.number}
                            </span>
                            <span>{rule.title}</span>
                          </h3>
                          <span className="text-xs text-[#FFA640]">
                            სასჯელი: {rule.punishmentKa}
                          </span>
                        </div>
                        <p className="text-sm text-[#9A9A9A] leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
