import { prisma } from '@/lib/prisma'
import { Prisma, UTI_Bed } from '@prisma/client'
import { UtiBedsRepository } from '../utibeds-repository'

export class PrismaUTIBedsRepository implements UtiBedsRepository {
  async findAll(): Promise<UTI_Bed[]> {
    const uti_beds = await prisma.UTI_Bed.findMany()

    return uti_beds
  }

  async findByID(id: string): Promise<UTI_Bed | null> {
    const uti_bed = await prisma.UTI_Bed.findUnique({
      where: {
        id,
      },
    })

    return uti_bed
  }

  async alterStatus(utibedId: string, newStatus: 'Livre') {
    const uti_bed = await prisma.UTI_Bed.update({
      where: {
        id: utibedId,
      },
      data: {
        status: newStatus, // Pode assumir: 'Livre', 'Limpeza' ou 'Ocupado'
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
