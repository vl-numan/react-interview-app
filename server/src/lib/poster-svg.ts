import type { Movie } from '../data/movies.js'
import { GENRES } from '../data/wordbanks.js'

const HUE_BY_GENRE = new Map<string, number>(GENRES.map((genre, i) => [genre, i * 36]))

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function renderPosterSvg(movie: Movie): string {
  const baseHue = HUE_BY_GENRE.get(movie.genre) ?? 0
  const hue = (baseHue + (movie.id % 10) * 2) % 360
  const top = `hsl(${hue}, 55%, 32%)`
  const bottom = `hsl(${hue}, 55%, 14%)`
  const title = escapeXml(movie.title)
  const genre = escapeXml(movie.genre)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}" />
      <stop offset="1" stop-color="${bottom}" />
    </linearGradient>
  </defs>
  <rect width="200" height="300" fill="url(#bg)" />
  <text x="100" y="140" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="white">
    <tspan x="100" dy="0">${title}</tspan>
  </text>
  <text x="100" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="rgba(255,255,255,0.75)">${genre}</text>
</svg>`
}
