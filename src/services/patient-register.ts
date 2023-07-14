import { PatientsRepository } from '@/repositories/patients-repository'
import { Gender, Patient } from '@prisma/client'
import { UserAlreadyExistsError } from './Errors/user-already-exists-error'

interface PatientRegisterServiceRequest {
  birth_date: string
  gender: Gender
  user_id: string
}

interface PatientRegisterServiceResponse {
  patient: Patient
}

export class PatientRegisterService {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    birth_date,
    gender,
    user_id,
  }: PatientRegisterServiceRequest): Promise<PatientRegisterServiceResponse> {
    const patientAlreadyExists = await this.patientsRepository.findByUserId(
      user_id,
    )

    if (patientAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const patient = await this.patientsRepository.create({
      birth_date,
      gender,
      user_id,
    })

    return {
      patient,
    }
  }
}
