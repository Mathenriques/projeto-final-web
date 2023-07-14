import { UtiBedsRepository } from '@/repositories/utibeds-repository'
import { StatusUtiBed, Uti_Bed } from '@prisma/client'

interface ChangeUtiBedStatusServiceRequest {
  id: string
  status: StatusUtiBed
}

interface ChangeUtiBedStatusServiceResponse {
  utiBed: Uti_Bed
}

export class ChangeUtiBedStatusService {
  constructor(private utiBedsRepository: UtiBedsRepository) {}

  async execute({
    id,
    status,
  }: ChangeUtiBedStatusServiceRequest): Promise<ChangeUtiBedStatusServiceResponse> {
    const utiBed = await this.utiBedsRepository.updateStatus(id, status)

    return utiBed
  }
}
