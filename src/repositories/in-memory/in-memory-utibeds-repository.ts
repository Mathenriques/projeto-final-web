import { Prisma, Uti_Bed } from '@prisma/client'
import { UtiBedsRepository } from '../utibeds-repository'
import { randomUUID } from 'crypto'

export class InMemoryUtiBedsRepository implements UtiBedsRepository {
  public items: Uti_Bed[] = []

  async findAll(): Promise<Uti_Bed[]> {
    const uti_beds = this.items

    return uti_beds
  }

  async findByID(id: string) {
    const uti_bed = this.items.find((item) => item.id === id)

    if (!uti_bed) {
      return null
    }

    return uti_bed
  }

  async create(data: Prisma.Uti_BedCreateInput) {
    const uti_bed = {
      id: randomUUID(),
      type: data.type,
      status: data.status,
    }

    this.items.push(uti_bed)

    return uti_bed
  }
}
