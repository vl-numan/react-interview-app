import type { FastifyInstance } from 'fastify'
import { MOVIES, searchMovies } from '../data/movies.js'
import { simulateNetworkConditions } from '../middleware/simulate.js'

const DEFAULT_PAGE_SIZE = 12
const MAX_PAGE_SIZE = 50

interface SearchQuery {
  q?: string
  page?: string
  pageSize?: string
}

function parsePositiveInt(raw: string | undefined, fallback: number): number | undefined {
  if (raw === undefined) return fallback
  const value = Number.parseInt(raw, 10)
  if (!Number.isFinite(value) || value < 1) return undefined
  return value
}

export async function moviesRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', simulateNetworkConditions)

  fastify.get<{ Querystring: SearchQuery }>('/search', async (request, reply) => {
    const { q = '' } = request.query
    const page = parsePositiveInt(request.query.page, 1)
    const pageSize = parsePositiveInt(request.query.pageSize, DEFAULT_PAGE_SIZE)

    if (page === undefined || pageSize === undefined) {
      return reply.code(400).send({ error: 'page and pageSize must be positive integers' })
    }

    const clampedPageSize = Math.min(pageSize, MAX_PAGE_SIZE)
    const matches = searchMovies(q)
    const total = matches.length
    const totalPages = Math.max(1, Math.ceil(total / clampedPageSize))
    const clampedPage = Math.min(page, totalPages)
    const start = (clampedPage - 1) * clampedPageSize

    return {
      items: matches.slice(start, start + clampedPageSize),
      page: clampedPage,
      pageSize: clampedPageSize,
      total,
      totalPages,
    }
  })

  fastify.get('/random', async () => {
    const movie = MOVIES[Math.floor(Math.random() * MOVIES.length)]
    return movie
  })
}
