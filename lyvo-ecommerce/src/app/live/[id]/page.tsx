'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import LiveRoom from '@/components/live/LiveRoom';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LiveRoomRoute({ params }: PageProps) {
  const resolvedParams = use(params);
  const { liveStreams } = useStore();

  const stream = liveStreams.find((s) => s.id === resolvedParams.id) || liveStreams[0];

  if (!stream) {
    return (
      <div className="min-h-screen bg-[#1C1614] text-[#FEFAE1] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif mb-2">Broadcast Not Found</h1>
        <p className="text-stone-400 text-sm mb-6">This live room does not exist or has been archived.</p>
        <Link href="/live" className="px-6 py-3 bg-[#A31D1C] text-white rounded-full text-xs font-bold">
          Return to LYVO LIVE Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#1C1614] min-h-screen text-[#FEFAE1]">
      <LiveRoom stream={stream} />
    </div>
  );
}
