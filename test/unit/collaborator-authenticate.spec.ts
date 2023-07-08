import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository'
import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
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
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(collaborator.id).toEqual(expect.any(String))
  })

  it('Should be able to authenticate an collaborator', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CollaboratorDoesNotExists)
  })

  it('Should be able to authenticate an collaborator', async () => {
    await sutRegister.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(CollaboratorDoesNotExists)
  })
})
