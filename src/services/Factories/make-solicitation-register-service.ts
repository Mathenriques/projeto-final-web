import { PrismaSolicitationsRepository } from '@/repositories/prisma/prisma-solicitations-repository'
import { SolicitationRegisterService } from '../solicitation-register'
import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository'

export function makeSolicitationRegisterService() {
  const solicitationsRepository = new PrismaSolicitationsRepository()
  const collaboratorsRepository = new PrismaCollaboratorsRepository()
  const service = new SolicitationRegisterService(
    solicitationsRepository,
    collaboratorsRepository,
  )

  return service
}
