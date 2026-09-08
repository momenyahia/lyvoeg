'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, addToast } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.salePrice ?? product.regularPrice;
  const hasDiscount = product.regularPrice > currentPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - currentPrice) / product.regularPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent, size?: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, undefined, size || product.attributes.sizes?.[0]);
    addToast('success', 'Added to Bag', `1x ${product.name} ready for checkout.`);
  };

  return (
    <div className="group relative flex flex-col transition-all duration-300">
      
      {/* High-Fashion Borderless Image Canvas */}
      <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-xs">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              product.images[1] ? 'group-hover:opacity-0' : ''
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Hover Image Flip (if available) */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {hasDiscount && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#A31D1C] text-white shadow-md uppercase tracking-wider">
              Save {discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0A0908] text-[#FEFAE1] uppercase tracking-wider">
              Runway Drop
            </span>
          )}
          {product.isBestSeller && !hasDiscount && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E4D0AB] text-[#0A0908] uppercase tracking-wider">
              Atelier Icon
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorited
                ? 'bg-[#A31D1C] text-white shadow-md'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#A31D1C]'
            }`}
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Size Selector / Instant Add Drawer (Slide up on Hover) */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-linear-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 z-10">
          {product.attributes.sizes && product.attributes.sizes.length > 0 ? (
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
              {product.attributes.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="px-2.5 py-1 bg-white/90 hover:bg-white text-stone-900 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                  title={`Add size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={(e) => handleQuickAdd(e)}
              className="w-full py-2 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Bag Add</span>
            </button>
          )}

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="text-[10px] text-[#FEFAE1] hover:text-white text-center font-semibold hover:underline"
            >
              Inspect Details
            </button>
          )}
        </div>
      </div>

      {/* Product Metadata */}
      <div className="pt-3 flex flex-col space-y-1">
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#A31D1C] font-semibold">
          <span>{product.brand}</span>
          {product.stockCount <= 5 && (
            <span className="text-amber-600 font-bold lowercase">few pieces left</span>
          )}
        </div>

        <h3 className="text-sm font-serif font-bold text-stone-900 tracking-tight line-clamp-1 group-hover:text-[#A31D1C] transition-colors">
          <Link href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <div className="flex items-baseline space-x-2 pt-0.5">
          <span className="text-sm font-bold text-stone-950 font-serif">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-stone-400 line-through font-serif">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}
