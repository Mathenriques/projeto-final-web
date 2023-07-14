import { makeUtiBedRegisterService } from '@/services/Factories/make-uti-bed-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function RegisterUtiBed(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUtiBed = makeUtiBedRegisterService()

  await registerUtiBed.execute()

  return reply.status(201).send('Leitos de UTI criados')
}
