import { Solicitation } from '@prisma/client'
import { SolicitationsRepository } from '@/repositories/solicitations-repository'
import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { CollaboratorDoesNotExists } from './Errors/collaborator-does-not-exists-error'

interface SolicitationRegisterServiceRequest {
  priority: number
  collaborator_id: string
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
    priority,
    collaborator_id,
  }: SolicitationRegisterServiceRequest): Promise<SolicitationRegisterServiceResponse> {
    const collaboratorExists = await this.collaboratorRepository.findById(
      collaborator_id,
    )

    if (!collaboratorExists) {
      throw new CollaboratorDoesNotExists()
    }

    const solicitation = await this.solcitationsRepository.create({
      priority,
      collaborator_id,
    })

    return {
      solicitation,
    }
  }
}
