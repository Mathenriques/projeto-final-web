import { makeApproveSolicitationService } from '@/services/Factories/make-approve-solicitation-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ApproveSolicitation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const approveSolicitationBodySchema = z.object({
    solicitation_id: z.string(),
  })

  const { solicitation_id } = approveSolicitationBodySchema.parse(request.body)

  const approveSolicitation = makeApproveSolicitationService()

  const { solicitation } = await approveSolicitation.execute({
    solicitation_id,
  })

  return reply.status(200).send({
    solicitation,
  })
}
