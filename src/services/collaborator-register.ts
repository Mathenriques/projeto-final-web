import { CollaboratorsRepository } from '@/repositories/collaborators-repository'
import { Collaborator, Role } from '@prisma/client'
import { validateCrmCorenFormat } from './utils/validate-crmCoren-format'
import { CrmCorenFormatInvalidError } from './Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from './Errors/crm-coren-user-already-exists-error'
import { EmailUserAlreadyExistsError } from './Errors/email-user-already-exists-error'
import { hash } from 'bcryptjs'

interface CollaboratorRegisterServiceRequest {
  medical_register: string
  role: Role
  email: string
  password: string
  user_id: string
}

interface CollaboratorRegisterServiceReply {
  collaborator: Collaborator
}

export class CollaboratorRegisterService {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    medical_register,
    role,
    email,
    password,
    user_id,
  }: CollaboratorRegisterServiceRequest): Promise<CollaboratorRegisterServiceReply> {
    const password_hash = await hash(password, 6)
    const collabExists =
      await this.collaboratorRepository.findByMedicalRegister(medical_register)

    if (collabExists) {
      throw new CrmCorenUserAlreadyExistsError()
    }

    const medicalRegisterIsValid = validateCrmCorenFormat(
      medical_register,
      role,
    )

    if (!medicalRegisterIsValid) {
      throw new CrmCorenFormatInvalidError()
    }

    const collabEmailAlreadyExists =
      await this.collaboratorRepository.findByEmail(email)

    if (collabEmailAlreadyExists) {
      throw new EmailUserAlreadyExistsError()
    }

    const collaborator = await this.collaboratorRepository.create({
      medical_register,
      function: role,
      email,
      password_hash,
      user_id,
    })

    return {
      collaborator,
    }
  }
}
