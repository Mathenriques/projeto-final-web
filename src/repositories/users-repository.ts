import { Collaborator, Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByRegister(register: string): Promise<User | null>
  findAllCollaboratorsToApprove(): Promise<
    (User & { collaborator: Collaborator | null })[]
  >
}
