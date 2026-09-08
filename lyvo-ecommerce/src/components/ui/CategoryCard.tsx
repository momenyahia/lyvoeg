'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative overflow-hidden rounded-3xl aspect-4/5 sm:aspect-1/1 bg-zinc-950 flex flex-col justify-end p-6 border border-zinc-100 hover:border-red-500/30 transition-all duration-500 shadow-md hover:shadow-xl"
    >
      {/* Background Image with Zoom on Hover */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-75"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Category Content */}
      <div className="relative z-10 space-y-1.5 transform group-hover:-translate-y-1 transition-transform duration-300">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
          {category.itemCount} Designs
        </span>

        <h3 className="text-xl font-black text-white leading-tight">
          {category.name}
        </h3>

        <p className="text-xs text-zinc-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {category.description}
        </p>

        <div className="pt-2 flex items-center gap-1 text-xs font-bold text-white group-hover:text-red-400 transition-colors">
          <span>Explore Category</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
