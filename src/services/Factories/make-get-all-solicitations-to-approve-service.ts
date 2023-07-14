import { GetAllSolicitationsService } from '../get-all-solicitations'
import { PrismaSolicitationsRepository } from '@/repositories/prisma/prisma-solicitations-repository'

export function makeGetAllSolicitationToApproveService() {
  const utiBedsRepository = new PrismaSolicitationsRepository()
  const utiBeds = new GetAllSolicitationsService(utiBedsRepository)

  return utiBeds
}
