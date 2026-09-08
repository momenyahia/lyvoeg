'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  ChevronDown 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-stone-600 border-t border-stone-200 pt-14 pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-stone-200">
          
          {/* Column 1: Brand & Tagline */}
          <div className="col-span-2 md:col-span-1 space-y-2">
            <Link href="/" className="inline-block">
              <Image
                src="/lyvo-logo.png"
                alt="LYVO"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-stone-500 font-medium">
              Better Choices. Brighter Days.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#8B1E22] transition-colors">
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-[#8B1E22] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#8B1E22] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#8B1E22] transition-colors">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8B1E22] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#8B1E22] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B1E22] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B1E22] transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B1E22] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="font-bold text-stone-900 text-sm">Follow Us</h4>
            <div className="flex items-center space-x-3 text-stone-800">
              {/* Instagram */}
              <a href="#" className="p-2 bg-stone-100 hover:bg-[#8B1E22] hover:text-white rounded-full transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="p-2 bg-stone-100 hover:bg-[#8B1E22] hover:text-white rounded-full transition-colors" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a href="#" className="p-2 bg-stone-100 hover:bg-[#8B1E22] hover:text-white rounded-full transition-colors" title="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47c1.7-1.39 2.18-3.14 2.18-5.32V8.39c1.39.99 3.05 1.54 4.77 1.57V6.51c-.4 0-.8-.08-1.18-.21v.39z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="p-2 bg-stone-100 hover:bg-[#8B1E22] hover:text-white rounded-full transition-colors" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="p-2 bg-stone-100 hover:bg-[#8B1E22] hover:text-white rounded-full transition-colors" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Language */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © 2026 Lyvo. All rights reserved.
          </div>

          <div className="flex items-center space-x-5">
            <Link href="/help" className="hover:underline">
              Privacy
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/help" className="hover:underline">
              Terms
            </Link>
            <span className="text-stone-300">|</span>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-stone-900">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
