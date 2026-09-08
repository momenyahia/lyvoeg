'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Check, 
  X, 
  ExternalLink, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function AdminMerchantsPage() {
  const { sellerApplications, addToast } = useStore();
  const [applications, setApplications] = useState(sellerApplications);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleUpdateStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setApplications(
      applications.map((a) => a.id === id ? { ...a, status: newStatus } : a)
    );
    addToast('success', 'Application Updated', `Seller application marked as ${newStatus}.`);
  };

  const filtered = applications.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Merchant &amp; Brand Partner Applications</h1>
          <p className="text-xs text-stone-500">Vet luxury manufacturers, boutiques, and Egyptian fashion ateliers wishing to sell on LYVO</p>
        </div>
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                filter === f ? 'bg-[#A31D1C] text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((app) => (
          <div key={app.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A31D1C] bg-[#A31D1C]/10 px-2.5 py-0.5 rounded-md">
                  {app.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900 mt-1">{app.companyName}</h3>
                <p className="text-xs text-stone-500">Contact: {app.contactName}</p>
              </div>

              <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {app.status}
              </span>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{app.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-mono">{app.phone}</span>
              </div>
              {app.annualTurnover && (
                <div className="flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>Annual Turnover: {app.annualTurnover}</span>
                </div>
              )}
              {app.productCatalogUrl && (
                <div className="pt-1">
                  <a 
                    href={app.productCatalogUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#A31D1C] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Brand Lookbook / Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {app.notes && (
              <p className="text-xs text-stone-500 italic bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE3D5]">
                &ldquo;{app.notes}&rdquo;
              </p>
            )}

            {app.status === 'pending' && (
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  onClick={() => handleUpdateStatus(app.id, 'rejected')}
                  className="px-4 py-2 border border-stone-200 hover:border-red-400 text-stone-600 hover:text-red-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Decline
                </button>
                <button
                  onClick={() => handleUpdateStatus(app.id, 'approved')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Approve &amp; Onboard
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
