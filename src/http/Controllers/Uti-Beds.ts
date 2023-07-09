import { makeGetAllUtiBedsService } from '@/services/Factories/make-get-all-uti-beds-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function UtiBeds(request: FastifyRequest, reply: FastifyReply) {
  const getAllUtiBedsService = makeGetAllUtiBedsService()

  const { uti_beds } = await getAllUtiBedsService.execute()

  return reply.status(200).send({
    uti_beds,
  })
}
