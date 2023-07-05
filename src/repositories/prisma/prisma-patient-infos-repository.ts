import { Prisma, Patient_Infos } from '@prisma/client'
import { PatientInfosRepository } from '../patient-infos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPatientInfosRepository implements PatientInfosRepository {
  async create(
    data: Prisma.Patient_InfosUncheckedCreateInput,
  ): Promise<Patient_Infos> {
    const patientInfos = await prisma.patient_Infos.create({
      data,
    })

    return patientInfos
  }
}
