import { Prisma, Solicitation, StatusSolicitation } from '@prisma/client'

export interface SolicitationsRepository {
  create(data: Prisma.SolicitationUncheckedCreateInput): Promise<Solicitation>
  findById(id: string): Promise<Solicitation | null>
  getApprovedSolicitations(id_bed: string): Promise<Solicitation | null>
  findAllToApprove(): Promise<Solicitation[] | null>
  approveSolicitation(
    solicitation_id: string,
    status: StatusSolicitation,
  ): Promise<Solicitation | null>
}
