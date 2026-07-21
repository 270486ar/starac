import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/+919655516285"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-success-500 hover:bg-success-600 text-white flex items-center justify-center shadow-lg shadow-success-500/30 hover:scale-110 transition-all"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 hover:scale-110 transition-all animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
