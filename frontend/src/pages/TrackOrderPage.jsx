import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Truck, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const TrackOrderPage = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Demo kargo takip verileri
  const demoTrackingData = {
    'YD123456': {
      code: 'YD123456',
      status: 'in_transit',
      estimatedDelivery: '25 Aralık 2024',
      carrier: 'Yurtiçi Kargo',
      timeline: [
        { status: 'ordered', title: 'Sipariş Alındı', date: '20 Aralık 2024, 14:30', completed: true },
        { status: 'preparing', title: 'Hazırlanıyor', date: '21 Aralık 2024, 09:00', completed: true },
        { status: 'shipped', title: 'Kargoya Verildi', date: '22 Aralık 2024, 11:45', completed: true },
        { status: 'in_transit', title: 'Dağıtımda', date: '24 Aralık 2024, 08:00', completed: true },
        { status: 'delivered', title: 'Teslim Edildi', date: '', completed: false },
      ],
    },
    'YD789012': {
      code: 'YD789012',
      status: 'delivered',
      estimatedDelivery: '22 Aralık 2024',
      carrier: 'Aras Kargo',
      timeline: [
        { status: 'ordered', title: 'Sipariş Alındı', date: '18 Aralık 2024, 10:15', completed: true },
        { status: 'preparing', title: 'Hazırlanıyor', date: '18 Aralık 2024, 15:00', completed: true },
        { status: 'shipped', title: 'Kargoya Verildi', date: '19 Aralık 2024, 09:30', completed: true },
        { status: 'in_transit', title: 'Dağıtımda', date: '21 Aralık 2024, 07:00', completed: true },
        { status: 'delivered', title: 'Teslim Edildi', date: '22 Aralık 2024, 14:20', completed: true },
      ],
    },
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      toast.error('Lütfen takip numarası girin');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = demoTrackingData[trackingCode.toUpperCase()];
    
    if (result) {
      setTrackingResult(result);
      toast.success('Kargo bilgileri bulundu');
    } else {
      setTrackingResult(null);
      toast.error('Kargo bulunamadı. Lütfen takip numarasını kontrol edin.');
    }

    setIsSearching(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500';
      case 'in_transit':
        return 'text-blue-500';
      default:
        return 'text-[#4A7C4E]';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ordered':
        return 'Sipariş Alındı';
      case 'preparing':
        return 'Hazırlanıyor';
      case 'shipped':
        return 'Kargoya Verildi';
      case 'in_transit':
        return 'Dağıtımda';
      case 'delivered':
        return 'Teslim Edildi';
      default:
        return status;
    }
  };

  return (
    <div data-testid="track-order-page" className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Sipariş Sorgula Bölümü */}
          <div className="bg-white rounded-lg p-6 md:p-8 mb-8 md:mb-12">
            {/* Başlık */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#2C3E2D] text-center mb-3">
              Sipariş Sorgula
            </h1>
            <p className="text-center text-[#8A9A8B] text-sm md:text-base mb-6">
              Vermiş olduğunuz sipariş numarasının detayına aşağıdaki formu doldurarak ulaşabilirsiniz.
            </p>

            {/* Arama Formu */}
            <form onSubmit={handleSearch} className="space-y-4">
              {/* E-posta Input */}
              <div>
                <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  data-testid="email-input"
                  placeholder="E-postanız"
                  className="w-full h-12 px-4 rounded-lg border border-[#E0E0E0] 
                           focus:outline-none focus:border-[#4A7C4E] focus:ring-1 focus:ring-[#4A7C4E]
                           transition-all text-sm text-[#2C3E2D] placeholder:text-[#BDBDBD]"
                />
              </div>

              {/* Sipariş No Input */}
              <div>
                <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                  Sipariş No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  data-testid="tracking-input"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Sipariş Numaranız"
                  className="w-full h-12 px-4 rounded-lg border border-[#E0E0E0] 
                           focus:outline-none focus:border-[#4A7C4E] focus:ring-1 focus:ring-[#4A7C4E]
                           transition-all text-sm text-[#2C3E2D] placeholder:text-[#BDBDBD]"
                />
              </div>

              {/* Sorgula Butonu */}
              <button
                type="submit"
                data-testid="track-btn"
                disabled={isSearching}
                className="w-full h-12 bg-[#2C5F2D] text-white rounded-lg font-semibold
                         hover:bg-[#1F4620] transition-colors disabled:opacity-70
                         md:mt-6"
              >
                {isSearching ? 'Sorgulanıyor...' : 'Sorgula'}
              </button>
            </form>

            <p className="text-xs text-[#8A9A8B] mt-3 text-center">
              Demo: E-posta: demo@example.com, Takip No: YD123456
            </p>
          </div>

          {/* Logo */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block mb-4">
              <svg width="120" height="140" viewBox="0 0 120 140" className="mx-auto">
                <text x="60" y="100" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#2C5F2D">
                  BAHÇEM
                </text>
                <text x="60" y="115" fontSize="10" textAnchor="middle" fill="#8A9A8B">
                  .com.tr
                </text>
                <circle cx="40" cy="40" r="6" fill="#7CB342" opacity="0.8" />
                <circle cx="55" cy="30" r="7" fill="#7CB342" opacity="0.9" />
                <circle cx="70" cy="35" r="6" fill="#7CB342" opacity="0.8" />
                <circle cx="50" cy="50" r="5" fill="#7CB342" opacity="0.7" />
                <circle cx="70" cy="50" r="6" fill="#7CB342" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* E-Bülten Aboneliği */}
          <div className="bg-white rounded-lg p-6 md:p-8 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-[#7CB342]">
                  <path fill="currentColor" d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2C3E2D] mb-1">E-Bülten Aboneliği</h3>
                <p className="text-sm text-[#8A9A8B]">
                  Kampanya ve yeniliklerinden haberdar olmak için e-bultenimize abone olun!
                </p>
              </div>
            </div>
            
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="E-posta adresinizi girin"
                className="flex-1 h-11 px-4 rounded-full border border-[#E0E0E0] 
                         focus:outline-none focus:border-[#4A7C4E] focus:ring-1 focus:ring-[#4A7C4E]
                         transition-all text-sm text-[#2C3E2D] placeholder:text-[#BDBDBD]"
              />
              <button
                type="submit"
                className="p-3 bg-white border border-[#E0E0E0] rounded-full 
                         hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5 text-[#4A7C4E]" />
              </button>
            </form>
          </div>

          {/* Kategoriler Accordion */}
          <details className="group bg-white rounded-lg border border-[#E0E0E0] mb-4">
            <summary className="flex items-center justify-between p-6 cursor-pointer">
              <h3 className="text-base font-semibold text-[#2C3E2D]">Kategoriler</h3>
              <span className="text-[#8A9A8B] group-open:rotate-180 transition-transform">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 border-t border-[#E0E0E0]">
              <ul className="space-y-2 text-sm text-[#8A9A8B]">
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">HALİFLEKS</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">ÇİM HALI</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">KARO HALI</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">PVC ZEMİN</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">PASPAS</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">AKSESUAR</a></li>
              </ul>
            </div>
          </details>

          {/* Önemli Bilgiler Accordion */}
          <details className="group bg-white rounded-lg border border-[#E0E0E0]">
            <summary className="flex items-center justify-between p-6 cursor-pointer">
              <h3 className="text-base font-semibold text-[#2C3E2D]">Önemli Bilgiler</h3>
              <span className="text-[#8A9A8B] group-open:rotate-180 transition-transform">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 border-t border-[#E0E0E0]">
              <ul className="space-y-2 text-sm text-[#8A9A8B]">
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-[#4A7C4E] transition-colors">Şartlar ve Koşullar</a></li>
              </ul>
            </div>
          </details>

          {/* Sonuç Gösterimi */}
          {trackingResult && (
            <div 
              data-testid="tracking-result"
              className="mt-8 bg-white rounded-lg p-6 md:p-8 border-l-4 border-[#4A7C4E]"
            >
              <h3 className="text-lg font-bold text-[#2C3E2D] mb-4">Sipariş Bilgileri</h3>
              
              {/* Kargo Bilgileri */}
              <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-[#E0E0E0]">
                <div>
                  <p className="text-sm text-[#8A9A8B] mb-1">Takip No</p>
                  <p className="font-bold text-[#2C3E2D]">{trackingResult.code}</p>
                </div>
                <div>
                  <p className="text-sm text-[#8A9A8B] mb-1">Kargo Firması</p>
                  <p className="font-medium text-[#2C3E2D]">{trackingResult.carrier}</p>
                </div>
              </div>

              {/* Durum */}
              <div className="mb-6">
                <p className={`text-xl font-bold mb-2 ${getStatusColor(trackingResult.status)}`}>
                  {getStatusText(trackingResult.status)}
                </p>
                <p className="text-sm text-[#8A9A8B]">
                  Tahmini Teslimat: {trackingResult.estimatedDelivery}
                </p>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-[#2C3E2D] mb-4">Kargo Geçmişi</h4>
                <div className="space-y-3">
                  {trackingResult.timeline.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <div className={`w-3 h-3 rounded-full ${
                          step.completed ? 'bg-[#4A7C4E]' : 'bg-[#D4D4D4]'
                        }`} />
                        {index < trackingResult.timeline.length - 1 && (
                          <div className={`w-0.5 h-10 ${
                            step.completed ? 'bg-[#4A7C4E]' : 'bg-[#D4D4D4]'
                          }`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${
                          step.completed ? 'text-[#2C3E2D]' : 'text-[#8A9A8B]'
                        }`}>
                          {step.title}
                        </p>
                        {step.date && (
                          <p className="text-xs text-[#8A9A8B] mt-1">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
