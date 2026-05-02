import { Link, createFileRoute } from '@tanstack/react-router';
import { fetchJikan, type AnimeEntry } from '../serverFns/jikan';
import { z } from 'zod';

export const Route = createFileRoute('/search')({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  loaderDeps: ({ search }) => {
    search.q = search.q || '';
    return {
      query: search.q,
    };
  },
  loader: async ({ deps }) => {
    const query = deps.query;
    console.log(query);
    if (!query) return { anime: [], query: '' };

    try {
      const anime = await fetchJikan({ data: query });
      return { anime, query };
    } catch (error) {
      console.error('Search error:', error);
      return { anime: [], query };
    }
  },
  component: SearchPage,
});

function SearchPage() {
  const { anime, query } = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <header className="mb-8">
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          Search Results
        </h1>
        <p className="text-[var(--sea-ink-soft)]">
          {query
            ? `Showing results for "${query}"`
            : 'Please enter a search term to find anime.'}
        </p>
      </header>

      {!query ? (
        <div className="island-shell rounded-2xl p-10 text-center">
          <p className="text-lg text-[var(--sea-ink-soft)]">
            Start typing in the search bar to explore anime!
          </p>
        </div>
      ) : anime.length === 0 ? (
        <div className="island-shell rounded-2xl p-10 text-center">
          <p className="text-lg text-[var(--sea-ink-soft)]">
            No results found for "{query}". Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {anime.map((item: AnimeEntry) => (
            <article
              key={item.mal_id}
              className="island-shell feature-card rounded-2xl p-4 transition hover:-translate-y-1"
            >
              <Link
                to="/anime/$id"
                params={{ id: String(item.mal_id) }}
                className="group flex flex-col gap-3 no-underline"
              >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="aspect-[3/4] w-full rounded-xl object-cover shadow-sm transition group-hover:shadow-md"
                />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="line-clamp-1 text-base font-semibold text-[var(--sea-ink)]">
                      {item.title}
                    </h2>
                    {item.score && (
                      <span className="text-xs font-medium text-[var(--sea-ink-soft)]">
                        ★ {item.score}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--sea-ink-soft)]">
                    {item.synopsis ?? 'No synopsis available.'}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
