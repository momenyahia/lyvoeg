'use client';

import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Sparkles, 
  Percent, 
  DollarSign,
  Gift
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Coupon } from '@/lib/types';

export default function AdminCampaignsPage() {
  const { coupons, addToast, formatPrice } = useStore();
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>(coupons);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newCoupon, setNewCoupon] = useState<Coupon>({
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 50,
    expiresAt: '2026-12-31',
    isActive: true,
    description: 'Special seasonal promotion'
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    const formattedCode = newCoupon.code.trim().toUpperCase();
    const created = { ...newCoupon, code: formattedCode };
    setActiveCoupons([created, ...activeCoupons]);
    addToast('success', 'Coupon Created', `Coupon code ${formattedCode} is now live.`);
    setIsModalOpen(false);
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minSpend: 50,
      expiresAt: '2026-12-31',
      isActive: true,
      description: 'Special seasonal promotion'
    });
  };

  const handleToggleActive = (code: string) => {
    setActiveCoupons(
      activeCoupons.map((c) => c.code === code ? { ...c, isActive: !c.isActive } : c)
    );
    addToast('info', 'Coupon Updated', `Coupon status toggled.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Promotions, Coupons &amp; Banners</h1>
          <p className="text-xs text-stone-500">Configure promotional vouchers, flash deal campaigns, and VIP discounts</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Voucher</span>
        </button>
      </div>

      {/* Active Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCoupons.map((coupon) => (
          <div 
            key={coupon.code} 
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#A31D1C] flex items-center justify-center border border-[#EBE3D5]">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-base text-stone-900 tracking-wider">
                    {coupon.code}
                  </h3>
                  <span className="text-[10px] text-stone-400">Expires: {coupon.expiresAt}</span>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                coupon.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
              }`}>
                {coupon.isActive ? 'Active' : 'Disabled'}
              </span>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
              <div className="text-xs font-bold text-stone-800">
                {coupon.discountType === 'percentage' 
                  ? `${coupon.discountValue}% Discount` 
                  : `${formatPrice(coupon.discountValue)} Fixed Rebate`}
              </div>
              <p className="text-[11px] text-stone-500">{coupon.description}</p>
              {coupon.minSpend && (
                <p className="text-[10px] text-stone-400">Min spend: {formatPrice(coupon.minSpend)}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
              <button
                onClick={() => handleToggleActive(coupon.code)}
                className="text-stone-600 hover:text-stone-900 font-semibold"
              >
                {coupon.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <span className="text-[11px] font-mono text-[#A31D1C]">Ready at Checkout</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-stone-900">Create Voucher</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Coupon Code (Uppercase) *</label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. CAIROVIP25"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Discount Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Value</label>
                  <input
                    type="number"
                    min="1"
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Minimum Spend ($)</label>
                <input
                  type="number"
                  value={newCoupon.minSpend || 0}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minSpend: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Campaign Description</label>
                <input
                  type="text"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="e.g. 15% off for live viewers"
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#A31D1C] text-white rounded-xl font-bold hover:bg-[#851615]"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
