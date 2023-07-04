import { Prisma, Collaborator } from '@prisma/client'
import { CollaboratorsRepository } from '../collaborators-repository'
import { randomUUID } from 'crypto'

export class InMemoryCollaboratorsRepository
  implements CollaboratorsRepository
{
  public items: Collaborator[] = []

  async findByEmail(email: string) {
    const collab = this.items.find((item) => item.email === email)

    if (!collab) {
      return null
    }

    return collab
  }

  async findByMedicalRegister(medical_register: string) {
    const collab = this.items.find(
      (item) => item.medical_register === medical_register,
    )

    if (!collab) {
      return null
    }

    return collab
  }

  async create(
    data: Prisma.CollaboratorUncheckedCreateInput,
  ): Promise<Collaborator> {
    const collaborator = {
      id: randomUUID(),
      medical_register: data.medical_register,
      function: data.function,
      email: data.email,
      password_hash: data.password_hash,
      approved: false,
      user_id: data.user_id,
    }

    this.items.push(collaborator)

    return collaborator
  }
}
