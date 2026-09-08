'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Heart, ShoppingBag, Star } from 'lucide-react';

interface LyvoProductCardProps {
  product: Product;
}

export default function LyvoProductCard({ product }: LyvoProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, addToast } = useStore();
  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.salePrice ?? product.regularPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast('success', 'Added to Cart', `1x ${product.name} added.`);
  };

  return (
    <div className="group bg-white rounded-2xl p-4 border border-stone-100 hover:border-stone-200 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-sm">
      
      {/* Top Image + Wishlist Heart */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-50/50 flex items-center justify-center mb-3">
        {/* Wishlist Button - Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full text-stone-400 hover:text-[#8B1E22] transition-colors"
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#8B1E22] text-[#8B1E22]' : 'stroke-stone-400 hover:stroke-[#8B1E22]'}`} />
        </button>

        <Link href={`/product/${product.slug}`} className="w-full h-full relative block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs font-medium text-stone-700 hover:text-[#8B1E22] line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-1">
            <span className="text-sm font-bold text-stone-900">
              {formatPrice(currentPrice)}
            </span>
          </div>
        </div>

        {/* Rating and Red Square Cart Button */}
        <div className="flex items-center justify-between mt-2 pt-1">
          {/* Rating */}
          <div className="flex items-center space-x-1 text-[11px] text-stone-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-700">{product.rating}</span>
            <span className="text-stone-400">
              ({product.reviewsCount >= 1000 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})
            </span>
          </div>

          {/* Red Square Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-lg bg-[#8B1E22] hover:bg-[#70181b] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
