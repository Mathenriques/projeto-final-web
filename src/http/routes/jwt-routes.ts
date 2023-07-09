import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../Middlewares/jwt-verify'
import { UtiBeds } from '../Controllers/Uti-Beds'

export async function AppJwtRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/uti-beds', UtiBeds)
}
