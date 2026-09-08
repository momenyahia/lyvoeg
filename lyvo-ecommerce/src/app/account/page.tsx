'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  Heart, 
  MapPin, 
  User, 
  RotateCcw, 
  Truck, 
  ShoppingBag, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Plus,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';

export default function AccountPage() {
  const { 
    orders, 
    products, 
    wishlist, 
    formatPrice, 
    requestOrderReturn, 
    addToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  // Return Request Modal State
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedOrderForReturn, setSelectedOrderForReturn] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Size / fit did not match expectations');
  const [returnNotes, setReturnNotes] = useState('');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleOpenReturn = (orderId: string) => {
    setSelectedOrderForReturn(orderId);
    setReturnModalOpen(true);
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForReturn) return;

    requestOrderReturn(selectedOrderForReturn, returnReason, returnNotes);
    addToast('success', 'Return Request Submitted', 'Our courier team will contact you within 24 hours for doorstep inspection and collection.');
    setReturnModalOpen(false);
    setSelectedOrderForReturn(null);
    setReturnNotes('');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#A31D1C] text-[#FEFAE1] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              K
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Karim El-Shazly</h1>
                <span className="text-[10px] bg-[#A31D1C]/10 text-[#A31D1C] font-bold px-2 py-0.5 rounded-full uppercase">
                  VIP Club Member
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">karim.shazly@example.com • +20 100 892 4567</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="px-4 py-2 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <span className="text-stone-400 block">Available Rewards</span>
              <span className="font-bold text-[#A31D1C]">1,450 LYVO Points</span>
            </div>
          </div>
        </div>

        {/* Account Navigation Tabs */}
        <div className="flex border-b border-stone-200 space-x-6 sm:space-x-8 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-xs sm:text-sm font-bold flex items-center space-x-2 shrink-0 transition-colors relative ${
              activeTab === 'orders' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />}
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-4 text-xs sm:text-sm font-bold flex items-center space-x-2 shrink-0 transition-colors relative ${
              activeTab === 'wishlist' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistProducts.length})</span>
            {activeTab === 'wishlist' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />}
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-4 text-xs sm:text-sm font-bold flex items-center space-x-2 shrink-0 transition-colors relative ${
              activeTab === 'addresses' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Address Book</span>
            {activeTab === 'addresses' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-xs sm:text-sm font-bold flex items-center space-x-2 shrink-0 transition-colors relative ${
              activeTab === 'profile' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
            {activeTab === 'profile' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />}
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EBE3D5]">
                <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-stone-800 text-lg">No Orders Yet</h3>
                <p className="text-xs text-stone-500 mb-6">Explore our curated collection to place your first order.</p>
                <Link href="/shop" className="px-6 py-2.5 bg-[#A31D1C] text-white rounded-full text-xs font-bold">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-stone-100 gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-serif font-bold text-base text-stone-900">
                          Order #{order.orderNumber}
                        </h3>
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} • Tracking: <span className="font-mono text-stone-700">{order.trackingNumber}</span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/track-order?orderNumber=${order.orderNumber}`}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" /> Track Parcel
                      </Link>

                      {order.returnRequest ? (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                          Return Requested ({order.returnRequest.status})
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenReturn(order.id)}
                          className="px-4 py-2 border border-stone-200 hover:border-[#A31D1C] text-stone-600 hover:text-[#A31D1C] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Request Return
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items in this order */}
                  <div className="divide-y divide-stone-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-stone-900">{item.product.name}</h4>
                            <p className="text-[11px] text-stone-400">
                              Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`} {item.selectedSize && `• Size ${item.selectedSize}`}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-serif font-bold text-stone-900">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-stone-100 text-xs text-stone-500">
                    <div>
                      <span>Delivery to: <strong className="text-stone-800">{order.customer.city}, {order.customer.governorate}</strong></span>
                    </div>
                    <div>
                      <span>Total Paid: </span>
                      <span className="font-serif font-extrabold text-base text-[#A31D1C] ml-1">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EBE3D5]">
                <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-stone-800 text-lg">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-500 mb-6">Explore the shop and save your favorite items for later.</p>
                <Link href="/shop" className="px-6 py-2.5 bg-[#A31D1C] text-white rounded-full text-xs font-bold">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {wishlistProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Address Book */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-[#A31D1C] shadow-xs space-y-3 relative">
              <span className="absolute top-4 right-4 bg-[#A31D1C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Primary
              </span>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                <MapPin className="w-4 h-4 text-[#A31D1C]" />
                <span>Home (New Cairo)</span>
              </div>
              <p className="text-xs font-bold text-stone-900">Karim El-Shazly</p>
              <p className="text-xs text-stone-600">Building 14, Lotus Compound, Road 90 South</p>
              <p className="text-xs text-stone-600">Floor 3, Apt 302, New Cairo (Fifth Settlement), Cairo</p>
              <p className="text-xs font-mono text-stone-500">+20 100 892 4567</p>
              <div className="pt-2 flex space-x-3 text-xs">
                <button className="text-[#A31D1C] font-semibold hover:underline">Edit</button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>Summer Villa (North Coast)</span>
              </div>
              <p className="text-xs font-bold text-stone-900">Karim El-Shazly</p>
              <p className="text-xs text-stone-600">Villa 42, Hacienda White, KM 140</p>
              <p className="text-xs text-stone-600">Sidi Abdel Rahman, Matruh</p>
              <p className="text-xs font-mono text-stone-500">+20 100 892 4567</p>
              <div className="pt-2 flex space-x-3 text-xs">
                <button className="text-stone-700 font-semibold hover:underline">Set as Primary</button>
                <span className="text-stone-300">•</span>
                <button className="text-[#A31D1C] font-semibold hover:underline">Edit</button>
              </div>
            </div>

            <button className="rounded-3xl border-2 border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-stone-500 hover:text-[#A31D1C] hover:border-[#A31D1C] transition-colors">
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Add New Egyptian Address</span>
            </button>
          </div>
        )}

        {/* Tab 4: Profile & Security */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] space-y-6">
            <h2 className="text-lg font-serif font-bold text-stone-900 pb-3 border-b border-stone-100">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  defaultValue="Karim"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  defaultValue="El-Shazly"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="karim.shazly@example.com"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-semibold mb-1">Phone Number (Verified)</label>
                <input
                  type="text"
                  defaultValue="+20 100 892 4567"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button 
                onClick={() => addToast('success', 'Profile Updated', 'Your contact details have been successfully saved.')}
                className="px-6 py-2.5 bg-[#A31D1C] text-white rounded-xl text-xs font-bold hover:bg-[#851615] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Return Request Modal */}
      {returnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EBE3D5] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2 text-stone-900">
                <RotateCcw className="w-5 h-5 text-[#A31D1C]" />
                <h3 className="font-serif font-bold text-lg">Request Order Return</h3>
              </div>
              <button
                onClick={() => setReturnModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              LYVO offers a 14-day hassle-free return guarantee. Our luxury courier will arrive at your address to verify the security tags and collect the item.
            </p>

            <form onSubmit={handleSubmitReturn} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Reason for Return *</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                >
                  <option value="Size / fit did not match expectations">Size / fit did not match expectations</option>
                  <option value="Item does not match photography or description">Item does not match photography or description</option>
                  <option value="Damaged packaging or transit flaw">Damaged packaging or transit flaw</option>
                  <option value="Changed mind / Exchange for different luxury color">Changed mind / Exchange for different color</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Additional Notes / Preferred Collection Time</label>
                <textarea
                  rows={3}
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder="Please state if original tags and box are intact..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                <strong>Refund Policy:</strong> Once inspected by our atelier, refunds are processed within 48 hours to your original card, InstaPay account, or store credit.
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReturnModalOpen(false)}
                  className="px-4 py-2.5 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-xl font-bold shadow-md shadow-[#A31D1C]/20"
                >
                  Confirm Return Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
