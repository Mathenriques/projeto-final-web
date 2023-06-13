import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByCrmCorem(crmCoren: string) {
    const user = this.items.find((item) => item.crm_coren === crmCoren)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      crm_coren: data.crm_coren,
      role: data.role,
      approved: false,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
