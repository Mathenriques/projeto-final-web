import { Prisma, Patient_Infos } from '@prisma/client'
import { PatientInfosRepository } from '../patient-infos-repository'
import { randomUUID } from 'crypto'

export class InMemoryPatientsInfosRepository implements PatientInfosRepository {
  public items: Patient_Infos[] = []

  async create(
    data: Prisma.Patient_InfosUncheckedCreateInput,
  ): Promise<Patient_Infos> {
    const patient_infos = {
      id: randomUUID(),
      main_deseases: { connect: { main_deseases: data.main_deseases } },
      antecedents_comorbidities: data.antecedents_comorbidities,
      precaution: data.precaution,
      suport_needed: data.suport_needed,
      solicitation_id: data.solicitation_id,
      patient_id: data.patient_id,
    }

    this.items.push(patient_infos)

    return patient_infos
  }
}
