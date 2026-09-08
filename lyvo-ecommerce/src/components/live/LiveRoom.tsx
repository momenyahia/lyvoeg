'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LiveStream, Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import {
  Users,
  Heart,
  ShoppingBag,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  Tag,
  Share2,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Flame,
  Radio,
  X
} from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  color: string;
}

export default function LiveRoom({ stream }: { stream: LiveStream }) {
  const router = useRouter();
  const {
    products,
    addToCart,
    applyCoupon,
    formatPrice,
    likeLiveStream,
    streamChats,
    sendChatMessage,
    setIsCartOpen
  } = useStore();

  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [viewerCount, setViewerCount] = useState(stream.viewerCount);
  const [likesCount, setLikesCount] = useState(stream.likesCount);
  const [activeTab, setActiveTab] = useState<'chat' | 'products'>('chat');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const chats = streamChats[stream.id] || [];
  const pinnedProduct = products.find(p => p.id === stream.pinnedProductId) || products[0];
  const showProducts = products.filter(p => stream.productIds.includes(p.id));

  useEffect(() => {
    if (pinnedProduct) {
      if (pinnedProduct.attributes.sizes?.length) {
        setSelectedSize(pinnedProduct.attributes.sizes[0]);
      }
      if (pinnedProduct.attributes.colors?.length) {
        setSelectedColor(pinnedProduct.attributes.colors[0].name);
      }
    }
  }, [pinnedProduct]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // Subtle realistic live viewer count fluctuations
  useEffect(() => {
    if (stream.status !== 'live') return;
    const interval = setInterval(() => {
      setViewerCount(prev => Math.max(50, prev + Math.floor(Math.random() * 7) - 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [stream.status]);

  // Periodic incoming live chatter simulation
  useEffect(() => {
    if (stream.status !== 'live') return;
    const mockComments = [
      { name: 'Farida Mansour', msg: 'The stitching on this is incredible 😍' },
      { name: 'Ahmed El-Gazzar', msg: 'Is there express delivery to New Cairo?' },
      { name: 'Maya Salama', msg: 'Just ordered in black! Thanks for the discount code' },
      { name: 'Kareem Fahd', msg: 'Can we see the inside pockets of the duffle please?' },
      { name: 'Salma Refaat', msg: 'The drape of that cashmere coat is so flattering' }
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < mockComments.length) {
        const comment = mockComments[count];
        sendChatMessage(stream.id, comment.name, comment.msg, false);
        count++;
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [stream.id, stream.status]);

  const triggerHeart = () => {
    likeLiveStream(stream.id);
    setLikesCount(prev => prev + 1);

    const colors = ['#A31D1C', '#ef4444', '#f43f5e', '#ec4899', '#E4D0AB'];
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: Math.floor(Math.random() * 60) + 20,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setFloatingHearts(prev => [...prev.slice(-15), newHeart]);

    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(stream.id, 'You (VIP Guest)', chatInput.trim(), false);
    setChatInput('');
    triggerHeart();
  };

  const handleQuickBuy = (product: Product) => {
    addToCart(product, 1, selectedColor, selectedSize);
    if (stream.exclusiveCoupon) {
      applyCoupon(stream.exclusiveCoupon);
    }
    setIsCartOpen(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] bg-black text-white flex flex-col lg:flex-row overflow-hidden select-none"
    >
      {/* LEFT / MAIN: Video Player & Overlays */}
      <div className="relative flex-1 bg-zinc-950 flex flex-col justify-between overflow-hidden min-h-[60vh] lg:min-h-full">
        {/* Video stream layer */}
        <div className="absolute inset-0 z-0 bg-zinc-950">
          {stream.videoUrl ? (
            <video
              ref={videoRef}
              src={stream.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={stream.coverImage}
                alt={stream.title}
                className="w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Radio className="w-16 h-16 text-[#A31D1C] animate-pulse mb-4" />
                <h3 className="text-2xl font-black uppercase tracking-wider">
                  Broadcast Starting Soon
                </h3>
                <p className="text-zinc-400 text-sm mt-2 max-w-md">
                  {stream.scheduledFor || 'Preparing the studio for the live drop.'}
                </p>
              </div>
            </div>
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70 pointer-events-none" />
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {floatingHearts.map(heart => (
            <div
              key={heart.id}
              style={{
                left: `${heart.x}%`,
                bottom: '80px',
                animation: 'floatUp 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards'
              }}
              className="absolute pointer-events-none transform -translate-x-1/2 flex items-center justify-center"
            >
              <Heart
                className="w-8 h-8 drop-shadow-lg animate-pulse"
                style={{ fill: heart.color, color: heart.color }}
              />
            </div>
          ))}
        </div>

        {/* TOP BAR OVERLAY: Stream Info, Host, Live Badge, Actions */}
        <div className="relative z-20 p-4 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/live"
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-colors"
              title="Back to All Shows"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            {/* Host Details */}
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <img
                src={stream.hostAvatar}
                alt={stream.hostName}
                className="w-8 h-8 rounded-full object-cover border border-[#A31D1C]"
              />
              <div className="pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-wide text-white">
                    {stream.hostName}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A31D1C] fill-[#A31D1C]" />
                </div>
                <p className="text-[10px] text-zinc-400">{stream.hostRole}</p>
              </div>
            </div>

            {/* Live Indicator */}
            {stream.status === 'live' ? (
              <div className="flex items-center gap-2 bg-[#A31D1C] text-white px-3 py-1 rounded-full text-xs font-black tracking-wider shadow-lg shadow-red-950/40 uppercase">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                LIVE
              </div>
            ) : (
              <div className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {stream.status}
              </div>
            )}

            {/* Audience counter */}
            <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 text-zinc-200">
              <Users className="w-3.5 h-3.5 text-red-400" />
              <span>{viewerCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-2">
            {stream.exclusiveCoupon && (
              <div className="hidden md:flex items-center gap-1.5 bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Code {stream.exclusiveCoupon} (-20%)</span>
              </div>
            )}

            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-colors"
              title="Share Stream"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-colors"
              title={isMuted ? 'Unmute Stream' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="hidden sm:flex p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* BOTTOM OVERLAY: Pinned Product Card & Instant Buy */}
        <div className="relative z-20 p-4 sm:p-6 flex flex-col sm:flex-row items-end justify-between gap-4">
          {pinnedProduct && (
            <div className="w-full sm:max-w-md bg-zinc-950/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-6 duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
                  <Flame className="w-3 h-3 text-red-500 animate-bounce" />
                  Currently Presenting Live
                </span>

                {pinnedProduct.oldPrice && (
                  <span className="text-[10px] font-extrabold bg-[#A31D1C] text-white px-2 py-0.5 rounded-full">
                    SAVE {Math.round(((pinnedProduct.oldPrice - (pinnedProduct.salePrice ?? pinnedProduct.regularPrice)) / pinnedProduct.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="flex gap-3.5">
                <Link href={`/product/${pinnedProduct.slug}`} className="shrink-0 group">
                  <img
                    src={pinnedProduct.images[0]}
                    alt={pinnedProduct.name}
                    className="w-20 h-20 rounded-xl object-cover bg-zinc-900 border border-white/10 group-hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/product/${pinnedProduct.slug}`}>
                    <h4 className="text-sm font-bold text-white hover:text-red-400 transition-colors line-clamp-1">
                      {pinnedProduct.name}
                    </h4>
                  </Link>

                  <p className="text-[11px] text-zinc-400 mt-0.5 uppercase tracking-wide">
                    {pinnedProduct.brand} • {pinnedProduct.category}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-black text-white">
                      {formatPrice(pinnedProduct.salePrice ?? pinnedProduct.regularPrice)}
                    </span>
                    {pinnedProduct.oldPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        {formatPrice(pinnedProduct.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sizes Selector */}
              {pinnedProduct.attributes.sizes && pinnedProduct.attributes.sizes.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-zinc-400">Size:</span>
                  <div className="flex gap-1.5">
                    {pinnedProduct.attributes.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                          selectedSize === size
                            ? 'bg-[#A31D1C] text-white shadow-xs'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Instant Add to Bag & Details */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickBuy(pinnedProduct)}
                  className="flex items-center justify-center gap-1.5 bg-[#A31D1C] hover:bg-red-800 text-white py-2.5 px-3 rounded-xl text-xs font-black shadow-lg shadow-red-950/30 transition-all active:scale-98"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Instant Bag</span>
                </button>

                <Link
                  href={`/product/${pinnedProduct.slug}`}
                  className="flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors border border-white/10"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Reaction Heart Button */}
          <div className="flex flex-row sm:flex-col items-center gap-3">
            <button
              onClick={triggerHeart}
              className="relative p-3.5 rounded-full bg-[#A31D1C] hover:bg-red-700 text-white shadow-2xl shadow-red-950/50 active:scale-125 transition-transform flex items-center justify-center group"
              title="Send Love to Host"
            >
              <Heart className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-xs font-black text-zinc-300 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
              {likesCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Live Interactive Chat & Show Catalog */}
      <div className="w-full lg:w-96 xl:w-105 bg-zinc-900 border-l border-zinc-800 flex flex-col h-[50vh] lg:h-auto z-20">
        {/* Tab switcher */}
        <div className="p-3 border-b border-zinc-800 flex items-center gap-2 bg-zinc-950">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'chat'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Live Chat</span>
            <span className="px-1.5 py-0.2 rounded-full bg-red-600/20 text-red-400 text-[10px]">
              {chats.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'products'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Show Catalog</span>
            <span className="px-1.5 py-0.2 rounded-full bg-zinc-700 text-zinc-300 text-[10px]">
              {showProducts.length}
            </span>
          </button>
        </div>

        {/* TAB 1: LIVE CHAT */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scroll-smooth">
              {stream.exclusiveCoupon && (
                <div className="bg-red-950/40 border border-[#A31D1C]/40 rounded-xl p-3 text-xs text-red-200 flex items-start gap-2.5">
                  <Tag className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Live Show Promo: </span>
                    Apply code <strong className="text-red-400">{stream.exclusiveCoupon}</strong> at checkout for exclusive instant savings!
                  </div>
                </div>
              )}

              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`flex items-start gap-2.5 text-xs ${
                    chat.isHost ? 'bg-zinc-800/60 p-2.5 rounded-xl border border-[#A31D1C]/40' : ''
                  }`}
                >
                  <img
                    src={chat.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'}
                    alt={chat.senderName}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-bold truncate ${
                          chat.isHost ? 'text-red-400' : 'text-zinc-300'
                        }`}
                      >
                        {chat.senderName}
                      </span>
                      {chat.isHost && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-[#A31D1C] text-white uppercase">
                          Host
                        </span>
                      )}
                      <span className="text-[10px] text-zinc-500 ml-auto">{chat.timestamp}</span>
                    </div>
                    <p className="text-zinc-200 mt-0.5 leading-relaxed break-words">
                      {chat.message}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-950 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask host a question or comment..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#A31D1C]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#A31D1C] hover:bg-red-800 text-white transition-colors disabled:opacity-50"
                disabled={!chatInput.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: PRODUCTS IN THIS SHOW */}
        {activeTab === 'products' && (
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Tagged in this Broadcast ({showProducts.length})
              </span>
            </div>

            {showProducts.map(product => {
              const isCurrentlyPinned = product.id === stream.pinnedProductId;
              return (
                <div
                  key={product.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrentlyPinned
                      ? 'bg-red-950/20 border-[#A31D1C]/60 shadow-md'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      {isCurrentlyPinned && (
                        <span className="inline-block text-[9px] font-black uppercase tracking-wider text-red-400 mb-0.5">
                          On Air Now
                        </span>
                      )}
                      <h5 className="text-xs font-bold text-white truncate">{product.name}</h5>
                      <p className="text-[10px] text-zinc-400">{product.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-white">
                          {formatPrice(product.salePrice ?? product.regularPrice)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[10px] text-zinc-500 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-[11px] font-bold text-zinc-400 hover:text-white"
                    >
                      View Specs
                    </Link>

                    <button
                      onClick={() => handleQuickBuy(product)}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-[#A31D1C] hover:bg-red-800 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Share Live Shopping Stream</h4>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Invite friends to watch the live show and enjoy interactive shopping discounts together.
            </p>

            <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="bg-transparent text-xs text-zinc-300 flex-1 outline-none truncate"
              />
              <button
                onClick={handleCopyShare}
                className="bg-[#A31D1C] hover:bg-red-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center gap-1"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Hearts CSS Keyframes */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translate(-50%, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -40px) scale(1.1);
          }
          50% {
            transform: translate(-30%, -180px) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translate(-60%, -360px) scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
