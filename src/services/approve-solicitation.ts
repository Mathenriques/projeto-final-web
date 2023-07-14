import { Solicitation, StatusSolicitation } from '@prisma/client'
import { SolicitationsRepository } from '@/repositories/solicitations-repository'

interface ApproveSolicitationServiceRequest {
  solicitation_id: string
  status: StatusSolicitation
}

interface ApproveSolicitationServiceResponse {
  solicitation: Solicitation | null
}

export class ApproveSolicitationService {
  constructor(private solcitationsRepository: SolicitationsRepository) {}

  async execute({
    solicitation_id,
    status,
  }: ApproveSolicitationServiceRequest): Promise<ApproveSolicitationServiceResponse> {
    const solicitation = await this.solcitationsRepository.approveSolicitation(
      solicitation_id,
      status,
    )

    return {
      solicitation,
    }
  }
}
