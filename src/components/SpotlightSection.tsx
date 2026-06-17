import { Link } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';
import { AnimeData } from './AnimeCarousel';

interface SpotlightSectionProps {
  anime: AnimeData;
}

export default function SpotlightSection({ anime }: SpotlightSectionProps) {
  return (
    <section className="my-16 grid grid-cols-1 gap-8 overflow-hidden px-4 md:grid-cols-2 md:items-center">
      <div className="order-2 md:order-1">
        <h2 className="mb-4 display-title text-3xl font-semibold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          {anime.title}
        </h2>
        <p className="mb-6 text-lg text-[var(--sea-ink-soft)]">
          {anime.score && <span>Rating: <span className="text-yellow-500">{'★'.repeat(Math.round(anime.score / 2))}</span> </span>}
          {anime.synopsis}
        </p>
        <Link
          to="/anime/$id"
          params={{ id: String(anime.mal_id) }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:opacity-90"
        >
          Watch Trailer
          <Sparkles size={16} />
        </Link>
      </div>
      <div className="order-1 md:order-2">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="h-64 w-full rounded-2xl object-cover shadow-lg md:h-80 lg:h-96"
        />
      </div>
    </section>
  );
}
