import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BuyModal } from './components/BuyModal';
import { ToastAndFloating } from './components/ToastAndFloating';
import { SITE_CONFIG } from './config/site';
import { SmartImage } from './components/SmartImage';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const StorePage = lazy(() =>
  import('./pages/StorePage').then((m) => ({ default: m.StorePage }))
);
const RankDetailPage = lazy(() =>
  import('./pages/RankDetailPage').then((m) => ({ default: m.RankDetailPage }))
);
const GamemodesPage = lazy(() =>
  import('./pages/GamemodesPage').then((m) => ({ default: m.GamemodesPage }))
);
const StaffPage = lazy(() =>
  import('./pages/StaffPage').then((m) => ({ default: m.StaffPage }))
);
const RulesPage = lazy(() =>
  import('./pages/RulesPage').then((m) => ({ default: m.RulesPage }))
);
const FaqPage = lazy(() =>
  import('./pages/FaqPage').then((m) => ({ default: m.FaqPage }))
);
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const ScrollToTopOnNavigate: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const PixelLoadingFallback: React.FC = () => (
  <div
    role="status"
    aria-label="იტვირთება..."
    className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4"
  >
    <div className="w-14 h-14 rounded-xl bg-[#141414] border border-[#FF7A00]/45 flex items-center justify-center p-2 animate-pulse">
      <SmartImage
        src={SITE_CONFIG.assets.logo}
        alt="ADRENALINEE"
        pixelated
        className="w-10 h-10 object-contain"
      />
    </div>
    <p className="text-xs font-semibold text-[#9A9A9A]">იტვირთება...</p>
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTopOnNavigate />
        <div className="relative min-h-screen flex flex-col bg-[#050505] text-[#F5F5F5]">
          <InteractiveBackground />
          <Navbar />
          <main className="relative z-10 flex-1">
            <Suspense fallback={<PixelLoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/store" element={<Navigate to="/store/smp" replace />} />
                <Route path="/store/:mode" element={<StorePage />} />
                <Route path="/store/:mode/:rankId" element={<RankDetailPage />} />
                <Route path="/gamemodes" element={<GamemodesPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BuyModal />
          <ToastAndFloating />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
