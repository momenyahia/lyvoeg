'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Radio, 
  Eye, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  ChevronUp, 
  ChevronDown, 
  ShoppingBag, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function FloatingLivePlayer() {
  const router = useRouter();
  const pathname = usePathname();
  const { liveStreams, products, addToCart, formatPrice, addToast } = useStore();

  const [isMinimized, setIsMinimized] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Find the active live stream
  const activeStream = liveStreams.find((s) => s.status === 'live');
  const pinnedProduct = products.find((p) => p.id === activeStream?.pinnedProductId) || products[0];

  // Don't show floating player if already inside the dedicated live room or if no stream is live
  if (!activeStream || isDismissed || pathname.startsWith('/live/')) {
    return null;
  }

  const handleQuickAdd = () => {
    if (!pinnedProduct) return;
    addToCart(pinnedProduct, 1);
    addToast('success', 'Added to Shopping Bag', `1x ${pinnedProduct.name} reserved from live runway.`);
  };

  const handleExpandToStudio = () => {
    router.push(`/live/${activeStream.id}`);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 max-w-[340px] w-[calc(100vw-2rem)] transition-all duration-300">
      
      {/* Minimized Pill View */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-black/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-white/20 shadow-2xl flex items-center space-x-2.5 hover:scale-105 transition-all text-xs font-semibold group"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <Radio className="w-3.5 h-3.5 text-red-500" />
          <span className="text-[#FEFAE1] font-bold">LYVO LIVE ON AIR</span>
          <span className="text-[10px] text-stone-400 font-mono">({activeStream.viewerCount.toLocaleString()})</span>
          <ChevronUp className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors" />
        </button>
      ) : (
        /* Full Floating Player Card */
        <div className="bg-[#0E0C0B]/95 backdrop-blur-xl rounded-3xl border border-white/15 text-[#FEFAE1] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header Bar */}
          <div className="p-3 bg-stone-900/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                <Radio className="w-3 h-3" /> Live Runway
              </span>
              <span className="text-[10px] text-stone-400 font-mono">• {activeStream.viewerCount.toLocaleString()} watching</span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-stone-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                title="Minimize player"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 text-stone-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                title="Close floating player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Video Container (16:9) */}
          <div className="relative aspect-video w-full bg-black overflow-hidden group">
            <video
              src={activeStream.videoUrl}
              poster={activeStream.coverImage}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                title={isMuted ? 'Unmute host' : 'Mute host'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleExpandToStudio}
                className="px-2.5 py-1 rounded-full bg-[#A31D1C] text-white text-[10px] font-bold flex items-center space-x-1 shadow-md hover:bg-[#851615] transition-colors"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Full Broadcast</span>
              </button>
            </div>

            {/* Host Name Tag */}
            <div className="absolute top-2 left-2 pointer-events-none">
              <span className="text-[10px] font-semibold bg-black/60 backdrop-blur-xs text-[#FEFAE1] px-2 py-0.5 rounded-md">
                Host: {activeStream.hostName}
              </span>
            </div>
          </div>

          {/* Currently Pinned Product Widget */}
          {pinnedProduct && (
            <div className="p-3 bg-white/5 border-t border-white/10 space-y-2">
              <div className="flex items-center space-x-2.5">
                <div className="relative w-11 h-14 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-white/10">
                  <Image
                    src={pinnedProduct.images[0]}
                    alt={pinnedProduct.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#E4D0AB]">
                      {pinnedProduct.brand}
                    </span>
                    <span className="text-[9px] bg-red-600/30 text-red-300 font-bold px-1.5 py-0.2 rounded-xs">
                      On Air Drop
                    </span>
                  </div>
                  <h4 className="text-[11px] font-semibold text-[#FEFAE1] truncate mt-0.5">
                    {pinnedProduct.name}
                  </h4>
                  <div className="text-xs font-bold text-white font-mono mt-0.5">
                    {formatPrice(pinnedProduct.salePrice || pinnedProduct.regularPrice)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-2 bg-[#A31D1C] hover:bg-[#851615] text-white text-[11px] font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Instant Bag</span>
                </button>
                <button
                  onClick={handleExpandToStudio}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-[#FEFAE1] text-[11px] font-semibold rounded-xl flex items-center justify-center space-x-1 transition-colors"
                >
                  <span>Join Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
