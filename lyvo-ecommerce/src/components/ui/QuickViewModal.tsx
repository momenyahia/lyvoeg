'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, formatPrice } = useStore();

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.attributes.colors?.[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.attributes.sizes?.[0] || ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentPrice = product.salePrice ?? product.regularPrice;

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-zinc-100 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-black shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="bg-zinc-100 aspect-square md:aspect-auto h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Details & Selection */}
        <div className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#A31D1C] uppercase">
                {product.brand}
              </span>
              <h2 className="text-lg font-black text-zinc-950 mt-1">{product.name}</h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-black text-zinc-950">
                  {formatPrice(currentPrice)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.attributes.colors && product.attributes.colors.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">
                  Color: <span className="font-normal text-zinc-500">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.attributes.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColor === color.name
                          ? 'scale-110 border-[#A31D1C] ring-2 ring-red-200'
                          : 'border-white'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.attributes.sizes && product.attributes.sizes.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">Select Size:</label>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        selectedSize === size
                          ? 'bg-[#A31D1C] text-white'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2 bg-[#A31D1C] hover:bg-red-800 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md shadow-red-950/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="w-full text-center py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950 flex items-center justify-center gap-1"
            >
              <span>View Full Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
