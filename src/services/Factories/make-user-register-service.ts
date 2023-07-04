import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserRegisterService } from '../user-register'

export function makeUserRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new UserRegisterService(usersRepository)

  return service
}
