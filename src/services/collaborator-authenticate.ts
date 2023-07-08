import { prisma } from '@/lib/prisma'
import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { Collaborator } from '@prisma/client'
import { CollaboratorDoesNotExists } from './Errors/collaborator-does-not-exists-error'
import { compare } from 'bcryptjs'

interface CollaboratorAuthenticateRegisterRequest {
  email: string
  password: string
}

interface CollaboratorAuthenticateRegisterResponse {
  collaborator: Collaborator
}

export class CollaboratorAuthenticateService {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    email,
    password,
  }: CollaboratorAuthenticateRegisterRequest): Promise<CollaboratorAuthenticateRegisterResponse> {
    const collaborator = await this.collaboratorRepository.findByEmail(email)

    if (!collaborator) {
      throw new CollaboratorDoesNotExists()
    }

    const doesPasswordMatches = await compare(
      password,
      collaborator.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new CollaboratorDoesNotExists()
    }

    return {
      collaborator,
    }
  }
}
