import { Prisma, Solicitation, StatusSolicitation } from '@prisma/client'
import { SolicitationsRepository } from '../solicitations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSolicitationsRepository implements SolicitationsRepository {
  async approveSolicitation(
    solicitation_id: string,
    status: StatusSolicitation,
  ): Promise<Solicitation | null> {
    const solicitation = await prisma.solicitation.update({
      where: {
        id: solicitation_id,
      },
      data: {
        status,
      },
    })

    return solicitation
  }

  async findAllToApprove(): Promise<Solicitation[] | null> {
    const solicitations = await prisma.solicitation.findMany({
      include: {
        patient_infos: true,
        uti_bed: true,
        collaborator: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        status: 'Pendente',
      },
    })

    return solicitations
  }

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
        status: 'Aprovado',
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
