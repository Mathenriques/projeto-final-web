import { UtiBedsRepository } from '@/repositories/utibeds-repository'
import { StatusUtiBed, Uti_Bed } from '@prisma/client'

interface UtiBedRegisterServiceRequest {
  type: string
  status: StatusUtiBed
}

interface UtiBedRegisterServiceResponse {
  uti_bed: Uti_Bed
}

export class UtiBedRegisterService {
  constructor(private utiBedsRepository: UtiBedsRepository) {}

  async execute({
    type,
    status,
  }: UtiBedRegisterServiceRequest): Promise<UtiBedRegisterServiceResponse> {
    const uti_bed = await this.utiBedsRepository.create({
      type,
      status,
    })

    return {
      uti_bed,
    }
  }
}
