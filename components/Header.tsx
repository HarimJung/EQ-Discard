
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
          className="cursor-pointer flex items-center space-x-4 select-none"
          onClick={() => onNavigate('fsra-demo')}
        >
          <img
            src="/equite-logo.png"
            alt="Équité Association"
            className="h-12 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(17%) sepia(53%) saturate(5451%) hue-rotate(206deg) brightness(91%) contrast(101%)' }}
          />
          <span className="text-xl md:text-2xl font-bold text-[#002E72]">Discard Alert Investigation</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <button
            onClick={() => onNavigate('fsra-demo')}
            className={`text-[14px] font-bold pb-1 ${currentPage === 'fsra-demo'
              ? 'text-[#0077C8] border-b-2 border-[#0077C8]'
              : 'text-gray-500 hover:text-[#0077C8]'
              }`}
          >
            Discard Alert Dashboard
          </button>

          <button
            onClick={() => onNavigate('cherry-picking')}
            className={`text-[14px] font-bold pb-1 ${currentPage === 'cherry-picking'
              ? 'text-[#0077C8] border-b-2 border-[#0077C8]'
              : 'text-gray-500 hover:text-[#0077C8]'
              }`}
          >
            Cherry Picking Dashboard
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
