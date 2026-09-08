'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function ContactPage() {
  const { addToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'VIP Personal Concierge Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    addToast('success', 'Message Transmitted', 'A personal concierge has been assigned and will reply within 4 business hours.');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A31D1C] font-bold bg-[#A31D1C]/10 px-3.5 py-1.5 rounded-full">
            Private Client Relations
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Connect with LYVO Concierge
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Our private client stylists and fulfillment specialists are on standby to arrange private appointments, sourcing requests, or order logistics inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-xs space-y-6">
              <h2 className="text-xl font-serif font-bold text-stone-900 pb-3 border-b border-stone-100">
                Cairo Atelier &amp; Showroom
              </h2>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#A31D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5">Headquarters &amp; VIP Suite</strong>
                    <p>Sector 1, Fifth Settlement, North 90th Street</p>
                    <p>New Cairo, Cairo Governorate, Egypt</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#A31D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5">Direct Line &amp; WhatsApp</strong>
                    <p className="font-mono text-stone-800">+20 100 892 4567</p>
                    <p className="text-[11px] text-stone-400">Available 10:00 AM - 10:00 PM CLT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#A31D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5">Electronic Inquiries</strong>
                    <p>concierge@lyvo.luxury</p>
                    <p>partners@lyvo.luxury</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#A31D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5">Showroom Private Hours</strong>
                    <p>Monday – Saturday: 11:00 AM – 9:00 PM</p>
                    <p>Private VIP appointments upon advance request.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-[#1C1614] text-[#FEFAE1] rounded-3xl p-6 border border-stone-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span>Instant Messaging Support</span>
              </div>
              <p className="text-xs text-stone-300">
                Prefer immediate messaging? Chat directly with an on-duty stylist via official WhatsApp.
              </p>
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <span>Open WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE3D5] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">Message Delivered</h3>
                <p className="text-stone-500 text-sm max-w-md mx-auto">
                  Thank you for reaching out to LYVO. A personal concierge has been notified and will reply shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#A31D1C] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="text-lg font-serif font-bold text-stone-900">Dispatch an Inquiry</h3>
                  <p className="text-stone-500 text-[11px]">We treat every correspondence with absolute confidentiality</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Layla Fahmy"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="layla@example.com"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mobile Phone (Optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+20 10x xxx xxxx"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option value="VIP Personal Concierge Inquiry">VIP Personal Concierge Inquiry</option>
                      <option value="Order Tracking & Logistics">Order Tracking &amp; Logistics</option>
                      <option value="Returns & Exchange Request">Returns &amp; Exchange Request</option>
                      <option value="Showroom Private Appointment">Showroom Private Appointment</option>
                      <option value="Merchant Partnership">Merchant Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How may our concierge assist your luxury experience today?"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#A31D1C]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-2xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-[#A31D1C]/25 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
