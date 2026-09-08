'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Radio, 
  Flame, 
  Calendar, 
  Clock, 
  Eye, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  Bell, 
  Play, 
  Heart,
  Share2
} from 'lucide-react';
import { useStore } from '@/lib/store';
import LiveCard from '@/components/live/LiveCard';

export default function LiveShoppingHubPage() {
  const { liveStreams, addToast } = useStore();
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');

  const liveNow = liveStreams.filter((s) => s.status === 'live');
  const upcoming = liveStreams.filter((s) => s.status === 'upcoming');
  const pastReplays = liveStreams.filter((s) => s.status === 'ended');

  const filteredStreams = liveStreams.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const handleRemindMe = (title: string) => {
    addToast('success', 'Reminder Set', `You will receive a notification 15 minutes before "${title}" starts.`);
  };

  return (
    <div className="bg-[#1C1614] text-[#FEFAE1] min-h-screen pb-20">
      
      {/* Hero Banner with Dynamic Glow */}
      <div className="relative overflow-hidden border-b border-stone-800 bg-linear-to-b from-[#2D0B0A] via-[#1C1614] to-[#1C1614] pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A31D1C]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-[#E4D0AB]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#A31D1C] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>LYVO LIVE Shopping Experience</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Real-Time Runway, Exclusive Drops &amp; Instant Checkout.
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Watch leading stylists, brand ambassadors, and watchmakers present collections live from Milan and Cairo ateliers with limited-edition live drops and chat-exclusive coupons.
            </p>

            {liveNow.length > 0 && (
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/live/${liveNow[0].id}`}
                  className="px-8 py-4 bg-[#A31D1C] hover:bg-[#c22423] text-white rounded-2xl font-bold flex items-center space-x-2 shadow-xl shadow-[#A31D1C]/30 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Join On-Air Stream ({liveNow[0].viewerCount.toLocaleString()} Watching)</span>
                </Link>
                <div className="text-xs text-stone-400">
                  Featuring: <strong className="text-[#FEFAE1]">{liveNow[0].title}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Stream Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
        
        {/* Navigation Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filter === 'all' ? 'bg-[#A31D1C] text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              All Broadcasts ({liveStreams.length})
            </button>
            <button
              onClick={() => setFilter('live')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                filter === 'live' ? 'bg-[#A31D1C] text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Live Now ({liveNow.length})</span>
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filter === 'upcoming' ? 'bg-[#A31D1C] text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              Upcoming ({upcoming.length})
            </button>
            <button
              onClick={() => setFilter('ended')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filter === 'ended' ? 'bg-[#A31D1C] text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              Replays & Archives ({pastReplays.length})
            </button>
          </div>

          <div className="text-xs text-[#E4D0AB] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Exclusive coupons unlocked inside broadcast rooms</span>
          </div>
        </div>

        {/* Live Broadcasts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStreams.map((stream) => (
            <LiveCard key={stream.id} stream={stream} />
          ))}
        </div>

        {/* Schedule Preview Section */}
        {upcoming.length > 0 && (
          <div className="mt-16 bg-stone-900/60 rounded-3xl p-6 sm:p-10 border border-stone-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Broadcast Programming Schedule</h3>
                <p className="text-xs text-stone-400 mt-0.5">Upcoming premiere showcases with brand founders</p>
              </div>
              <Calendar className="w-5 h-5 text-[#E4D0AB]" />
            </div>

            <div className="divide-y divide-stone-800">
              {upcoming.map((stream) => (
                <div key={stream.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
                      <Image src={stream.coverImage} alt={stream.title} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#E4D0AB] uppercase tracking-wider block">
                        {stream.scheduledFor}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white">{stream.title}</h4>
                      <p className="text-xs text-stone-400">Host: {stream.hostName} ({stream.hostRole})</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleRemindMe(stream.title)}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#FEFAE1] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors w-full sm:w-auto justify-center"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Notify Me</span>
                    </button>
                    <Link
                      href={`/live/${stream.id}`}
                      className="px-4 py-2.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <span>Room Preview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
