import { Patient_Infos } from '@prisma/client'
import {
  CreateInfoPatientsParams,
  PatientInfosRepository,
} from '../patient-infos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPatientInfosRepository implements PatientInfosRepository {
  async create(data: CreateInfoPatientsParams): Promise<Patient_Infos> {
    const patientInfos = await prisma.patient_Infos.create({
      data,
    })

    return patientInfos
  }
}
