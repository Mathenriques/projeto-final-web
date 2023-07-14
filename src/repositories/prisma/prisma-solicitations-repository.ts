import { Prisma, Solicitation } from '@prisma/client'
import { SolicitationsRepository } from '../solicitations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSolicitationsRepository implements SolicitationsRepository {
  async findById(id: string): Promise<Solicitation | null> {
    const solicitation = await prisma.solicitation.findUnique({
      where: {
        id,
      },
    })

    return solicitation
  }

  async getApprovedSolicitations(id_bed: string): Promise<Solicitation | null> {
    const solicitation = await prisma.solicitation.findFirst({
      where: {
        status: 'Approvado',
        uti_bed: {
          some: {
            uti_bed_id: id_bed,
          },
        },
      },
    })

    return solicitation
  }

  async create(
    data: Prisma.SolicitationUncheckedCreateInput,
  ): Promise<Solicitation> {
    const solicitation = await prisma.solicitation.create({
      data,
    })

    return solicitation
  }
}
