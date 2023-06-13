import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CrmCorenFormatInvalidError } from '@/services/Errors/crm-coren-format-invalid-error'
import { CrmCorenUserAlreadyExistsError } from '@/services/Errors/crm-coren-user-already-exists-error'
import { EmailUserAlreadyExistsError } from '@/services/Errors/email-user-already-exists-error'
import { RegisterService } from '@/services/register'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(inMemoryUsersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      role: 'MEDICO_GERAL',
      crmCoren: 'CRM/SP 123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to register with email that already exists', async () => {
    await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      role: 'MEDICO_GERAL',
      crmCoren: 'CRM/SP 123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '123456',
        role: 'MEDICO_GERAL',
        crmCoren: 'CRM/SP 123467',
      }),
    ).rejects.toBeInstanceOf(EmailUserAlreadyExistsError)
  })

  it('Should not be able to register with CrmCoren that already exists', async () => {
    await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      role: 'MEDICO_GERAL',
      crmCoren: 'CRM/SP 123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email: 'jhondoe1@example.com',
        password: '123456',
        role: 'MEDICO_GERAL',
        crmCoren: 'CRM/SP 123456',
      }),
    ).rejects.toBeInstanceOf(CrmCorenUserAlreadyExistsError)
  })

  it('Should not be able to register with CrmCoren in wrong format', async () => {
    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email: 'jhondoe1@example.com',
        password: '123456',
        role: 'MEDICO_GERAL',
        crmCoren: 'CRM/SP 123',
      }),
    ).rejects.toBeInstanceOf(CrmCorenFormatInvalidError)
  })

  it('Should be hashed password', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
      role: 'MEDICO_GERAL',
      crmCoren: 'CRM/SP 123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
