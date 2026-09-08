export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  color?: string;
  colorHex?: string;
  size?: string;
  price?: number;
  stock: number;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  brand: string;
  category: string;
  subcategory?: string;
  regularPrice: number;
  salePrice?: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  descriptionAr?: string;
  specifications: Record<string, string>;
  attributes: {
    colors?: { name: string; hex: string }[];
    sizes?: string[];
    materials?: string[];
  };
  variants?: ProductVariant[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  tags: string[];
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  itemCount: number;
  subcategories: string[];
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  featured: boolean;
  productCount: number;
  description?: string;
};

export type CartItem = {
  productId: string;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  selectedVariant?: ProductVariant;
  quantity: number;
  unitPrice: number;
};

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentMethod = 'card' | 'cod' | 'instapay' | 'valu';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export type ReturnRequest = {
  id: string;
  reason: string;
  notes?: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  refundAmount: number;
  items: { productId: string; productName: string; quantity: number }[];
};

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    governorate: string;
    postalCode?: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trackingNumber: string;
  estimatedDelivery: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  returnRequest?: ReturnRequest;
};

export type Coupon = {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  expiresAt: string;
  isActive: boolean;
  description: string;
};

export type BannerCampaign = {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  discountBadge: string;
  image: string;
  link: string;
  buttonText: string;
  isActive: boolean;
  bgGradient: string;
};

export type LiveChatMessage = {
  id: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  isHost?: boolean;
  isPinned?: boolean;
};

export type LiveStream = {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  status: 'live' | 'upcoming' | 'ended';
  scheduledFor?: string;
  startedAt?: string;
  endedAt?: string;
  viewerCount: number;
  likesCount: number;
  videoUrl: string;
  coverImage: string;
  pinnedProductId: string;
  productIds: string[];
  exclusiveCoupon?: string;
  tags: string[];
};

export type SellerApplication = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  productCatalogUrl?: string;
  annualTurnover?: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  submittedAt: string;
  notes?: string;
};
