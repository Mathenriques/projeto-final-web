import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { UserAlreadyExistsError } from '@/services/Errors/user-already-exists-error'
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
      birth_date: new Date(2000, 11, 12),
      gender: 'Masculino',
      user_id: randomUUID(),
    })

    expect(patient.id).toEqual(expect.any(String))
  })

  it('Should not be able to register an patient that already exists', async () => {
    const { patient } = await sut.execute({
      birth_date: new Date(2000, 11, 12),
      gender: 'Masculino',
      user_id: randomUUID(),
    })

    expect(() =>
      sut.execute({
        birth_date: new Date(2000, 11, 12),
        gender: 'Masculino',
        user_id: patient.user_id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
