import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { Collaborator, Role } from '@prisma/client'
import { CollaboratorDoesNotExists } from './Errors/collaborator-does-not-exists-error'
import { compare } from 'bcryptjs'
import { validateCrmCorenFormat } from './utils/validate-crmCoren-format'
import { CrmCorenFormatInvalidError } from './Errors/crm-coren-format-invalid-error'

interface CollaboratorAuthenticateRegisterRequest {
  medical_register: string
  password: string
  role: Role
}

interface CollaboratorAuthenticateRegisterResponse {
  collaborator: Collaborator
}

export class CollaboratorAuthenticateService {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    medical_register,
    password,
    role,
  }: CollaboratorAuthenticateRegisterRequest): Promise<CollaboratorAuthenticateRegisterResponse> {
    const medicalRegisterIsValid = validateCrmCorenFormat(
      medical_register,
      role,
    )

    if (!medicalRegisterIsValid) {
      throw new CrmCorenFormatInvalidError()
    }

    const collaborator =
      await this.collaboratorRepository.findByMedicalRegister(medical_register)

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
