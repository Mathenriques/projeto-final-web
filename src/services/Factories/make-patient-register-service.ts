import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { PatientRegisterService } from '../patient-register'

export function makePatientRegisterService() {
  const patientRepository = new PrismaPatientsRepository()
  const service = new PatientRegisterService(patientRepository)

  return service
}
