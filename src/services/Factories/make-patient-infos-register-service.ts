import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { PatientInfosRegisterService } from '../patient-infos-register'
import { PrismaPatientInfosRepository } from '@/repositories/prisma/prisma-patient-infos-repository'
import { PrismaSolicitationsRepository } from '@/repositories/prisma/prisma-solicitations-repository'

export function makePatientInfosRegisterService() {
  const patientInfosRepository = new PrismaPatientInfosRepository()
  const patientRepository = new PrismaPatientsRepository()
  const solicitationRepository = new PrismaSolicitationsRepository()
  const service = new PatientInfosRegisterService(
    patientInfosRepository,
    patientRepository,
    solicitationRepository,
  )

  return service
}
