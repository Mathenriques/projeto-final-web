import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { CollaboratorDoesNotExists } from './Errors/collaborator-does-not-exists-error'

interface CollaboratorDeleteRegisterRequest {
  medical_register: string
}

interface CollaboratorDeleteRegisterResponse {
  bool: boolean
}

export class CollaboratorDeleteService {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    medical_register,
  }: CollaboratorDeleteRegisterRequest): Promise<CollaboratorDeleteRegisterResponse> {
    const collab = await this.collaboratorRepository.deleteCollaborator(
      medical_register,
    )

    if (!collab) {
      throw new CollaboratorDoesNotExists()
    }

    return {
      bool: true,
    }
  }
}
