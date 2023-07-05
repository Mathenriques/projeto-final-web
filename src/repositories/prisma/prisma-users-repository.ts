import { prisma } from '@/lib/prisma'
import { Collaborator, Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findAllCollaboratorsToApprove(): Promise<
    (User & { collaborator: Collaborator | null })[]
  > {
    const collaboratorsToApprove = await prisma.user.findMany({
      where: {
        collaborator: {
          is: {
            approved: false,
          },
        },
      },
      include: {
        collaborator: true,
      },
    })

    return collaboratorsToApprove
  }

  async findByRegister(register: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        register,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
