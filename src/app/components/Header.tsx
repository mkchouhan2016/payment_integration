'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import LogoComponent from './Logo';
interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const totalItems = useAppSelector((state: RootState) => state.cart.totalItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <header className={`sticky top-0 z-50 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } shadow-md`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LogoComponent fontSize="1.5rem" isDark={isDark} onClickHandler={() => router.push('/')} />
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plants..."
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white text-gray-800 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                🔍
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <span className={`cursor-pointer ${isDark ? 'text-white' : 'text-gray-800'}`} onClick={() => router.push('/')}>Home</span>
            <button
              onClick={handleCartClick}
              className={`relative p-2 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              🛒
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                  isDark ? 'bg-green-500' : 'bg-green-600'
                } text-white`}>
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 