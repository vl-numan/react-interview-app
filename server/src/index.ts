import { buildApp } from './app.js'
import { config } from './config.js'

const fastify = buildApp()

fastify
  .listen({ port: config.port })
  .catch((error) => {
    fastify.log.error(error)
    process.exit(1)
  })
