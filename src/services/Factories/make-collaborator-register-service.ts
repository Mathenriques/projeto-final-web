import { CollaboratorRegisterService } from '../collaborator-register'
import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository'

export function makeCollaboratorRegisterService() {
  const collaboratorRepository = new PrismaCollaboratorsRepository()
  const service = new CollaboratorRegisterService(collaboratorRepository)

  return service
}
