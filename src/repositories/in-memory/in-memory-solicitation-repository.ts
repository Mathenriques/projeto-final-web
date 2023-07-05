import { Prisma, Solicitation } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SolicitationsRepository } from '../solicitations-repository'

export class InMemorySolicitationsRepository
  implements SolicitationsRepository
{
  public items: Solicitation[] = []

  async findById(id: string): Promise<Solicitation | null> {
    const solicitation = this.items.find((item) => item.id === id)

    if (!solicitation) {
      return null
    }

    return solicitation
  }

  async create(
    data: Prisma.SolicitationUncheckedCreateInput,
  ): Promise<Solicitation> {
    const solicitation = {
      id: randomUUID(),
      priority: data.priority,
      status: false,
      created_at: new Date(),
      collaborator_id: data.collaborator_id,
    }

    this.items.push(solicitation)

    return solicitation
  }
}
