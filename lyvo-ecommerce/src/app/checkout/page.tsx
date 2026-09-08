'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Zap, 
  Building2, 
  ArrowLeft, 
  Lock, 
  Check, 
  Truck, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { PaymentMethod } from '@/lib/types';

const EGYPT_GOVERNORATES = [
  'Cairo',
  'Giza',
  'Alexandria',
  'Dakahlia',
  'Red Sea (Hurghada / El Gouna)',
  'South Sinai (Sharm El Sheikh)',
  'Qalyubia',
  'Sharqia',
  'Gharbia',
  'Monufia',
  'Beheira',
  'Ismailia',
  'Suez',
  'Port Said',
  'Damietta',
  'Fayoum',
  'Beni Suef',
  'Minya',
  'Asyut',
  'Sohag',
  'Qena',
  'Luxor',
  'Aswan',
  'Matruh (North Coast)'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    appliedCoupon, 
    placeOrder, 
    formatPrice, 
    addToast 
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Youssef El-Mansoury',
    email: 'youssef.mansoury@example.com',
    phone: '+20 100 892 4567',
    governorate: 'Cairo',
    city: 'New Cairo (Fifth Settlement)',
    address: 'Building 14, Lotus Compound, Road 90 South',
    apartment: 'Floor 3, Apt 302',
    postalCode: '11835',
    notes: 'Please call 10 minutes prior to delivery.'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-serif text-stone-900 mb-2">No Items to Checkout</h1>
        <p className="text-stone-500 mb-6 text-sm">Please add items to your shopping bag before checking out.</p>
        <Link href="/shop" className="px-6 py-3 bg-[#A31D1C] text-white rounded-full font-bold">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const finalShipping = shippingMethod === 'express' ? shippingFee + 10 : shippingFee;
  const grandTotal = cartTotal + (shippingMethod === 'express' ? 10 : 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Mobile phone is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City/District is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('error', 'Form Incomplete', 'Please fill in all required shipping details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const createdOrder = placeOrder({
          customer: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            apartment: formData.apartment,
            city: formData.city,
            governorate: formData.governorate,
            postalCode: formData.postalCode,
            notes: formData.notes,
          },
          items: [...cart],
          subtotal: cartSubtotal,
          discount: discountAmount,
          couponCode: appliedCoupon?.code,
          shippingFee: finalShipping,
          total: grandTotal,
          paymentMethod,
          paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
          status: 'confirmed',
        });

        addToast('success', 'Order Confirmed', `Order #${createdOrder.orderNumber} successfully received!`);
        router.push(`/order-success/${createdOrder.id}`);
      } catch {
        addToast('error', 'Checkout Error', 'Unable to complete order. Please try again.');
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/cart" className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-[#A31D1C] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Bag
          </Link>
          <div className="flex items-center space-x-1.5 text-xs text-stone-400">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Bank-Grade 256-Bit SSL Encrypted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Checkout Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-8">
              
              {/* Section 1: Contact Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#A31D1C] text-white flex items-center justify-center text-xs font-bold">1</span>
                    <h2 className="text-lg font-serif font-bold text-stone-900">Customer & Shipping Details</h2>
                  </div>
                  <span className="text-xs text-stone-400">Egypt Deliveries</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Karim El-Shazly"
                      className={`w-full px-4 py-3 text-sm bg-stone-50 border rounded-xl focus:outline-hidden focus:border-[#A31D1C] ${
                        errors.fullName ? 'border-red-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-3 text-sm bg-stone-50 border rounded-xl focus:outline-hidden focus:border-[#A31D1C] ${
                        errors.email ? 'border-red-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 10x xxx xxxx"
                      className={`w-full px-4 py-3 text-sm bg-stone-50 border rounded-xl focus:outline-hidden focus:border-[#A31D1C] ${
                        errors.phone ? 'border-red-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Governorate (المحافظة) *
                    </label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    >
                      {EGYPT_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Zamalek / Maadi / Sheikh Zayed"
                      className={`w-full px-4 py-3 text-sm bg-stone-50 border rounded-xl focus:outline-hidden focus:border-[#A31D1C] ${
                        errors.city ? 'border-red-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Street Address & Building *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street name, villa/building number"
                      className={`w-full px-4 py-3 text-sm bg-stone-50 border rounded-xl focus:outline-hidden focus:border-[#A31D1C] ${
                        errors.address ? 'border-red-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Apartment / Suite (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      placeholder="Apt, Floor, Landmark"
                      className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    >
                    </input>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="11511"
                      className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Courier Delivery Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Security gate code, preferred time window, ring bell..."
                      className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Tier */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#A31D1C] text-white flex items-center justify-center text-xs font-bold">2</span>
                    <h2 className="text-lg font-serif font-bold text-stone-900">Delivery Tier</h2>
                  </div>
                  <Truck className="w-4 h-4 text-stone-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label 
                    className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                      shippingMethod === 'standard' ? 'border-[#A31D1C] bg-[#A31D1C]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="mt-1 text-[#A31D1C] focus:ring-[#A31D1C]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between font-bold text-stone-900 mb-0.5">
                        <span>Standard Courier</span>
                        <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                      </div>
                      <p className="text-stone-500">2-3 Business Days anywhere in Egypt</p>
                    </div>
                  </label>

                  <label 
                    className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                      shippingMethod === 'express' ? 'border-[#A31D1C] bg-[#A31D1C]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="mt-1 text-[#A31D1C] focus:ring-[#A31D1C]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between font-bold text-stone-900 mb-0.5">
                        <span className="flex items-center gap-1">
                          VIP Priority Express <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-sm font-semibold">Fast</span>
                        </span>
                        <span>{formatPrice(shippingFee + 10)}</span>
                      </div>
                      <p className="text-stone-500">Same-Day / Next-Day Cairo & Giza dispatch</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#A31D1C] text-white flex items-center justify-center text-xs font-bold">3</span>
                    <h2 className="text-lg font-serif font-bold text-stone-900">Payment Solution</h2>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="space-y-3 pt-2">
                  {/* Card */}
                  <label 
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-[#A31D1C] bg-[#A31D1C]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#A31D1C] focus:ring-[#A31D1C]"
                      />
                      <CreditCard className="w-5 h-5 text-stone-700" />
                      <div>
                        <div className="font-bold text-xs text-stone-900">Credit / Debit Card</div>
                        <div className="text-[11px] text-stone-500">Visa, Mastercard, Meeza Cards accepted</div>
                      </div>
                    </div>
                    <div className="flex space-x-1.5 text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded-md">
                      Meeza / Visa
                    </div>
                  </label>

                  {/* InstaPay */}
                  <label 
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'instapay' ? 'border-[#A31D1C] bg-[#A31D1C]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'instapay'}
                        onChange={() => setPaymentMethod('instapay')}
                        className="text-[#A31D1C] focus:ring-[#A31D1C]"
                      />
                      <Zap className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-bold text-xs text-stone-900">InstaPay Direct Transfer (انستاباي)</div>
                        <div className="text-[11px] text-stone-500">Instant transfer with automatic Egyptian bank reference verification</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-1 rounded-md">
                      Instant 0% Fee
                    </span>
                  </label>

                  {/* valU BNPL */}
                  <label 
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'valu' ? 'border-[#A31D1C] bg-[#A31D1C]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'valu'}
                        onChange={() => setPaymentMethod('valu')}
                        className="text-[#A31D1C] focus:ring-[#A31D1C]"
                      />
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-bold text-xs text-stone-900">valU / Buy Now Pay Later (تقسيط ڤاليو)</div>
                        <div className="text-[11px] text-stone-500">Split into up to 36 easy monthly installments</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                      Up to 36 Mo.
                    </span>
                  </label>

                  {/* COD */}
                  <label 
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#A31D1C] bg-[#A31D1C]/5' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#A31D1C] focus:ring-[#A31D1C]"
                      />
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-bold text-xs text-stone-900">Cash on Delivery (الدفع عند الاستلام)</div>
                        <div className="text-[11px] text-stone-500">Pay cash upon parcel inspection at your doorstep</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-stone-100 text-stone-700 px-2 py-1 rounded-md">
                      Doorstep
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Sticky Order Review (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs space-y-6 sticky top-24">
              <h2 className="text-xl font-serif font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Review ({cart.length} items)
              </h2>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1 space-y-3">
                {cart.map((item) => {
                  const key = `${item.productId}-${item.selectedColor || ''}-${item.selectedSize || ''}`;
                  return (
                    <div key={key} className="pt-3 first:pt-0 flex items-center gap-3">
                      <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                        <span className="absolute top-0 right-0 bg-[#A31D1C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-md">
                          x{item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-bold text-stone-900 truncate">{item.product.name}</h4>
                        <div className="text-[11px] text-stone-400">
                          {item.selectedColor && `${item.selectedColor} • `}
                          {item.selectedSize && `Size ${item.selectedSize}`}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-stone-900 font-serif">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Voucher ({appliedCoupon?.code})</span>
                    <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping ({shippingMethod === 'express' ? 'Express Priority' : 'Standard'})</span>
                  <span className="font-semibold text-stone-900">
                    {finalShipping === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(finalShipping)}
                  </span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-stone-900">Total Due</span>
                  <span className="font-serif font-extrabold text-2xl text-[#A31D1C]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#A31D1C] hover:bg-[#851615] disabled:opacity-50 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#A31D1C]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Authorize {formatPrice(grandTotal)}</span>
                  </>
                )}
              </button>

              <div className="space-y-2 pt-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Doorstep parcel inspection allowed prior to payment.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant SMS and WhatsApp tracking dispatch updates.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
