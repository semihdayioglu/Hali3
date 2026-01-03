import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faCreditCard,
  faTruck,
  faShieldAlt,
  faHeadphones,
  faPlus,
  faMinus,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faTiktok,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    categories: false,
    important: false,
    quickAccess: false,
    contact: false
  });

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Burada newsletter API çağrısı yapılabilir
      // Şimdilik basit bir simülasyon
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Bültene başarıyla abone oldunuz!');
      setEmail('');
    } catch (error) {
      alert('Bir hata oluştu, lütfen tekrar deneyin');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer data-testid="footer" className="bg-[#2C3E2D] text-white">
      {/* E-Bülten Abonelik Bölümü */}
      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-20 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Sol - Logo Alanı */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs font-medium">
                LOGO
              </div>
            </div>

            {/* Orta - Metin */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 mb-1">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                <span className="text-sm">Kampanya ve yeniliklerden haberdar olmak için e-bültenimize abone olun!</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">E-Bülten Aboneliği</h3>
            </div>

            {/* Sağ - Form */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <form onSubmit={handleNewsletterSubmit} className="flex items-center max-w-md lg:max-w-none mx-auto lg:mx-0">
                <div className="relative flex-1 lg:w-80">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresinizi giriniz"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-l-lg border border-gray-300 
                             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 
                             outline-none text-gray-800 placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-0 top-0 h-full px-4 bg-gray-700 text-white 
                             rounded-r-lg hover:bg-gray-800 transition-colors 
                             disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Ana Footer İçeriği */}
      <div className="container mx-auto px-4 md:px-20 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Kategoriler */}
          <div className="space-y-4">
            <div 
              className={`flex items-center justify-between lg:block cursor-pointer lg:cursor-default w-full ${
                openSections.categories 
                  ? 'lg:border-none lg:pb-0' 
                  : 'border-b border-white/20 pb-2 lg:border-none lg:pb-0'
              }`}
              onClick={() => toggleSection('categories')}
            >
              <h3 className="font-semibold mb-0 text-base md:text-lg">
                Kategoriler
              </h3>
              <button className="lg:hidden text-white">
                {openSections.categories ? <FontAwesomeIcon icon={faMinus} className="w-5 h-5" /> : <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />}
              </button>
            </div>
            <ul className={`space-y-2 md:space-y-3 transition-all duration-300 lg:block mt-3 ${
              openSections.categories ? 'block' : 'hidden'
            }`}>
              <li>
                <Link to="/kategori/cim-hali" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Halıfleks
                </Link>
              </li>
              <li>
                <Link to="/kategori/karo-hali" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Çim Halı
                </Link>
              </li>
              <li>
                <Link to="/kategori/pvc-zemin" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Karo Halı
                </Link>
              </li>
              <li>
                <Link to="/kategori/paspas" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  PVC Zemin
                </Link>
              </li>
              <li>
                <Link to="/kategori/laminat" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Yolluk
                </Link>
              </li>
              {/* <li>
                <Link to="/kategori/yoresel" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Yöresel Lezzetler
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Önemli Bilgiler */}
          <div className="space-y-4">
            <div 
              className={`flex items-center justify-between lg:block cursor-pointer lg:cursor-default w-full ${
                openSections.important 
                  ? 'lg:border-none lg:pb-0' 
                  : 'border-b border-white/20 pb-2 lg:border-none lg:pb-0'
              }`}
              onClick={() => toggleSection('important')}
            >
              <h3 className="font-semibold mb-0 text-base md:text-lg">
                Önemli Bilgiler
              </h3>
              <button className="lg:hidden text-white">
                {openSections.important ? <FontAwesomeIcon icon={faMinus} className="w-5 h-5" /> : <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />}
              </button>
            </div>
            <ul className={`space-y-2 md:space-y-3 transition-all duration-300 lg:block mt-3 ${
              openSections.important ? 'block' : 'hidden'
            }`}>
              <li>
                <Link to="/teslimat-kosullari" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Teslimat Koşulları
                </Link>
              </li>
              <li>
                <Link to="/uyelik-sozlesmesi" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Üyelik Sözleşmesi
                </Link>
              </li>
              <li>
                <Link to="/satis-sozlesmesi" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link to="/garanti-iade" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Garanti ve İade Koşulları
                </Link>
              </li>
              <li>
                <Link to="/gizlilik-guvenlik" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Gizlilik ve Güvenlik
                </Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Erişim */}
          <div className="space-y-4">
            <div 
              className={`flex items-center justify-between lg:block cursor-pointer lg:cursor-default w-full ${
                openSections.quickAccess 
                  ? 'lg:border-none lg:pb-0' 
                  : 'border-b border-white/20 pb-2 lg:border-none lg:pb-0'
              }`}
              onClick={() => toggleSection('quickAccess')}
            >
              <h3 className="font-semibold mb-0 text-base md:text-lg">
                Hızlı Erişim
              </h3>
              <button className="lg:hidden text-white">
                {openSections.quickAccess ? <FontAwesomeIcon icon={faMinus} className="w-5 h-5" /> : <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />}
              </button>
            </div>
            <ul className={`space-y-2 md:space-y-3 transition-all duration-300 lg:block mt-3 ${
              openSections.quickAccess ? 'block' : 'hidden'
            }`}>
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link to="/yeni-urunler" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Yeni Ürünler
                </Link>
              </li>
              <li>
                <Link to="/indirimler" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  İndirimdekiler
                </Link>
              </li>
              <li>
                <Link to="/musteri-hizmetleri" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Müşteri Hizmetleri
                </Link>
              </li>
              <li>
                <Link to="/sepet" className="text-white/70 hover:text-white transition-colors text-sm block py-1">
                  Sepetim
                </Link>
              </li>
            </ul>
          </div>

          {/* Adres & İletişim */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div 
              className={`flex items-center justify-between lg:block cursor-pointer lg:cursor-default w-full ${
                openSections.contact 
                  ? 'lg:border-none lg:pb-0' 
                  : 'border-b border-white/20 pb-2 lg:border-none lg:pb-0'
              }`}
              onClick={() => toggleSection('contact')}
            >
              <h3 className="font-semibold mb-0 text-base md:text-lg">
                Adres & İletişim
              </h3>
              <button className="lg:hidden text-white">
                {openSections.contact ? <FontAwesomeIcon icon={faMinus} className="w-5 h-5" /> : <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />}
              </button>
            </div>
            <div className={`space-y-3 md:space-y-4 transition-all duration-300 lg:block mt-3 ${
              openSections.contact ? 'block' : 'hidden'
            }`}>
              <div className="text-white/70 text-sm">
                <div className="flex items-start gap-2 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">
                    Sarıgüllük, Milli Egemenlik Cd. NO:33 / A,<br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>27060 Şehitkamil / Gaziantep / TÜRKİYE
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-[#9ACD32]" />
                  <span className="text-sm font-semibold text-[#9ACD32]">Müşteri Hizmetleri</span>
                </div>
                <a href="tel:+905327375216" className="text-white hover:text-[#9ACD32] transition-colors text-base md:text-sm font-bold block">
                  +905327375216
                </a>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold mb-3 text-sm">Bizi takip edin</h4>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#7CB342] rounded-xl flex items-center justify-center hover:bg-[#689F38] transition-colors shadow-md"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#7CB342] rounded-xl flex items-center justify-center hover:bg-[#689F38] transition-colors shadow-md"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://tiktok.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#7CB342] rounded-xl flex items-center justify-center hover:bg-[#689F38] transition-colors shadow-md"
                  >
                    <FontAwesomeIcon icon={faTiktok} className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#7CB342] rounded-xl flex items-center justify-center hover:bg-[#689F38] transition-colors shadow-md"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bant - Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2026 Yer Döşeme. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png" 
                  alt="Mastercard" 
                  className="h-6 opacity-70"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  className="h-6 opacity-70"
                />
              </div>
              <div className="flex items-center">
                <img 
                  src="https://www.t-soft.com.tr/uploads/t-soft-360-logo.png" 
                  alt="T-SOFT 360" 
                  className="h-8"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* <div className="hidden bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  T-SOFT <span className="text-xs">360</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
