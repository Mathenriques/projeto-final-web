import { makeChangeUtiBedStatusService } from '@/services/Factories/make-change-uti-bed-status-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ChangeUtiBedStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const approveSolicitationBodySchema = z.object({
    uti_bed_id: z.string(),
    status: z.enum(['Livre', 'Limpeza', 'Ocupado']),
  })

  const { uti_bed_id, status } = approveSolicitationBodySchema.parse(
    request.body,
  )

  const changeUtiBedStatus = makeChangeUtiBedStatusService()

  const { utiBed } = await changeUtiBedStatus.execute({
    id: uti_bed_id,
    status,
  })

  return reply.status(200).send({
    utiBed,
  })
}
