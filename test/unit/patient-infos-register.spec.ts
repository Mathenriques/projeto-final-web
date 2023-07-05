import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository'
import { InMemoryPatientsInfosRepository } from '@/repositories/in-memory/in-memory-patients-infos-repository'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { InMemorySolicitationsRepository } from '@/repositories/in-memory/in-memory-solicitation-repository'
import { PatientDoesNotExists } from '@/services/Errors/patient-does-not-exists-error'
import { SolicitationDoesNotExists } from '@/services/Errors/solicitation-does-not-exists-error'
import { CollaboratorRegisterService } from '@/services/collaborator-register'
import { PatientInfosRegisterService } from '@/services/patient-infos-register'
import { PatientRegisterService } from '@/services/patient-register'
import { SolicitationRegisterService } from '@/services/solicitation-register'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository
let inMemoryPatientsInfosRepository: InMemoryPatientsInfosRepository
let inMemoryPatientsRepository: InMemoryPatientsRepository
let inMemorySolicitationsRepository: InMemorySolicitationsRepository
let sut: PatientInfosRegisterService
let sutCollab: CollaboratorRegisterService
let sutSolicitation: SolicitationRegisterService
let sutPatient: PatientRegisterService

describe('Patient Infos Register Service', () => {
  beforeEach(() => {
    inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository()
    inMemoryPatientsInfosRepository = new InMemoryPatientsInfosRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository()
    inMemorySolicitationsRepository = new InMemorySolicitationsRepository()
    sut = new PatientInfosRegisterService(
      inMemoryPatientsInfosRepository,
      inMemoryPatientsRepository,
      inMemorySolicitationsRepository,
    )
    sutCollab = new CollaboratorRegisterService(inMemoryCollaboratorsRepository)
    sutSolicitation = new SolicitationRegisterService(
      inMemorySolicitationsRepository,
      inMemoryCollaboratorsRepository,
    )
    sutPatient = new PatientRegisterService(inMemoryPatientsRepository)
  })

  it('Should be able to register patient infos', async () => {
    const { collaborator } = await sutCollab.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    const { patient } = await sutPatient.execute({
      birth_date: new Date(2000, 11, 12),
      gender: 'Masculino',
      user_id: randomUUID(),
    })

    const { solicitation } = await sutSolicitation.execute({
      priority: 5,
      collaborator_id: collaborator.id,
    })

    const { patient_infos } = await sut.execute({
      main_deseases: ['a', 'b', 'c', 'd'],
      precaution: 'Padrao',
      antecedents_comorbidities: ['d', 'e', 'f'],
      suport_needed: ['XXXXX'],
      patient_id: patient.id,
      solicitation_id: solicitation.id,
    })

    expect(patient_infos.id).toEqual(expect.any(String))
  })

  it('Should not be able to register patient infos with patient that not exists', async () => {
    const { collaborator } = await sutCollab.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    const { solicitation } = await sutSolicitation.execute({
      priority: 5,
      collaborator_id: collaborator.id,
    })

    await expect(() =>
      sut.execute({
        main_deseases: ['a', 'b', 'c', 'd'],
        precaution: 'Padrao',
        antecedents_comorbidities: ['d', 'e', 'f'],
        suport_needed: ['XXXXX'],
        patient_id: '1',
        solicitation_id: solicitation.id,
      }),
    ).rejects.toBeInstanceOf(PatientDoesNotExists)
  })

  it('Should not be able to register patient infos with solicitation that not exists', async () => {
    const { patient } = await sutPatient.execute({
      birth_date: new Date(2000, 11, 12),
      gender: 'Masculino',
      user_id: randomUUID(),
    })

    await expect(() =>
      sut.execute({
        main_deseases: ['a', 'b', 'c', 'd'],
        precaution: 'Padrao',
        antecedents_comorbidities: ['d', 'e', 'f'],
        suport_needed: ['XXXXX'],
        patient_id: patient.id,
        solicitation_id: '1',
      }),
    ).rejects.toBeInstanceOf(SolicitationDoesNotExists)
  })
})
