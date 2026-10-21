import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Copy,
  User,
  Menu,
  X,
  Volume2,
  VolumeX,
  Home,
  ShoppingBag,
  Users,
  ShieldAlert,
  Check,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';
import { SmartImage } from './SmartImage';
import { MinecraftHead3D } from './MinecraftHead3D';
import { DiscordButton, DiscordSvg } from './DiscordIcon';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const {
    nickname,
    setNickname,
    copyToClipboard,
    soundEnabled,
    toggleSound,
    triggerClickSound,
    showToast,
  } = useApp();

  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [draftNick, setDraftNick] = useState(nickname);

  const storeMenuRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDraftNick(nickname);
  }, [nickname]);

  useEffect(() => {
    setStoreDropdownOpen(false);
    setProfileOpen(false);
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (storeMenuRef.current && !storeMenuRef.current.contains(e.target as Node)) {
        setStoreDropdownOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerClickSound();
    const trimmed = draftNick.trim();
    setNickname(trimmed);
    setProfileOpen(false);
    showToast(trimmed ? `ნიკი შენახულია: ${trimmed}` : 'ნიკი გასუფთავდა');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#050505]/88 backdrop-blur-md border-b border-[#FF7A00]/25 shadow-[0_4px_28px_rgba(255,122,0,0.12)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Lockup */}
          <Link
            to="/"
            onClick={triggerClickSound}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded bg-[#141414] border border-[#FF7A00]/35 flex items-center justify-center p-1 group-hover:border-[#FF7A00] transition-colors">
              <SmartImage
                src={SITE_CONFIG.assets.logo}
                alt="ADRENALINEE ლოგო"
                pixelated
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-pixel text-base sm:text-lg font-bold tracking-wider text-[#F5F5F5] group-hover:text-[#FF7A00] transition-colors">
              {SITE_CONFIG.serverName}
            </span>
          </Link>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="მთავარი ნავიგაცია"
            className="hidden lg:flex items-center gap-6 text-sm font-medium"
          >
            <Link
              to="/"
              onClick={triggerClickSound}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                isActive('/')
                  ? 'text-[#FF7A00] border-[#FF7A00]'
                  : 'text-[#F5F5F5]/85 border-transparent hover:text-[#FFA640]'
              }`}
            >
              მთავარი
            </Link>

            {/* Store Dropdown */}
            <div ref={storeMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={storeDropdownOpen}
                onClick={() => {
                  triggerClickSound();
                  setStoreDropdownOpen((v) => !v);
                }}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                  isActive('/store')
                    ? 'text-[#FF7A00] border-[#FF7A00]'
                    : 'text-[#F5F5F5]/85 border-transparent hover:text-[#FFA640]'
                }`}
              >
                <span>მაღაზია</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    storeDropdownOpen ? 'rotate-180 text-[#FF7A00]' : ''
                  }`}
                />
              </button>

              {storeDropdownOpen && (
                <div className="absolute left-0 mt-2.5 w-52 rounded-lg bg-[#0D0D0D] border border-[#FF7A00]/35 shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-1.5 z-50">
                  <Link
                    to="/store/smp"
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-[#F5F5F5] hover:bg-[#FF7A00]/15 hover:text-[#FFA640] transition-colors"
                  >
                    <span className="font-semibold">SMP რანკები</span>
                    <span className="font-pixel text-[11px] text-[#FF7A00]">5 RANKS</span>
                  </Link>
                  <Link
                    to="/store/boxpvp"
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-[#F5F5F5] hover:bg-[#FF7A00]/15 hover:text-[#FFA640] transition-colors"
                  >
                    <span className="font-semibold">BoxPvp რანკები</span>
                    <span className="font-pixel text-[11px] text-[#FF7A00]">5 RANKS</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/gamemodes"
              onClick={triggerClickSound}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                isActive('/gamemodes')
                  ? 'text-[#FF7A00] border-[#FF7A00]'
                  : 'text-[#F5F5F5]/85 border-transparent hover:text-[#FFA640]'
              }`}
            >
              გეიმ მოუდები
            </Link>

            <Link
              to="/staff"
              onClick={triggerClickSound}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                isActive('/staff')
                  ? 'text-[#FF7A00] border-[#FF7A00]'
                  : 'text-[#F5F5F5]/85 border-transparent hover:text-[#FFA640]'
              }`}
            >
              სტაფი
            </Link>

            <Link
              to="/rules"
              onClick={triggerClickSound}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                isActive('/rules')
                  ? 'text-[#FF7A00] border-[#FF7A00]'
                  : 'text-[#F5F5F5]/85 border-transparent hover:text-[#FFA640]'
              }`}
            >
              წესები
            </Link>

            <Link
              to="/faq"
              onClick={triggerClickSound}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                isActive('/faq')
                  ? 'text-[#FF7A00] border-[#FF7A00]'
                  : 'text-[#F5F5F5]/85 border-transparent hover:text-[#FFA640]'
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* Zone 3: Actions (Copy IP, Profile Popover, Sound Toggle, Discord, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Copy IP Button */}
            <button
              type="button"
              onClick={() => copyToClipboard(SITE_CONFIG.ip, 'IP დაკოპირებულია!')}
              aria-label="სერვერის IP მისამართის დაკოპირება: adrenalinee.run"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/30 hover:border-[#FF7A00] text-xs transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
            >
              <span className="font-pixel text-[#FF7A00]">{SITE_CONFIG.ip}</span>
              <Copy className="w-3.5 h-3.5 text-[#9A9A9A]" />
            </button>

            {/* Player Profile Popover */}
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={profileOpen}
                aria-label="მოთამაშის პროფილი"
                onClick={() => {
                  triggerClickSound();
                  setProfileOpen((v) => !v);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/30 hover:border-[#FF7A00] text-xs font-medium text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
              >
                <User className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>{nickname ? nickname : 'პროფილი'}</span>
              </button>

              {profileOpen && (
                <div
                  role="dialog"
                  aria-label="მოთამაშის პროფილის პარამეტრები"
                  className="absolute right-0 mt-2.5 w-72 rounded-xl bg-[#0D0D0D] border border-[#FF7A00]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-4 z-50"
                >
                  <div className="flex items-center gap-3 pb-3 mb-3 border-b border-[#FF7A00]/20">
                    <div className="w-12 h-12 rounded-lg bg-[#141414] border border-[#FF7A00]/25 flex items-center justify-center shrink-0">
                      <MinecraftHead3D
                        name={nickname || 'Steve'}
                        minecraftName={nickname || 'Steve'}
                        skinFile="skins/default.png"
                        size={32}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#F5F5F5]">მოთამაშის პროფილი</p>
                      <p className="text-[11px] text-[#9A9A9A]">
                        ნიკი ავტომატურად ჩაისმება თიქეთის ტექსტში
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-3">
                    <div>
                      <label
                        htmlFor="navbar-mc-nick"
                        className="block text-xs font-medium text-[#F5F5F5]/90 mb-1"
                      >
                        შენი Minecraft ნიკი
                      </label>
                      <input
                        id="navbar-mc-nick"
                        type="text"
                        value={draftNick}
                        onChange={(e) => setDraftNick(e.target.value)}
                        placeholder="მაგ: Steve"
                        maxLength={20}
                        className="w-full px-3 py-2 rounded bg-[#141414] border border-[#FF7A00]/30 text-sm text-[#F5F5F5] placeholder-[#9A9A9A]/60 focus:border-[#FF7A00] focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="voxel-btn flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FF7A00] hover:bg-[#FFA640] text-black text-xs font-bold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>შენახვა</span>
                      </button>
                      {nickname && (
                        <button
                          type="button"
                          onClick={() => {
                            setDraftNick('');
                            setNickname('');
                            showToast('ნიკი წაიშალა');
                          }}
                          className="px-3 py-2 rounded bg-[#141414] hover:bg-[#1F1F1F] text-xs text-[#9A9A9A] hover:text-[#F5F5F5] border border-white/10"
                        >
                          გასუფთავება
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'ხმის გამორთვა' : 'ხმის ჩართვა'}
              title={soundEnabled ? 'კლიკის ხმა: ჩართულია' : 'კლიკის ხმა: გამორთულია'}
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded bg-[#141414] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/25 text-[#9A9A9A] hover:text-[#FF7A00] transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF7A00]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Discord Primary CTA (Desktop) */}
            <div className="hidden md:block">
              <DiscordButton size="sm" label="Discord" />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                triggerClickSound();
                setMobileDrawerOpen((v) => !v);
              }}
              aria-label={mobileDrawerOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
              aria-expanded={mobileDrawerOpen}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded bg-[#141414] border border-[#FF7A00]/35 text-[#F5F5F5] hover:text-[#FF7A00]"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Drawer */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="მობილური მენიუ"
          className="fixed inset-0 z-50 lg:hidden bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#FF7A00]/25">
            <div className="flex items-center gap-3">
              <SmartImage
                src={SITE_CONFIG.assets.logo}
                alt="ADRENALINEE ლოგო"
                pixelated
                className="w-8 h-8"
              />
              <span className="font-pixel text-lg font-bold text-[#FF7A00]">
                {SITE_CONFIG.serverName}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              aria-label="მენიუს დახურვა"
              className="w-11 h-11 rounded bg-[#141414] border border-[#FF7A00]/35 flex items-center justify-center text-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="my-6 flex flex-col gap-2.5">
            {[
              { to: '/', label: 'მთავარი' },
              { to: '/store/smp', label: 'მაღაზია — SMP რანკები' },
              { to: '/store/boxpvp', label: 'მაღაზია — BoxPvp რანკები' },
              { to: '/gamemodes', label: 'გეიმ მოუდები' },
              { to: '/staff', label: 'სტაფი' },
              { to: '/rules', label: 'წესები' },
              { to: '/faq', label: 'ხშირად დასმული კითხვები (FAQ)' },
              { to: '/terms', label: 'შეძენის პირობები' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileDrawerOpen(false)}
                className="px-4 py-3.5 rounded-lg bg-[#141414] border border-[#FF7A00]/20 hover:border-[#FF7A00] text-base font-semibold text-[#F5F5F5] flex items-center justify-between min-h-[48px]"
              >
                <span>{item.label}</span>
                <span className="text-[#FF7A00]">→</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#FF7A00]/25">
            <button
              type="button"
              onClick={() => copyToClipboard(SITE_CONFIG.ip, 'IP დაკოპირებულია!')}
              className="w-full py-3 px-4 rounded-lg bg-[#141414] border border-[#FF7A00]/35 flex items-center justify-between min-h-[48px]"
            >
              <span className="text-xs text-[#9A9A9A]">სერვერის IP:</span>
              <span className="font-pixel text-sm text-[#FF7A00] inline-flex items-center gap-2">
                {SITE_CONFIG.ip}
                <Copy className="w-4 h-4" />
              </span>
            </button>
            <DiscordButton size="lg" label="Discord სერვერზე გადასვლა" className="w-full" />
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar (<= 56px height so total sticky bars stay within 15% viewport height) */}
      <nav
        aria-label="მობილური ქვედა ნავიგაცია"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#080808]/95 backdrop-blur-md border-t border-[#FF7A00]/30 grid grid-cols-5 items-center px-1 pb-[env(safe-area-inset-bottom)]"
      >
        <Link
          to="/"
          onClick={triggerClickSound}
          className={`flex flex-col items-center justify-center h-11 text-[11px] font-medium whitespace-nowrap ${
            location.pathname === '/' ? 'text-[#FF7A00]' : 'text-[#9A9A9A]'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>მთავარი</span>
        </Link>

        <Link
          to="/store/smp"
          onClick={triggerClickSound}
          className={`flex flex-col items-center justify-center h-11 text-[11px] font-medium whitespace-nowrap ${
            location.pathname.startsWith('/store') ? 'text-[#FF7A00]' : 'text-[#9A9A9A]'
          }`}
        >
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          <span>მაღაზია</span>
        </Link>

        <Link
          to="/staff"
          onClick={triggerClickSound}
          className={`flex flex-col items-center justify-center h-11 text-[11px] font-medium whitespace-nowrap ${
            location.pathname.startsWith('/staff') ? 'text-[#FF7A00]' : 'text-[#9A9A9A]'
          }`}
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span>სტაფი</span>
        </Link>

        <Link
          to="/rules"
          onClick={triggerClickSound}
          className={`flex flex-col items-center justify-center h-11 text-[11px] font-medium whitespace-nowrap ${
            location.pathname.startsWith('/rules') ? 'text-[#FF7A00]' : 'text-[#9A9A9A]'
          }`}
        >
          <ShieldAlert className="w-4 h-4 mb-0.5" />
          <span>წესები</span>
        </Link>

        <a
          href={SITE_CONFIG.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerClickSound}
          className="flex flex-col items-center justify-center h-11 text-[11px] font-semibold text-[#FF7A00] whitespace-nowrap"
        >
          <DiscordSvg className="w-4 h-4 mb-0.5" />
          <span>Discord</span>
        </a>
      </nav>
    </>
  );
};
