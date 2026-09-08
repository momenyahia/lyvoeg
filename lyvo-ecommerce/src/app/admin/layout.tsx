'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Tag, 
  Radio, 
  Users, 
  ArrowLeft, 
  ExternalLink,
  ShieldCheck,
  Bell
} from 'lucide-react';
import LyvoLogo from '@/components/ui/LyvoLogo';
import { useStore } from '@/lib/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders, products, liveStreams, sellerApplications } = useStore();

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length;
  const pendingSellerApps = sellerApplications.filter((a) => a.status === 'pending').length;

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Inventory', href: '/admin/products', icon: Package, badge: products.length },
    { label: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingCart, badge: pendingOrdersCount, badgeColor: 'bg-[#A31D1C]' },
    { label: 'Promotions & Coupons', href: '/admin/campaigns', icon: Tag },
    { label: 'Live Broadcast Studio', href: '/admin/live', icon: Radio, badge: 'Live', badgeColor: 'bg-red-600' },
    { label: 'Merchant Applications', href: '/admin/merchants', icon: Users, badge: pendingSellerApps },
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#1C1614] text-[#FEFAE1] shrink-0 border-r border-stone-800 flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-stone-800">
            <div className="flex items-center space-x-3 mb-2">
              <LyvoLogo variant="ivory" size="md" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#E4D0AB] bg-white/10 px-2 py-0.5 rounded-sm">
                Control Hub v2.4
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#A31D1C] text-white shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span 
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        item.badgeColor || 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs text-stone-400 hover:text-[#FEFAE1] px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>
          <div className="px-3 py-2 text-[11px] text-stone-500 flex items-center justify-between">
            <span>Admin: Momen (Intergraphite)</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-bold text-stone-900 capitalize">
              {pathname.replace('/admin', '').replace('/', '') || 'Executive Dashboard'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Production Sync Active</span>
            </div>
            <Link
              href="/shop"
              target="_blank"
              className="text-xs font-semibold text-[#A31D1C] hover:underline flex items-center gap-1"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        <div className="p-6 sm:p-8 flex-1">
          {children}
        </div>
      </main>

    </div>
  );
}
