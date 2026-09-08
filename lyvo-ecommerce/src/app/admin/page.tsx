'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  TrendingUp, 
  AlertTriangle, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  PackageCheck 
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { OrderStatus } from '@/lib/types';

export default function AdminOverviewPage() {
  const { orders, products, liveStreams, updateOrderStatus, formatPrice, addToast } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const totalLiveViewers = liveStreams.reduce((sum, s) => sum + (s.status === 'live' ? s.viewerCount : 0), 0);

  const lowStockProducts = products.filter((p) => p.stockCount <= 10);
  const recentOrders = orders.slice(0, 5);

  const handleQuickStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status, `Admin quick action: updated to ${status}`);
    addToast('success', 'Order Updated', `Order status changed to ${status}`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#A31D1C]">LYVO Commerce Intelligence</span>
          <h1 className="text-2xl font-serif font-bold text-stone-900 mt-1">Atelier Operations Overview</h1>
          <p className="text-xs text-stone-500 mt-0.5">Real-time inventory levels, orders dispatch pipeline, and live audience metrics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/live"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Open Live Studio</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Merchandise Value</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +28.4% this month
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Orders</span>
            <ShoppingCart className="w-5 h-5 text-[#A31D1C]" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-500">
            {totalItemsSold} luxury units dispatched
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Average Order Value</span>
            <PackageCheck className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">
            {formatPrice(avgOrderValue)}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold">
            High basket conversion rate
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Live Viewership</span>
            <Eye className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">
            {totalLiveViewers.toLocaleString()}
          </div>
          <div className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            Across active broadcasts
          </div>
        </div>
      </div>

      {/* Main Row: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">Recent Customer Dispatches</h2>
              <p className="text-xs text-stone-500">Real-time orders awaiting or under fulfillment</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold text-[#A31D1C] hover:underline flex items-center gap-1">
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Governorate</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-stone-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 font-semibold text-stone-800">
                      {order.customer.fullName}
                      <span className="block text-[10px] text-stone-400 font-normal">{order.customer.phone}</span>
                    </td>
                    <td className="py-3.5 text-stone-600">
                      {order.customer.governorate}
                    </td>
                    <td className="py-3.5 font-bold font-serif text-stone-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1">
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => handleQuickStatus(order.id, 'processing')}
                          className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold hover:bg-purple-700 transition-colors"
                        >
                          Pack
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleQuickStatus(order.id, 'shipped')}
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700 transition-colors"
                        >
                          Ship
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button
                          onClick={() => handleQuickStatus(order.id, 'delivered')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-700 transition-colors"
                        >
                          Deliver
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Inventory Warnings (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center space-x-2 text-stone-900">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-base">Low Stock Warnings</h3>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {lowStockProducts.length} Items
            </span>
          </div>

          <div className="divide-y divide-stone-100 space-y-3">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                  <p className="text-[10px] text-stone-400">{p.brand} • {p.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600 font-mono">
                    {p.stockCount} left
                  </span>
                  <span className="block text-[9px] text-stone-400">re-order req</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100">
            <Link
              href="/admin/products"
              className="w-full py-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border border-stone-200"
            >
              <span>Manage Inventory Stock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
