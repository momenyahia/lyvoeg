'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, ShoppingBag, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useStore } from '@/lib/store';

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  productId: string;
  name: string;
  category: string;
}

export default function EditorialLookbook() {
  const { products, addToCart, formatPrice, addToast } = useStore();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs-1');

  const coat = products.find((p) => p.slug === 'handcrafted-cashmere-coat') || products[0];
  const bag = products.find((p) => p.slug === 'italian-leather-weekender') || products[1];
  const watch = products.find((p) => p.slug === 'monaco-chronograph-watch') || products[2];

  const hotspots: Hotspot[] = [
    {
      id: 'hs-1',
      x: 48,
      y: 36,
      productId: coat.id,
      name: coat.name,
      category: 'Outerwear'
    },
    {
      id: 'hs-2',
      x: 74,
      y: 62,
      productId: bag.id,
      name: bag.name,
      category: 'Leather Goods'
    },
    {
      id: 'hs-3',
      x: 32,
      y: 52,
      productId: watch.id,
      name: watch.name,
      category: 'Horology'
    },
  ];

  const activeHotspot = hotspots.find((h) => h.id === activeHotspotId);
  const activeProduct = activeHotspot ? products.find((p) => p.id === activeHotspot.productId) : coat;

  const handleQuickAdd = (product: typeof coat) => {
    addToCart(product, 1);
    addToast('success', 'Added to Shopping Bag', `1x ${product.name} added to your bag.`);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-[#A31D1C]">
              Runway Edition No. 04
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 tracking-tight leading-tight">
              Shop The Runway Look
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Hover or tap the interactive pins on our Cairo Winter Ensemble to inspect artisanal details and add directly to your bag.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#A31D1C] flex items-center gap-1.5 transition-colors pb-1 border-b border-stone-900 hover:border-[#A31D1C]"
            >
              <span>Explore Complete Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Double-Spread Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Look Photo with Interactive Hotspots (8 cols) */}
          <div className="lg:col-span-8 relative aspect-3/4 sm:aspect-4/3 rounded-3xl overflow-hidden bg-stone-200 border border-stone-300 shadow-xl group">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
              alt="LYVO Runway Editorial"
              fill
              priority
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Hotspots */}
            {hotspots.map((hs) => {
              const isActive = activeHotspotId === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspotId(hs.id)}
                  onMouseEnter={() => setActiveHotspotId(hs.id)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/btn transition-all duration-300 ${
                    isActive ? 'scale-125' : 'hover:scale-110'
                  }`}
                  aria-label={`Inspect ${hs.name}`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span 
                      className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                        isActive ? 'bg-[#A31D1C]' : 'bg-white'
                      }`} 
                    />
                    <span 
                      className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center shadow-lg border transition-colors ${
                        isActive ? 'bg-[#A31D1C] text-white border-white' : 'bg-white/90 text-stone-900 border-black/10 backdrop-blur-md'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Micro Badge on Photo */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-[#FEFAE1] px-4 py-2 rounded-2xl text-[11px] font-mono tracking-wider flex items-center gap-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>CAIRO ATELIER RUNWAY COLLECTION</span>
            </div>
          </div>

          {/* Active Garment Card (4 cols) */}
          <div className="lg:col-span-4">
            {activeProduct && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A31D1C] bg-[#A31D1C]/10 px-2.5 py-1 rounded-md">
                    Tagged Piece
                  </span>
                  <span className="text-xs text-stone-400">{activeProduct.brand}</span>
                </div>

                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                  <Image
                    src={activeProduct.images[0]}
                    alt={activeProduct.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {activeProduct.salePrice && (
                    <div className="absolute top-3 left-3 bg-[#A31D1C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Featured
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    <Link href={`/product/${activeProduct.slug}`} className="hover:text-[#A31D1C]">
                      {activeProduct.name}
                    </Link>
                  </h3>
                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-xl font-bold font-serif text-[#A31D1C]">
                      {formatPrice(activeProduct.salePrice || activeProduct.regularPrice)}
                    </span>
                    {activeProduct.salePrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(activeProduct.regularPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 pt-1 leading-relaxed">
                    {activeProduct.description}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleQuickAdd(activeProduct)}
                    className="w-full py-3.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#A31D1C]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Instant Bag Add</span>
                  </button>
                  <Link
                    href={`/product/${activeProduct.slug}`}
                    className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
