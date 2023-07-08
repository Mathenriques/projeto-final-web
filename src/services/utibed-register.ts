import { UtiBedsRepository } from '@/repositories/utibeds-repository'
import { Uti_Bed } from '@prisma/client'
import { UtiBedAlreadyExistsError } from './Errors/utibed-already-exists'

interface UtiBedRegisterServiceRequest {
  id: string
  type: string
  status: string
}

interface UtiBedRegisterServiceResponse {
  uti_bed: Uti_Bed
}

export class UtiBedRegisterService {
  constructor(private utiBedsRepository: UtiBedsRepository) {}

  async execute({
    id,
    type,
    status,
  }: UtiBedRegisterServiceRequest): Promise<UtiBedRegisterServiceResponse> {
    const UtiBedExist = await this.utiBedsRepository.findByID(id)

    if (UtiBedExist) {
      throw new UtiBedAlreadyExistsError()
    }

    const uti_bed = await this.utiBedsRepository.create({
      id,
      type,
      status: 'Livre',
    })

    return {
      uti_bed,
    }
  }
}
