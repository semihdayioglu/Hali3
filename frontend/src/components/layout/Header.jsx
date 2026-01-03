import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Search, 
  Truck, 
  Heart, 
  User, 
  ShoppingCart,
  Menu,
  X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { getCartCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header 
      data-testid="header"
      className="h-auto md:h-[100px] bg-white border-b border-gray-100 sticky top-[32px] lg:top-[40px] z-40"
    >
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        {/* Sol - Logo + Hamburger */}
        <div className="flex items-center gap-0">
          <button 
            data-testid="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#2C3E2D]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2C3E2D]" />
            )}
          </button>
          <Link 
            to="/" 
            data-testid="logo"
            className="flex items-center gap-1"
          >
            <div className="w-8 h-8 bg-[#4A7C4E] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">YD</span>
            </div>
          </Link>
        </div>

        {/* Sağ - İkonlar */}
        <div className="flex items-center gap-2">
          <button 
            data-testid="mobile-search-button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-0.5"
            aria-label="Ara"
          >
            <Search className="w-6 h-6 text-[#2C3E2D]" strokeWidth={1.5} />
          </button>
          <Link 
            to="/kargo-takip" 
            data-testid="mobile-track-link"
            className="p-0.5"
            aria-label="Kargo Takip"
          >
            <Truck className="w-6 h-6 text-[#2C3E2D]" strokeWidth={1.5} />
          </Link>
          <Link 
            to="/favoriler" 
            data-testid="mobile-favorites-link"
            className="relative p-0.5"
            aria-label="Favorilerim"
          >
            <Heart className="w-6 h-6 text-[#2C3E2D]" strokeWidth={1.5} />
            {getFavoritesCount() > 0 && (
              <span 
                data-testid="mobile-favorites-count"
                className="absolute top-0 right-0 w-4 h-4 bg-[#4A7C4E] text-white text-xs rounded-full flex items-center justify-center font-semibold"
              >
                {getFavoritesCount()}
              </span>
            )}
          </Link>
          <Link 
            to="/hesabim" 
            data-testid="mobile-account-link"
            className="p-0.5"
            aria-label="Hesabım"
          >
            <User className="w-6 h-6 text-[#2C3E2D]" strokeWidth={1.5} />
          </Link>
          <Link 
            to="/sepet" 
            data-testid="mobile-cart-link"
            className="relative p-0.5"
            aria-label="Sepetim"
          >
            <ShoppingCart className="w-6 h-6 text-[#2C3E2D]" strokeWidth={1.5} />
            {getCartCount() > 0 && (
              <span 
                data-testid="mobile-cart-count"
                className="absolute top-0 right-0 w-4 h-4 bg-[#4A7C4E] text-white text-xs rounded-full flex items-center justify-center font-semibold"
              >
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Panel with Overlay */}
      {mobileSearchOpen && (
        <>
          {/* Overlay Backdrop */}
          <div 
            className="md:hidden fixed top-[160px] inset-x-0 bottom-0 bg-black/50 z-30"
            onClick={() => setMobileSearchOpen(false)}
          />
          {/* Search Panel */}
          <div className="md:hidden relative bg-white border-b border-gray-200 px-4 py-4 z-40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-900 font-semibold text-base">Arama</span>
              <button 
                onClick={() => setMobileSearchOpen(false)}
                className="p-1"
                aria-label="Kapat"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                data-testid="mobile-search-input"
                placeholder="Ara"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full h-11 rounded-full border border-gray-300 bg-gray-50 px-5 pr-12
                         focus:ring-0 focus:border-gray-300
                         transition-all text-sm text-[#2C3E2D] placeholder:text-gray-500"
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4A7C4E] transition-colors"
                aria-label="Ara"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          data-testid="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 px-4 py-4"
        >
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <Phone className="w-5 h-5 text-[#4A7C4E]" />
            <div>
              <p className="text-xs text-[#4A7C4E]">Müşteri Hizmetleri</p>
              <p className="text-sm font-bold text-[#2C3E2D]">+90 532 539 84 29</p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:block h-[100px]">
        <div className="h-full px-6 lg:px-16 py-0 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link 
            to="/" 
            data-testid="logo"
            className="flex items-center gap-2"
          >
            <div className="w-12 h-12 bg-[#4A7C4E] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">YD</span>
            </div>
            <span className="text-xl font-bold text-[#2C3E2D]">YER DÖŞEME</span>
          </Link>

          {/* Müşteri Hizmetleri - Desktop */}
          <div className="hidden lg:flex items-center gap-3 ml-8">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#4A7C4E]" />
            </div>
            <div>
              <p className="text-xs text-[#4A7C4E] font-medium">24 Müşteri Hizmetleri</p>
              <p className="text-base font-bold text-[#2C3E2D]">+90 532 539 84 29</p>
            </div>
          </div>

          {/* Arama Kutusu */}
          <form 
            onSubmit={handleSearch}
            className="w-full md:w-[380px] relative"
          >
            <input
              type="text"
              data-testid="search-input"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 rounded-full border border-gray-200 bg-white px-6 pr-12 
                       focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent 
                       transition-all text-sm text-[#2C3E2D] placeholder:text-gray-400"
            />
            <button 
              type="submit"
              data-testid="search-button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A7C4E] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Sağ Menü İkonları - Desktop */}
          <div className="flex items-center gap-4">
            {/* Kargo Takip */}
            <Link 
              to="/kargo-takip" 
              data-testid="track-order-link"
              className="relative p-3 bg-gray-100 rounded-full hover:bg-emerald-50 transition-colors group"
              aria-label="Kargo Takip"
            >
              <Truck className="w-5 h-5 text-gray-700 group-hover:text-[#4A7C4E]" />
            </Link>

            {/* Favorilerim */}
            <Link 
              to="/favoriler" 
              data-testid="favorites-link"
              className="relative p-3 bg-gray-100 rounded-full hover:bg-emerald-50 transition-colors group"
              aria-label="Favorilerim"
            >
              <Heart className="w-5 h-5 text-gray-700 group-hover:text-[#4A7C4E]" />
              {getFavoritesCount() > 0 && (
                <span 
                  data-testid="favorites-count"
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A7C4E] text-white text-xs 
                           rounded-full flex items-center justify-center font-semibold"
                >
                  {getFavoritesCount()}
                </span>
              )}
            </Link>

            {/* Hesabım */}
            <Link 
              to="/hesabim" 
              data-testid="account-link"
              className="relative p-3 bg-gray-100 rounded-full hover:bg-emerald-50 transition-colors group"
              aria-label="Hesabım"
            >
              <User className="w-5 h-5 text-gray-700 group-hover:text-[#4A7C4E]" />
            </Link>

            {/* Sepetim */}
            <Link 
              to="/sepet" 
              data-testid="cart-link"
              className="relative p-3 bg-gray-100 rounded-full hover:bg-emerald-50 transition-colors group"
              aria-label="Sepetim"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-[#4A7C4E]" />
              {getCartCount() > 0 && (
                <span 
                  data-testid="cart-count"
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A7C4E] text-white text-xs 
                           rounded-full flex items-center justify-center font-semibold"
                >
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
