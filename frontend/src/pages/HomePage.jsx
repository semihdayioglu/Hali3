// Kart boyutları (değiştirilebilir)
const CARD_WIDTH = 480;
const CARD_HEIGHT = 320;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import BlogSection from '../components/BlogSection';
import WhyDifferent from '../components/WhyDifferent';
import { categories, getFeaturedProducts, products } from '../data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const latestProducts = products.slice(0, 8);

  return (
    <div data-testid="home-page">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Kategoriler - Profesyonel Tasarım */}
      <section
        data-testid="categories-section"
        className="py-16 lg:py-24 bg-white"
      >
        <div className="px-6 lg:px-16 max-w-[1600px] mx-auto">
          {/* BAŞLIK BÖLÜMÜ */}
          <div className="mb-12 lg:mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-3">
              {/* 4 yeşil daireli logo */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 lg:w-12 lg:h-12"
              >
                <circle cx="24" cy="18" r="3" fill="#10B981" />
                <circle cx="18" cy="26" r="3" fill="#10B981" />
                <circle cx="30" cy="26" r="3" fill="#10B981" />
                <circle cx="24" cy="34" r="3" fill="#10B981" />
              </svg>
              <span className="text-sm lg:text-base text-emerald-600 font-medium">
                İhtiyacınıza uygun ürünleri keşfedin
              </span>
            </div>
            <h2
              className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Kategoriler
            </h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto lg:mx-0 rounded-full" />
          </div>

          {/* GRID YAPISI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto justify-items-center">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/kategori/${category.slug}`}
                data-testid={`category-card-${category.slug}`}
                tabIndex={0}
                className="group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden focus:outline-none"
                style={{ width: CARD_WIDTH + 'px', height: CARD_HEIGHT + 'px', maxWidth: '100%' }}
              >
                {/* GÖRSEL */}
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={600}
                  height={400}
                />
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                {/* HOVER BORDER */}
                <div className="absolute inset-0 border-4 border-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
                {/* İÇERİK */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-30">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Ürünleri Gör</span>
                    <ArrowRight className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Çok Satan Ürünler */}
      <section 
        data-testid="featured-products-section"
        className="py-12 lg:py-16 bg-[#F5F8F2]"
      >
        <div className="px-6 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E2D]">Çok Satan Ürünler</h2>
            <Link 
              to="/urunler"
              className="hidden md:flex items-center gap-2 text-[#4A7C4E] font-medium hover:underline"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Tüm Ürünler */}
      <section 
        data-testid="all-products-section"
        className="py-12 lg:py-16 bg-white"
      >
        <div className="px-6 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E2D]">Tüm Ürünler</h2>
            <Link 
              to="/urunler"
              className="hidden md:flex items-center gap-2 text-[#4A7C4E] font-medium hover:underline"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Neden Farklıyız */}
      <WhyDifferent />
    </div>
  );
};

export default HomePage;
