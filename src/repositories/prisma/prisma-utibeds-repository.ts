import { prisma } from '@/lib/prisma'
import { Prisma, StatusUtiBed, Uti_Bed } from '@prisma/client'
import { UtiBedsRepository } from '../utibeds-repository'

export class PrismaUTIBedsRepository implements UtiBedsRepository {
  async updateStatus(id: string, status: StatusUtiBed): Promise<Uti_Bed> {
    const utiBed = await prisma.uti_Bed.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    return utiBed
  }

  async findAll(): Promise<Uti_Bed[]> {
    const uti_beds = await prisma.uti_Bed.findMany()

    return uti_beds
  }

  async countUtiBeds(): Promise<number> {
    const numberUtis = await prisma.uti_Bed.count()

    return numberUtis
  }

  async findByID(id: string): Promise<Uti_Bed | null> {
    const uti_bed = await prisma.uti_Bed.findUnique({
      where: {
        id,
      },
    })

    return uti_bed
  }

  async create(data: Prisma.Uti_BedCreateInput) {
    const uti_bed = await prisma.uti_Bed.create({
      data,
    })

    return uti_bed
  }
}
