import { InMemoryUtiBedsRepository } from '../../src/repositories/in-memory/in-memory-utibeds-repository'
import { UtiBedRegisterService } from '../../src/services/utibed-register'
import { randomUUID } from 'node:crypto'
import { expect, describe, it, beforeEach } from 'vitest'
import { UtiBedAlreadyExistsError } from '../../src/services/Errors/utibed-already-exists'

let inMemoryUtiBedsRepository: InMemoryUtiBedsRepository
let sut: UtiBedRegisterService

describe('Uti Bed Register Service', () => {
  beforeEach(() => {
    inMemoryUtiBedsRepository = new InMemoryUtiBedsRepository()
    sut = new UtiBedRegisterService(inMemoryUtiBedsRepository)
  })

  it('Should be able to register an Uti Bed', async () => {
    const { uti_bed } = await sut.execute({
      id: randomUUID(),
      type: 'Uti',
      status: 'Livre',
    })

    expect(uti_bed.id).toEqual(expect.any(String))
  })

  it('Should not be able to register an Uti Bed with id that already exists', async () => {
    const { uti_bed } = await sut.execute({
      id: randomUUID(),
      type: 'Uti',
      status: 'Livre',
    })

    expect(() =>
      sut.execute({
        id: uti_bed.id,
        type: 'Uti',
        status: 'Livre',
      }),
    ).rejects.toBeInstanceOf(UtiBedAlreadyExistsError)
  })
})