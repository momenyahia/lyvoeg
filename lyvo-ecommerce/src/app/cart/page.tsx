'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    formatPrice, 
    addToast 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponError('');
      setCouponInput('');
      addToast('success', 'Promo Code Applied', res.message);
    } else {
      setCouponError(res.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-24 h-24 rounded-full bg-[#EBE3D5]/50 flex items-center justify-center text-stone-400 mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Your Shopping Bag is Empty</h1>
        <p className="text-stone-500 max-w-md mb-8 text-sm">
          Discover our curated collection of luxury fashion, chronographs, and artisanal lifestyle essentials.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-full font-bold shadow-lg shadow-[#A31D1C]/20 transition-all flex items-center space-x-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EBE3D5] mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Shopping Bag</h1>
            <p className="text-stone-500 text-sm mt-1">Review your luxury selections before checkout</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={clearCart}
              className="text-xs text-stone-400 hover:text-[#A31D1C] transition-colors"
            >
              Empty Bag
            </button>
            <Link
              href="/shop"
              className="text-xs font-semibold text-stone-700 hover:text-[#A31D1C] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#EBE3D5] divide-y divide-stone-100">
              {cart.map((item) => {
                const itemKey = `${item.productId}-${item.selectedColor || ''}-${item.selectedSize || ''}`;
                return (
                  <div key={itemKey} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    {/* Image */}
                    <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A31D1C]">
                        {item.product.brand}
                      </span>
                      <h3 className="text-base font-serif font-bold text-stone-900 truncate">
                        <Link href={`/product/${item.product.slug}`} className="hover:text-[#A31D1C]">
                          {item.product.name}
                        </Link>
                      </h3>
                      
                      {/* Attributes */}
                      <div className="flex flex-wrap gap-3 text-xs text-stone-500">
                        {item.selectedColor && (
                          <span>Color: <strong className="text-stone-800">{item.selectedColor}</strong></span>
                        )}
                        {item.selectedSize && (
                          <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                        )}
                      </div>

                      <div className="text-sm font-bold text-stone-900 pt-1">
                        {formatPrice(item.unitPrice)} each
                      </div>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0">
                      <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1, item.selectedVariant?.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1, item.selectedVariant?.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-extrabold text-[#A31D1C] font-serif">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId, item.selectedVariant?.id)}
                          className="text-[11px] text-stone-400 hover:text-red-600 flex items-center gap-1 mt-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shipping & Delivery Guarantee Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#EBE3D5] flex items-center space-x-3">
                <Truck className="w-6 h-6 text-[#A31D1C] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Complimentary Express Shipping</h4>
                  <p className="text-[11px] text-stone-500">Orders over $150 (7,500 EGP) receive free priority dispatch.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#EBE3D5] flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-[#A31D1C] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Insured Delivery & Verification</h4>
                  <p className="text-[11px] text-stone-500">Every parcel includes authenticity certificates and sealed tamper seals.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] space-y-6 shadow-xs sticky top-24">
              <h2 className="text-xl font-serif font-bold text-stone-900 pb-4 border-b border-stone-100">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Promotional Voucher
                </label>
                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold text-xs text-emerald-800">{appliedCoupon.code}</span>
                        <p className="text-[10px] text-emerald-600">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="e.g. LYVOLUXURY or WELCOME10"
                        className="flex-1 px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl uppercase focus:outline-hidden focus:border-[#A31D1C]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-500 font-medium">{couponError}</p>
                    )}
                    <p className="text-[10px] text-stone-400">Available: WELCOME10, LYVOLUXURY, LIVEVIP</p>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-stone-100 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Applied</span>
                    <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-stone-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">Complimentary</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-base text-stone-900">Grand Total</span>
                  <span className="font-serif font-extrabold text-2xl text-[#A31D1C]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#A31D1C]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-400">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
