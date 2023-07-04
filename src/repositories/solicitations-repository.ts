import { Prisma, Solicitation } from '@prisma/client'

export interface SolicitationsRepository {
  create(data: Prisma.SolicitationUncheckedCreateInput): Promise<Solicitation>
}
