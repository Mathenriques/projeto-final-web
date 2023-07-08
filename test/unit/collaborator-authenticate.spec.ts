import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository'
import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { CollaboratorAuthenticateService } from '@/services/collaborator-authenticate'
import { CollaboratorRegisterService } from '@/services/collaborator-register'
import { randomUUID } from 'crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository
let sutRegister: CollaboratorRegisterService
let sut: CollaboratorAuthenticateService

describe('Collaborator Register Service', () => {
  beforeEach(() => {
    inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository()
    sutRegister = new CollaboratorRegisterService(
      inMemoryCollaboratorsRepository,
    )
    sut = new CollaboratorAuthenticateService(inMemoryCollaboratorsRepository)
  })

  it('Should be able to authenticate an collaborator', async () => {
    await sutRegister.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    const { collaborator } = await sut.execute({
      medical_register: 'CRM/XX 123456',
      password: '123456',
      role: 'MEDICO_GERAL',
    })

    expect(collaborator.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate an collaborator that not exists', async () => {
    await expect(() =>
      sut.execute({
        medical_register: 'CRM/XX 123456',
        password: '123456',
        role: 'MEDICO_GERAL',
      }),
    ).rejects.toBeInstanceOf(CollaboratorDoesNotExists)
  })

  it('Should not be able to authenticate an collaborator with wrong password', async () => {
    await sutRegister.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    await expect(() =>
      sut.execute({
        medical_register: 'CRM/XX 123456',
        password: '1234569',
        role: 'MEDICO_GERAL',
      }),
    ).rejects.toBeInstanceOf(CollaboratorDoesNotExists)
  })

  it('Should not be able to authenticate an collaborator with medical_register', async () => {
    await sutRegister.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    await expect(() =>
      sut.execute({
        medical_register: 'CRM/XX 12346',
        password: '1234569',
        role: 'MEDICO_GERAL',
      }),
    ).rejects.toBeInstanceOf(CrmCorenFormatInvalidError)
  })
})
