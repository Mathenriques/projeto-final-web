import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../Middlewares/jwt-verify'
import { UtiBeds } from '../Controllers/Uti-Beds'
import { GetAllCollaboratorsToApprove } from '../Controllers/Collaborators-to-Approve'
import { ReproveCollaborator } from '../Controllers/Reprove-Collaborator'
import { AproveCollaborator } from '../Controllers/Aprove-Collaborator'
import { RegisterPatient } from '../Controllers/Register-Patient'

export async function AppJwtRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // Get All Beds
  app.get('/uti-beds', UtiBeds)

  // Get All Collaborators To Be Approval
  app.get('/collaborators-to-approve', GetAllCollaboratorsToApprove)

  // Approve Collaborator
  app.put('/approve-collab', AproveCollaborator)

  // Reprove Collaborator
  app.delete('/reprove-collab', ReproveCollaborator)

  // Register Patient
  app.post('/register-patient', RegisterPatient)
}
