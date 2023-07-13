import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository'
import { CollaboratorApproveService } from '../collaborator-approve'

export function makeCollaboratorApproveService() {
  const collaboratorRepository = new PrismaCollaboratorsRepository()
  const collaborator = new CollaboratorApproveService(collaboratorRepository)

  return collaborator
}
