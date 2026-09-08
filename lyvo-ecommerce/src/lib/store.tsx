'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  CartItem,
  Order,
  Coupon,
  BannerCampaign,
  ProductVariant,
  OrderStatus,
  LiveStream,
  LiveChatMessage,
  SellerApplication
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_COUPONS,
  INITIAL_BANNERS,
  INITIAL_ORDERS,
  INITIAL_LIVE_STREAMS,
  INITIAL_LIVE_CHATS
} from './initialData';

export type Toast = {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
};

interface StoreContextType {
  // Products & Catalog
  products: Product[];
  categories: Category[];
  brands: Brand[];
  coupons: Coupon[];
  banners: BannerCampaign[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;

  // Live Streams & Shopping
  liveStreams: LiveStream[];
  getLiveStreamById: (id: string) => LiveStream | undefined;
  likeLiveStream: (streamId: string) => void;
  pinProductInStream: (streamId: string, productId: string) => void;
  addLiveStream: (stream: Omit<LiveStream, 'id' | 'viewerCount' | 'likesCount'>) => LiveStream;
  updateLiveStreamStatus: (streamId: string, status: 'live' | 'upcoming' | 'ended') => void;
  streamChats: Record<string, LiveChatMessage[]>;
  sendChatMessage: (streamId: string, senderName: string, message: string, isHost?: boolean) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  requestOrderReturn: (orderId: string, reason: string, notes?: string, items?: { productId: string; productName: string; quantity: number }[]) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  // Seller / Marketplace
  sellerApplications: SellerApplication[];
  submitSellerApplication: (app: Omit<SellerApplication, 'id' | 'status' | 'submittedAt'>) => void;

  // Currency
  currency: 'USD' | 'EGP';
  setCurrency: (c: 'USD' | 'EGP') => void;
  formatPrice: (amount: number) => string;

  // Toasts
  toasts: Toast[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'lyvo_products_v2',
  CART: 'lyvo_cart_v2',
  WISHLIST: 'lyvo_wishlist_v2',
  ORDERS: 'lyvo_orders_v2',
  COUPONS: 'lyvo_coupons_v2',
  APPLIED_COUPON: 'lyvo_applied_coupon_v2',
  CURRENCY: 'lyvo_currency_v2',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [brands] = useState<Brand[]>(INITIAL_BRANDS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [banners] = useState<BannerCampaign[]>(INITIAL_BANNERS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['lyv-001', 'lyv-004']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>(INITIAL_LIVE_STREAMS);
  const [streamChats, setStreamChats] = useState<Record<string, LiveChatMessage[]>>(INITIAL_LIVE_CHATS);
  const [sellerApplications, setSellerApplications] = useState<SellerApplication[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'EGP'>('EGP');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCoupon = localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON);
      if (savedCoupon) setAppliedCoupon(JSON.parse(savedCoupon));

      const savedCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedCurrency = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      if (savedCurrency === 'EGP' || savedCurrency === 'USD') setCurrency(savedCurrency);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    setIsInitialized(true);
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
      localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
      if (appliedCoupon) {
        localStorage.setItem(STORAGE_KEYS.APPLIED_COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(STORAGE_KEYS.APPLIED_COUPON);
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [products, cart, wishlist, orders, coupons, appliedCoupon, currency, isInitialized]);

  // Toast System
  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Price Formatter (EGP / USD)
  const formatPrice = (amount: number): string => {
    if (currency === 'EGP') {
      return `EGP ${Math.round(amount).toLocaleString()}`;
    }
    const usdAmount = Math.round(amount / 50);
    return `$${usdAmount.toLocaleString()}`;
  };

  // Product Operations
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `lyv-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast('success', 'Product Published', `"${newProduct.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    addToast('success', 'Product Updated', 'Product changes saved successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('info', 'Product Removed', 'Product was deleted from the catalog.');
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug || p.id === slug);
  };

  // Live Stream Operations
  const getLiveStreamById = (id: string) => {
    return liveStreams.find(s => s.id === id);
  };

  const likeLiveStream = (streamId: string) => {
    setLiveStreams(prev =>
      prev.map(s => (s.id === streamId ? { ...s, likesCount: s.likesCount + 1 } : s))
    );
  };

  const pinProductInStream = (streamId: string, productId: string) => {
    setLiveStreams(prev =>
      prev.map(s => (s.id === streamId ? { ...s, pinnedProductId: productId } : s))
    );
    const prod = products.find(p => p.id === productId);
    if (prod) {
      addToast('info', 'Product Highlighted', `Host pinned "${prod.name}" for live shoppers.`);
    }
  };

  const addLiveStream = (streamData: Omit<LiveStream, 'id' | 'viewerCount' | 'likesCount'>) => {
    const newStream: LiveStream = {
      ...streamData,
      id: `live-${Date.now().toString().slice(-4)}`,
      viewerCount: streamData.status === 'live' ? 145 : 0,
      likesCount: 24
    };
    setLiveStreams(prev => [newStream, ...prev]);
    addToast('success', 'Live Stream Created', `"${newStream.title}" is ready.`);
    return newStream;
  };

  const updateLiveStreamStatus = (streamId: string, status: 'live' | 'upcoming' | 'ended') => {
    setLiveStreams(prev =>
      prev.map(s => (s.id === streamId ? { ...s, status } : s))
    );
    addToast('info', 'Broadcast Status Updated', `Stream is now ${status.toUpperCase()}.`);
  };

  const sendChatMessage = (streamId: string, senderName: string, message: string, isHost = false) => {
    const newMsg: LiveChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      senderName,
      message,
      timestamp: 'Just now',
      isHost
    };
    setStreamChats(prev => ({
      ...prev,
      [streamId]: [...(prev[streamId] || []), newMsg]
    }));
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    variant?: ProductVariant
  ) => {
    const price = variant?.price ?? product.salePrice ?? product.regularPrice;
    setCart(prev => {
      const existingIndex = prev.findIndex(item =>
        item.productId === product.id &&
        item.selectedColor === color &&
        item.selectedSize === size &&
        item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          selectedVariant: variant,
          quantity,
          unitPrice: price
        }
      ];
    });

    addToast('success', 'Added to Shopping Bag', `${quantity}x ${product.name}`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev =>
      prev.filter(item => {
        if (item.productId !== productId) return true;
        if (variantId && item.selectedVariant?.id !== variantId) return true;
        return false;
      })
    );
    addToast('info', 'Item Removed', 'Product removed from your bag.');
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.productId === productId && (!variantId || item.selectedVariant?.id === variantId)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Totals Calculation
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!coupon) {
      addToast('error', 'Invalid Coupon', `Coupon code "${cleanCode}" is invalid or expired.`);
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (coupon.minSpend && cartSubtotal < coupon.minSpend) {
      const msg = `Minimum spend of $${coupon.minSpend} required for code ${cleanCode}.`;
      addToast('error', 'Spend Threshold Not Met', msg);
      return { success: false, message: msg };
    }

    setAppliedCoupon(coupon);
    addToast('success', 'Coupon Applied!', `Enjoy ${coupon.discountValue}${coupon.discountType === 'percentage' ? '%' : '$'} savings.`);
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('info', 'Coupon Removed', 'Discount was removed from order.');
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
      : Math.min(appliedCoupon.discountValue, cartSubtotal)
    : 0;

  const shippingFee = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      if (exists) {
        addToast('info', 'Removed from Wishlist', `Removed "${product?.name || 'Item'}"`);
        return prev.filter(id => id !== productId);
      } else {
        addToast('success', 'Added to Wishlist', `Saved "${product?.name || 'Item'}" to your wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Order Placement & Tracking
  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory' | 'trackingNumber' | 'estimatedDelivery'>
  ): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `EG-LYVO-${Math.floor(100000 + Math.random() * 900000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `LYV-${randomNum}`,
      createdAt: new Date().toISOString(),
      trackingNumber: trackingCode,
      estimatedDelivery: formattedDelivery,
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: 'Order successfully created and received by LYVO Concierge.'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast('success', 'Order Confirmed!', `Order #${newOrder.orderNumber} is confirmed.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId && o.orderNumber !== orderId) return o;
        const newHistory = [
          ...o.statusHistory,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: note || `Order status updated to ${newStatus.replace('_', ' ').toUpperCase()}`
          }
        ];
        return {
          ...o,
          status: newStatus,
          statusHistory: newHistory
        };
      })
    );
    addToast('info', 'Order Status Updated', `Status updated to ${newStatus.toUpperCase()}`);
  };

  const requestOrderReturn = (
    orderId: string,
    reason: string,
    notes?: string,
    items?: { productId: string; productName: string; quantity: number }[]
  ) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId && o.orderNumber !== orderId) return o;
        return {
          ...o,
          status: 'returned',
          returnRequest: {
            id: `ret-${Date.now()}`,
            reason,
            notes,
            requestedAt: new Date().toISOString(),
            status: 'pending',
            refundAmount: o.total,
            items: items || o.items.map(i => ({ productId: i.productId, productName: i.product.name, quantity: i.quantity }))
          },
          statusHistory: [
            ...o.statusHistory,
            {
              status: 'returned',
              timestamp: new Date().toISOString(),
              note: `Client initiated return: ${reason}. Pickup courier scheduled.`
            }
          ]
        };
      })
    );
    addToast('success', 'Return Request Submitted', 'LYVO Concierge will contact you within 24h.');
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId || o.orderNumber === orderId);
  };

  const getOrderByNumber = (orderNumber: string) => {
    return orders.find(
      o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase() || o.id === orderNumber
    );
  };

  // Seller Application
  const submitSellerApplication = (app: Omit<SellerApplication, 'id' | 'status' | 'submittedAt'>) => {
    const newApp: SellerApplication = {
      ...app,
      id: `sell-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setSellerApplications(prev => [newApp, ...prev]);
    addToast('success', 'Application Received', 'Thank you for applying to sell on LYVO. Our team will review your portfolio.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        brands,
        coupons,
        banners,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        liveStreams,
        getLiveStreamById,
        likeLiveStream,
        pinProductInStream,
        addLiveStream,
        updateLiveStreamStatus,
        streamChats,
        sendChatMessage,
        sellerApplications,
        submitSellerApplication,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        requestOrderReturn,
        getOrderById,
        getOrderByNumber,
        currency,
        setCurrency,
        formatPrice,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
