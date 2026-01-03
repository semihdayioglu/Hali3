import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const messages = [
  "1000 ₺ üzeri Ücretsiz Kargo",
  "%100 Müşteri Memnuniyeti",
  "0 532 577 89 27 WhatsApp Sipariş"
];

const Topbar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const nextMessage = useCallback(() => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  }, []);

  const previousMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextMessage, 3000);
    return () => clearInterval(interval);
  }, [nextMessage]);

  return (
    <div 
      data-testid="topbar"
      className="bg-gradient-to-r from-lime-400 to-lime-500 py-1 lg:py-1.5 relative sticky top-0 z-50"
    >
      <div className="flex items-center justify-between px-2 lg:justify-center lg:gap-4 md:gap-14">
        {/* SOL OK */}
        <button 
          onClick={previousMessage}
          data-testid="topbar-prev"
          className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
          aria-label="Önceki mesaj"
        >
          <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4 md:w-5 md:h-5 text-gray-800" strokeWidth={2} />
        </button>

        {/* MESAJ */}
        <div className="flex-1 lg:min-w-[200px] md:min-w-[280px] text-center">
          <p 
            className="text-gray-800 font-bold text-xs lg:text-sm md:text-base transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis px-1"
            dangerouslySetInnerHTML={{
              __html: messages[currentMessage]
                .replace('1000 ₺ üzeri', '<span style="font-weight: 500">1000 ₺ üzeri</span>')
                .replace('%100', '<span style="font-weight: 500">%100</span>')
                .replace('0 532 577 89 27', '<span style="font-weight: 500">0 532 577 89 27</span>')
            }}
          />
        </div>

        {/* SAĞ OK */}
        <button 
          onClick={nextMessage}
          data-testid="topbar-next"
          className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
          aria-label="Sonraki mesaj"
        >
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 md:w-5 md:h-5 text-gray-800" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
