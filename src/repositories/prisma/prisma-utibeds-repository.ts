import { prisma } from '@/lib/prisma'
import { Prisma, UTI_Bed } from '@prisma/client'
import { UtiBedsRepository } from '../utibeds-repository'

export class PrismaUTIBedsRepository implements UtiBedsRepository {
  async findByID(id: string): Promise<UTI_Bed | null> {
    const uti_bed = await prisma.UTI_Bed.findUnique({
      where: {
        id,
      },
    })

    return uti_bed
  }

  async create(data: Prisma.UTI_BedCreateInput) {
    const uti_bed = await prisma.UTI_Bed.create({
      data,
    })

    return uti_bed
  }
}
