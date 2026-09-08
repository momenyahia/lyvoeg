'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Share2, 
  Check, 
  ChevronRight, 
  Sparkles,
  Minus,
  Plus,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist, formatPrice, addToast } = useStore();

  const product = products.find((p) => p.slug === resolvedParams.slug) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product?.images[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.attributes.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.attributes.sizes?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-serif text-[#1C1614] mb-2">Product Not Found</h1>
        <p className="text-stone-500 mb-6">The requested product could not be located in the LYVO catalog.</p>
        <Link href="/shop" className="px-6 py-3 bg-[#A31D1C] text-white rounded-full font-medium">
          Explore All Products
        </Link>
      </div>
    );
  }

  const currentPrice = product.salePrice || product.regularPrice;
  const hasDiscount = !!product.salePrice && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100) 
    : 0;
  
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    addToast('success', 'Added to Shopping Bag', `${quantity}x ${product.name} ready for checkout.`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link Copied', 'Product link copied to clipboard.');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20 pt-4">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center text-xs sm:text-sm text-stone-500 space-x-2">
          <Link href="/" className="hover:text-[#A31D1C] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/shop" className="hover:text-[#A31D1C] transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#A31D1C] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#EBE3D5] shadow-xs">
          
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <Image
                src={selectedImage || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-all duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-[#A31D1C] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Save {discountPercent}%
                </div>
              )}
              {product.isNewArrival && (
                <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md text-[#FEFAE1] px-3 py-1.5 rounded-full text-xs font-semibold">
                  New Arrival
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-[#A31D1C] ring-2 ring-[#A31D1C]/20 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Brand & Action Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#A31D1C] bg-[#A31D1C]/10 px-3 py-1 rounded-md">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-stone-200 text-stone-600 hover:text-[#A31D1C] hover:border-[#A31D1C] transition-colors"
                    title="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full border transition-colors ${
                      inWishlist 
                        ? 'border-[#A31D1C] bg-[#A31D1C] text-white' 
                        : 'border-stone-200 text-stone-600 hover:text-[#A31D1C] hover:border-[#A31D1C]'
                    }`}
                    title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Title & Ratings */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                  {product.name}
                </h1>
                {product.nameAr && (
                  <p className="text-stone-400 font-sans text-sm mt-1 text-right" dir="rtl">
                    {product.nameAr}
                  </p>
                )}
                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-stone-800">{product.rating}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-500">{product.reviewsCount} Verified Customer Reviews</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-t border-b border-stone-100 py-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-extrabold text-[#A31D1C] font-serif">
                    {formatPrice(currentPrice)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-stone-400 line-through">
                        {formatPrice(product.regularPrice)}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1">Inclusive of all duties and local value taxes.</p>
              </div>

              {/* Short Bio */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Variant Selector */}
              {product.attributes.colors && product.attributes.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-stone-800 uppercase tracking-wider">Color</span>
                    <span className="text-stone-500">{selectedColor}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.attributes.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform ${
                          selectedColor === color.name ? 'border-[#A31D1C] scale-110 shadow-sm' : 'border-stone-300 hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span 
                          className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center" 
                          style={{ backgroundColor: color.hex }}
                        >
                          {selectedColor === color.name && (
                            <Check className={`w-3.5 h-3.5 ${color.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'}`} />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.attributes.sizes && product.attributes.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-stone-800 uppercase tracking-wider">Select Size</span>
                    <span className="text-stone-400 underline cursor-pointer hover:text-stone-800">Size Guide</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.attributes.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                          selectedSize === size
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Stock Status */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">Quantity</span>
                  {product.stockCount < 10 ? (
                    <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Only {product.stockCount} left in stock!
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white disabled:opacity-30 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      disabled={quantity >= product.stockCount}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white disabled:opacity-30 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#A31D1C] hover:bg-[#851615] text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#A31D1C]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Shopping Bag • {formatPrice(currentPrice * quantity)}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#FEFAE1]" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-center">
                <div className="p-3 bg-[#FAF7F2] rounded-xl flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#A31D1C] mb-1" />
                  <span className="text-[11px] font-bold text-stone-800">Fast Express</span>
                  <span className="text-[10px] text-stone-500">24-48h Egypt Delivery</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#A31D1C] mb-1" />
                  <span className="text-[11px] font-bold text-stone-800">100% Genuine</span>
                  <span className="text-[10px] text-stone-500">Certified Luxury Item</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-[#A31D1C] mb-1" />
                  <span className="text-[11px] font-bold text-stone-800">14-Day Return</span>
                  <span className="text-[10px] text-stone-500">Doorstep Collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specs, Care, Reviews */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#EBE3D5] shadow-xs">
          <div className="flex border-b border-stone-200 space-x-8 mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm sm:text-base font-semibold transition-all relative ${
                activeTab === 'details' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Product Description
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm sm:text-base font-semibold transition-all relative ${
                activeTab === 'specs' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Specifications & Material
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm sm:text-base font-semibold transition-all relative ${
                activeTab === 'reviews' ? 'text-[#A31D1C]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Verified Reviews ({product.reviewsCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A31D1C]" />
              )}
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="space-y-4 text-stone-600 leading-relaxed max-w-4xl text-sm sm:text-base">
              <p>{product.description}</p>
              {product.descriptionAr && (
                <p className="p-4 bg-stone-50 rounded-2xl text-stone-700 font-sans border-r-4 border-[#A31D1C]" dir="rtl">
                  {product.descriptionAr}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Couture Craftsmanship</h4>
                  <p className="text-xs text-stone-600">Manufactured by accredited artisans adhering to high European quality control thresholds.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Complimentary Packaging</h4>
                  <p className="text-xs text-stone-600">Arrives in signature LYVO dust bags and magnetic-closure unboxing presentation kit.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                    <tr key={idx} className="border-b border-stone-100 last:border-0">
                      <td className="py-3 font-medium text-stone-500 w-1/3">{key}</td>
                      <td className="py-3 font-semibold text-stone-900">{value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-stone-100">
                    <td className="py-3 font-medium text-stone-500">Brand Origin</td>
                    <td className="py-3 font-semibold text-stone-900">{product.brand} Official Studio</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-stone-500">Tags</td>
                    <td className="py-3 font-semibold text-stone-900">
                      <div className="flex flex-wrap gap-1.5">
                        {product.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-6 p-6 bg-[#FAF7F2] rounded-2xl border border-[#EBE3D5]">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-[#A31D1C] font-serif">{product.rating}</div>
                  <div className="flex text-amber-500 justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs text-stone-500">{product.reviewsCount} customer scores</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2 text-xs">
                      <span className="w-4 text-stone-600">{rating}★</span>
                      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '3%' }} 
                        />
                      </div>
                      <span className="w-8 text-right text-stone-400">{rating === 5 ? '85%' : rating === 4 ? '12%' : '3%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="divide-y divide-stone-100 space-y-4">
                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-stone-900">Dr. Tarek El-Kady</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Verified Buyer</span>
                    </div>
                    <span className="text-xs text-stone-400">2 days ago • Cairo</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600">
                    The hand-finished texture and attention to detail on this piece exceeded my expectations. Arrived in a clean luxury box within 24 hours to New Cairo.
                  </p>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-stone-900">Nourhan Mansour</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Verified Buyer</span>
                    </div>
                    <span className="text-xs text-stone-400">1 week ago • Alexandria</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600">
                    Sizing is true to fit. The live shopping host demonstration gave me confidence before checking out. Will definitely purchase again.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">You May Also Admire</h3>
                <p className="text-xs text-stone-500">Curated complements from the {product.category} collection</p>
              </div>
              <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="text-xs font-bold text-[#A31D1C] hover:underline">
                View Collection →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
