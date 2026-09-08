import {
  Product,
  Category,
  Brand,
  Coupon,
  BannerCampaign,
  Order,
  LiveStream,
  LiveChatMessage
} from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-fashion',
    name: 'Fashion',
    nameAr: 'الأزياء',
    slug: 'fashion',
    description: 'Discover the latest fashion from top international and local brands.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    iconName: 'Shirt',
    itemCount: 1420,
    subcategories: ['Women', 'Men', 'Shoes', 'Bags', 'Accessories']
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    nameAr: 'الإلكترونيات',
    slug: 'electronics',
    description: 'High-end audio, smartphones, smartwatches, and computing.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    iconName: 'Headphones',
    itemCount: 890,
    subcategories: ['Headphones', 'Smartwatches', 'Laptops', 'Cameras', 'Accessories']
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    nameAr: 'الجمال والعطور',
    slug: 'beauty',
    description: 'Iconic luxury fragrances, skincare, and beauty essentials.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop',
    iconName: 'Sparkles',
    itemCount: 650,
    subcategories: ['Perfumes', 'Skincare', 'Makeup', 'Haircare']
  },
  {
    id: 'cat-home',
    name: 'Home & Living',
    nameAr: 'المنزل والديكور',
    slug: 'home-living',
    description: 'Designer furniture, home accents, bedding, and modern lighting.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
    iconName: 'Home',
    itemCount: 420,
    subcategories: ['Furniture', 'Decor', 'Kitchenware', 'Bedding']
  },
  {
    id: 'cat-sports',
    name: 'Sports',
    nameAr: 'الرياضة',
    slug: 'sports',
    description: 'Performance activewear, training sneakers, and gear.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    iconName: 'Activity',
    itemCount: 380,
    subcategories: ['Sneakers', 'Sportswear', 'Fitness Gear', 'Accessories']
  },
  {
    id: 'cat-toys',
    name: 'Toys & Kids',
    nameAr: 'ألعاب وأطفال',
    slug: 'toys-kids',
    description: 'Educational toys, plush collectables, and infant apparel.',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop',
    iconName: 'Smile',
    itemCount: 290,
    subcategories: ['Stuffed Animals', 'Board Games', 'Baby Clothes', 'Kids Fashion']
  },
  {
    id: 'cat-supermarket',
    name: 'Supermarket',
    nameAr: 'السوبرماركت',
    slug: 'supermarket',
    description: 'Gourmet provisions, pantry essentials, and household care.',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=600&auto=format&fit=crop',
    iconName: 'ShoppingCart',
    itemCount: 1850,
    subcategories: ['Beverages', 'Gourmet Food', 'Snacks', 'Personal Care']
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-nike',
    name: 'Nike',
    slug: 'nike',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 120,
    description: 'Global leader in athletic footwear, apparel, and equipment.'
  },
  {
    id: 'brand-adidas',
    name: 'Adidas',
    slug: 'adidas',
    logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 95,
    description: 'Iconic sportswear, sneakers, and lifestyle essentials.'
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    slug: 'samsung',
    logo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 84,
    description: 'Innovative displays, smartphones, and domestic technology.'
  },
  {
    id: 'brand-apple',
    name: 'Apple',
    slug: 'apple',
    logo: 'https://images.unsplash.com/photo-1510519138171-c70d76354c4c?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 65,
    description: 'Premium consumer electronics, watches, and smart hardware.'
  },
  {
    id: 'brand-loreal',
    name: "L'Oréal",
    slug: 'loreal',
    logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 110,
    description: 'World-renowned cosmetics, beauty, and luxury fragrances.'
  },
  {
    id: 'brand-philips',
    name: 'Philips',
    slug: 'philips',
    logo: 'https://images.unsplash.com/photo-1584679109597-c656b19974c9?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 45,
    description: 'Personal care appliances, lighting, and healthcare tech.'
  },
  {
    id: 'brand-tefal',
    name: 'Tefal',
    slug: 'tefal',
    logo: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 38,
    description: 'Culinary cookware, kitchen electricals, and homeware.'
  },
  {
    id: 'brand-dyson',
    name: 'Dyson',
    slug: 'dyson',
    logo: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=200&auto=format&fit=crop',
    featured: true,
    productCount: 22,
    description: 'Cutting-edge hair styling tech, air purification, and vacuums.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-nike-af1',
    slug: 'nike-air-force-1',
    name: 'Nike Air Force 1',
    nameAr: 'نايكي إير فورس 1 أبيض',
    brand: 'Nike',
    category: 'Sports',
    subcategory: 'Sneakers',
    regularPrice: 4999,
    salePrice: 4999,
    rating: 4.7,
    reviewsCount: 1500,
    description: 'The radiance lives on in the Nike Air Force 1 ’07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash.',
    specifications: {
      'Brand': 'Nike',
      'Color': 'Triple White',
      'Upper': 'Genuine Leather',
      'Sole': 'Air Cushioning Rubber',
      'Closure': 'Lace-Up'
    },
    attributes: {
      colors: [{ name: 'White', hex: '#FFFFFF' }],
      sizes: ['40', '41', '42', '43', '44', '45'],
    },
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    isBestSeller: true,
    tags: ['Nike', 'Sneakers', 'AirForce1', 'Lifestyle'],
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: 'prod-sony-wh',
    slug: 'sony-wh-ch520',
    name: 'Sony WH-CH520',
    nameAr: 'سماعات سوني لاسلكية WH-CH520',
    brand: 'Sony',
    category: 'Electronics',
    subcategory: 'Headphones',
    regularPrice: 2799,
    salePrice: 2799,
    rating: 4.6,
    reviewsCount: 640,
    description: 'Enjoy high sound quality all day long. The Sony WH-CH520 wireless headphones with up to 50 hours of battery life, stable Bluetooth connectivity, and multipoint connection.',
    specifications: {
      'Brand': 'Sony',
      'Battery Life': 'Up to 50 Hours',
      'Connectivity': 'Bluetooth 5.2',
      'Microphone': 'Built-In Hands-Free',
      'Weight': '147g'
    },
    attributes: {
      colors: [{ name: 'Black', hex: '#0F172A' }, { name: 'Beige', hex: '#E2D9C8' }],
      sizes: ['Standard Over-Ear'],
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    tags: ['Sony', 'Headphones', 'Wireless', 'Audio'],
    createdAt: '2025-01-12T10:00:00Z'
  },
  {
    id: 'prod-ysl-libre',
    slug: 'ysl-libre-edp',
    name: 'YSL Libre EDP',
    nameAr: 'عطر إيف سان لوران ليبر 90 مل',
    brand: 'Yves Saint Laurent',
    category: 'Beauty',
    subcategory: 'Perfumes',
    regularPrice: 5250,
    salePrice: 5250,
    rating: 4.8,
    reviewsCount: 640,
    description: 'Libre Eau de Parfum is the fragrance of freedom, by Yves Saint Laurent. A grand floral statement that combines French lavender with Moroccan orange blossom for a unique couture blend.',
    specifications: {
      'Brand': 'YSL',
      'Volume': '90 ml',
      'Type': 'Eau de Parfum',
      'Notes': 'French Lavender, Moroccan Orange Blossom, Musk Accord',
      'Origin': 'France'
    },
    attributes: {
      sizes: ['50ml', '90ml'],
    },
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    tags: ['YSL', 'Perfume', 'Luxury', 'Beauty'],
    createdAt: '2025-01-14T10:00:00Z'
  },
  {
    id: 'prod-mk-bag',
    slug: 'michael-kors-bag',
    name: 'Michael Kors Bag',
    nameAr: 'حقيبة يد مايكل كورس فاخرة',
    brand: 'Michael Kors',
    category: 'Fashion',
    subcategory: 'Bags',
    regularPrice: 6799,
    salePrice: 6799,
    rating: 4.8,
    reviewsCount: 1100,
    description: 'An iconic tote bag in Saffiano leather featuring structured top handles, gold-tone hardware, and a spacious compartment for daily sophistication.',
    specifications: {
      'Brand': 'Michael Kors',
      'Material': '100% Saffiano Leather',
      'Hardware': 'Gold-Tone Metal',
      'Lining': '100% Polyester',
      'Dimensions': '38cm x 28cm x 15cm'
    },
    attributes: {
      colors: [{ name: 'Camel Tan', hex: '#C29B70' }, { name: 'Black', hex: '#0F172A' }],
    },
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    tags: ['MichaelKors', 'Bag', 'Handbag', 'Fashion'],
    createdAt: '2025-01-16T10:00:00Z'
  },
  {
    id: 'prod-apple-watch-se',
    slug: 'apple-watch-se',
    name: 'Apple Watch SE',
    nameAr: 'ساعة آبل واتش إس إي الجيل الثاني',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Smartwatches',
    regularPrice: 8999,
    salePrice: 8999,
    rating: 4.7,
    reviewsCount: 1200,
    description: 'Essential health, fitness, and connectivity features in an aluminum case with a Retina display and water resistance to 50 meters.',
    specifications: {
      'Brand': 'Apple',
      'Case Size': '44mm Aluminum',
      'Display': 'Retina OLED Display',
      'Water Resistance': '50 Meters',
      'Battery': 'Up to 18 Hours'
    },
    attributes: {
      colors: [{ name: 'Midnight', hex: '#1E293B' }, { name: 'Starlight', hex: '#E2E8F0' }],
      sizes: ['40mm', '44mm'],
    },
    images: [
      'https://images.unsplash.com/photo-1510519138171-c70d76354c4c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 20,
    isFeatured: true,
    tags: ['Apple', 'Smartwatch', 'Fitness', 'Tech'],
    createdAt: '2025-01-18T10:00:00Z'
  },
  {
    id: 'prod-coat-cashmere',
    slug: 'handcrafted-cashmere-coat',
    name: 'Tailored Cashmere Coat',
    nameAr: 'معطف كشمير فاخر بتفصيل كلاسيكي',
    brand: 'LYVO Atelier',
    category: 'Fashion',
    subcategory: 'Jackets & Coats',
    regularPrice: 7999,
    salePrice: 6499,
    rating: 4.9,
    reviewsCount: 420,
    description: 'Constructed from a premium 100% Mongolian virgin cashmere and wool blend. Featuring structured shoulders, notched lapels, and genuine horn buttons.',
    specifications: {
      'Material': '85% Virgin Wool, 15% Mongolian Cashmere',
      'Closure': 'Double Breasted Buttons',
      'Care': 'Dry Clean Only'
    },
    attributes: {
      colors: [{ name: 'Camel Tan', hex: '#B48A58' }, { name: 'Onyx Black', hex: '#111827' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    tags: ['Cashmere', 'Coat', 'Tailoring'],
    createdAt: '2025-01-20T10:00:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 500,
    expiresAt: '2026-12-31',
    isActive: true,
    description: '10% discount on your first order across all categories.'
  },
  {
    code: 'LYVOLUXURY',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 1500,
    expiresAt: '2026-12-31',
    isActive: true,
    description: '15% off site-wide + free express delivery across Egypt.'
  }
];

export const INITIAL_BANNERS: BannerCampaign[] = [
  {
    id: 'banner-01',
    title: 'Everything you love. All in one place.',
    subtitle: 'Better Choices. Brighter Days.',
    tagline: 'Shop thousands of products from top brands with the best prices, fast delivery and a seamless shopping experience.',
    discountBadge: 'New Season',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    link: '/shop',
    buttonText: 'Shop Now',
    isActive: true,
    bgGradient: 'from-black/60 to-transparent'
  }
];

export const INITIAL_LIVE_STREAMS: LiveStream[] = [
  {
    id: 'stream-1',
    title: 'Milan to Cairo Runway Showcase',
    titleAr: 'عرض أزياء ميلانو إلى القاهرة المباشر',
    description: 'Join stylist Yasmine El-Sayed as she models the winter capsule collections with live drops.',
    hostName: 'Yasmine El-Sayed',
    hostRole: 'Lead Stylist & Fashion Curator',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    status: 'live',
    viewerCount: 1420,
    likesCount: 8930,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    pinnedProductId: 'prod-nike-af1',
    productIds: ['prod-nike-af1', 'prod-sony-wh', 'prod-ysl-libre'],
    exclusiveCoupon: 'LIVEVIP',
    tags: ['Runway', 'Sneakers', 'Luxury']
  }
];

export const INITIAL_LIVE_CHATS: Record<string, LiveChatMessage[]> = {
  'stream-1': [
    { id: '1', senderName: 'Nourhan', message: 'Is the Nike Air Force 1 true to size?', timestamp: '12:02' },
    { id: '2', senderName: 'Host Yasmine', message: 'Yes Nourhan! True to standard EU size.', timestamp: '12:03', isHost: true },
    { id: '3', senderName: 'Karim', message: 'Just placed order with InstaPay! Super smooth.', timestamp: '12:05' }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'LYVO-2026-8942',
    createdAt: '2026-09-07T14:30:00Z',
    customer: {
      fullName: 'Youssef El-Mansoury',
      email: 'youssef@example.com',
      phone: '+20 100 892 4567',
      address: 'Road 90 South, Lotus Compound, Building 14',
      apartment: 'Apt 302',
      city: 'New Cairo',
      governorate: 'Cairo',
      postalCode: '11835',
      notes: 'Call upon arrival at the gate.'
    },
    items: [
      {
        productId: 'prod-nike-af1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        unitPrice: 4999,
        selectedSize: '42',
        selectedColor: 'White'
      }
    ],
    subtotal: 4999,
    discount: 500,
    shippingFee: 0,
    total: 4499,
    paymentMethod: 'instapay',
    paymentStatus: 'paid',
    status: 'shipped',
    trackingNumber: 'EG-CAI-89420-EXP',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    statusHistory: [
      { status: 'pending', timestamp: '2026-09-07 14:30', note: 'Order placed by customer' },
      { status: 'confirmed', timestamp: '2026-09-07 14:45', note: 'InstaPay transfer confirmed' },
      { status: 'processing', timestamp: '2026-09-07 16:00', note: 'Inspected and packaged at Cairo Hub' },
      { status: 'shipped', timestamp: '2026-09-08 09:15', note: 'Dispatched with priority courier' }
    ]
  }
];
