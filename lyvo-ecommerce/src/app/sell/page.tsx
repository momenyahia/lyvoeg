'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Radio, 
  ShieldCheck, 
  ArrowRight,
  Send
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SellOnLyvoPage() {
  const { submitSellerApplication, addToast } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    category: 'Fashion & Apparel',
    productCatalogUrl: '',
    annualTurnover: '5M - 20M EGP',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.email.trim()) return;

    submitSellerApplication(form);
    addToast('success', 'Application Received', 'Our brand onboarding team will review your dossier and get in touch within 48 hours.');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#A31D1C] font-bold bg-[#A31D1C]/10 px-3.5 py-1.5 rounded-full">
            Merchant Partnership Program
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Elevate Your Brand on LYVO
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join the premier luxury shopping destination in the Middle East. Showcase your collections to affluent connoisseurs through immersive live stream runways and high-converting storefronts.
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-[#EBE3D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A31D1C]/10 text-[#A31D1C] flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Live Commerce Access</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Broadcast directly to thousands of high-intent buyers with in-stream purchasing and live product pinning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EBE3D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A31D1C]/10 text-[#A31D1C] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Vetted Luxury Prestige</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Position your label alongside distinguished international ateliers, protected by our 100% authenticity guarantee.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EBE3D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A31D1C]/10 text-[#A31D1C] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Seamless Egyptian Logistics</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Integrated doorstep courier collection, InstaPay instant payouts, and managed customer returns.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE3D5] shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Dossier Submitted Successfully</h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                Thank you for applying to join LYVO. Our Merchant Curation Committee will examine your lookbook and reach out within 48 business hours.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Return to Storefront
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="pb-4 border-b border-stone-100">
                <h2 className="text-xl font-serif font-bold text-stone-900">Brand Application Dossier</h2>
                <p className="text-xs text-stone-500">Please provide verified business information</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Company / Atelier Name *</label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="e.g. Cairo Haute Couture House"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Primary Representative *</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="e.g. Yasmine Sherif"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Official Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="partnerships@brand.com"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+20 10x xxx xxxx"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Merchandise Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl"
                  >
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Horology & Timepieces">Horology & Timepieces</option>
                    <option value="Leather Goods & Handbags">Leather Goods & Handbags</option>
                    <option value="Fine Footwear">Fine Footwear</option>
                    <option value="High Jewelry">High Jewelry</option>
                    <option value="Beauty & Fragrance">Beauty & Fragrance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Annual Sales Volume (EGP)</label>
                  <select
                    value={form.annualTurnover}
                    onChange={(e) => setForm({ ...form, annualTurnover: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl"
                  >
                    <option value="< 1M EGP">&lt; 1M EGP</option>
                    <option value="1M - 5M EGP">1M - 5M EGP</option>
                    <option value="5M - 20M EGP">5M - 20M EGP</option>
                    <option value="> 20M EGP">&gt; 20M EGP</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Lookbook / Website / Portfolio Link</label>
                  <input
                    type="url"
                    value={form.productCatalogUrl}
                    onChange={(e) => setForm({ ...form, productCatalogUrl: e.target.value })}
                    placeholder="https://brand-portfolio.com or Instagram/Drive URL"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">Brand Heritage &amp; Production Details</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Describe your manufacturing origins, materials sourcing, and production capacity..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-stone-100">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-2xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-[#A31D1C]/25 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Partnership Application</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
