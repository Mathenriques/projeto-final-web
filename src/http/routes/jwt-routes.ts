import { FastifyInstance } from 'fastify'

export async function AppJwtRoutes(app: FastifyInstance) {
  app.get('/uti-beds', () => {
    console.log('oii')
  })
}
