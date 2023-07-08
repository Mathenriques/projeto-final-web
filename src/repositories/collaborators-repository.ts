import { Collaborator, Prisma, Role } from '@prisma/client'

export interface CollaboratorsFieldsToApprove {
  medical_register: string
  function: Role
  email: string
}

export interface CollaboratorsRepository {
  create(data: Prisma.CollaboratorUncheckedCreateInput): Promise<Collaborator>
  findByEmail(email: string): Promise<Collaborator | null>
  findByMedicalRegister(medical_register: string): Promise<Collaborator | null>
  findById(id: string): Promise<Collaborator | null>
  findAllToApprove(page: number): Promise<CollaboratorsFieldsToApprove[]>
}
