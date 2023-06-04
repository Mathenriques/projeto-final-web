import { FastifyInstance } from 'fastify'

export async function AppRoutes(app: FastifyInstance) {
  app.get('/', (request, reply) => {
    return reply.status(200).send()
  })
}
