import { Collaborator, Prisma } from '@prisma/client'
import {
  CollaboratorsFieldsToApprove,
  CollaboratorsRepository,
} from '../collaborators-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  async findAllToApprove(
    page: number,
  ): Promise<CollaboratorsFieldsToApprove[]> {
    const collabsToApprove = await prisma.collaborator.findMany({
      where: {
        approved: false,
      },
      select: {
        medical_register: true,
        function: true,
        email: true,
      },
      take: 30,
      skip: (page - 1) * 20,
    })

    return collabsToApprove
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
