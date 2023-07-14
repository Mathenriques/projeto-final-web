import { Solicitation } from '@prisma/client'
import { SolicitationsRepository } from '@/repositories/solicitations-repository'

interface ApproveSolicitationServiceRequest {
  solicitation_id: string
}

interface ApproveSolicitationServiceResponse {
  solicitation: Solicitation | null
}

export class ApproveSolicitationService {
  constructor(private solcitationsRepository: SolicitationsRepository) {}

  async execute({
    solicitation_id,
  }: ApproveSolicitationServiceRequest): Promise<ApproveSolicitationServiceResponse> {
    const solicitation = await this.solcitationsRepository.approveSolicitation(
      solicitation_id,
    )

    return {
      solicitation,
    }
  }
}
