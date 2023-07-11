import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../Middlewares/jwt-verify'
import { UtiBeds } from '../Controllers/Uti-Beds'
import { GetAllCollaboratorsToApprove } from '../Controllers/Collaborators-to-Approve'
import { ReproveCollaborator } from '../Controllers/Reprove-Collaborator'
import { AproveCollaborator } from '../Controllers/Aprove-Collaborator'

export async function AppJwtRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // Get All Beds
  app.get('/uti-beds', UtiBeds)

  // Get All Collaborators To Be Approval
  app.get('/collaborators-to-approve', GetAllCollaboratorsToApprove)

  // Reprove Collaborator
  app.delete('/reprove-collab', ReproveCollaborator)

  // Reprove Collaborator
  app.put('/approve-collab', AproveCollaborator)
}
