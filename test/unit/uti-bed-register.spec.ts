import { InMemoryUtiBedsRepository } from '../../src/repositories/in-memory/in-memory-utibeds-repository'
import { UtiBedRegisterService } from '../../src/services/utibed-register'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryUtiBedsRepository: InMemoryUtiBedsRepository
let sut: UtiBedRegisterService

describe('Uti Bed Register Service', () => {
  beforeEach(() => {
    inMemoryUtiBedsRepository = new InMemoryUtiBedsRepository()
    sut = new UtiBedRegisterService(inMemoryUtiBedsRepository)
  })

  it('Should be able to register an Uti Bed', async () => {
    const { uti_bed } = await sut.execute({
      type: 'Uti',
      status: 'Livre',
    })

    expect(uti_bed.id).toEqual(expect.any(String))
  })
})
