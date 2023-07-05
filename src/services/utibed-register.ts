import { UtiBedsRepository } from "@/repositories/utibeds-repository"
import { UTI_Bed } from "@prisma/client"
import { UtiBedAlreadyExists } from "./Errors/utibed-already-exists"

interface UtiBedRegisterServiceRequest {
    id: string
}

interface UtiBedRegisterServiceResponse {
    uti_bed: UTI_Bed
}

export class UtiBedRegisterService {
    constructor(private utiBedsRepository : UtiBedsRepository) 
    {}

    async execute({
        id,
    }: UtiBedRegisterServiceRequest):
    Promise<UtiBedRegisterServiceResponse> {
        const UtiBedExist = await this.utiBedsRepository.findByID(id)

        if(UtiBedExist) {
            throw new UtiBedAlreadyExists()
        }

        const uti_bed = await this.utiBedsRepository.create({
            id,
            type: "",
            status: "Livre"
        })

        return {
            uti_bed,
        }
    }
}
