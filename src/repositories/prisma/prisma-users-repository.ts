import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByRegister(register: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        register,
      },
    })

    return user
  }

  async listUsers() {
    const userList = await prisma.user.findMany()

    return userList
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
