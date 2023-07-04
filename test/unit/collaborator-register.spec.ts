import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository'
import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from '@/services/Errors/crm-coren-user-already-exists-error'
import { EmailUserAlreadyExistsError } from '@/services/Errors/email-user-already-exists-error'
import { CollaboratorRegisterService } from '@/services/collaborator-register'
import { compare } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryCollaboratorsRepository: InMemoryCollaboratorsRepository
let sut: CollaboratorRegisterService

describe('Collaborator Register Service', () => {
  beforeEach(() => {
    inMemoryCollaboratorsRepository = new InMemoryCollaboratorsRepository()
    sut = new CollaboratorRegisterService(inMemoryCollaboratorsRepository)
  })

  it('Should be able to register an collaborator', async () => {
    const { collaborator } = await sut.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    expect(collaborator.id).toEqual(expect.any(String))
  })

  it('Should not be able to register an collaborator with email that already exists', async () => {
    await sut.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    await expect(() =>
      sut.execute({
        medical_register: 'CRM/XX 654321',
        role: 'MEDICO_GERAL',
        email: 'jhondoe@example.com',
        password: '123456',
        user_id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(EmailUserAlreadyExistsError)
  })

  it('Should not be able to register an collaborator with medical_register that already exists', async () => {
    await sut.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    await expect(() =>
      sut.execute({
        medical_register: 'CRM/XX 123456',
        role: 'MEDICO_GERAL',
        email: 'jhondoe1@example.com',
        password: '123456',
        user_id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(CrmCorenUserAlreadyExistsError)
  })

  it('Should not be able to register an collaborator with invalid medical_register', async () => {
    await expect(() =>
      sut.execute({
        medical_register: 'CRM-XX 123456',
        role: 'MEDICO_GERAL',
        email: 'jhondoe1@example.com',
        password: '123456',
        user_id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(CrmCorenFormatInvalidError)
  })

  it('Should hash user password upon registration', async () => {
    const password = '123456'

    const { collaborator } = await sut.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe1@example.com',
      password,
      user_id: randomUUID(),
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      collaborator.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
