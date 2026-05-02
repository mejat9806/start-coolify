import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/anime')({
  component: AnimePage,
});

function AnimePage() {
  return (
    <main className="page-wrap px-4 pb-12">
      <h1 className="display-title mb-6 max-w-3xl text-4xl font-semibold tracking-tighter text-[var(--sea-ink)] sm:text-5xl lg:text-6xl">
        Anime Hub
      </h1>
    </main>
  );
}
