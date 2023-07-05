import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { InMemorySolicitationsRepository } from '@/repositories/in-memory/in-memory-solicitation-repository'
import { PatientInfosRegisterService } from '@/services/patient-infos-register'
import { beforeEach } from 'node:test'
import { describe } from 'vitest'

describe('Patient Infos Register Service', () => {
  beforeEach(() => {
    inMemoryPatientInfosRepository 
    inMemoryPatientsRepository = new InMemoryPatientsRepository()
    inMemorySolicitationsRepository = new InMemorySolicitationsRepository()
    sut = new PatientInfosRegisterService(
      InMemoryPatientsInfosRepository,
      inMemoryPatientsRepository,
      inMemorySolicitationsRepository,
    )
  })
})