import { Prisma, Uti_Bed } from '@prisma/client'

export interface UtiBedsRepository {
  create(data: Prisma.Uti_BedCreateInput): Promise<Uti_Bed>
  findByID(id: string): Promise<Uti_Bed | null>
  findAll(): Promise<Uti_Bed[]>
  countUtiBeds(): Promise<number>
}
