import React from 'react';
import { Link } from 'react-router-dom';
import { Copy } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { SmartImage } from './SmartImage';
import { DiscordButton } from './DiscordIcon';

export const Footer: React.FC = () => {
  const { copyToClipboard } = useApp();

  return (
    <footer className="relative z-10 mt-20 border-t border-[#FF7A00]/20 bg-[#080808]/95 pb-20 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Column 1: Brand & Server IP */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#141414] border border-[#FF7A00]/35 flex items-center justify-center p-1.5">
                <SmartImage
                  src={SITE_CONFIG.assets.logo}
                  alt="ADRENALINEE ლოგო"
                  pixelated
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-pixel text-xl font-bold text-[#F5F5F5]">
                {SITE_CONFIG.serverName}
              </span>
            </div>
            <p className="text-sm text-[#9A9A9A] max-w-md leading-relaxed">
              ქართული პრემიუმ Minecraft სერვერის ოფიციალური მაღაზია. აირჩიე სასურველი რანკი SMP ან BoxPvp რეჟიმისთვის და შემოუერთდი ჩვენს საზოგადოებას.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => copyToClipboard(SITE_CONFIG.ip, 'IP დაკოპირებულია!')}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-xs transition-colors min-h-[42px]"
              >
                <span className="text-[#9A9A9A]">IP:</span>
                <span className="font-pixel text-[#FF7A00]">{SITE_CONFIG.ip}</span>
                <Copy className="w-3.5 h-3.5 text-[#9A9A9A]" />
              </button>
              <DiscordButton size="sm" label="Discord სერვერი" />
            </div>
          </div>

          {/* Column 2: Store Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#F5F5F5] tracking-wide">მაღაზია და რეჟიმები</h3>
            <ul className="space-y-2 text-sm text-[#9A9A9A]">
              <li>
                <Link to="/store/smp" className="hover:text-[#FF7A00] transition-colors">
                  SMP რანკები
                </Link>
              </li>
              <li>
                <Link to="/store/boxpvp" className="hover:text-[#FF7A00] transition-colors">
                  BoxPvp რანკები
                </Link>
              </li>
              <li>
                <Link to="/gamemodes" className="hover:text-[#FF7A00] transition-colors">
                  გეიმ მოუდები (SMP, BoxPvp, OneBlock)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Info Links */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#F5F5F5] tracking-wide">ინფორმაცია და წესები</h3>
            <ul className="space-y-2 text-sm text-[#9A9A9A]">
              <li>
                <Link to="/staff" className="hover:text-[#FF7A00] transition-colors">
                  სერვერის სტაფი (Owners & Developers)
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-[#FF7A00] transition-colors">
                  სერვერის წესები
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#FF7A00] transition-colors">
                  ხშირად დასმული კითხვები (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#FF7A00] transition-colors">
                  შეძენის პირობები
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9A9A9A]">
          <p>{SITE_CONFIG.footer.disclaimer}</p>
          <p className="whitespace-nowrap shrink-0">{SITE_CONFIG.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
