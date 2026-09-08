'use client';

import React from 'react';
import Link from 'next/link';
import { LiveStream } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Users, Play, Heart, Tag, Clock } from 'lucide-react';

interface LiveCardProps {
  stream: LiveStream;
  compact?: boolean;
}

export default function LiveCard({ stream, compact = false }: LiveCardProps) {
  const { products, formatPrice } = useStore();

  const pinnedProduct = products.find(p => p.id === stream.pinnedProductId);
  const isLive = stream.status === 'live';
  const isUpcoming = stream.status === 'upcoming';
  const isEnded = stream.status === 'ended';

  return (
    <div className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#A31D1C]/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-950/30 flex flex-col">
      {/* Thumbnail & Video Cover */}
      <div className="relative aspect-4/5 sm:aspect-16/10 w-full overflow-hidden bg-zinc-950">
        <img
          src={stream.coverImage}
          alt={stream.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#A31D1C] text-white shadow-lg shadow-red-950/50 uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              LIVE
            </span>
          )}

          {isUpcoming && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-zinc-950 shadow-lg uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              UPCOMING
            </span>
          )}

          {isEnded && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300 shadow-md uppercase tracking-wider">
              <Play className="w-3 h-3 text-red-500 fill-red-500" />
              REPLAY
            </span>
          )}

          {/* Viewers or Likes */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
            {isLive ? (
              <>
                <Users className="w-3 h-3 text-red-400" />
                <span>{stream.viewerCount.toLocaleString()} watching</span>
              </>
            ) : isUpcoming ? (
              <>
                <Users className="w-3 h-3 text-amber-400" />
                <span>{stream.viewerCount} waiting</span>
              </>
            ) : (
              <>
                <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                <span>{stream.likesCount.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>

        {/* Live Coupon Badge */}
        {stream.exclusiveCoupon && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-white text-zinc-900 shadow-md">
              <Tag className="w-3 h-3 text-[#A31D1C]" />
              {stream.exclusiveCoupon}
            </span>
          </div>
        )}

        {/* Pinned Product Quick Tag floating at bottom */}
        {pinnedProduct && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="bg-black/80 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-3">
              <img
                src={pinnedProduct.images[0]}
                alt={pinnedProduct.name}
                className="w-11 h-11 rounded-lg object-cover bg-zinc-900 border border-white/10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-red-400">
                  Featured Live
                </span>
                <h5 className="text-xs font-bold text-white truncate">{pinnedProduct.name}</h5>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-black text-white">
                    {formatPrice(pinnedProduct.salePrice ?? pinnedProduct.regularPrice)}
                  </span>
                  {pinnedProduct.oldPrice && (
                    <span className="text-[10px] text-zinc-400 line-through">
                      {formatPrice(pinnedProduct.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stream Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Host Info */}
          <div className="flex items-center gap-2.5 mb-2">
            <img
              src={stream.hostAvatar}
              alt={stream.hostName}
              className="w-7 h-7 rounded-full object-cover border border-[#A31D1C]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-zinc-200 truncate">{stream.hostName}</p>
              <p className="text-[10px] text-zinc-400 truncate">{stream.hostRole}</p>
            </div>
          </div>

          <Link href={`/live/${stream.id}`}>
            <h4 className="text-sm font-bold text-white hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {stream.title}
            </h4>
          </Link>

          {!compact && (
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {stream.description}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {stream.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/live/${stream.id}`}
            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              isLive
                ? 'bg-[#A31D1C] hover:bg-red-800 text-white shadow-md shadow-red-950/30'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            {isLive ? (
              <>
                <span>Join Show</span>
                <Play className="w-3 h-3 fill-white" />
              </>
            ) : isUpcoming ? (
              <span>Notify Me</span>
            ) : (
              <>
                <span>Watch Replay</span>
                <Play className="w-3 h-3" />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
