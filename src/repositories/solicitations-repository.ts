import { Prisma, Solicitation } from '@prisma/client'

export interface SolicitationsRepository {
  create(data: Prisma.SolicitationUncheckedCreateInput): Promise<Solicitation>
  findById(id: string): Promise<Solicitation | null>
  getApprovedSolicitations(id_bed: string): Promise<Solicitation | null>
  findAllToApprove(): Promise<Solicitation[] | null>
  getApprovedSolicitations(id_bed: string): Promise<Solicitation | null>
}
