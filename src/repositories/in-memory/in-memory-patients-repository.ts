import { Prisma, Patient } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'
import { randomUUID } from 'crypto'

export class InMemoryPatientsRepository implements PatientsRepository {
  public items: Patient[] = []

  async findById(id: string) {
    const patient = this.items.find((item) => item.id === id)

    if (!patient) {
      return null
    }

    return patient
  }

  async create(data: Prisma.PatientUncheckedCreateInput) {
    const patient = {
      id: randomUUID(),
      birth_date: new Date(data.birth_date),
      gender: data.gender,
      user_id: data.user_id,
    }

    this.items.push(patient)

    return patient
  }

  async findByUserId(user_id: string) {
    const patient = this.items.find((item) => item.user_id === user_id)

    if (!patient) {
      return null
    }

    return patient
  }
}
