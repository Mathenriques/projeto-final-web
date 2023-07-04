import { Prisma, Solicitation } from '@prisma/client'
import { SolicitationsRepository } from '../solicitations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSolicitationsRepository implements SolicitationsRepository {
  async create(
    data: Prisma.SolicitationUncheckedCreateInput,
  ): Promise<Solicitation> {
    const solicitation = await prisma.solicitation.create({
      data,
    })

    return solicitation
  }
}
