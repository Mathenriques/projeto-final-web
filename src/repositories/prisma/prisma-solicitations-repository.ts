import { Patient_Infos, Prisma, Solicitation } from '@prisma/client'
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

  async createUtiBedRequisition(patientInfos: Patient_Infos, collabId: string) {
    const solicitation = await prisma.solicitation.create({
      data: { // ERRO -> ao inserir os dados da tabela patient_infos, provavelmente na tipagem
        patient_infos: patientInfos,
        collaborator_id: collabId,
      },
    })
  }

  async validateUtiBedsSolicitation (solicitationId: string) {
    const solicitation = await prisma.solicitation.update({
      where: { id: solicitationId },
      data: { status: true },
    })
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
