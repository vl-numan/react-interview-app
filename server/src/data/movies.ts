import { hash, pick } from './hash.js'
import {
  ADJECTIVES,
  GENRES,
  NOUNS,
  PLACES,
  PLOT_HOOKS,
  PROFESSIONS,
  STAKES,
  SUBTITLES,
  VERB_PHRASES,
} from './wordbanks.js'

export interface Movie {
  id: number
  title: string
  year: number
  genre: string
  rating: number
  runtimeMinutes: number
  plot: string
  posterUrl: string
}

const MOVIE_COUNT = 200

function buildTitle(i: number): string {
  const adjective = pick(ADJECTIVES, i, 'adj')
  const noun = pick(NOUNS, i, 'noun')
  const place = pick(PLACES, i, 'place')
  const subtitle = pick(SUBTITLES, i, 'subtitle')

  switch (hash(i, 'template') % 3) {
    case 0:
      return `${adjective} ${noun}`
    case 1:
      return `The ${noun} of ${place}`
    default:
      return `${noun}: ${subtitle}`
  }
}

function buildPlot(i: number): string {
  const adjective = pick(ADJECTIVES, i, 'plot-adj').toLowerCase()
  const profession = pick(PROFESSIONS, i, 'plot-prof')
  const place = pick(PLACES, i, 'plot-place')
  const hook = pick(PLOT_HOOKS, i, 'plot-hook')
  const verb = pick(VERB_PHRASES, i, 'plot-verb')
  const stakes = pick(STAKES, i, 'plot-stakes')
  return `When a ${adjective} ${profession} in ${place} discovers ${hook}, they must ${verb} before ${stakes}.`
}

function generateMovies(): Movie[] {
  const movies: Movie[] = []
  for (let i = 0; i < MOVIE_COUNT; i++) {
    const id = i + 1
    movies.push({
      id,
      title: buildTitle(i),
      year: 1970 + (hash(i, 'year') % 55),
      genre: pick(GENRES, i, 'genre'),
      rating: Math.round(((hash(i, 'rating') % 91) / 10 + 1) * 10) / 10,
      runtimeMinutes: 80 + (hash(i, 'runtime') % 101),
      plot: buildPlot(i),
      posterUrl: `/api/movies/${id}/poster`,
    })
  }
  return movies
}

// Computed once at module load so every request reuses the same array —
// guarantees identical data across restarts and avoids recomputation per request.
export const MOVIES: readonly Movie[] = generateMovies()

export function findMovieById(id: number): Movie | undefined {
  return MOVIES.find((movie) => movie.id === id)
}

export function searchMovies(query: string): Movie[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...MOVIES]
  return MOVIES.filter(
    (movie) => movie.title.toLowerCase().includes(q) || movie.genre.toLowerCase().includes(q),
  )
}
