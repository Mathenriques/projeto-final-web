import { PrismaUTIBedsRepository } from '@/repositories/prisma/prisma-utibeds-repository'
import { UtiBedRegisterService } from '../utibed-register'

export function makeUtiBedRegisterService() {
  const utiBedsRepository = new PrismaUTIBedsRepository()
  const utiBeds = new UtiBedRegisterService(utiBedsRepository)

  return utiBeds
}
