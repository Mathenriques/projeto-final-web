import { UtiBedsRepository } from "@/repositories/utibeds-repository"
import { UTI_Bed } from "@prisma/client"
import { UtiBedAlreadyOccupied } from "./Errors/utibed-already-occupied"

interface UtiBedRegisterServiceRequest {
    id: string
}

interface UtiBedRegisterServiceResponse {
    uti_bed: UTI_Bed
}
