import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { CollaboratorDoesNotExists } from './Errors/collaborator-does-not-exists-error'

interface CollaboratorApproveRegisterRequest {
  medical_register: string
}

interface CollaboratorApproveRegisterResponse {
  collaboratorId: string
}

export class CollaboratorApproveService {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    medical_register,
  }: CollaboratorApproveRegisterRequest): Promise<CollaboratorApproveRegisterResponse> {
    const collab = await this.collaboratorRepository.approveCollaborator(
      medical_register,
    )

    if (!collab) {
      throw new CollaboratorDoesNotExists()
    }

    return {
      collaboratorId: collab.id,
    }
  }
}
