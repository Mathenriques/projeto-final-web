import { Patient_Infos, Prisma } from '@prisma/client'

export interface PatientInfosRepository {
  create(data: Prisma.Patient_InfosUncheckedCreateInput): Promise<Patient_Infos>
}
