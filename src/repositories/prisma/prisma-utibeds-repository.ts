import { prisma } from '@/lib/prisma'
import { Prisma, Uti_Bed } from '@prisma/client'
import { UtiBedsRepository } from '../utibeds-repository'

export class PrismaUTIBedsRepository implements UtiBedsRepository {
  async findAll(): Promise<Uti_Bed[]> {
    const uti_beds = await prisma.uti_Bed.findMany()

    return uti_beds
  }

  async findByID(id: string): Promise<Uti_Bed | null> {
    const uti_bed = await prisma.uti_Bed.findUnique({
      where: {
        id,
      },
    })

    return uti_bed
  }

  async alterStatus(utibedId: string, newStatus: 'Livre') {
    const uti_bed = await prisma.uti_Bed.update({
      where: {
        id: utibedId,
      },
      data: {
        status: newStatus, // Pode assumir: 'Livre', 'Limpeza' ou 'Ocupado'
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
