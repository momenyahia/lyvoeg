'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Radio, 
  Award, 
  ArrowRight, 
  Globe 
} from 'lucide-react';
import LyvoLogo from '@/components/ui/LyvoLogo';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Brand Hero */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex justify-center mb-2">
            <LyvoLogo variant="crimson" size="lg" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Where Haute Couture Meets Real-Time Discovery.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Founded with an uncompromising devotion to authentic luxury and modern digital craftsmanship, LYVO bridges prestigious global fashion houses with the vibrant, discerning culture of Cairo and the Middle East.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE3D5] shadow-xs">
          <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
              alt="LYVO Atelier Story"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#A31D1C] font-bold">The Genesis</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Redefining Commerce for Discerning Tastes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Traditional e-commerce strips fashion of its romance. Static imagery cannot capture the drape of cashmere, the ticking precision of a tourbillon, or the hand-patinated luster of Tuscan leather.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              LYVO LIVE revitalizes shopping through high-definition live broadcasts hosted by certified stylists and master horologists. Shoppers can converse directly with curators, examine tactile finishes on live camera, and reserve runway pieces with instantaneous checkout.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-[#EBE3D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A31D1C]/10 text-[#A31D1C] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Triple-Tier Authentication</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every garment, watch, and handbag in our catalog is physically examined and serialized by certified appraisers before shipping.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EBE3D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A31D1C]/10 text-[#A31D1C] flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Live Runway Studio</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pioneering shoppable video broadcasts with live pinned checkout, exclusive limited releases, and direct stylist advice.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EBE3D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A31D1C]/10 text-[#A31D1C] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Egyptian White-Glove Care</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Fast door-to-door courier dispatches across Cairo, Alexandria, and coastal retreats, backed by 14-day hassle-free returns.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-[#1C1614] text-[#FEFAE1] rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-stone-800">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Experience the Collection</h3>
          <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto">
            Explore curated arrivals from Milan, Paris, and Alexandria ateliers today.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-full text-xs font-bold transition-all shadow-md inline-flex items-center space-x-2"
            >
              <span>Explore The Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
