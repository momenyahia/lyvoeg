'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Home, Compass, Radio, Heart, ShoppingBag } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen, liveStreams } = useStore();

  const activeLiveCount = liveStreams.filter(s => s.status === 'live').length;

  // Don't show bottom nav on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-zinc-200/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            pathname === '/' ? 'text-red-600 font-bold' : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            pathname?.startsWith('/shop') ? 'text-red-600 font-bold' : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Shop</span>
        </Link>

        {/* LYVO LIVE */}
        <Link
          href="/live"
          className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            pathname?.startsWith('/live') ? 'text-red-600 font-black' : 'text-zinc-600 hover:text-red-600'
          }`}
        >
          <div className="relative">
            <Radio className="w-5 h-5" />
            {activeLiveCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
            )}
          </div>
          <span className="text-[10px] font-extrabold uppercase mt-0.5 text-red-600">Live</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/account?tab=wishlist"
          className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            pathname?.includes('wishlist') ? 'text-red-600 font-bold' : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Saved</span>
        </Link>

        {/* Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 rounded-xl text-zinc-700 hover:text-red-600 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-bold">Bag</span>
        </button>
      </div>
    </nav>
  );
}
