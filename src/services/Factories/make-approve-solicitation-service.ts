import { PrismaSolicitationsRepository } from '@/repositories/prisma/prisma-solicitations-repository'
import { ApproveSolicitationService } from '../approve-solicitation'

export function makeApproveSolicitationService() {
  const solicitationsRepository = new PrismaSolicitationsRepository()
  const service = new ApproveSolicitationService(solicitationsRepository)

  return service
}
