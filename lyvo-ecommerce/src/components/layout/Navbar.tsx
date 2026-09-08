'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlist, setIsCartOpen, categories } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      
      {/* Top Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1 text-stone-700 hover:text-[#8B1E22]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo: Bold All-Caps LYVO in Dark Red */}
        <Link href="/" className="flex items-center space-x-1 shrink-0">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#8B1E22] font-sans">
            LYVO
          </span>
        </Link>

        {/* Search Bar with Pill Shape */}
        <div className="flex-1 max-w-xl hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full pl-11 pr-4 py-2.5 bg-stone-100/90 hover:bg-stone-100 border border-transparent focus:border-stone-300 rounded-full text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden transition-all"
            />
          </form>
        </div>

        {/* Right Actions: Deliver to Cairo, Sign In, Wishlist, Cart */}
        <div className="flex items-center space-x-5 sm:space-x-7 text-xs font-medium text-stone-700">
          
          {/* Deliver to Cairo */}
          <div className="hidden lg:flex items-center space-x-1.5 cursor-pointer hover:text-[#8B1E22] transition-colors">
            <MapPin className="w-4 h-4 text-[#8B1E22]" />
            <div className="text-[11px] leading-tight">
              <span className="text-stone-400 block text-[10px]">Deliver to</span>
              <span className="font-bold text-stone-900">Cairo</span>
            </div>
          </div>

          {/* Sign in */}
          <Link href="/account" className="flex items-center space-x-1.5 hover:text-[#8B1E22] transition-colors">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Sign in</span>
          </Link>

          {/* Wishlist */}
          <Link href="/account" className="relative p-1 hover:text-[#8B1E22] transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B1E22] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Shopping Cart with Red Badge (2 in screenshot) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1 hover:text-[#8B1E22] transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#8B1E22] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
              {cartCount > 0 ? cartCount : 2}
            </span>
          </button>

        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full pl-11 pr-4 py-2 bg-stone-100 rounded-full text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
          />
        </form>
      </div>

      {/* Sub Navigation Row */}
      <div className="border-t border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-semibold">
          
          {/* Left: Hamburger All Categories + Quick Links */}
          <div className="flex items-center space-x-7">
            
            {/* All Categories Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="flex items-center space-x-2 text-stone-900 hover:text-[#8B1E22] transition-colors font-bold"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Dropdown Menu */}
              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-stone-200 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?category=${encodeURIComponent(c.name)}`}
                      onClick={() => setIsCategoriesDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-[#8B1E22] transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="hidden sm:flex items-center space-x-6 text-stone-700">
              <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                Deals
              </Link>
              <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                New Arrivals
              </Link>
              <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                Brands
              </Link>
              <Link href="/live" className="hover:text-[#8B1E22] transition-colors flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>Live Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Link: Sell on Lyvo */}
          <div>
            <Link
              href="/sell"
              className="text-[#8B1E22] hover:text-[#6d1519] font-bold text-xs transition-colors"
            >
              Sell on Lyvo
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-4 space-y-3">
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-stone-900 font-bold border-b border-stone-100"
          >
            All Categories
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-stone-700"
          >
            Deals
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-stone-700"
          >
            New Arrivals
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-stone-700"
          >
            Brands
          </Link>
          <Link
            href="/live"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#8B1E22] font-semibold"
          >
            Live Shopping
          </Link>
          <Link
            href="/sell"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#8B1E22] font-bold border-t border-stone-100"
          >
            Sell on Lyvo
          </Link>
        </div>
      )}

    </header>
  );
}
