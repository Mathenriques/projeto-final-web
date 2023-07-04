import { Collaborator, Prisma } from '@prisma/client'

export interface CollaboratorsRepository {
  create(data: Prisma.CollaboratorUncheckedCreateInput): Promise<Collaborator>
  findByEmail(email: string): Promise<Collaborator | null>
  findByMedicalRegister(medical_register: string): Promise<Collaborator | null>
}
