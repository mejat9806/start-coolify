import { Star, Clock, Film } from 'lucide-react';
import { AnimeData } from './AnimeCarousel';

interface SpecsGridProps {
  anime: AnimeData;
}

export default function SpecsGrid({ anime }: SpecsGridProps) {
  const specs = [
    {
      icon: <Star size={20} />,
      label: 'Score',
      value: anime.score?.toFixed(1) ?? 'N/A',
    },
    {
      icon: <Clock size={20} />,
      label: 'Episodes',
      value: anime.total_episodes || anime.episodes || 'N/A',
    },
    {
      icon: <Film size={20} />,
      label: 'Studio',
      value: anime.studios?.[0]?.name ?? 'Unknown',
    },
  ];

  return (
    <section className="my-12 rounded-2xl bg-[#f5f5f7] px-6 py-10 sm:px-12 sm:py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold text-[var(--sea-ink)] sm:text-3xl">
        Anime Details
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--lagoon)]">
              {spec.icon}
            </div>
            <p className="text-sm text-[var(--apple-gray-600)]">{spec.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--sea-ink)]">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
