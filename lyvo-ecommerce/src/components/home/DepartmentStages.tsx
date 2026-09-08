'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Watch, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Check, 
  Layers 
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function DepartmentStages() {
  const { products, addToCart, formatPrice, addToast } = useStore();

  const coat = products.find((p) => p.slug === 'handcrafted-cashmere-coat') || products[0];
  const bag = products.find((p) => p.slug === 'italian-leather-weekender') || products[1];
  const watch = products.find((p) => p.slug === 'monaco-chronograph-watch') || products[2];
  const sneaker = products.find((p) => p.slug === 'minimalist-leather-sneaker') || products[3];

  const handleQuickBuy = (product: typeof coat) => {
    addToCart(product, 1);
    addToast('success', 'Added to Shopping Bag', `1x ${product.name} reserved.`);
  };

  return (
    <section className="space-y-16 sm:space-y-24 py-16 sm:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* STAGE 1: THE HOROLOGY VAULT (Dedicated Timepieces Stage) */}
        {/* ========================================================================= */}
        <div className="bg-[#0E0C0B] text-[#FEFAE1] rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Visual Watch Macro Shot (6 cols) */}
            <div className="lg:col-span-6 relative aspect-square w-full rounded-2xl overflow-hidden bg-black border border-white/10 group shadow-2xl">
              <Image
                src={watch.images[0]}
                alt={watch.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#E4D0AB] border border-white/10 uppercase">
                Department 03 • Horology
              </div>
            </div>

            {/* Watch Specs & Story (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#E4D0AB] flex items-center gap-1.5">
                  <Watch className="w-4 h-4" />
                  Swiss Mechanical Precision
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {watch.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Engineered with an automatic mechanical complication, antireflective sapphire crystal, and marine-grade steel. Each watch is individually pressure-tested and certified before sealed dispatch.
                </p>
              </div>

              {/* Technical Blueprint Specifications */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Movement Calibre</span>
                  <strong className="text-white">Automatic 28,800 vph</strong>
                </div>
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Crystal Surface</span>
                  <strong className="text-white">Anti-Reflective Sapphire</strong>
                </div>
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Case Material</span>
                  <strong className="text-white">316L Marine Stainless</strong>
                </div>
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Water Resistance</span>
                  <strong className="text-white">100m / 10 ATM Pressure</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Atelier Vault Price</span>
                  <span className="text-2xl font-serif font-bold text-[#E4D0AB]">
                    {formatPrice(watch.salePrice || watch.regularPrice)}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuickBuy(watch)}
                    className="px-6 py-3 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Reserve Timepiece</span>
                  </button>
                  <Link
                    href={`/product/${watch.slug}`}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 2: THE TUSCAN LEATHER ATELIER (Dedicated Leather Goods Stage) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Leather Narrative (6 cols) */}
            <div className="lg:col-span-6 space-y-6 lg:order-1 order-2">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#B45309] flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  Florence Vegetable Tanned
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 tracking-tight">
                  {bag.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Crafted by master Florentine tanners using organic barks and natural oils. Develops an extraordinary, personalized patina over years of travel.
                </p>
              </div>

              {/* Leather Attributes */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block text-[10px]">Hide Selection</span>
                  <strong className="text-stone-900">Full-Grain Tuscan Calf</strong>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block text-[10px]">Hardware</span>
                  <strong className="text-stone-900">Solid Antique Brass</strong>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block text-[10px]">Luggage Volume</span>
                  <strong className="text-stone-900">45 Liters (Cabin Size)</strong>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-500 block text-[10px]">Edge Finishing</span>
                  <strong className="text-stone-900">Waxed Hand-Burnished</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Direct Atelier Price</span>
                  <span className="text-2xl font-serif font-bold text-[#A31D1C]">
                    {formatPrice(bag.salePrice || bag.regularPrice)}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuickBuy(bag)}
                    className="px-6 py-3 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Instant Bag Add</span>
                  </button>
                  <Link
                    href={`/product/${bag.slug}`}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-bold transition-colors"
                  >
                    Examine
                  </Link>
                </div>
              </div>
            </div>

            {/* Bag Visual (6 cols) */}
            <div className="lg:col-span-6 relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 group shadow-md lg:order-2 order-1">
              <Image
                src={bag.images[0]}
                alt={bag.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#E4D0AB] border border-white/10 uppercase">
                Department 02 • Leather Atelier
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 3: HAUTE COUTURE & FINE FOOTWEAR DUO */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Couture Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <Image
                src={coat.images[0]}
                alt={coat.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                DEPT 01 • Haute Couture
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#A31D1C]">100% Mongolian Cashmere</span>
              <h4 className="text-xl font-serif font-bold text-stone-900 mt-0.5">{coat.name}</h4>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">{coat.description}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="font-serif font-bold text-xl text-stone-950">{formatPrice(coat.regularPrice)}</span>
              <Link
                href={`/product/${coat.slug}`}
                className="px-5 py-2 bg-stone-900 hover:bg-[#A31D1C] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Inspect Tailoring
              </Link>
            </div>
          </div>

          {/* Footwear Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <Image
                src={sneaker.images[0]}
                alt={sneaker.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                DEPT 04 • Footwear
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#A31D1C]">Italian Nappa &amp; Margom Soles</span>
              <h4 className="text-xl font-serif font-bold text-stone-900 mt-0.5">{sneaker.name}</h4>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">{sneaker.description}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="font-serif font-bold text-xl text-stone-950">{formatPrice(sneaker.regularPrice)}</span>
              <Link
                href={`/product/${sneaker.slug}`}
                className="px-5 py-2 bg-stone-900 hover:bg-[#A31D1C] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Inspect Footwear
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
