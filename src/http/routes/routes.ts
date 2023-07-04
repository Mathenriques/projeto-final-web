import { FastifyInstance } from 'fastify'
import { RegisterCollaborator } from '../Controllers/Register'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/register-collaborator', RegisterCollaborator)
}
