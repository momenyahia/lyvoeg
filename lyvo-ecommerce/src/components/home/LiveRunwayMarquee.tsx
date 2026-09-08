'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, Sparkles, Truck, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function LiveRunwayMarquee() {
  const { liveStreams } = useStore();
  const activeStream = liveStreams.find((s) => s.status === 'live');

  const marqueeItems = [
    {
      type: 'live',
      label: activeStream ? `🔴 ON AIR: ${activeStream.title.toUpperCase()}` : '🔴 LYVO LIVE RUNWAY STREAM',
      href: activeStream ? `/live/${activeStream.id}` : '/live',
      badge: 'TAP TO WATCH',
    },
    {
      type: 'perk',
      label: 'SAME-DAY & 24H VIP COURIER DISPATCH ACROSS CAIRO & GIZA',
      href: '/help',
      badge: 'PRIORITY',
    },
    {
      type: 'promo',
      label: 'APPLY CODE "LYVOLUXURY" FOR 15% OFF AT CHECKOUT',
      href: '/shop',
      badge: 'CODE: LYVOLUXURY',
    },
    {
      type: 'perk',
      label: 'DOORSTEP INSPECTION ALLOWED PRIOR TO PAYMENT — 14-DAY GUARANTEE',
      href: '/help',
      badge: 'VERIFIED',
    },
    {
      type: 'payment',
      label: 'INSTAPAY DIRECT INSTANT BANK TRANSFER & VALU UP TO 36 MONTHS',
      href: '/checkout',
      badge: '0% FEES',
    },
  ];

  return (
    <div className="bg-[#0E0C0B] text-[#FEFAE1] border-y border-white/10 py-3 overflow-hidden select-none relative z-10">
      <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap text-xs font-mono tracking-widest uppercase">
        {marqueeItems.concat(marqueeItems).map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="flex items-center space-x-3 hover:text-[#E4D0AB] transition-colors group shrink-0"
          >
            <span className="font-bold tracking-wider">{item.label}</span>
            <span className="text-[10px] bg-[#A31D1C] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-0.5 group-hover:scale-105 transition-transform">
              <span>{item.badge}</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
            <span className="text-stone-600">•</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
