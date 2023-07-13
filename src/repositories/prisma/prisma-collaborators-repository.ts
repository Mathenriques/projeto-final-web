import { Collaborator, Prisma } from '@prisma/client'
import { CollaboratorsRepository } from '../collaborators-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  async approveCollaborator(
    medical_register: string,
  ): Promise<Collaborator | null> {
    const collab = prisma.collaborator.update({
      where: {
        medical_register,
      },
      data: {
        approved: true,
      },
    })

    return collab
  }

  async deleteCollaborator(medical_register: string): Promise<Boolean> {
    const collab = prisma.collaborator.delete({
      where: {
        medical_register,
      },
    })

    if (!collab) {
      return false
    }

    return true
  }

  async findById(id: string): Promise<Collaborator | null> {
    const collab = await prisma.collaborator.findUnique({
      where: { id },
    })

    return collab
  }

  async findByEmail(email: string): Promise<Collaborator | null> {
    const collab = await prisma.collaborator.findUnique({ where: { email } })

    return collab
  }

  async findByMedicalRegister(
    medical_register: string,
  ): Promise<Collaborator | null> {
    const collab = await prisma.collaborator.findUnique({
      where: { medical_register },
    })

    return collab
  }

  async create(
    data: Prisma.CollaboratorUncheckedCreateInput,
  ): Promise<Collaborator> {
    const collaborator = await prisma.collaborator.create({
      data,
    })

    return collaborator
  }
}
