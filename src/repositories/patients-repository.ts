import { Patient, Prisma } from '@prisma/client'

export interface PatientsRepository {
  create(data: Prisma.PatientUncheckedCreateInput): Promise<Patient>
  findByUserId(user_id: string): Promise<Patient | null>
}
