import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './Errors/user-already-exists-error'

interface UserRegisterServiceRequest {
  name: string
  register: string
}

interface UserRegisterServiceResponse {
  user: User
}

export class UserRegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    register,
  }: UserRegisterServiceRequest): Promise<UserRegisterServiceResponse> {
    const userExists = await this.usersRepository.findByRegister(register)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      register,
    })

    return {
      user,
    }
  }
}
