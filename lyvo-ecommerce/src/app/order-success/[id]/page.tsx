'use client';

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ArrowRight, 
  Printer, 
  Download, 
  MapPin, 
  CreditCard,
  PhoneCall,
  Clock
} from 'lucide-react';
import { useStore } from '@/lib/store';
import LyvoLogo from '@/components/ui/LyvoLogo';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderSuccessPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { getOrderById, formatPrice } = useStore();
  const order = getOrderById(resolvedParams.id);

  useEffect(() => {
    // Trigger celebratory confetti on client mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A31D1C', '#E4D0AB', '#FEFAE1', '#D4AF37']
      });
    } catch {
      // safe fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-serif text-stone-900 mb-2">Order Not Found</h1>
        <p className="text-stone-500 mb-6 text-sm">We could not locate this order in your session history.</p>
        <Link href="/shop" className="px-6 py-3 bg-[#A31D1C] text-white rounded-full font-bold">
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Celebration Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Thank You for Your Order
          </h1>
          <p className="text-stone-500 text-sm sm:text-base max-w-lg mx-auto">
            Your request has been officially received and dispatched to our luxury atelier for packaging.
          </p>
          <div className="inline-block bg-white px-4 py-2 rounded-xl border border-[#EBE3D5] text-xs font-mono font-bold text-stone-800 shadow-xs">
            Order Reference: <span className="text-[#A31D1C]">{order.orderNumber}</span>
          </div>
        </div>

        {/* Receipt Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE3D5] shadow-xs space-y-8 print:border-none print:shadow-none">
          
          {/* Top Receipt Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-stone-100 gap-4">
            <div className="flex items-center space-x-3">
              <LyvoLogo variant="badge" size="md" />
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A31D1C] font-bold">Official Invoice</span>
                <p className="text-xs text-stone-400 font-mono">Issued on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 no-print">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:text-[#A31D1C] hover:border-[#A31D1C] transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
              <Link
                href={`/track-order?orderNumber=${order.orderNumber}`}
                className="px-4 py-2 bg-[#A31D1C] text-white rounded-xl text-xs font-bold hover:bg-[#851615] transition-colors flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" /> Track Parcel
              </Link>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#EBE3D5] text-xs">
            <div>
              <span className="text-stone-400 block mb-0.5">Tracking Number</span>
              <span className="font-mono font-bold text-stone-900">{order.trackingNumber}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Estimated Arrival</span>
              <span className="font-bold text-stone-900">{order.estimatedDelivery}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Payment Method</span>
              <span className="font-bold uppercase text-stone-900">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Fulfillment Status</span>
              <span className="font-bold capitalize text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                {order.status}
              </span>
            </div>
          </div>

          {/* Shipping & Billing Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-600">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-[#A31D1C]" /> Delivery Address
              </div>
              <p className="font-semibold text-stone-900">{order.customer.fullName}</p>
              <p>{order.customer.address} {order.customer.apartment && `, ${order.customer.apartment}`}</p>
              <p>{order.customer.city}, {order.customer.governorate}</p>
              <p className="font-mono text-stone-500">{order.customer.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5 mb-2">
                <Clock className="w-4 h-4 text-[#A31D1C]" /> Delivery Protocol
              </div>
              <p className="text-stone-700">Courier assigned: <strong className="text-stone-900">LYVO Elite Logistics</strong></p>
              <p className="text-stone-700">Security seals intact guarantee.</p>
              <p className="text-stone-700">SMS notification will be sent prior to arrival.</p>
              <p className="text-stone-500 italic mt-2">{order.customer.notes || 'No custom delivery remarks.'}</p>
            </div>
          </div>

          {/* Ordered Items Table */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
              Items Ordered ({order.items.length})
            </h3>
            <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{item.product.name}</h4>
                      <p className="text-[11px] text-stone-400">
                        Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`} {item.selectedSize && `• ${item.selectedSize}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-stone-900 font-serif">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Financials */}
          <div className="space-y-2 pt-2 text-xs text-stone-600 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Promotional Discount</span>
                <span className="font-semibold">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-semibold text-stone-900">
                {order.shippingFee === 0 ? 'Complimentary' : formatPrice(order.shippingFee)}
              </span>
            </div>
            <div className="border-t border-stone-100 pt-2 flex justify-between items-baseline">
              <span className="font-bold text-sm text-stone-900">Total Charged</span>
              <span className="font-serif font-extrabold text-xl text-[#A31D1C]">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 no-print">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-stone-900 text-white hover:bg-stone-800 rounded-full text-xs font-bold transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/account"
            className="px-8 py-3.5 bg-white text-stone-800 border border-stone-300 hover:border-stone-400 rounded-full text-xs font-bold transition-colors"
          >
            View in My Account
          </Link>
        </div>
      </div>
    </div>
  );
}
