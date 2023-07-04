import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository'
import { InMemorySolicitationsRepository } from '@/repositories/in-memory/in-memory-solicitation-repository'
import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
import { CollaboratorRegisterService } from '@/services/collaborator-register'
import { SolicitationRegisterService } from '@/services/solicitation-register'
import { randomUUID } from 'crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemorySolicitationRepository: InMemorySolicitationsRepository
let inMemoryCollaboratorRepository: InMemoryCollaboratorsRepository
let sutCollab: CollaboratorRegisterService
let sut: SolicitationRegisterService

describe('Solicitation Register Service', () => {
  beforeEach(() => {
    inMemorySolicitationRepository = new InMemorySolicitationsRepository()
    inMemoryCollaboratorRepository = new InMemoryCollaboratorsRepository()
    sutCollab = new CollaboratorRegisterService(inMemoryCollaboratorRepository)
    sut = new SolicitationRegisterService(
      inMemorySolicitationRepository,
      inMemoryCollaboratorRepository,
    )
  })

  it('Should be able to register an solicitation', async () => {
    const { collaborator } = await sutCollab.execute({
      medical_register: 'CRM/XX 123456',
      role: 'MEDICO_GERAL',
      email: 'jhondoe@example.com',
      password: '123456',
      user_id: randomUUID(),
    })

    const { solicitation } = await sut.execute({
      priority: 5,
      collaborator_id: collaborator.id,
    })

    expect(solicitation.id).toEqual(expect.any(String))
  })

  it('Should not be able to register an solicitation with collaborator id that not exists', async () => {
    await expect(() =>
      sut.execute({
        priority: 5,
        collaborator_id: '1',
      }),
    ).rejects.toBeInstanceOf(CollaboratorDoesNotExists)
  })
})
