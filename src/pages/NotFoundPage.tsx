import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotFoundPage: React.FC = () => {
  const { triggerClickSound } = useApp();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
      <div className="font-pixel text-6xl sm:text-8xl font-bold text-[#FF7A00] extruded-title">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5]">
        გვერდი ვერ მოიძებნა
      </h1>
      <p className="text-sm sm:text-base text-[#9A9A9A] max-w-md mx-auto">
        მოთხოვნილი მისამართი არ არსებობს ან გადატანილია. დაბრუნდით მთავარ გვერდზე ან გადადით მაღაზიაში.
      </p>
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          onClick={triggerClickSound}
          className="voxel-btn px-6 py-3 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-sm inline-flex items-center gap-2 min-h-[46px]"
        >
          <Home className="w-4 h-4" />
          <span>მთავარი გვერდი</span>
        </Link>
        <Link
          to="/store/smp"
          onClick={triggerClickSound}
          className="px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#FF7A00]/35 text-sm font-semibold text-[#F5F5F5] inline-flex items-center gap-2 min-h-[46px]"
        >
          <ShoppingBag className="w-4 h-4 text-[#FF7A00]" />
          <span>მაღაზია</span>
        </Link>
      </div>
    </div>
  );
};
