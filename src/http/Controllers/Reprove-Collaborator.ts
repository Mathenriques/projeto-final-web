import { CollaboratorDoesNotExists } from '@/services/Errors/collaborator-does-not-exists-error'
import { makeCollaboratorReproveService } from '@/services/Factories/make-collaborator-reprove-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ReproveCollaborator(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCollaboratorBodySchema = z.object({
    medical_register: z.string(),
  })

  const { medical_register } = deleteCollaboratorBodySchema.parse(request.body)

  try {
    const reproveCollaborator = await makeCollaboratorReproveService()

    const { bool } = await reproveCollaborator.execute({
      medical_register,
    })

    return reply.status(200).send({
      bool,
    })
  } catch (err) {
    if (err instanceof CollaboratorDoesNotExists) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
