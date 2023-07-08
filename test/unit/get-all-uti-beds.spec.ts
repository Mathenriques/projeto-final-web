import { GetAllUtiBedsService } from '@/services/get-all-uti-beds'
import { InMemoryUtiBedsRepository } from '../../src/repositories/in-memory/in-memory-utibeds-repository'
import { UtiBedRegisterService } from '../../src/services/utibed-register'
import { randomUUID } from 'node:crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryUtiBedsRepository: InMemoryUtiBedsRepository
let sutRegister: UtiBedRegisterService
let sut: GetAllUtiBedsService

describe('Get All UTI Beds Service', () => {
  beforeEach(() => {
    inMemoryUtiBedsRepository = new InMemoryUtiBedsRepository()
    sutRegister = new UtiBedRegisterService(inMemoryUtiBedsRepository)
    sut = new GetAllUtiBedsService(inMemoryUtiBedsRepository)
  })

  it('Should be able to get all Uti Beds', async () => {
    for (let i = 0; i < 30; i++) {
      await sutRegister.execute({
        id: randomUUID(),
        type: 'Uti',
        status: 'Livre',
      })
    }

    const { uti_beds } = await sut.execute()

    expect(uti_beds).toHaveLength(30)
  })
})
