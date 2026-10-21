import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RankConfig } from '../config/ranks';
import { SITE_CONFIG } from '../config/site';
import { safeGetStorage, safeSetStorage, playUiClickSound } from '../utils/storage';

export interface ToastMessage {
  id: string;
  text: string;
}

interface AppContextValue {
  nickname: string;
  setNickname: (nick: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  triggerClickSound: () => void;
  buyModalRank: RankConfig | null;
  openBuyModal: (rank: RankConfig) => void;
  closeBuyModal: () => void;
  toasts: ToastMessage[];
  showToast: (text: string) => void;
  copyToClipboard: (text: string, toastMessageKa?: string) => Promise<void>;
  onlinePlayers: number | null;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const NICK_STORAGE_KEY = 'adrenalinee_mc_nickname';
const SOUND_STORAGE_KEY = 'adrenalinee_ui_sound';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nickname, setNicknameState] = useState<string>(() => safeGetStorage(NICK_STORAGE_KEY, ''));
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    () => safeGetStorage(SOUND_STORAGE_KEY, 'false') === 'true'
  );
  const [buyModalRank, setBuyModalRank] = useState<RankConfig | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);

  const setNickname = useCallback((nick: string) => {
    const clean = nick.slice(0, 20);
    setNicknameState(clean);
    safeSetStorage(NICK_STORAGE_KEY, clean);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      safeSetStorage(SOUND_STORAGE_KEY, String(next));
      if (next) {
        playUiClickSound(true);
      }
      return next;
    });
  }, []);

  const triggerClickSound = useCallback(() => {
    playUiClickSound(soundEnabled);
  }, [soundEnabled]);

  const showToast = useCallback((text: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { id, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string, toastMessageKa = 'დაკოპირებულია!') => {
      triggerClickSound();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
      } catch {
        // Fallback if clipboard permission denied in iframe
      }
      showToast(toastMessageKa);
    },
    [showToast, triggerClickSound]
  );

  const openBuyModal = useCallback(
    (rank: RankConfig) => {
      triggerClickSound();
      setBuyModalRank(rank);
    },
    [triggerClickSound]
  );

  const closeBuyModal = useCallback(() => {
    triggerClickSound();
    setBuyModalRank(null);
  }, [triggerClickSound]);

  // Live server status check (silently hides if offline or blocked)
  useEffect(() => {
    if (!SITE_CONFIG.showLiveStatus) return;
    let active = true;
    const controller = new AbortController();

    fetch(`https://api.mcsrvstat.us/3/${SITE_CONFIG.ip}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (data.online && typeof data.players?.online === 'number') {
          setOnlinePlayers(data.players.online);
        }
      })
      .catch(() => {
        // Silently ignore if blocked or offline
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        nickname,
        setNickname,
        soundEnabled,
        toggleSound,
        triggerClickSound,
        buyModalRank,
        openBuyModal,
        closeBuyModal,
        toasts,
        showToast,
        copyToClipboard,
        onlinePlayers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}
