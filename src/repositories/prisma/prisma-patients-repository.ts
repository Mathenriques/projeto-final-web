import { Patient, Prisma } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPatientsRepository implements PatientsRepository {
  async findByUserId(user_id: string): Promise<Patient | null> {
    const patient = await prisma.patient.findUnique({
      where: {
        user_id,
      },
    })

    return patient
  }

  async create(data: Prisma.PatientUncheckedCreateInput): Promise<Patient> {
    const patient = await prisma.patient.create({
      data,
    })

    return patient
  }
}
