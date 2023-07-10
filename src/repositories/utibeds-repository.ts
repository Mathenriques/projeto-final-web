import { Prisma, UTI_Bed } from '@prisma/client'

export interface UtiBedsRepository {
  create(data: Prisma.UTI_BedCreateInput): Promise<UTI_Bed>
  findByID(id: string): Promise<UTI_Bed | null>
  findAll(): Promise<UTI_Bed[]>
}
