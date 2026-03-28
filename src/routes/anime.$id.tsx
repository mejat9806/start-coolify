import { Link, createFileRoute } from '@tanstack/react-router';
import { fetchAnimeById } from '../serverFns/jikan';

export const Route = createFileRoute('/anime/$id')({
  loader: ({ params }) => fetchAnimeById({ data: Number(params.id) }),
  component: AnimeDetailPage,
});

function AnimeDetailPage() {
  const anime = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 pb-12 pt-14">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-(--lagoon-deep) no-underline hover:underline"
        >
          ← Back to list
        </Link>
      </div>

      <div className="island-shell rise-in rounded-4xl p-6 sm:p-10">
        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Poster */}
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full rounded-2xl object-cover shadow-lg sm:w-56 sm:shrink-0"
          />

          {/* Info */}
          <div className="flex-1">
            <p className="island-kicker mb-2">{anime.status}</p>
            <h1 className="display-title mb-1 text-3xl font-bold tracking-tight text-(--sea-ink) sm:text-4xl">
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="mb-1 text-base text-(--sea-ink-soft)">
                {anime.title_english}
              </p>
            )}
            {anime.title_japanese && (
              <p className="mb-4 text-sm text-(--sea-ink-soft)">
                {anime.title_japanese}
              </p>
            )}

            {/* Stats row */}
            <div className="mb-6 flex flex-wrap gap-3">
              {anime.score && <Stat label="Score" value={`★ ${anime.score}`} />}
              {anime.rank && <Stat label="Rank" value={`#${anime.rank}`} />}
              {anime.episodes && (
                <Stat label="Episodes" value={String(anime.episodes)} />
              )}
              <Stat label="Aired" value={anime.aired.string} />
            </div>

            {/* Genres & themes */}
            {anime.genres.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {[...anime.genres, ...anime.themes].map((g) => (
                  <span
                    key={g.name}
                    className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.12)] px-3 py-1 text-xs font-medium text-(--lagoon-deep)"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Studios */}
            {anime.studios.length > 0 && (
              <p className="mb-4 text-sm text-(--sea-ink-soft)">
                <span className="font-semibold text-(--sea-ink)">Studio: </span>
                {anime.studios.map((s) => s.name).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Synopsis */}
        {anime.synopsis && (
          <div className="mt-8 border-t border-[rgba(50,143,151,0.15)] pt-6">
            <h2 className="mb-3 text-lg font-semibold text-(--sea-ink)">
              Synopsis
            </h2>
            <p className="leading-relaxed text-(--sea-ink-soft)">
              {anime.synopsis}
            </p>
          </div>
        )}

        {/* Trailer */}
        {anime.trailer.embed_url && (
          <div className="mt-8 border-t border-[rgba(50,143,151,0.15)] pt-6">
            <h2 className="mb-3 text-lg font-semibold text-(--sea-ink)">
              Trailer
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={anime.trailer.embed_url}
                title={`${anime.title} trailer`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="island-shell rounded-xl px-4 py-2 text-center">
      <p className="text-xs text-(--sea-ink-soft)">{label}</p>
      <p className="text-sm font-semibold text-(--sea-ink)">{value}</p>
    </div>
  );
}
