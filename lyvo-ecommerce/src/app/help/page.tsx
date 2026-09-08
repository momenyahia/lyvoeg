'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  CreditCard, 
  Radio, 
  Search,
  ArrowRight
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Orders & Delivery',
    question: 'How fast does LYVO deliver across Egypt?',
    answer: 'Standard courier delivery takes 24 to 72 business hours depending on your governorate. For Greater Cairo and Giza, we provide VIP Priority Express delivery which delivers orders on the same day or within 24 hours.'
  },
  {
    category: 'Orders & Delivery',
    question: 'Can I inspect my package before paying the courier?',
    answer: 'Yes! LYVO permits doorstep exterior package verification with all cash-on-delivery and standard couriers. Our tamper seals ensure your luxury piece has remained untouched since leaving our atelier.'
  },
  {
    category: 'Authenticity',
    question: 'Are all luxury items guaranteed 100% genuine?',
    answer: 'Unconditionally yes. Every single timepiece, leather accessory, and apparel piece is sourced directly from accredited global fashion houses and local luxury ateliers. Each parcel arrives with a serialized certificate of authenticity.'
  },
  {
    category: 'Payments',
    question: 'What payment methods do you support in Egypt?',
    answer: 'We support Visa, Mastercard, and national Meeza cards, Cash on Delivery (COD), InstaPay direct transfers with instant bank confirmation, and valU buy-now-pay-later installments with flexible tenures up to 36 months.'
  },
  {
    category: 'Returns',
    question: 'What is your return and exchange policy?',
    answer: 'We provide a 14-day hassle-free return guarantee. You can request a return directly from your Account dashboard or contact our concierge. Our courier will pick up the item from your doorstep at zero extra hassle.'
  },
  {
    category: 'Live Shopping',
    question: 'How does LYVO LIVE shopping work?',
    answer: 'During live broadcasts, certified stylists present collections on runway video. The host pins featured items to the screen in real-time, allowing you to view details, select your size, and complete checkout without pausing or leaving the broadcast.'
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Orders & Delivery', 'Authenticity', 'Payments', 'Returns', 'Live Shopping'];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#A31D1C] font-bold bg-[#A31D1C]/10 px-3.5 py-1.5 rounded-full">
            Client Assistance &amp; FAQ
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
            How May We Assist You?
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            Find immediate answers regarding orders, authentication, InstaPay transfers, and live runway shopping.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions (e.g. delivery, InstaPay, return)..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#EBE3D5] rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-[#A31D1C] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-[#A31D1C] text-white shadow-sm' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE3D5] shadow-xs divide-y divide-stone-100">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#A31D1C] transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#A31D1C]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed pr-6 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Links Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/track-order"
            className="p-6 bg-white rounded-3xl border border-[#EBE3D5] shadow-xs flex items-center justify-between group hover:border-[#A31D1C] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-[#A31D1C]" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Track an Active Parcel</h4>
                <p className="text-[11px] text-stone-500">Check courier status with your order reference</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#A31D1C] transition-colors" />
          </Link>

          <Link
            href="/contact"
            className="p-6 bg-white rounded-3xl border border-[#EBE3D5] shadow-xs flex items-center justify-between group hover:border-[#A31D1C] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-6 h-6 text-[#A31D1C]" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Contact Private Concierge</h4>
                <p className="text-[11px] text-stone-500">Speak directly with a VIP advisor or WhatsApp</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#A31D1C] transition-colors" />
          </Link>
        </div>

      </div>
    </div>
  );
}
