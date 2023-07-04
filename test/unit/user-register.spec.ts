import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/services/Errors/user-already-exists-error'
import { UserRegisterService } from '@/services/user-register'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UserRegisterService

describe('User Register Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UserRegisterService(inMemoryUsersRepository)
  })

  it('Should be able to register an user', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      register: '123.456.789.00',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to register with register that already exists', async () => {
    await sut.execute({
      name: 'Jhon Doe',
      register: '123.456.789.00',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        register: '123.456.789.00',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
