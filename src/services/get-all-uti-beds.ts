import { UtiBedsRepository } from '@/repositories/utibeds-repository'
import { Uti_Bed } from '@prisma/client'

export interface GetAllUtiBedsServiceResponse {
  uti_beds: Uti_Bed[]
}

export class GetAllUtiBedsService {
  constructor(private utiBedsRepository: UtiBedsRepository) {}

  async execute(): Promise<GetAllUtiBedsServiceResponse> {
    const uti_beds = await this.utiBedsRepository.findAll()

    return {
      uti_beds,
    }
  }
}
