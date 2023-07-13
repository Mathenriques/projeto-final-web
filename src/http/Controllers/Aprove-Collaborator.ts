import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
import { makeCollaboratorApproveService } from '@/services/Factories/make-collaborator-approve-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AproveCollaborator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const approveCollaboratorBodySchema = z.object({
    medical_register: z.string(),
  })

  const { medical_register } = approveCollaboratorBodySchema.parse(request.body)

  try {
    const ApproveCollaborator = makeCollaboratorApproveService()

    const { collaboratorId } = await ApproveCollaborator.execute({
      medical_register,
    })

    return reply.status(200).send({
      collaboratorId,
    })
  } catch (err) {
    if (err instanceof CollaboratorDoesNotExists) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
