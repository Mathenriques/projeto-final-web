import { UtiBedsRepository } from '@/repositories/utibeds-repository'

export class UtiBedRegisterService {
  constructor(private utiBedsRepository: UtiBedsRepository) {}

  async execute() {
    const numberUtisBeds = await this.utiBedsRepository.countUtiBeds()

    if (numberUtisBeds !== 30) {
      const numberloop = 30 - numberUtisBeds

      for (let i = 0; i < numberloop; i++) {
        await this.utiBedsRepository.create({
          type: 'UTI',
          status: 'Livre',
        })
      }
    }
  }
}
