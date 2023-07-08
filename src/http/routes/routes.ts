import { FastifyInstance } from 'fastify'
import { RegisterCollaborator } from '../Controllers/Register'
import { AuthenticateCollaborator } from '../Controllers/Authenticate'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/register-collaborator', RegisterCollaborator)
  app.post('/authenticate', AuthenticateCollaborator)
}
