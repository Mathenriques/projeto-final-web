import { PrismaUTIBedsRepository } from '@/repositories/prisma/prisma-utibeds-repository'
import { ChangeUtiBedStatusService } from '../change-uti-bed-status'

export function makeChangeUtiBedStatusService() {
  const utiBedsRepository = new PrismaUTIBedsRepository()
  const utiBed = new ChangeUtiBedStatusService(utiBedsRepository)

  return utiBed
}
