import { PatientInfosRepository } from '@/repositories/patient-infos-repository'
import { PatientsRepository } from '@/repositories/patients-repository'
import { Patient_Infos, Precaution } from '@prisma/client'
import { PatientDoesNotExists } from './Errors/patient-does-not-exists-error'
import { SolicitationsRepository } from '@/repositories/solicitations-repository'
import { SolicitationDoesNotExists } from './Errors/solicitation-does-not-exists-error'

interface PatientInfosRegisterServiceRequest {
  main_deseases: string[]
  precaution: Precaution
  antecedents_comorbidities: string[]
  suport_needed: string[]
  patient_id: string
  solicitation_id: string
}

interface PatientInfosRegisterServiceResponse {
  patient_infos: Patient_Infos
}

export class PatientInfosRegisterService {
  constructor(
    private patientInfosRepository: PatientInfosRepository,
    private patientsRepository: PatientsRepository,
    private solicitationsRepository: SolicitationsRepository,
  ) {}

  async execute({
    main_deseases,
    precaution,
    antecedents_comorbidities,
    suport_needed,
    patient_id,
    solicitation_id,
  }: PatientInfosRegisterServiceRequest): Promise<PatientInfosRegisterServiceResponse> {
    const patientExists = await this.patientsRepository.findById(patient_id)

    if (!patientExists) {
      throw new PatientDoesNotExists()
    }

    const solicitationExists = await this.solicitationsRepository.findById(
      solicitation_id,
    )

    if (!solicitationExists) {
      throw new SolicitationDoesNotExists()
    }

    const patient_infos = await this.patientInfosRepository.create({
      main_deseases,
      precaution,
      antecedents_comorbidities,
      suport_needed,
      patient_id,
      solicitation_id,
    })

    return {
      patient_infos,
    }
  }
}
