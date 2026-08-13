import cors from '@fastify/cors'
import Fastify from 'fastify'
import { moviesRoutes } from './routes/movies.js'
import { posterRoutes } from './routes/poster.js'

export function buildApp() {
  const fastify = Fastify({ logger: true })

  // The client calls this API cross-origin with full absolute URLs (no dev
  // proxy), so CORS has to be open — reflecting the request origin is fine
  // here since this is a local-only demo API with no auth/cookies involved.
  fastify.register(cors, { origin: true })

  fastify.get('/api/health', async () => ({ status: 'ok' }))
  fastify.register(moviesRoutes, { prefix: '/api/movies' })
  fastify.register(posterRoutes, { prefix: '/api/movies' })

  return fastify
}
