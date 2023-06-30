import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByRegister(register: string) {
    const user = this.items.find((item) => item.register === register)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      register: data.register,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
