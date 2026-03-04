
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center select-none gap-4"
          onClick={() => onNavigate('aviva-progression-check')}
        >
          <img src="/equite-logo.png" alt="Équité Association" className="h-8 md:h-10 w-auto" />
          <div className="hidden md:block w-px h-8 bg-gray-300"></div>
          <span className="text-[#002E72] font-bold text-lg md:text-xl tracking-tight">
            Customer Dashboard Portal
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <button
            className="text-[14px] font-bold pb-1 text-[#0077C8] border-b-2 border-[#0077C8]"
          >
            Aviva Check
          </button>

          <button className="hidden sm:flex items-center space-x-1 border border-gray-200 rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#002E72] hover:bg-gray-50 transition-colors">
            <span>PORTAL LOGIN</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
