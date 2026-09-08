'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  ArrowRight, 
  PhoneCall, 
  HelpCircle 
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Order, OrderStatus } from '@/lib/types';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const { orders, formatPrice } = useStore();
  
  const initialQuery = searchParams.get('orderNumber') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    } else if (orders.length > 0) {
      // Default to the latest order for immediate preview
      setSearchedOrder(orders[0]);
      setSearched(true);
      setQuery(orders[0].orderNumber);
    }
  }, [initialQuery, orders]);

  const handleSearch = (searchTerm: string) => {
    const clean = searchTerm.trim().toLowerCase();
    if (!clean) return;
    
    const found = orders.find(
      (o) => 
        o.orderNumber.toLowerCase() === clean || 
        o.trackingNumber.toLowerCase() === clean ||
        o.customer.email.toLowerCase() === clean ||
        o.customer.phone.includes(clean)
    );

    setSearchedOrder(found || null);
    setSearched(true);
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'processing':
      case 'packed':
        return 2;
      case 'shipped':
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
      case 'returned':
        return -1;
      default:
        return 1;
    }
  };

  const currentStep = searchedOrder ? getStatusStepIndex(searchedOrder.status) : 0;

  const steps = [
    { label: 'Order Placed', desc: 'Received & Queued' },
    { label: 'Confirmed', desc: 'Payment Authorized' },
    { label: 'Atelier Processing', desc: 'Inspected & Sealed' },
    { label: 'Out for Delivery', desc: 'Courier Dispatched' },
    { label: 'Delivered', desc: 'Signed & Complete' }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#A31D1C] font-bold bg-[#A31D1C]/10 px-3 py-1 rounded-full">
            Real-Time Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Track Your LYVO Parcel
          </h1>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Enter your order reference code or phone number to monitor fulfillment in real time.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-4">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. LYVO-2026-8942 or LYVO-2026-9014"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#EBE3D5] rounded-2xl text-sm focus:outline-hidden focus:border-[#A31D1C] shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#A31D1C] hover:bg-[#851615] text-white text-xs font-bold rounded-2xl transition-all shadow-md shadow-[#A31D1C]/20"
              >
                Track
              </button>
            </form>
          </div>
        </div>

        {/* Search Results */}
        {searched && !searchedOrder && (
          <div className="bg-white rounded-3xl p-8 border border-[#EBE3D5] text-center space-y-4 max-w-lg mx-auto">
            <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-stone-900">Order Reference Not Found</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              We couldn&apos;t find an active shipment matching &ldquo;<span className="font-mono text-stone-700">{query}</span>&rdquo;. 
              Please verify your order number in your confirmation email or WhatsApp notification.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="text-xs font-bold text-[#A31D1C] hover:underline">
                Contact Concierge Support →
              </Link>
            </div>
          </div>
        )}

        {searchedOrder && (
          <div className="space-y-6">
            
            {/* Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-stone-100 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                      Order #{searchedOrder.orderNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {searchedOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Carrier: LYVO Priority Express • Tracking ID: <span className="font-mono text-stone-700 font-bold">{searchedOrder.trackingNumber}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-stone-400 block">Estimated Arrival</span>
                  <span className="text-base font-bold text-[#A31D1C] font-serif">
                    {searchedOrder.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="py-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-stone-100 -z-0">
                    <div 
                      className="h-full bg-[#A31D1C] transition-all duration-700" 
                      style={{ width: `${Math.min(100, Math.max(0, (currentStep / (steps.length - 1)) * 100))}%` }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                    {steps.map((step, idx) => {
                      const isComplete = idx <= currentStep;
                      const isCurrent = idx === currentStep;

                      return (
                        <div key={idx} className="flex sm:flex-col items-center sm:text-center space-x-4 sm:space-x-0">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                              isComplete 
                                ? 'bg-[#A31D1C] text-white ring-4 ring-[#A31D1C]/20' 
                                : 'bg-stone-100 text-stone-400 border border-stone-200'
                            }`}
                          >
                            {isComplete ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                          </div>
                          <div className="sm:mt-3">
                            <div className={`text-xs font-bold ${isCurrent ? 'text-[#A31D1C]' : 'text-stone-800'}`}>
                              {step.label}
                            </div>
                            <div className="text-[10px] text-stone-400 sm:mt-0.5">
                              {step.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status History Logs */}
              <div className="pt-6 border-t border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-4">
                  Fulfillment Milestone Updates
                </h3>
                <div className="space-y-4">
                  {searchedOrder.statusHistory.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#A31D1C] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <span className="font-bold text-stone-800 mr-2 capitalize">
                          {item.status.replace('_', ' ')}
                        </span>
                        <span className="text-stone-600">{item.note}</span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination & Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-[#EBE3D5] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                  <MapPin className="w-4 h-4 text-[#A31D1C]" />
                  <span>Destination Address</span>
                </div>
                <p className="text-xs font-semibold text-stone-800">{searchedOrder.customer.fullName}</p>
                <p className="text-xs text-stone-600">{searchedOrder.customer.address}, {searchedOrder.customer.city}</p>
                <p className="text-xs text-stone-600">{searchedOrder.customer.governorate} • {searchedOrder.customer.phone}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EBE3D5] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                    <HelpCircle className="w-4 h-4 text-[#A31D1C]" />
                    <span>Need Help with this Order?</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Our dedicated concierge can amend delivery windows, re-route couriers, or handle special instructions.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Courier
                  </a>
                  <Link
                    href="/help"
                    className="px-4 py-2 border border-stone-200 text-stone-700 hover:border-stone-400 rounded-xl text-xs font-bold transition-colors"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] p-10 text-center">Loading shipment data...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
