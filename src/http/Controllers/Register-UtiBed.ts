import { makeUtiBedRegisterService } from '@/services/Factories/make-uti-bed-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterUtiBed(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUtiBedBodySchema = z.object({
    type: z.string(),
    status: z.enum(['Livre', 'Limpeza', 'Ocupado']),
  })

  const { type, status } = registerUtiBedBodySchema.parse(request.body)

  const registerUtiBed = makeUtiBedRegisterService()

  const { uti_bed } = await registerUtiBed.execute({
    type,
    status,
  })

  return reply.status(201).send({
    uti_bed,
  })
}
