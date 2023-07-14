import { Solicitation, StatusSolicitation } from '@prisma/client'
import { SolicitationsRepository } from '@/repositories/solicitations-repository'
import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { CollaboratorDoesNotExists } from './Errors/collaborator-does-not-exists-error'

interface SolicitationRegisterServiceRequest {
  collaborator_id: string
  priority: number
  status: StatusSolicitation
}

interface SolicitationRegisterServiceResponse {
  solicitation: Solicitation
}

export class SolicitationRegisterService {
  constructor(
    private solcitationsRepository: SolicitationsRepository,
    private collaboratorRepository: CollaboratorsRepository,
  ) {}

  async execute({
    collaborator_id,
    priority,
    status,
  }: SolicitationRegisterServiceRequest): Promise<SolicitationRegisterServiceResponse> {
    const collaboratorExists = await this.collaboratorRepository.findById(
      collaborator_id,
    )

    if (!collaboratorExists) {
      throw new CollaboratorDoesNotExists()
    }

    const solicitation = await this.solcitationsRepository.create({
      priority,
      status,
      collaborator_id,
    })

    return {
      solicitation,
    }
  }
}
