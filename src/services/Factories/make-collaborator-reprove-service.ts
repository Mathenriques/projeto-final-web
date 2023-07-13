import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository'
import { CollaboratorDeleteService } from '../collaborator-delete'

export function makeCollaboratorReproveService() {
  const collaboratorRepository = new PrismaCollaboratorsRepository()
  const collaborator = new CollaboratorDeleteService(collaboratorRepository)

  return collaborator
}
