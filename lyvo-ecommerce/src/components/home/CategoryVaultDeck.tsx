'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Layers, ShieldCheck, ChevronRight } from 'lucide-react';
import { useStore } from '@/lib/store';

export interface DepartmentVaultItem {
  id: string;
  deptCode: string;
  name: string;
  subtitle: string;
  itemCount: string;
  materialHighlight: string;
  image: string;
  categoryFilter: string;
  route: string;
  accent: string;
}

export const DEPARTMENTS: DepartmentVaultItem[] = [
  {
    id: 'dept-1',
    deptCode: 'DEPT 01',
    name: 'Haute Couture & Tailoring',
    subtitle: 'Outerwear, Structured Suits & Cashmere Silk',
    itemCount: '18 Runway Pieces',
    materialHighlight: 'Grade A Mongolian Cashmere & Pure Silk',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
    categoryFilter: 'Fashion',
    route: '/shop?category=Fashion',
    accent: '#A31D1C',
  },
  {
    id: 'dept-2',
    deptCode: 'DEPT 02',
    name: 'Tuscan Leather Atelier',
    subtitle: 'Weekender Duffles, Briefcases & Small Accessories',
    itemCount: '12 Hand-Stitched Icons',
    materialHighlight: 'Vegetable-Tanned Full-Grain Italian Calfskin',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    categoryFilter: 'Leather Goods',
    route: '/shop?category=Leather+Goods',
    accent: '#B45309',
  },
  {
    id: 'dept-3',
    deptCode: 'DEPT 03',
    name: 'Horology & Timepieces Vault',
    subtitle: 'Automatic Chronographs & Sapphire Complications',
    itemCount: '8 Masterpiece Editions',
    materialHighlight: '316L Marine Steel & Anti-Reflective Sapphire',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    categoryFilter: 'Timepieces',
    route: '/shop?category=Timepieces',
    accent: '#0E0C0B',
  },
  {
    id: 'dept-4',
    deptCode: 'DEPT 04',
    name: 'Fine Footwear & Sneakers',
    subtitle: 'Hand-Welted Derby Shoes & Minimalist Court Sneakers',
    itemCount: '14 Hand-Finished Silhouettes',
    materialHighlight: 'Vibram Outsoles & Butter-Soft Nappa Linings',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
    categoryFilter: 'Footwear',
    route: '/shop?category=Footwear',
    accent: '#1E293B',
  },
  {
    id: 'dept-5',
    deptCode: 'DEPT 05',
    name: 'High Jewelry & Rare Optics',
    subtitle: 'Titanium Eyewear & Solid Precious Metal Accents',
    itemCount: '9 Curated Artifacts',
    materialHighlight: 'Japanese Beta-Titanium & 18K Gold Flakes',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
    categoryFilter: 'Accessories',
    route: '/shop?category=Accessories',
    accent: '#78350F',
  },
];

interface CategoryVaultDeckProps {
  activeDeptId?: string;
  onSelectDept?: (dept: DepartmentVaultItem) => void;
}

export default function CategoryVaultDeck({ activeDeptId = 'dept-1', onSelectDept }: CategoryVaultDeckProps) {
  const [selectedId, setSelectedId] = useState(activeDeptId);

  const handleSelect = (dept: DepartmentVaultItem) => {
    setSelectedId(dept.id);
    if (onSelectDept) {
      onSelectDept(dept);
    }
  };

  return (
    <section className="bg-[#0E0C0B] text-[#FEFAE1] py-8 sm:py-12 border-b border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A31D1C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Title Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-[#E4D0AB] font-mono text-[10px] uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>LYVO Atelier Departments Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-1">
              The Department Vaults
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono tracking-wider text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Inspect All Classifications ({DEPARTMENTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Panoramic Horizontal Category Slider / Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedId === dept.id;

            return (
              <div
                key={dept.id}
                onClick={() => handleSelect(dept)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col justify-between aspect-3/4 p-4 ${
                  isSelected
                    ? 'border-[#A31D1C] ring-2 ring-[#A31D1C]/30 scale-[1.02] shadow-2xl'
                    : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                }`}
              >
                {/* Background Photography */}
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />

                {/* Dark Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-black/30 group-hover:via-black/40 transition-colors" />

                {/* Top Code Pill */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#E4D0AB] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
                    {dept.deptCode}
                  </span>
                  <span className="text-[9px] font-mono text-stone-300">
                    {dept.itemCount}
                  </span>
                </div>

                {/* Bottom Metadata & Link */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-sm font-serif font-bold text-white tracking-tight group-hover:text-[#E4D0AB] transition-colors leading-snug">
                    {dept.name}
                  </h3>
                  <p className="text-[10px] text-stone-300 line-clamp-1 font-mono">
                    {dept.materialHighlight}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[10px] font-bold text-[#E4D0AB]">
                    <span className="uppercase tracking-wider">Enter Vault</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
