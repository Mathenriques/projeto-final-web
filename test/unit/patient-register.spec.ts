import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { PatientRegisterService } from '@/services/patient-register'
import { randomUUID } from 'crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryPatientsRepository: InMemoryPatientsRepository
let sut: PatientRegisterService

describe('Collaborator Register Service', () => {
  beforeEach(() => {
    inMemoryPatientsRepository = new InMemoryPatientsRepository()
    sut = new PatientRegisterService(inMemoryPatientsRepository)
  })

  it('Should be able to register an patient', async () => {
    const { patient } = await sut.execute({
      birth_date: '2000-14-11',
      gender: 'Masculino',
      user_id: randomUUID(),
    })

    expect(patient.id).toEqual(expect.any(String))
  })
})
