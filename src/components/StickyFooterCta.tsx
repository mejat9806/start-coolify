import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

export default function StickyFooterCta() {
  const [visible, setVisible] = useState(false);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
        setTimeout(() => setVisible(false), 3000);
        return;
      }
      setVisible(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-4 mb-4 overflow-hidden rounded-full bg-[#1c1c1e]/90 backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => setPopped(!popped)}
          className="flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 sm:py-5 sm:text-base"
        >
          <Plus size={18} />
          Queue Now — Add to My List
        </button>
      </div>
    </div>
  );
}
