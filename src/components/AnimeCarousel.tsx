import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type AnimeData = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  score?: number;
  synopsis: string;
  total_episodes?: number;
  episodes?: number;
  studios?: Array<{ name: string }>;
};

export type CarouselMode = 'hero' | 'featured' | 'spotlight';

interface AnimeCarouselProps {
  anime: AnimeData[];
  mode: CarouselMode;
  currentIndex?: number;
}

export default function AnimeCarousel({
  anime,
  mode,
  currentIndex = 0,
}: AnimeCarouselProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    if (mode === 'hero' || mode === 'featured') {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % anime.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [anime.length, mode]);

  const goToPrevious = () =>
    setIndex((prev) => (prev - 1 + anime.length) % anime.length);
  const goToNext = () => setIndex((prev) => (prev + 1) % anime.length);

  const current = anime[index];

  if (!current) return null;

  if (mode === 'hero') {
    return (
      <section className="h-screen w-full bg-[#000000] text-white">
        <div className="relative flex h-full flex-col items-center justify-center px-4 pt-20">
          <img
            src={current.images.jpg.large_image_url}
            alt={current.title}
            className="h-[40vh] w-auto max-w-md object-contain opacity-90 transition-opacity duration-500"
          />
          <h1 className="mt-12 display-title text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          <p className="mt-4 max-w-xl text-center text-lg text-gray-300">
            {current.score && `★ ${current.score} `}
            {current.synopsis
              ? current.synopsis.substring(0, 150) + '...'
              : 'Stream now'}
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/anime/$id"
              params={{ id: String(current.mal_id) }}
              className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-[#0077ed]"
            >
              Watch Now
            </Link>
            <button
              onClick={goToPrevious}
              className="rounded-full border border-white px-4 py-3 text-sm font-semibold text-white no-underline transition hover:bg-white/10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="rounded-full border border-white px-4 py-3 text-sm font-semibold text-white no-underline transition hover:bg-white/10"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (mode === 'featured') {
    return (
      <section className="my-8 overflow-hidden py-8 sm:my-16">
        <h2 className="mb-8 px-4 text-2xl font-semibold text-[var(--sea-ink)]">
          Trending Now
        </h2>
        <div className="relative">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
            {anime.map((item, idx) => (
              <article
                key={item.mal_id}
                className={`snap-center flex-shrink-0 rounded-2xl bg-[var(--card-bg)] p-4 transition-transform duration-300 hover:scale-105 ${
                  idx === index ? 'scale-100' : 'scale-95'
                }`}
                style={{
                  width: 'calc(100% - 1rem)',
                  maxWidth: '280px',
                }}
              >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="h-48 w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-[var(--sea-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--sea-ink-soft)] line-clamp-2">
                  {item.synopsis}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
