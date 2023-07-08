import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository'
import { CollaboratorAuthenticateService } from '../collaborator-authenticate'

export function makeCollaboratorAuthenticateService() {
  const collaboratorRepository = new PrismaCollaboratorsRepository()
  const collaborator = new CollaboratorAuthenticateService(
    collaboratorRepository,
  )

  return collaborator
}
