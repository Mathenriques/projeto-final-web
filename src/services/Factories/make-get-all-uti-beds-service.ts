import { PrismaUTIBedsRepository } from '@/repositories/prisma/prisma-utibeds-repository'
import { GetAllUtiBedsService } from '../get-all-uti-beds'

export function makeGetAllUtiBedsService() {
  const utiBedsRepository = new PrismaUTIBedsRepository()
  const utiBeds = new GetAllUtiBedsService(utiBedsRepository)

  return utiBeds
}
