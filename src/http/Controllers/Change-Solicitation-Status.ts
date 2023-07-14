import { makeApproveSolicitationService } from '@/services/Factories/make-approve-solicitation-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ChangeSolicitationStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const approveSolicitationBodySchema = z.object({
    solicitation_id: z.string(),
    status: z.enum(['Pendente', 'Aprovado', 'Finalizado', 'Reprovado']),
  })

  const { solicitation_id, status } = approveSolicitationBodySchema.parse(
    request.body,
  )

  const approveSolicitation = makeApproveSolicitationService()

  const { solicitation } = await approveSolicitation.execute({
    solicitation_id,
    status,
  })

  return reply.status(200).send({
    solicitation,
  })
}
