import { Collaborator, Prisma } from '@prisma/client'
import { CollaboratorsRepository } from '../collaborators-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
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
