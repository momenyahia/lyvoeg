'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import {
  SlidersHorizontal,
  X,
  Search,
  Check,
  Percent,
  ArrowUpDown
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialSearch = searchParams.get('q') || '';
  const isDealsOnly = searchParams.get('deals') === 'true';

  const { products, categories, brands } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [onlyDeals, setOnlyDeals] = useState<boolean>(isDealsOnly);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category match
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Brand match
        if (selectedBrand !== 'all') {
          const brandObj = brands.find(b => b.slug === selectedBrand);
          if (brandObj && product.brand !== brandObj.name) {
            return false;
          }
        }

        // Search query match
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.tags.some(t => t.toLowerCase().includes(query));
          if (!matches) return false;
        }

        // Deals only match
        if (onlyDeals) {
          const isDiscounted =
            product.oldPrice && product.oldPrice > (product.salePrice ?? product.regularPrice);
          if (!isDiscounted) return false;
        }

        // Max price filter
        const currentPrice = product.salePrice ?? product.regularPrice;
        if (currentPrice > priceRange) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.regularPrice;
        const priceB = b.salePrice ?? b.regularPrice;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, onlyDeals, priceRange, sortBy, brands]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setPriceRange(1000);
    setOnlyDeals(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title & Breadcrumb Header */}
      <div className="border-b border-zinc-200 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#A31D1C] uppercase">
              The Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 mt-1">
              All Collections & Ateliers
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
              Precision craftsmanship from European and local houses. Filter by bespoke category, price, or markdowns.
            </p>
          </div>

          {/* Search bar & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword..."
                className="bg-zinc-100 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#A31D1C]"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            </div>

            <div className="relative flex items-center bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-800">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured">Featured / New</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP FILTERS SIDEBAR */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Options</span>
            </h3>
            <button
              onClick={clearFilters}
              className="text-xs text-red-600 hover:underline font-bold"
            >
              Reset
            </button>
          </div>

          {/* Deals Toggle */}
          <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-2xl">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDeals}
                onChange={e => setOnlyDeals(e.target.checked)}
                className="rounded text-[#A31D1C] focus:ring-red-500 w-4 h-4"
              />
              <span className="text-xs font-black text-[#A31D1C] flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" />
                Discounted & Sale Only
              </span>
            </label>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Categories</h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-zinc-950 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-zinc-950 text-white'
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span>{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Houses & Ateliers</h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                  selectedBrand === 'all'
                    ? 'bg-zinc-950 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span>All Brands</span>
              </button>

              {brands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                    selectedBrand === brand.slug
                      ? 'bg-zinc-950 text-white'
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  <span className="truncate">{brand.name}</span>
                  <span>{brand.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="uppercase text-zinc-700">Max Price</span>
              <span className="text-zinc-950 font-black">${priceRange}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="25"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#A31D1C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-bold">
              <span>$100</span>
              <span>$1,000+</span>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border-2 border-dashed border-zinc-200 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#A31D1C] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">No products match your criteria</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try widening your price range, choosing another category, or resetting all filters.
              </p>
              <button
                onClick={clearFilters}
                className="inline-block bg-[#A31D1C] hover:bg-red-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-zinc-100">
                <span>Showing <strong>{filteredProducts.length}</strong> creations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={p => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <h3 className="text-sm font-black uppercase text-zinc-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="flex items-center gap-2 font-bold text-[#A31D1C]">
                  <input
                    type="checkbox"
                    checked={onlyDeals}
                    onChange={e => setOnlyDeals(e.target.checked)}
                    className="rounded text-[#A31D1C]"
                  />
                  <span>Markdowns Only</span>
                </label>
              </div>

              <div>
                <h4 className="font-bold text-zinc-700 uppercase mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="block w-full text-left py-1 text-zinc-600"
                  >
                    All Categories
                  </button>
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className="block w-full text-left py-1 text-zinc-600"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex gap-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2 text-xs font-bold text-zinc-600 border border-zinc-200 rounded-xl"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs font-bold bg-[#A31D1C] text-white rounded-xl"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center text-zinc-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
