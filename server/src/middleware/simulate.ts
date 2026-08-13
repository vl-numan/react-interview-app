import type { FastifyReply, FastifyRequest } from 'fastify'
import { config } from '../config.js'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Deliberately non-deterministic: this simulates real network jitter and
// occasional server errors so the frontend has a genuine reason to debounce,
// show loading states, and handle errors — unlike the movie dataset itself,
// which must stay deterministic.
export async function simulateNetworkConditions(_request: FastifyRequest, reply: FastifyReply) {
  if (!config.simEnabled) return

  const isOutlier = Math.random() < config.outlierChance
  const [min, max] = isOutlier
    ? [config.outlierMinMs, config.outlierMaxMs]
    : [config.latencyMinMs, config.latencyMaxMs]
  await sleep(min + Math.random() * (max - min))

  if (Math.random() < config.errorRate) {
    reply.code(500).send({ error: 'Simulated server error' })
  }
}
