'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Radio, 
  Eye, 
  Heart, 
  Pin, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Check, 
  AlertCircle,
  Play,
  Square
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function AdminLiveStudioPage() {
  const { liveStreams, products, pinProductInStream, sendChatMessage, addToast, formatPrice } = useStore();
  const [activeStream, setActiveStream] = useState(liveStreams[0]);
  const [announcementText, setAnnouncementText] = useState('');

  const pinnedProduct = products.find((p) => p.id === activeStream?.pinnedProductId) || products[0];

  const handlePinProduct = (productId: string) => {
    if (!activeStream) return;
    pinProductInStream(activeStream.id, productId);
    setActiveStream({ ...activeStream, pinnedProductId: productId });
    addToast('success', 'Product Pinned', 'Pinned item has been broadcast to all live viewers.');
  };

  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim() || !activeStream) return;

    sendChatMessage(activeStream.id, 'Host Announcement', announcementText.trim(), true);
    addToast('success', 'Broadcast Sent', 'Announcement sent to live stream chat.');
    setAnnouncementText('');
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="bg-[#1C1614] text-[#FEFAE1] rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs uppercase font-bold tracking-widest text-red-500">Live Broadcast Control Room</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">{activeStream?.title}</h1>
          <p className="text-xs text-stone-400">Host: {activeStream?.hostName} ({activeStream?.hostRole})</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={`/live/${activeStream?.id}`}
            target="_blank"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#FEFAE1] rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors border border-white/10"
          >
            <span>Open Public Room</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Stream Telemetry & Currently Pinned (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <div className="flex items-center space-x-2 text-stone-400 text-xs font-bold uppercase mb-1">
                <Eye className="w-4 h-4 text-red-500" />
                <span>Live Viewers</span>
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900">
                {activeStream?.viewerCount.toLocaleString()}
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <div className="flex items-center space-x-2 text-stone-400 text-xs font-bold uppercase mb-1">
                <Heart className="w-4 h-4 text-[#A31D1C]" />
                <span>Audience Likes</span>
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900">
                {activeStream?.likesCount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Currently Pinned Product */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <Pin className="w-4 h-4 text-[#A31D1C]" />
                <h3 className="font-serif font-bold text-base text-stone-900">Screen Pinned Product</h3>
              </div>
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Active on Screen
              </span>
            </div>

            {pinnedProduct && (
              <div className="flex items-center space-x-4 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                  <Image src={pinnedProduct.images[0]} alt={pinnedProduct.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#A31D1C]">{pinnedProduct.brand}</span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">{pinnedProduct.name}</h4>
                  <div className="text-sm font-bold font-serif text-[#A31D1C] mt-1">
                    {formatPrice(pinnedProduct.salePrice || pinnedProduct.regularPrice)}
                  </div>
                  <span className="text-[10px] text-stone-500">Stock available: {pinnedProduct.stockCount} units</span>
                </div>
              </div>
            )}

            {/* Broadcast Chat Announcement Form */}
            <form onSubmit={handleBroadcastAnnouncement} className="pt-2 space-y-2">
              <label className="block text-xs font-semibold text-stone-700">Send Host Announcement to Chat</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Use code LIVEVIP for 20% off right now!"
                  className="flex-1 px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Product Catalog for Pinning (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Featured Showcase Catalog</h3>
            <p className="text-xs text-stone-500">Click &ldquo;Pin to Screen&rdquo; to instantly display that product on all shopper devices</p>
          </div>

          <div className="divide-y divide-stone-100 max-h-[500px] overflow-y-auto pr-2">
            {products.map((p) => {
              const isCurrentlyPinned = p.id === activeStream?.pinnedProductId;
              return (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-stone-400 font-semibold">{p.brand}</span>
                      <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                      <span className="text-xs font-serif font-bold text-[#A31D1C]">
                        {formatPrice(p.salePrice || p.regularPrice)}
                      </span>
                    </div>
                  </div>

                  <div>
                    {isCurrentlyPinned ? (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Pinned
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePinProduct(p.id)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-[#A31D1C] text-white rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1"
                      >
                        <Pin className="w-3 h-3" /> Pin to Screen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
