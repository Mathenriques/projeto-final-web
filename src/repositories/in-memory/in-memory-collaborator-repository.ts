import { Prisma, Collaborator } from '@prisma/client'
import { CollaboratorsRepository } from '../collaborators-repository'
import { randomUUID } from 'crypto'

export class InMemoryCollaboratorsRepository
  implements CollaboratorsRepository
{
  public items: Collaborator[] = []

  async approveCollaborator(
    medical_register: string,
  ): Promise<Collaborator | null> {
    const collab = this.items.find(
      (item) => item.medical_register === medical_register,
    )

    if (!collab) {
      return null
    }

    collab.approved = true

    return collab
  }

  async deleteCollaborator(medical_register: string): Promise<Boolean> {
    const index = this.items.findIndex(
      (item) => item.medical_register === medical_register,
    )

    if (!index) {
      return false
    }

    this.items.splice(index, 1)

    return true
  }

  async findById(id: string): Promise<Collaborator | null> {
    const collab = this.items.find((item) => item.id === id)

    if (!collab) {
      return null
    }

    return collab
  }

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
