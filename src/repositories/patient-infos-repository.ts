import { Patient_Infos, Precaution } from '@prisma/client'

export interface CreateInfoPatientsParams {
  main_deseases: string
  precaution: Precaution
  antecedents_comorbidities: string
  suport_needed: string
  patient_id: string
  solicitation_id: string
}
export interface PatientInfosRepository {
  create(data: CreateInfoPatientsParams): Promise<Patient_Infos>
}
