import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../user-register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new RegisterService(usersRepository)

  return service
}
