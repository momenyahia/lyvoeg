'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Truck, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle,
  Eye,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Order, OrderStatus } from '@/lib/types';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, formatPrice, addToast } = useStore();
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: { label: string; value: string }[] = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Returned', value: 'returned' },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus, `Manual fulfillment update to ${newStatus}`);
    addToast('success', 'Status Transitioned', `Order has been updated to ${newStatus}.`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Orders &amp; Dispatch Pipeline</h1>
          <p className="text-xs text-stone-500">Monitor fulfillment stages, Egyptian courier allocations, and returns</p>
        </div>
        <div className="text-xs text-stone-500 bg-white px-4 py-2 rounded-xl border border-stone-200">
          Total Orders in System: <strong className="text-stone-900">{orders.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order #, client name or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === s.value ? 'bg-[#A31D1C] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/70 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date Placed</th>
                <th className="py-3 px-4">Governorate</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-800">
                    {order.customer.fullName}
                    <span className="block text-[10px] text-stone-400 font-normal">{order.customer.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-stone-700">
                    {order.customer.governorate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold uppercase text-[10px] bg-stone-100 px-2 py-0.5 rounded-md">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold font-serif text-[#A31D1C]">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-hidden ${
                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                        order.status === 'shipped' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                        order.status === 'processing' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                        order.status === 'returned' ? 'bg-red-50 text-red-800 border-red-300' :
                        'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="returned">Returned</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-stone-400">Tracking Code: {selectedOrder.trackingNumber}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                <div className="font-bold text-stone-900 mb-1">Customer Details</div>
                <p className="font-semibold text-stone-800">{selectedOrder.customer.fullName}</p>
                <p className="text-stone-600">{selectedOrder.customer.email}</p>
                <p className="text-stone-600 font-mono">{selectedOrder.customer.phone}</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                <div className="font-bold text-stone-900 mb-1">Shipping Location</div>
                <p className="text-stone-700">{selectedOrder.customer.address}</p>
                <p className="text-stone-700">{selectedOrder.customer.city}, {selectedOrder.customer.governorate}</p>
                <p className="text-stone-500 italic">{selectedOrder.customer.notes || 'No special delivery instructions.'}</p>
              </div>
            </div>

            {/* Items */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Order Items ({selectedOrder.items.length})
              </h4>
              <div className="divide-y divide-stone-100 border-t border-b border-stone-100 text-xs">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">{item.product.name}</div>
                        <div className="text-[10px] text-stone-400">Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`} {item.selectedSize && `• Size ${item.selectedSize}`}</div>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 font-serif">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className="space-y-1.5 text-xs text-stone-600 max-w-xs ml-auto">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{selectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedOrder.shippingFee)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatPrice(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-100">
                <span>Total</span>
                <span className="text-[#A31D1C] font-serif">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Return Request Notification if present */}
            {selectedOrder.returnRequest && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-amber-700" />
                  <span>Customer Return Requested</span>
                </div>
                <p className="text-amber-800">Reason: {selectedOrder.returnRequest.reason}</p>
                <p className="text-amber-700">{selectedOrder.returnRequest.notes}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <Link
                href={`/track-order?orderNumber=${selectedOrder.orderNumber}`}
                target="_blank"
                className="text-xs font-bold text-[#A31D1C] hover:underline"
              >
                Open Public Tracking Page →
              </Link>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
