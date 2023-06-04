import { UsersRepository } from '@/repositories/users-repository'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { validateCrmCorenFormat } from './utils/validate-crmCoren-format'
import { EmailUserAlreadyExistsError } from './Errors/email-user-already-exists-error'
import { CrmCorenFormatInvalidError } from './Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from './Errors/crm-coren-user-already-exists-error'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
  crmCoren: string
  role: Role
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    crmCoren,
    role,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailUserAlreadyExistsError()
    }

    const userWithSameCrmCorem = await this.usersRepository.findByCrmCorem(
      crmCoren,
    )

    if (userWithSameCrmCorem) {
      throw new CrmCorenUserAlreadyExistsError()
    }

    const checkCrmCoren = validateCrmCorenFormat(crmCoren, role)

    if (!checkCrmCoren) {
      throw new CrmCorenFormatInvalidError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      crm_coren: crmCoren,
      role,
    })

    return {
      user,
    }
  }
}
