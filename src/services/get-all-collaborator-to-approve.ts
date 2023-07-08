import { CollaboratorsRepository } from '@/repositories/collaborators-repository'

interface GetAllCollaboratorToApproveRequest {
  page: number
}
export class GetAllCollaboratorToApprove {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({ page }: GetAllCollaboratorToApproveRequest) {
    const collaboratorsToApprove =
      await this.collaboratorsRepository.findAllToApprove(page)

    return collaboratorsToApprove
  }
}
