import type { FastifyInstance } from 'fastify'
import { findMovieById } from '../data/movies.js'
import { renderPosterSvg } from '../lib/poster-svg.js'

export async function posterRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>('/:id/poster', async (request, reply) => {
    const id = Number.parseInt(request.params.id, 10)
    const movie = Number.isFinite(id) ? findMovieById(id) : undefined

    if (!movie) {
      return reply.code(404).send({ error: 'Movie not found' })
    }

    reply
      .header('Content-Type', 'image/svg+xml')
      .header('Cache-Control', 'public, max-age=31536000, immutable')
      .send(renderPosterSvg(movie))
  })
}
