import { Collaborator, Prisma } from '@prisma/client'
import { CollaboratorsRepository } from '../collaborators-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
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

  async alterPassword(collabId: string, newPassword: string) {
    const collab = await prisma.collaborator.update({
      where: {
        id: collabId, 
      },
      data: {
        password_hash: newPassword,
      },
    })
  }

  async alterFunction (collabId: string, newRole: 'ENFERMEIRO') {
    const collab = await prisma.collaborator.update({
      where: {
        id: collabId,
      },
      data: {
        function: newRole,  // Pode assumir: 'ENFERMEIRO', 'MEDICO_UTI' e 'MEDICO_GERAL'
      },
    })
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
