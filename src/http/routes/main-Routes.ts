import { FastifyInstance } from 'fastify'
import { RegisterCollaborator } from '../Controllers/Register-Collaborator'
import { AuthenticateCollaborator } from '../Controllers/Authenticate'
import { RegisterUtiBed } from '../Controllers/Register-UtiBed'
import { RegisterAdmin } from '../Controllers/Register-Admin'

export async function AppMainRoutes(app: FastifyInstance) {
  // Collaborator
  app.post('/register-collaborator', RegisterCollaborator)
  app.post('/authenticate', AuthenticateCollaborator)

  // Register Bed
  app.post('/register-uti-bed', RegisterUtiBed)

  // Register Admin
  app.post('/register-admin', RegisterAdmin)
}
