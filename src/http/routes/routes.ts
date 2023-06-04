import { FastifyInstance } from 'fastify'
import { Register } from '../Controllers/Register'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/register', Register)
}
