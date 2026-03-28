import { createServerFn } from '@tanstack/react-start';

export type AnimeEntry = {
  mal_id: number;
  title: string;
  synopsis: string | null;
  images: { jpg: { image_url: string } };
  score: number | null;
};

export type AnimeDetail = {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  synopsis: string | null;
  images: { jpg: { image_url: string; large_image_url: string } };
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  episodes: number | null;
  status: string;
  aired: { string: string };
  studios: { name: string }[];
  genres: { name: string }[];
  themes: { name: string }[];
  trailer: { url: string | null; embed_url: string | null };
};

export const fetchJikan = createServerFn({ method: 'GET' }).handler(
  async () => {
    const q = 'naruto';
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=5`,
    );
    if (!res.ok) throw new Error(`Jikan API error: ${res.status}`);
    const json = await res.json();
    return json.data as AnimeEntry[];
  },
);

export const fetchAnimeById = createServerFn({ method: 'GET' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!res.ok) throw new Error(`Jikan API error: ${res.status}`);
    const json = await res.json();
    return json.data as AnimeDetail;
  });
