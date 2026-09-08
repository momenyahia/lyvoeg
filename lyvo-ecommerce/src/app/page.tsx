'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import LyvoProductCard from '@/components/ui/LyvoProductCard';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Headphones,
  CheckCircle2,
  ChevronRight,
  Grid,
  ShoppingBag,
  Sparkles,
  Tag
} from 'lucide-react';

export default function HomePage() {
  const { products, categories, brands, addToast } = useStore();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeHeroSlide, setActiveHeroSlide] = useState('01');

  // Featured categories corresponding to screenshot 1
  const categoryCircles = [
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', link: '/shop?category=fashion' },
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop', link: '/shop?category=electronics' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=400&auto=format&fit=crop', link: '/shop?category=beauty' },
    { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop', link: '/shop?category=home-living' },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', link: '/shop?category=sports' },
    { name: 'Toys & Kids', image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=400&auto=format&fit=crop', link: '/shop?category=toys-kids' },
    { name: 'Supermarket', image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=400&auto=format&fit=crop', link: '/shop?category=supermarket' },
    { name: 'More', isMore: true, link: '/shop' },
  ];

  // Brand items for Top Brands on Lyvo
  const brandList = [
    { name: 'Nike', font: 'font-sans font-black italic tracking-tighter' },
    { name: 'adidas', font: 'font-sans font-bold lowercase' },
    { name: 'SAMSUNG', font: 'font-sans font-black text-blue-600 tracking-wider' },
    { name: '', font: 'text-2xl font-bold' },
    { name: "L'ORÉAL", font: 'font-serif font-bold tracking-widest' },
    { name: 'PHILIPS', font: 'font-sans font-black text-blue-800 tracking-wider' },
    { name: 'Tefal', font: 'font-sans font-black text-red-600' },
    { name: 'dyson', font: 'font-sans font-bold lowercase tracking-wide' },
  ];

  // Product categories tabs
  const categoryTabs = ['All', 'Fashion', 'Electronics', 'Beauty', 'Home', 'Sports', 'Toys & Kids'];

  // Filter products for Featured Products section
  const featuredProducts = selectedCategoryTab === 'All'
    ? products.slice(0, 5)
    : products.filter(p => p.category.toLowerCase().includes(selectedCategoryTab.toLowerCase())).slice(0, 5);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      addToast('success', 'Subscribed!', 'You will be the first to know about new offers.');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1816] min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#EBE7E1] min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-between">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14 relative z-10">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-stone-600 font-medium text-xs sm:text-sm tracking-wide block">
                Better Choices. Brighter Days.
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1816] tracking-tight leading-[1.1] font-sans">
                Everything<br />
                you love.<br />
                <span className="text-[#8B1E22]">All in one place.</span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
                Shop thousands of products from top brands with the best prices, fast delivery and a seamless shopping experience.
              </p>

              <div>
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#8B1E22] hover:bg-[#72181b] text-white rounded-full text-xs sm:text-sm font-semibold shadow-md transition-transform active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6 relative flex justify-end items-center h-[340px] sm:h-[400px] lg:h-[440px]">
              {/* Cursive quote watermark */}
              <div className="absolute top-6 left-6 z-10 font-serif italic text-white/90 text-2xl sm:text-3xl max-w-[180px] leading-tight select-none pointer-events-none drop-shadow-md">
                Good<br />Things<br />Closer<br />To You
              </div>

              {/* Model Image with Shopping Bags */}
              <div className="relative w-full h-full max-w-[460px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                  alt="Lyvo Shopper"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Floating Dock Feature Strip at Bottom */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl mx-4 sm:mx-8 mb-4 sm:mb-6 p-4 sm:py-3.5 sm:px-6 shadow-sm border border-stone-200/60 flex flex-wrap items-center justify-between gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 flex-1">
              
              {/* Feature 1 */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#8B1E22] shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Fast Delivery</div>
                  <div className="text-[10px] text-stone-500">Across Egypt</div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#8B1E22] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Trusted Sellers</div>
                  <div className="text-[10px] text-stone-500">100% Secure</div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#8B1E22] shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Secure Payments</div>
                  <div className="text-[10px] text-stone-500">Multiple Options</div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#8B1E22] shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Easy Returns</div>
                  <div className="text-[10px] text-stone-500">Hassle Free</div>
                </div>
              </div>

            </div>

            {/* Slider Controls: 01 02 03 > */}
            <div className="hidden lg:flex items-center space-x-3 text-xs font-bold text-stone-400 pl-4 border-l border-stone-200">
              <span className="text-stone-900 border-b-2 border-stone-900 pb-0.5">01</span>
              <span className="hover:text-stone-700 cursor-pointer">02</span>
              <span className="hover:text-stone-700 cursor-pointer">03</span>
              <button className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors ml-1">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (8 Round Items) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Shop by <span className="font-extrabold">Category</span>
          </h2>
          <Link href="/shop" className="text-xs font-semibold text-[#8B1E22] hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
          {categoryCircles.map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 flex items-center justify-center group-hover:shadow-md transition-all duration-200 relative mb-2">
                {cat.isMore ? (
                  <div className="grid grid-cols-2 gap-1.5 p-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E22]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E22]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E22]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E22]" />
                  </div>
                ) : (
                  <Image
                    src={cat.image || ''}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-stone-700 group-hover:text-[#8B1E22] transition-colors line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. MIDDLE BANNER: NEW SEASON. NEW STYLE. (Burgundy) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#731A1D] text-white min-h-[220px] sm:min-h-[260px] flex items-center justify-between p-8 sm:p-12 shadow-sm">
          
          <div className="space-y-3 z-10 max-w-md">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              New Season. New Style.
            </h2>
            <p className="text-xs sm:text-sm text-stone-200">
              Discover the latest fashion from top brands.
            </p>
            <div className="pt-2">
              <Link
                href="/shop?category=fashion"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-white text-[#731A1D] hover:bg-stone-100 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-sm"
              >
                <span>Shop Fashion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Image / Cursive Lifestyle Watermark */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden sm:flex items-center justify-end overflow-hidden">
            <div className="absolute left-6 top-8 z-10 font-serif italic text-white/80 text-xl sm:text-2xl select-none pointer-events-none drop-shadow-md">
              IT&apos;S A<br />LIFESTYLE
            </div>
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                alt="New Season"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#731A1D] via-[#731A1D]/40 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Featured Products
          </h2>

          {/* Category Filter Pills + View All */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategoryTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  selectedCategoryTab === tab
                    ? 'bg-[#8B1E22] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80'
                }`}
              >
                {tab}
              </button>
            ))}

            <Link
              href="/shop"
              className="text-xs font-semibold text-[#8B1E22] hover:underline flex items-center space-x-1 pl-2 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <LyvoProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. TOP BRANDS ON LYVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Top Brands on <span className="text-[#8B1E22]">Lyvo</span>
          </h2>
          <Link href="/shop" className="text-xs font-semibold text-[#8B1E22] hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {brandList.map((brand, i) => (
            <Link
              key={i}
              href={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="aspect-square bg-white rounded-full border border-stone-200/80 hover:border-stone-400 flex items-center justify-center text-center p-3 shadow-xs hover:shadow-md transition-all group"
            >
              <span className={`text-stone-800 text-xs sm:text-sm group-hover:scale-105 transition-transform ${brand.font}`}>
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. DEALS YOU'LL LOVE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#731A1D] text-white min-h-[220px] sm:min-h-[260px] flex items-center justify-between p-8 sm:p-12 shadow-sm">
          
          <div className="space-y-3 z-10 max-w-sm">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Deals You&apos;ll Love
            </h2>
            <p className="text-xs sm:text-sm text-stone-200">
              Top brands. Better prices. Limited time only.
            </p>
            <div className="pt-2">
              <Link
                href="/shop?deals=true"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-white text-[#731A1D] hover:bg-stone-100 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-sm"
              >
                <span>Shop All Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Product Composition & Discount Badge */}
          <div className="flex items-center space-x-8 z-10">
            {/* Sneaker + Headphone + Perfume Collage */}
            <div className="hidden md:flex items-center -space-x-8">
              <div className="w-28 h-28 relative rounded-full overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-xs p-2">
                <Image
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop"
                  alt="Sneakers Deal"
                  fill
                  className="object-contain p-2"
                  sizes="120px"
                />
              </div>
              <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-white/30 bg-white/20 backdrop-blur-xs p-2 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop"
                  alt="Headphones Deal"
                  fill
                  className="object-contain p-2"
                  sizes="140px"
                />
              </div>
              <div className="w-28 h-28 relative rounded-full overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-xs p-2">
                <Image
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=300&auto=format&fit=crop"
                  alt="Fragrance Deal"
                  fill
                  className="object-contain p-2"
                  sizes="120px"
                />
              </div>
            </div>

            {/* Up to 50% Off Banner Box */}
            <div className="pl-6 border-l border-white/20 text-center sm:text-left">
              <span className="text-xs text-stone-200 block">Up to</span>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white block">50%</span>
              <span className="text-sm sm:text-base font-bold text-white block">Off</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. WHY SHOP ON LYVO? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-8">
          Why Shop on <span className="text-[#8B1E22]">Lyvo?</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          
          {/* 1. Wide Selection */}
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E22] flex items-center justify-center">
              <Grid className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Wide Selection</h4>
            <p className="text-[11px] text-stone-500">Thousands of products</p>
          </div>

          {/* 2. Great Deals */}
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E22] flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Great Deals</h4>
            <p className="text-[11px] text-stone-500">Save more every day</p>
          </div>

          {/* 3. Fast Delivery */}
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E22] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Fast Delivery</h4>
            <p className="text-[11px] text-stone-500">Across Egypt</p>
          </div>

          {/* 4. Secure Payments */}
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E22] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Secure Payments</h4>
            <p className="text-[11px] text-stone-500">Shop with confidence</p>
          </div>

          {/* 5. Easy Returns */}
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E22] flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Easy Returns</h4>
            <p className="text-[11px] text-stone-500">Hassle free</p>
          </div>

          {/* 6. Dedicated Support */}
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E22] flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Dedicated Support</h4>
            <p className="text-[11px] text-stone-500">Always here for you</p>
          </div>

        </div>
      </section>

      {/* 8. DUAL CARDS: SELL ON LYVO + THE LYVO APP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Sell on Lyvo */}
          <div className="bg-[#EBE7E1] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
            <div className="space-y-4 max-w-xs z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-sans">
                Sell on <span className="text-[#8B1E22]">Lyvo</span>
              </h3>
              <p className="text-xs text-stone-600">
                Grow your business with us.
              </p>

              <div>
                <Link
                  href="/sell"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#8B1E22] hover:bg-[#72181b] text-white rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95"
                >
                  <span>Start Selling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-6 z-10 text-xs text-stone-700 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Reach millions of customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Easy setup process</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Marketing support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Dedicated account manager</span>
              </div>
            </div>

            {/* Merchant Image Background */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden pointer-events-none opacity-90">
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"
                alt="Sell on Lyvo Merchant"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#EBE7E1] via-[#EBE7E1]/60 to-transparent" />
            </div>
          </div>

          {/* Card 2: The Lyvo App */}
          <div className="bg-[#EBE7E1] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
            <div className="space-y-4 max-w-xs z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-sans">
                The <span className="text-[#8B1E22]">Lyvo App</span>
              </h3>
              <p className="text-xs text-stone-600">
                Your shopping. Anywhere.<br />Anytime.
              </p>

              {/* App Store / Google Play Buttons */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="px-3 py-1.5 bg-black text-white rounded-lg text-[10px] font-bold flex items-center space-x-1.5 cursor-pointer hover:bg-stone-800">
                  <span> App Store</span>
                </div>
                <div className="px-3 py-1.5 bg-black text-white rounded-lg text-[10px] font-bold flex items-center space-x-1.5 cursor-pointer hover:bg-stone-800">
                  <span>▶ Google Play</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-6 z-10 text-xs text-stone-700 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Exclusive offers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Track your orders</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>Personalized for you</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1E22]" />
                <span>A smoother experience</span>
              </div>
            </div>

            {/* Phone Mockup Background */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden pointer-events-none opacity-90">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
                alt="The Lyvo App"
                fill
                className="object-contain object-bottom-right"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#EBE7E1] via-[#EBE7E1]/50 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* 9. NEWSLETTER BANNER: BE THE FIRST TO KNOW */}
      <section className="bg-[#731A1D] text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold">
              Be the First to Know
            </h3>
            <p className="text-xs text-stone-200">
              Subscribe for exclusive offers, new arrivals and more.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex-1 max-w-lg relative">
            <div className="flex items-center bg-white rounded-full p-1.5 pl-5 shadow-inner">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#731A1D] hover:bg-[#5c1417] text-white rounded-full text-xs font-semibold flex items-center space-x-1 shrink-0 transition-transform active:scale-95 shadow-xs"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      </section>

    </div>
  );
}
