import { SolicitationsRepository } from '@/repositories/solicitations-repository'
import { Solicitation } from '@prisma/client'

export interface GetAllSolicitationsResponse {
  solicitations: Solicitation[] | null
}

export class GetAllSolicitationsService {
  constructor(private solicitationsRepository: SolicitationsRepository) {}

  async execute(): Promise<GetAllSolicitationsResponse> {
    const solicitations = await this.solicitationsRepository.findAllToApprove()

    return {
      solicitations,
    }
  }
}
